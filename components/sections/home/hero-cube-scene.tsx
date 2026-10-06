"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { Cell, PALETTES, type HeroSceneLabels } from "./hero-scene";

// Séquence pilotée par le scroll : un cube monolithe grandit, se fissure, explose,
// révèle la cellule robotisée (le jumeau numérique), puis 4 fragments reviennent
// se placer autour d'elle pour porter les 4 savoir-faire.

const N = 4;
const CUBE = 2.4;
const FRAGMENT = CUBE / N - 0.035;

// Jalons de la séquence, en fraction du scroll de la section
const T = {
	grow: [0.04, 0.24],
	explode: [0.22, 0.5],
	fade: [0.27, 0.39],
	core: [0.26, 0.36],
	cell: [0.22, 0.52],
	reveal: [0.38, 0.58],
	cam1: [0.26, 0.52],
	hotspotsOut: [0.62, 0.68],
	anchors: [0.6, 0.8],
	anchorsIn: [0.62, 0.74],
	cam2: [0.62, 0.86],
} as const;

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const range = (p: number, [a, b]: readonly [number, number]) => clamp01((p - a) / (b - a));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// Positions monde des 4 fragments « savoir-faire » : arrière-gauche, arrière-droite,
// avant-gauche, avant-droite (cohérent avec les cartes à gauche et à droite)
const ANCHORS = [
	new THREE.Vector3(-3.5, 1.4, -1.8),
	new THREE.Vector3(3.5, 1.4, -1.8),
	new THREE.Vector3(-3.5, 0.7, 2.0),
	new THREE.Vector3(3.5, 0.7, 2.0),
];

const CAMERA = {
	k0: new THREE.Vector3(0, 0.3, 10),
	k1: new THREE.Vector3(4.6, 2.8, 5.6),
	k2: new THREE.Vector3(0, 8, 9.6),
	l0: new THREE.Vector3(0, 0, 0),
	l1: new THREE.Vector3(0, 0.55, 0),
	l2: new THREE.Vector3(0, -0.3, 0),
};

// Aléatoire déterministe : le cube explose toujours de la même façon
function mulberry32(seed: number) {
	return () => {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

type Fragment = {
	home: THREE.Vector3;
	dir: THREE.Vector3;
	dist: number;
	axis: THREE.Vector3;
	spin: number;
	delay: number;
	anchor: number;
};

const AWAY_FROM_CAMERA = new THREE.Vector3(0.5, 0.3, 0.7).normalize();

function buildFragments(): Fragment[] {
	const rand = mulberry32(7);
	const step = CUBE / N;
	const anchorCells: Record<string, number> = {
		[`0,${N - 1},0`]: 0,
		[`${N - 1},${N - 1},0`]: 1,
		[`0,${N - 1},${N - 1}`]: 2,
		[`${N - 1},${N - 1},${N - 1}`]: 3,
	};
	const fragments: Fragment[] = [];
	for (let i = 0; i < N; i++)
		for (let j = 0; j < N; j++)
			for (let k = 0; k < N; k++) {
				const home = new THREE.Vector3(
					(i - (N - 1) / 2) * step,
					(j - (N - 1) / 2) * step,
					(k - (N - 1) / 2) * step
				);
				// les éclats partent surtout sur les côtés et vers l'arrière : rien ne
				// fonce sur la caméra
				const dir = home
					.clone()
					.normalize()
					.add(new THREE.Vector3(rand() - 0.5, rand() - 0.3, rand() - 0.5).multiplyScalar(0.7))
					.addScaledVector(AWAY_FROM_CAMERA, -0.6)
					.normalize();
				fragments.push({
					home,
					dir,
					dist: 1.6 + rand() * 2.6,
					axis: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
					spin: (1 + rand() * 2) * Math.PI,
					delay: rand() * 0.25,
					anchor: anchorCells[`${i},${j},${k}`] ?? -1,
				});
			}
	return fragments;
}

function CubeSequence({
	progress,
	theme,
	labels,
	overlay,
}: {
	progress: MotionValue<number>;
	theme: "dark" | "light";
	labels: HeroSceneLabels;
	overlay: React.RefObject<HTMLDivElement | null>;
}) {
	const { camera, size } = useThree();
	const p = useRef(0);
	const spinY = useRef(0.6);
	const parallax = useRef(new THREE.Vector2());
	const reveal = useRef(0);
	const cubeGroup = useRef<THREE.Group>(null);
	const cellGroup = useRef<THREE.Group>(null);
	const core = useRef<THREE.Mesh>(null);
	const coreLight = useRef<THREE.PointLight>(null);
	const pieces = useRef<(THREE.Group | null)[]>([]);

	const fragments = useMemo(buildFragments, []);
	const scratch = useMemo(
		() => ({
			pos: new THREE.Vector3(),
			target: new THREE.Vector3(),
			look: new THREE.Vector3(),
			cam: new THREE.Vector3(),
			q: new THREE.Quaternion(),
		}),
		[]
	);

	const geometry = useMemo(() => new THREE.BoxGeometry(FRAGMENT, FRAGMENT, FRAGMENT), []);
	const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
	const materials = useMemo(() => {
		const shell = new THREE.MeshPhysicalMaterial({
			color: "#2c3848",
			metalness: 0.3,
			roughness: 0.28,
			envMapIntensity: 1.8,
			clearcoat: 1,
			clearcoatRoughness: 0.12,
			transparent: true,
		});
		return {
			shell,
			anchor: shell.clone(),
			edge: new THREE.LineBasicMaterial({ color: "#00C7FF", transparent: true, opacity: 0.6 }),
			anchorEdge: new THREE.LineBasicMaterial({ color: "#00C7FF", transparent: true, opacity: 0.6 }),
			core: new THREE.MeshBasicMaterial({ color: "#00C7FF", transparent: true, opacity: 0 }),
		};
	}, []);

	useEffect(
		() => () => {
			geometry.dispose();
			edges.dispose();
			Object.values(materials).forEach((material) => material.dispose());
		},
		[geometry, edges, materials]
	);

	useFrame((state, delta) => {
		p.current = THREE.MathUtils.damp(p.current, progress.get(), 6, delta);
		const P = p.current;
		const t = state.clock.getElapsedTime();
		const portrait = size.width < size.height * 0.9;

		const grow = ease(range(P, T.grow));
		const explode = range(P, T.explode);
		const fade = range(P, T.fade);
		const anchorsMove = ease(range(P, T.anchors));
		const anchorsIn = range(P, T.anchorsIn);

		// Cube : décalé à droite du titre au repos, recentré en grandissant
		const g = cubeGroup.current;
		if (g) {
			spinY.current += delta * 0.35 * (1 - 0.8 * explode);
			g.position.set(portrait ? 0 : 2.4 * (1 - grow), (portrait ? 1.3 : 0) * (1 - grow) + Math.sin(t * 0.8) * 0.06 * (1 - grow), 0);
			g.rotation.set(0.42, spinY.current, 0);
			g.scale.setScalar(1 + 0.3 * grow);
			g.updateMatrixWorld();
		}

		fragments.forEach((f, i) => {
			const piece = pieces.current[i];
			if (!piece || !g) return;
			const ef = ease(clamp01(explode * 1.3 - f.delay));
			scratch.pos.copy(f.home).multiplyScalar(1 + 0.14 * grow).addScaledVector(f.dir, f.dist * ef);
			let angle = f.spin * ef;
			let scale = 1;
			if (f.anchor >= 0) {
				scratch.target.copy(ANCHORS[f.anchor]);
				g.worldToLocal(scratch.target);
				scratch.pos.lerp(scratch.target, anchorsMove);
				angle = angle * (1 - anchorsMove) + t * 0.5 * anchorsMove;
				scale = 1 - 0.35 * anchorsMove;
				piece.visible = fade < 1 || anchorsIn > 0;
			} else {
				piece.visible = fade < 1;
			}
			scratch.q.setFromAxisAngle(f.axis, angle);
			piece.position.copy(scratch.pos);
			piece.quaternion.copy(scratch.q);
			piece.scale.setScalar(scale);
		});

		materials.shell.opacity = 1 - fade;
		materials.edge.opacity = (0.6 + 0.4 * grow) * (1 - fade);
		const anchorVisibility = Math.max(1 - fade, anchorsIn);
		materials.anchor.opacity = anchorVisibility;
		materials.anchorEdge.opacity = (0.6 + 0.4 * Math.max(grow, anchorsIn)) * anchorVisibility;

		// Noyau d'énergie visible à travers les fissures, éteint par l'explosion
		const coreLevel = grow * (1 - range(P, T.core));
		materials.core.opacity = coreLevel * 0.9;
		if (core.current) core.current.scale.setScalar(0.25 + 0.55 * grow);
		if (coreLight.current) coreLight.current.intensity = 40 * coreLevel;

		// Cellule : cachée dans le cube, elle grandit en fil de fer puis se remplit
		const cell = cellGroup.current;
		if (cell) {
			cell.visible = P > T.fade[0];
			cell.scale.setScalar(0.35 + 0.65 * ease(range(P, T.cell)));
		}
		reveal.current = range(P, T.reveal);
		if (overlay.current) overlay.current.style.opacity = String(1 - range(P, T.hotspotsOut));

		// Caméra : face au cube, puis 3/4 sur la cellule, puis vue plongeante finale
		const c1 = ease(range(P, T.cam1));
		const c2 = ease(range(P, T.cam2));
		const distance = portrait ? 1.75 : 1;
		scratch.cam.copy(CAMERA.k0).lerp(CAMERA.k1, c1).lerp(CAMERA.k2, c2).multiplyScalar(distance);
		parallax.current.x = THREE.MathUtils.damp(parallax.current.x, state.pointer.x, 3, delta);
		parallax.current.y = THREE.MathUtils.damp(parallax.current.y, state.pointer.y, 3, delta);
		scratch.cam.x += parallax.current.x * 0.4;
		scratch.cam.y += parallax.current.y * 0.25;
		camera.position.copy(scratch.cam);
		scratch.look.copy(CAMERA.l0).lerp(CAMERA.l1, c1).lerp(CAMERA.l2, c2);
		camera.lookAt(scratch.look);
	});

	return (
		<>
			<group ref={cubeGroup}>
				{fragments.map((f, i) => (
					<group key={i} ref={(el) => { pieces.current[i] = el; }}>
						<mesh geometry={geometry} material={f.anchor >= 0 ? materials.anchor : materials.shell} />
						<lineSegments geometry={edges} material={f.anchor >= 0 ? materials.anchorEdge : materials.edge} />
					</group>
				))}
				<mesh ref={core} material={materials.core}>
					<icosahedronGeometry args={[1, 2]} />
				</mesh>
				<pointLight ref={coreLight} color="#00C7FF" intensity={0} distance={8} decay={2} />
			</group>
			<group ref={cellGroup} position={[0, -0.6, 0]} visible={false}>
				<Cell palette={PALETTES[theme]} labels={labels} overlay={overlay} reveal={reveal} />
			</group>
		</>
	);
}

export default function HeroCubeScene({
	progress,
	theme,
	labels,
	active,
}: {
	progress: MotionValue<number>;
	theme: "dark" | "light";
	labels: HeroSceneLabels;
	active: boolean;
}) {
	// Calque stable pour les étiquettes Html (voir hero-scene.tsx)
	const overlay = useRef<HTMLDivElement>(null);

	return (
		<div className="relative size-full">
			<Canvas
				frameloop={active ? "always" : "never"}
				dpr={[1, 1.75]}
				camera={{ position: [0, 0.3, 10], fov: 35 }}
				gl={{ antialias: true, alpha: true }}
				onCreated={({ gl }) => {
					gl.localClippingEnabled = true;
				}}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 8, 4]} intensity={1.6} />
				<directionalLight position={[-6, 4, -3]} intensity={0.4} />
				{/* Reflets studio générés sur place, sans fichier HDR à télécharger */}
				<Environment resolution={256} environmentIntensity={0.6}>
					<Lightformer intensity={2.5} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 4, 1]} />
					<Lightformer intensity={1.4} color="#00C7FF" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 1, 1]} />
					<Lightformer intensity={1} position={[6, 1, -2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
					<Lightformer form="ring" intensity={1.2} color="#00C7FF" position={[2, 2, 9]} scale={3} />
				</Environment>
				<CubeSequence progress={progress} theme={theme} labels={labels} overlay={overlay} />
			</Canvas>
			<div ref={overlay} className="pointer-events-none absolute inset-0 overflow-hidden" />
		</div>
	);
}
