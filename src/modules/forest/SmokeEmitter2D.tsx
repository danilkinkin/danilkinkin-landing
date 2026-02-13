import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function getTextureAspect(tex: THREE.Texture): number {
	const src: any = tex.source;
	const data: any = src?.data || tex.image;
	const w: number = (data?.width as number) ?? 1;
	const h: number = (data?.height as number) ?? 1;
	return h === 0 ? 1 : w / h;
}

type Bullet = {
	sprite: THREE.Sprite;
	alive: boolean;
	age: number;
	life: number;
	pos: THREE.Vector3;
	vel: THREE.Vector3;
	sizeH: number;
	aspect: number;
	opacity: number;
	hueShift: number;
};

type EaseFn = (t: number) => number;

function clamp01(x: number) {
	return Math.min(1, Math.max(0, x));
}
const easeLinear: EaseFn = (t) => t;
const easeInQuad: EaseFn = (t) => t * t;
const easeOutQuad: EaseFn = (t) => 1 - (1 - t) * (1 - t);
const easeInOutQuad: EaseFn = (t) =>
	t < 0.5 ? 2 * t * t : -2 * (t - 1) * (t - 1) + 1;

function selectEase(name: string): EaseFn {
	switch (name) {
		case "linear":
			return easeLinear;
		case "inQuad":
			return easeInQuad;
		case "outQuad":
			return easeOutQuad;
		case "inOutQuad":
			return easeInOutQuad;
		default:
			return easeInOutQuad;
	}
}

const config = {
	// Emission
	emitRate: 1.5,
	emitRateJitter: 0.2,
	emitBurstCount: 0,
	emitBurstInterval: 0,
	enableBurst: false,

	// Pool
	poolSize: 80,

	// Life
	life: 25,
	lifeJitter: 0.3,

	// Size
	startHeight: 0.5,
	endHeight: 1,
	sizeJitter: 0.15,
	sizeEase: "inOutQuad",
	widthScale: 1.0,

	// Velocity / direction
	speed: 0.15,
	speedJitter: 0.1,
	spreadX: 0.15,
	spreadY: 0.05,
	baseUpY: 1.0,
	startRadius: 0.1,
	startOffset: [0, 0, 0],

	// Forces
	gravity: [0, 0, 0],
	drag: 0.0,

	// Turbulence / noise
	noiseAmplitude: 0.0,
	noiseFrequency: 1.0,
	noiseScrollSpeed: 0.25,

	// Spiral
	swirlAmplitude: 0.0,
	swirlFrequency: 1.0,

	// Opacity
	startOpacity: 1,
	endOpacity: 0.7,
	opacityEase: "outQuad",

	// Color tint
	tintColor: new THREE.Color(0xffffff),
	tintIntensity: 0.0,
	enableHueShift: false,
	hueShiftRange: 0.0,

	// Rendering
	renderOrder: 10,
	depthTest: false,
	depthWrite: false,
	blending: THREE.NormalBlending,
	alphaTest: 0.0,
	multisample: 0,

	// Sprite frames / animation
	frameUrls: ["/sprites/smoke_1.png"],
	animateFrames: false,
	frameRate: 8,
	randomStartFrame: true,

	// Rotation
	enableRotation: false,
	rotationSpeed: 0.0,
	rotationSpeedJitter: 0.1,
};

export function SmokeEmitter2D(props) {
	// Load textures
	const textures = useLoader(THREE.TextureLoader, config.frameUrls);

	useMemo(() => {
		textures.forEach((t) => {
			t.wrapS = THREE.ClampToEdgeWrapping;
			t.wrapT = THREE.ClampToEdgeWrapping;
			t.minFilter = THREE.LinearFilter;
			t.magFilter = THREE.LinearFilter;
			t.anisotropy = 1;
			t.colorSpace = THREE.SRGBColorSpace;
		});
	}, [textures]);

	const tint = useMemo(() => {
		return typeof config.tintColor === "string" ||
			typeof config.tintColor === "number"
			? new THREE.Color(config.tintColor as any)
			: config.tintColor;
	}, []);

	const poolRef = useRef<Bullet[]>([]);
	const groupRef = useRef<THREE.Group>(null);
	const emitAccRef = useRef(0);
	const lastBurstTimeRef = useRef(0);
	const timeRef = useRef(0);

	// Eases
	const sizeEaseFn = useMemo(() => selectEase(config.sizeEase), []);
	const opacityEaseFn = useMemo(() => selectEase(config.opacityEase), []);

	useEffect(() => {
		const group = groupRef.current!;
		const bullets: Bullet[] = [];

		for (let i = 0; i < config.poolSize; i++) {
			const tex = textures[i % textures.length];
			const mat = new THREE.SpriteMaterial({
				map: tex,
				transparent: true,
				depthWrite: config.depthWrite,
				depthTest: config.depthTest,
				alphaTest: config.alphaTest,
				blending: config.blending,
			});
			if (config.tintIntensity > 0) {
				// approximate tint by vertexColors not available for SpriteMaterial; use color multiplier
				mat.color = tint
					.clone()
					.lerp(new THREE.Color(0xffffff), 1 - clamp01(config.tintIntensity));
			}
			const sprite = new THREE.Sprite(mat);
			sprite.visible = false;
			sprite.renderOrder = config.renderOrder;
			group.add(sprite);

			bullets.push({
				sprite,
				alive: false,
				age: 0,
				life: config.life,
				pos: new THREE.Vector3(),
				vel: new THREE.Vector3(),
				sizeH: config.startHeight,
				aspect: getTextureAspect(tex),
				opacity: config.startOpacity,
				hueShift: 0,
			});
		}

		poolRef.current = bullets;

		return () => {
			console.log("Cleaning up SmokeEmitter2D");
			bullets.forEach((b) => {
				(b.sprite.material as THREE.SpriteMaterial).dispose();
				group.remove(b.sprite);
			});
		};
	}, [textures, tint]);

	const randRange = (base: number, jitter: number) =>
		base + (Math.random() * 2 - 1) * jitter;

	const randomUpDirection = () => {
		const jitterX = (Math.random() * 2 - 1) * config.spreadX;
		const jitterY = config.baseUpY + (Math.random() * 2 - 1) * config.spreadY;
		return new THREE.Vector3(jitterX, jitterY, 0).normalize();
	};

	const spawn = () => {
		const pool = poolRef.current;
		const inactive = pool.filter((x) => !x.alive);
		if (inactive.length === 0) return;

		const b = inactive[Math.floor(Math.random() * inactive.length)];
		b.alive = true;
		b.age = 0;
		b.life = Math.max(0.1, randRange(config.life, config.lifeJitter));
		b.sizeH = Math.max(0.001, randRange(config.startHeight, config.sizeJitter));
		b.opacity = clamp01(config.startOpacity);
		b.hueShift = config.enableHueShift
			? (Math.random() * 2 - 1) * config.hueShiftRange
			: 0;

		// Start position: single point + optional small radius
		const angle = Math.random() * Math.PI * 2;
		const r = config.startRadius * Math.random();
		const startX = config.startOffset[0] + Math.cos(angle) * r;
		const startY = config.startOffset[1] + Math.sin(angle) * r;
		const startZ = config.startOffset[2];
		b.pos.set(startX, startY, startZ);

		// Velocity
		const dir = randomUpDirection();
		const spd = Math.max(0, randRange(config.speed, config.speedJitter));
		b.vel.copy(dir).multiplyScalar(spd);

		// Sprite
		const s = b.sprite;
		s.position.copy(b.pos);
		const width = b.sizeH * b.aspect * config.widthScale;
		s.scale.set(width, b.sizeH, 1);
		s.visible = true;

		// Material opacity and color
		const mat = s.material as THREE.SpriteMaterial;
		mat.opacity = b.opacity;

		// Random start frame by swapping map if provided
		if (
			config.animateFrames &&
			config.randomStartFrame &&
			textures.length > 1
		) {
			const idx = Math.floor(Math.random() * textures.length);
			mat.map = textures[idx];
			b.aspect = getTextureAspect(textures[idx]);
		}

		// Rotation
		if (config.enableRotation) {
			const rs = randRange(config.rotationSpeed, config.rotationSpeedJitter);
			// store in sprite.userData
			s.userData.rotationSpeed = rs;
		}
	};

	useFrame((_, delta) => {
		timeRef.current += delta;

		// Emission regular + jitter
		const rate = Math.max(0, randRange(config.emitRate, config.emitRateJitter));
		emitAccRef.current += delta * rate;
		while (emitAccRef.current >= 1) {
			emitAccRef.current -= 1;
			spawn();
		}

		// Burst emission
		if (
			config.enableBurst &&
			config.emitBurstCount > 0 &&
			config.emitBurstInterval > 0
		) {
			if (
				timeRef.current - lastBurstTimeRef.current >=
				config.emitBurstInterval
			) {
				lastBurstTimeRef.current = timeRef.current;
				for (let i = 0; i < config.emitBurstCount; i++) spawn();
			}
		}

		// Animation frame switching
		if (config.animateFrames && textures.length > 1 && config.frameRate > 0) {
			const frameIdx = Math.floor(
				(timeRef.current * config.frameRate) % textures.length,
			);
			for (const b of poolRef.current) {
				if (!b.alive) continue;
				const mat = b.sprite.material as THREE.SpriteMaterial;
				if (mat.map !== textures[frameIdx]) {
					mat.map = textures[frameIdx];
					b.aspect = getTextureAspect(textures[frameIdx]);
				}
			}
		}

		// Update bullets
		for (const b of poolRef.current) {
			if (!b.alive) continue;

			b.age += delta;
			if (b.age >= b.life) {
				b.alive = false;
				b.sprite.visible = false;
				continue;
			}

			const u = clamp01(b.age / b.life);

			// Forces
			if (config.drag !== 0) {
				b.vel.multiplyScalar(Math.max(0, 1 - config.drag * delta));
			}
			if (config.gravity) {
				b.vel.x += config.gravity[0] * delta;
				b.vel.y += config.gravity[1] * delta;
				b.vel.z += config.gravity[2] * delta;
			}

			// Noise/turbulence
			if (config.noiseAmplitude > 0) {
				const t = timeRef.current * config.noiseScrollSpeed;
				const angle =
					(b.pos.x + b.pos.y + t) * config.noiseFrequency * 2 * Math.PI;
				b.vel.x += Math.cos(angle) * config.noiseAmplitude * delta;
				b.vel.y += Math.sin(angle) * config.noiseAmplitude * delta;
			}

			// Swirl (around origin in XY)
			if (config.swirlAmplitude !== 0) {
				const swirlAngle =
					timeRef.current * config.swirlFrequency * 2 * Math.PI;
				const swirlX = -Math.sin(swirlAngle) * config.swirlAmplitude;
				const swirlY = Math.cos(swirlAngle) * config.swirlAmplitude;
				b.vel.x += swirlX * delta;
				b.vel.y += swirlY * delta;
			}

			// Integrate position
			b.pos.addScaledVector(b.vel, delta);

			// Size over life
			const sg = sizeEaseFn(u);
			b.sizeH = THREE.MathUtils.lerp(config.startHeight, config.endHeight, sg);

			// Opacity over life
			const oe = opacityEaseFn(u);
			b.opacity = THREE.MathUtils.lerp(
				config.startOpacity,
				config.endOpacity,
				oe,
			);

			// Apply to sprite
			const s = b.sprite;
			s.position.copy(b.pos);
			const width = b.sizeH * b.aspect * config.widthScale;
			s.scale.set(width, b.sizeH, 1);

			const mat = s.material as THREE.SpriteMaterial;
			mat.opacity = clamp01(b.opacity);

			// Optional hue shift via color modulation
			if (config.tintIntensity > 0 || config.enableHueShift) {
				const baseColor = tint
					.clone()
					.lerp(new THREE.Color(0xffffff), 1 - clamp01(config.tintIntensity));
				if (config.enableHueShift && b.hueShift !== 0) {
					// simple hue shift approximation via HSL
					const hsl = { h: 0, s: 0, l: 0 };
					baseColor.getHSL(hsl as any);
					hsl.h = (hsl.h + b.hueShift + 1) % 1;
					baseColor.setHSL(hsl.h, hsl.s, hsl.l);
				}
				mat.color.copy(baseColor);
			}

			// Rotation
			if (config.enableRotation) {
				const rs = s.userData.rotationSpeed ?? config.rotationSpeed;
				s.rotation += rs * delta;
			}
		}
	});

	return <group position={props.position} ref={groupRef} />;
}
