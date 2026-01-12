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

export function SmokeEmitter2D({
	// Emission
	emitRate = 1.5,
	emitRateJitter = 0.2,
	emitBurstCount = 0,
	emitBurstInterval = 0,
	enableBurst = false,

	// Pool
	poolSize = 80,

	// Life
	life = 25,
	lifeJitter = 0.3,

	// Size
	startHeight = 0.5,
	endHeight = 1,
	sizeJitter = 0.15,
	sizeEase = "inOutQuad",
	widthScale = 1.0,

	// Velocity / direction
	speed = 0.15,
	speedJitter = 0.1,
	spreadX = 0.15,
	spreadY = 0.05,
	baseUpY = 1.0,
	startRadius = 0.1,
	startOffset = [0, 0, 0],

	// Forces
	gravity = [0, 0, 0],
	drag = 0.0,

	// Turbulence / noise
	noiseAmplitude = 0.0,
	noiseFrequency = 1.0,
	noiseScrollSpeed = 0.25,

	// Spiral
	swirlAmplitude = 0.0,
	swirlFrequency = 1.0,

	// Opacity
	startOpacity = 1,
	endOpacity = 0.7,
	opacityEase = "outQuad",

	// Color tint
	tintColor = new THREE.Color(0xffffff),
	tintIntensity = 0.0,
	enableHueShift = false,
	hueShiftRange = 0.0,

	// Rendering
	renderOrder = 10,
	depthTest = false,
	depthWrite = false,
	blending = THREE.NormalBlending,
	alphaTest = 0.0,
	multisample = 0,

	// Sprite frames / animation
	frameUrls = ["/sprites/smoke_1.png"],
	animateFrames = false,
	frameRate = 8,
	randomStartFrame = true,

	// Rotation
	enableRotation = false,
	rotationSpeed = 0.0,
	rotationSpeedJitter = 0.1,

	// Position
	position = [0, 0, 0],
}: {
	emitRate?: number;
	emitRateJitter?: number;
	emitBurstCount?: number;
	emitBurstInterval?: number;
	enableBurst?: boolean;

	poolSize?: number;

	life?: number;
	lifeJitter?: number;

	startHeight?: number;
	endHeight?: number;
	sizeJitter?: number;
	sizeEase?: "linear" | "inQuad" | "outQuad" | "inOutQuad";
	widthScale?: number;

	speed?: number;
	speedJitter?: number;
	spreadX?: number;
	spreadY?: number;
	baseUpY?: number;
	startRadius?: number;
	startOffset?: [number, number, number];

	gravity?: [number, number, number];
	drag?: number;

	noiseAmplitude?: number;
	noiseFrequency?: number;
	noiseScrollSpeed?: number;

	swirlAmplitude?: number;
	swirlFrequency?: number;

	startOpacity?: number;
	endOpacity?: number;
	opacityEase?: "linear" | "inQuad" | "outQuad" | "inOutQuad";

	tintColor?: THREE.Color | string | number;
	tintIntensity?: number;
	enableHueShift?: boolean;
	hueShiftRange?: number;

	renderOrder?: number;
	depthTest?: boolean;
	depthWrite?: boolean;
	blending?: THREE.Blending;
	alphaTest?: number;
	multisample?: number;

	frameUrls?: string[];
	animateFrames?: boolean;
	frameRate?: number;
	randomStartFrame?: boolean;

	enableRotation?: boolean;
	rotationSpeed?: number;
	rotationSpeedJitter?: number;

	position?: [number, number, number];
}) {
	// Load textures
	const textures = useLoader(THREE.TextureLoader, frameUrls);

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
		return typeof tintColor === "string" || typeof tintColor === "number"
			? new THREE.Color(tintColor as any)
			: tintColor;
	}, [tintColor]);

	const poolRef = useRef<Bullet[]>([]);
	const groupRef = useRef<THREE.Group>(null);
	const emitAccRef = useRef(0);
	const lastBurstTimeRef = useRef(0);
	const timeRef = useRef(0);

	// Eases
	const sizeEaseFn = useMemo(() => selectEase(sizeEase), [sizeEase]);
	const opacityEaseFn = useMemo(() => selectEase(opacityEase), [opacityEase]);

	useEffect(() => {
		const group = groupRef.current!;
		const bullets: Bullet[] = [];

		for (let i = 0; i < poolSize; i++) {
			const tex = textures[i % textures.length];
			const mat = new THREE.SpriteMaterial({
				map: tex,
				transparent: true,
				depthWrite,
				depthTest,
				alphaTest,
				blending,
			});
			if (tintIntensity > 0) {
				// approximate tint by vertexColors not available for SpriteMaterial; use color multiplier
				mat.color = tint
					.clone()
					.lerp(new THREE.Color(0xffffff), 1 - clamp01(tintIntensity));
			}
			const sprite = new THREE.Sprite(mat);
			sprite.visible = false;
			sprite.renderOrder = renderOrder;
			group.add(sprite);

			bullets.push({
				sprite,
				alive: false,
				age: 0,
				life,
				pos: new THREE.Vector3(),
				vel: new THREE.Vector3(),
				sizeH: startHeight,
				aspect: getTextureAspect(tex),
				opacity: startOpacity,
				hueShift: 0,
			});
		}

		poolRef.current = bullets;

		return () => {
			bullets.forEach((b) => {
				(b.sprite.material as THREE.SpriteMaterial).dispose();
				group.remove(b.sprite);
			});
		};
	}, [
		textures,
		renderOrder,
		poolSize,
		life,
		startHeight,
		depthTest,
		depthWrite,
		alphaTest,
		blending,
		tint,
		tintIntensity,
	]);

	const randRange = (base: number, jitter: number) =>
		base + (Math.random() * 2 - 1) * jitter;

	const randomUpDirection = () => {
		const jitterX = (Math.random() * 2 - 1) * spreadX;
		const jitterY = baseUpY + (Math.random() * 2 - 1) * spreadY;
		return new THREE.Vector3(jitterX, jitterY, 0).normalize();
	};

	const spawn = () => {
		const pool = poolRef.current;
		const inactive = pool.filter((x) => !x.alive);
		if (inactive.length === 0) return;

		const b = inactive[Math.floor(Math.random() * inactive.length)];
		b.alive = true;
		b.age = 0;
		b.life = Math.max(0.1, randRange(life, lifeJitter));
		b.sizeH = Math.max(0.001, randRange(startHeight, sizeJitter));
		b.opacity = clamp01(startOpacity);
		b.hueShift = enableHueShift ? (Math.random() * 2 - 1) * hueShiftRange : 0;

		// Start position: single point + optional small radius
		const angle = Math.random() * Math.PI * 2;
		const r = startRadius * Math.random();
		const startX = startOffset[0] + Math.cos(angle) * r;
		const startY = startOffset[1] + Math.sin(angle) * r;
		const startZ = startOffset[2];
		b.pos.set(startX, startY, startZ);

		// Velocity
		const dir = randomUpDirection();
		const spd = Math.max(0, randRange(speed, speedJitter));
		b.vel.copy(dir).multiplyScalar(spd);

		// Sprite
		const s = b.sprite;
		s.position.copy(b.pos);
		const width = b.sizeH * b.aspect * widthScale;
		s.scale.set(width, b.sizeH, 1);
		s.visible = true;

		// Material opacity and color
		const mat = s.material as THREE.SpriteMaterial;
		mat.opacity = b.opacity;

		// Random start frame by swapping map if provided
		if (animateFrames && randomStartFrame && textures.length > 1) {
			const idx = Math.floor(Math.random() * textures.length);
			mat.map = textures[idx];
			b.aspect = getTextureAspect(textures[idx]);
		}

		// Rotation
		if (enableRotation) {
			const rs = randRange(rotationSpeed, rotationSpeedJitter);
			// store in sprite.userData
			s.userData.rotationSpeed = rs;
		}
	};

	useFrame((_, delta) => {
		timeRef.current += delta;

		// Emission regular + jitter
		const rate = Math.max(0, randRange(emitRate, emitRateJitter));
		emitAccRef.current += delta * rate;
		while (emitAccRef.current >= 1) {
			emitAccRef.current -= 1;
			spawn();
		}

		// Burst emission
		if (enableBurst && emitBurstCount > 0 && emitBurstInterval > 0) {
			if (timeRef.current - lastBurstTimeRef.current >= emitBurstInterval) {
				lastBurstTimeRef.current = timeRef.current;
				for (let i = 0; i < emitBurstCount; i++) spawn();
			}
		}

		// Animation frame switching
		if (animateFrames && textures.length > 1 && frameRate > 0) {
			const frameIdx = Math.floor(
				(timeRef.current * frameRate) % textures.length,
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
			if (drag !== 0) {
				b.vel.multiplyScalar(Math.max(0, 1 - drag * delta));
			}
			if (gravity) {
				b.vel.x += gravity[0] * delta;
				b.vel.y += gravity[1] * delta;
				b.vel.z += gravity[2] * delta;
			}

			// Noise/turbulence
			if (noiseAmplitude > 0) {
				const t = timeRef.current * noiseScrollSpeed;
				const angle = (b.pos.x + b.pos.y + t) * noiseFrequency * 2 * Math.PI;
				b.vel.x += Math.cos(angle) * noiseAmplitude * delta;
				b.vel.y += Math.sin(angle) * noiseAmplitude * delta;
			}

			// Swirl (around origin in XY)
			if (swirlAmplitude !== 0) {
				const swirlAngle = timeRef.current * swirlFrequency * 2 * Math.PI;
				const swirlX = -Math.sin(swirlAngle) * swirlAmplitude;
				const swirlY = Math.cos(swirlAngle) * swirlAmplitude;
				b.vel.x += swirlX * delta;
				b.vel.y += swirlY * delta;
			}

			// Integrate position
			b.pos.addScaledVector(b.vel, delta);

			// Size over life
			const sg = sizeEaseFn(u);
			b.sizeH = THREE.MathUtils.lerp(startHeight, endHeight, sg);

			// Opacity over life
			const oe = opacityEaseFn(u);
			b.opacity = THREE.MathUtils.lerp(startOpacity, endOpacity, oe);

			// Apply to sprite
			const s = b.sprite;
			s.position.copy(b.pos);
			const width = b.sizeH * b.aspect * widthScale;
			s.scale.set(width, b.sizeH, 1);

			const mat = s.material as THREE.SpriteMaterial;
			mat.opacity = clamp01(b.opacity);

			// Optional hue shift via color modulation
			if (tintIntensity > 0 || enableHueShift) {
				const baseColor = tint
					.clone()
					.lerp(new THREE.Color(0xffffff), 1 - clamp01(tintIntensity));
				if (enableHueShift && b.hueShift !== 0) {
					// simple hue shift approximation via HSL
					const hsl = { h: 0, s: 0, l: 0 };
					baseColor.getHSL(hsl as any);
					hsl.h = (hsl.h + b.hueShift + 1) % 1;
					baseColor.setHSL(hsl.h, hsl.s, hsl.l);
				}
				mat.color.copy(baseColor);
			}

			// Rotation
			if (enableRotation) {
				const rs = s.userData.rotationSpeed ?? rotationSpeed;
				s.rotation += rs * delta;
			}
		}
	});

	return <group position={position} ref={groupRef} />;
}
