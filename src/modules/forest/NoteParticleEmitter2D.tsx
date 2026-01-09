import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const frameUrls = [
	"/sprites/note_1.png",
	"/sprites/note_2.png",
	"/sprites/note_3.png",
	"/sprites/note_4.png",
];

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
};

export function NoteParticleEmitter2D({
	emitRate = 0.5,
	life = 4.5,
	startHeight = 0.08,
	endHeight = 0.04,
	speed = 0.1,
	spread = 0.6,
	startRadius = 0.07,
	position = [0, 0, 0],
	renderOrder = 10,
}: {
	emitRate?: number;
	life?: number;
	startHeight?: number;
	endHeight?: number;
	speed?: number;
	spread?: number;
	startRadius?: number;
	position?: [number, number, number];
	renderOrder?: number;
}) {
	const textures = useLoader(THREE.TextureLoader, frameUrls);

	useMemo(() => {
		textures.forEach((t) => {
			t.wrapS = THREE.ClampToEdgeWrapping;
			t.wrapT = THREE.ClampToEdgeWrapping;
			t.minFilter = THREE.LinearFilter; // лучше для мелких спрайтов
			t.magFilter = THREE.LinearFilter;
			t.anisotropy = 1;
			t.colorSpace = THREE.SRGBColorSpace;
		});
	}, [textures]);

	const poolRef = useRef<Bullet[]>([]);
	const groupRef = useRef<THREE.Group>(null);
	const emitAccRef = useRef(0);
	const worldPos = useMemo(() => new THREE.Vector3(), []);
	const tmpPos = useMemo(() => new THREE.Vector3(), []);

	useEffect(() => {
		const group = groupRef.current!;
		const bullets: Bullet[] = [];

		for (let i = 0; i < 3; i++) {
			const tex = textures[i % textures.length];
			const mat = new THREE.SpriteMaterial({
				map: tex,
				transparent: true,
				depthWrite: false,
				depthTest: false,
			});
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
			});
		}

		poolRef.current = bullets;

		return () => {
			bullets.forEach((b) => {
				(b.sprite.material as THREE.SpriteMaterial).dispose();
				group.remove(b.sprite);
			});
		};
	}, [textures, renderOrder, life, startHeight]);

	const randomDirection = () => {
		const dir = new THREE.Vector3(
			Math.random() * 2 - 1,
			Math.random() * 2 - 1,
			0,
		).normalize();
		const base = new THREE.Vector3(0, 1, 0);
		dir.lerp(base, 1 - spread).normalize();
		return dir;
	};

	const spawn = () => {
		const pool = poolRef.current;
		const inactive = pool.filter((x) => !x.alive);
		if (inactive.length === 0) return;
		const b = inactive[Math.floor(Math.random() * inactive.length)];

		b.alive = true;
		b.age = 0;
		b.life = life;

		// Позиция старта: точка на окружности радиуса startRadius вокруг центра группы (локальные координаты)
		const angle = Math.random() * Math.PI * 2;
		const startX = Math.cos(angle) * startRadius;
		const startY = Math.sin(angle) * startRadius;
		b.pos.set(startX, startY, 0);

		// Скорость
		b.vel.copy(randomDirection()).multiplyScalar(speed);
		b.sizeH = startHeight;

		const s = b.sprite;
		s.position.copy(b.pos);
		const width = b.sizeH * b.aspect;
		s.scale.set(width, b.sizeH, 1);
		s.visible = true;
	};

	useFrame((_, delta) => {
		emitAccRef.current += delta * emitRate;
		while (emitAccRef.current >= 1) {
			emitAccRef.current -= 1;
			spawn();
		}

		for (const b of poolRef.current) {
			if (!b.alive) continue;

			b.age += delta;
			if (b.age >= b.life) {
				b.alive = false;
				b.sprite.visible = false;
				continue;
			}

			// локальное движение относительно group
			b.pos.addScaledVector(b.vel, delta);

			// Нелинейная "смещенная" кривая роста:
			// u — линейный прогресс, t — смещённый (0 до 0.7, затем плавный рост до 1)
			const u = b.age / b.life;
			let t: number;
			if (u <= 0.7) {
				t = 0;
			} else {
				const v = (u - 0.7) / 0.3; // нормализация оставшегося участка [0,1]
				// ease-in квадратичная (можно заменить на кубическую v*v*v для более резкого старта)
				t = v * v;
			}

			b.sizeH = THREE.MathUtils.lerp(startHeight, endHeight, t);

			const s = b.sprite;
			s.position.copy(b.pos);
			const width = b.sizeH * b.aspect;
			s.scale.set(width, b.sizeH, 1);
		}
	});

	return <group position={position} ref={groupRef} />;
}
