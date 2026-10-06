"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Cellule robotisée générée en code : elle apparaît d'abord en fil de fer (le plan),
// puis les volumes se remplissent de bas en haut derrière une ligne de scan (le jumeau).

export type Palette = {
	metal: string;
	dark: string;
	light: string;
	floor: string;
	edge: string;
	edgeRest: number;
	gridCell: string;
	gridSection: string;
};

export const PALETTES: Record<"dark" | "light", Palette> = {
	dark: {
		metal: "#7d8894",
		dark: "#3f4650",
		light: "#c6cdd5",
		floor: "#1c2127",
		edge: "#00C7FF",
		edgeRest: 0.45,
		gridCell: "#1d3540",
		gridSection: "#0b6680",
	},
	light: {
		metal: "#b6bec8",
		dark: "#717a86",
		light: "#e4e8ec",
		floor: "#e8ecf0",
		edge: "#0094c2",
		edgeRest: 0.45,
		gridCell: "#cdd8df",
		gridSection: "#86c6da",
	},
};

const SCAN_START = -0.1;
const SCAN_END = 2.9;
const SCAN_DELAY = 0.6;
const SCAN_DURATION = 2.6;

type MaterialKey = "metal" | "dark" | "light" | "floor";
type Materials = Record<MaterialKey, THREE.MeshStandardMaterial> & {
	edge: THREE.LineBasicMaterial;
};

const MaterialsContext = createContext<Materials | null>(null);

function useMaterials() {
	const materials = useContext(MaterialsContext);
	if (!materials) throw new Error("useMaterials outside of MaterialsContext");
	return materials;
}

type PartProps = {
	position?: [number, number, number];
	rotation?: [number, number, number];
	material?: MaterialKey;
};

function Part({
	geometry,
	position,
	rotation,
	material = "metal",
}: PartProps & { geometry: THREE.BufferGeometry }) {
	const materials = useMaterials();
	const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 25), [geometry]);
	useEffect(() => () => edges.dispose(), [edges]);

	return (
		<group position={position} rotation={rotation}>
			<mesh geometry={geometry} material={materials[material]} />
			<lineSegments geometry={edges} material={materials.edge} />
		</group>
	);
}

function Box({ size, ...props }: PartProps & { size: [number, number, number] }) {
	const [w, h, d] = size;
	const geometry = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d]);
	useEffect(() => () => geometry.dispose(), [geometry]);
	return <Part geometry={geometry} {...props} />;
}

function Cylinder({
	radius,
	height,
	segments = 28,
	...props
}: PartProps & { radius: number; height: number; segments?: number }) {
	const geometry = useMemo(
		() => new THREE.CylinderGeometry(radius, radius, height, segments),
		[radius, height, segments]
	);
	useEffect(() => () => geometry.dispose(), [geometry]);
	return <Part geometry={geometry} {...props} />;
}

const AXIS_Z: [number, number, number] = [Math.PI / 2, 0, 0];

function RobotArm() {
	const turret = useRef<THREE.Group>(null);
	const shoulder = useRef<THREE.Group>(null);
	const elbow = useRef<THREE.Group>(null);
	const wrist = useRef<THREE.Group>(null);

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime();
		if (!turret.current || !shoulder.current || !elbow.current || !wrist.current) return;
		const s = -0.75 + Math.sin(t * 0.9) * 0.18;
		const e = -1.0 + Math.sin(t * 0.9 + 1.2) * 0.25;
		turret.current.rotation.y = -Math.PI / 2 + Math.sin(t * 0.45) * 0.6;
		shoulder.current.rotation.z = s;
		elbow.current.rotation.z = e;
		// le poignet compense pour garder la pince orientée vers le convoyeur
		wrist.current.rotation.z = -Math.PI + 0.35 - s - e;
	});

	return (
		<group position={[0, 0, -0.35]}>
			<Cylinder radius={0.55} height={0.18} position={[0, 0.09, 0]} material="dark" />
			<group ref={turret} position={[0, 0.18, 0]}>
				<Cylinder radius={0.4} height={0.34} position={[0, 0.17, 0]} />
				<group ref={shoulder} position={[0, 0.5, 0]}>
					<Cylinder radius={0.2} height={0.5} rotation={AXIS_Z} material="dark" />
					<Box size={[0.24, 1.3, 0.24]} position={[0, 0.65, 0]} />
					<group ref={elbow} position={[0, 1.3, 0]}>
						<Cylinder radius={0.15} height={0.4} rotation={AXIS_Z} material="dark" />
						<Box size={[0.18, 1.0, 0.18]} position={[0, 0.5, 0]} />
						<group ref={wrist} position={[0, 1.0, 0]}>
							<Cylinder radius={0.1} height={0.3} rotation={AXIS_Z} material="dark" />
							<Box size={[0.26, 0.08, 0.16]} position={[0, 0.12, 0]} material="light" />
							<Box size={[0.05, 0.2, 0.12]} position={[-0.09, 0.25, 0]} material="light" />
							<Box size={[0.05, 0.2, 0.12]} position={[0.09, 0.25, 0]} material="light" />
						</group>
					</group>
				</group>
			</group>
		</group>
	);
}

const CONVEYOR_Z = 1.35;
const CONVEYOR_LENGTH = 5.2;
const BOX_COUNT = 3;
const BOX_SPEED = 0.35;

function Conveyor() {
	const boxes = useRef<(THREE.Group | null)[]>([]);

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime();
		boxes.current.forEach((box, i) => {
			if (!box) return;
			const travel = CONVEYOR_LENGTH - 0.6;
			const x = ((t * BOX_SPEED + (i * travel) / BOX_COUNT) % travel) - travel / 2;
			box.position.x = x;
		});
	});

	const legs: [number, number][] = [];
	for (const x of [-2.3, -0.8, 0.8, 2.3]) for (const z of [-0.33, 0.33]) legs.push([x, z]);

	return (
		<group position={[0, 0, CONVEYOR_Z]}>
			{legs.map(([x, z]) => (
				<Box key={`${x}-${z}`} size={[0.06, 0.48, 0.06]} position={[x, 0.24, z]} material="dark" />
			))}
			<Box size={[CONVEYOR_LENGTH, 0.12, 0.06]} position={[0, 0.5, -0.36]} />
			<Box size={[CONVEYOR_LENGTH, 0.12, 0.06]} position={[0, 0.5, 0.36]} />
			<Box size={[CONVEYOR_LENGTH, 0.04, 0.66]} position={[0, 0.52, 0]} material="dark" />
			<Cylinder radius={0.08} height={0.66} rotation={AXIS_Z} position={[-CONVEYOR_LENGTH / 2, 0.5, 0]} />
			<Cylinder radius={0.08} height={0.66} rotation={AXIS_Z} position={[CONVEYOR_LENGTH / 2, 0.5, 0]} />
			{Array.from({ length: BOX_COUNT }, (_, i) => (
				<group key={i} ref={(el) => { boxes.current[i] = el; }}>
					<Box size={[0.42, 0.3, 0.42]} position={[0, 0.69, 0]} material="light" />
				</group>
			))}
		</group>
	);
}

function SafetyFence() {
	const posts: [number, number][] = [];
	for (let x = -2.4; x <= 2.41; x += 1.2) posts.push([x, -1.7]);
	for (const x of [-2.4, 2.4]) for (const z of [-0.6, 0.5]) posts.push([x, z]);

	return (
		<group>
			{posts.map(([x, z]) => (
				<Box key={`${x}-${z}`} size={[0.06, 1.5, 0.06]} position={[x, 0.75, z]} material="dark" />
			))}
			{[0.7, 1.45].map((y) => (
				<group key={y}>
					<Box size={[4.8, 0.04, 0.04]} position={[0, y, -1.7]} />
					<Box size={[0.04, 0.04, 2.2]} position={[-2.4, y, -0.6]} />
					<Box size={[0.04, 0.04, 2.2]} position={[2.4, y, -0.6]} />
				</group>
			))}
		</group>
	);
}

function ControlCabinet() {
	return (
		<group position={[-1.75, 0, -1.05]}>
			<Box size={[0.7, 1.35, 0.42]} position={[0, 0.675, 0]} material="dark" />
			<Box size={[0.42, 0.26, 0.02]} position={[0, 1.0, 0.22]} material="light" />
			<Cylinder radius={0.06} height={0.04} rotation={AXIS_Z} position={[0, 0.65, 0.22]} material="light" />
		</group>
	);
}

function DangerZone({ opacity }: { opacity: React.RefObject<number> }) {
	const material = useRef<THREE.MeshBasicMaterial>(null);
	const edge = useMaterials().edge;

	useFrame(() => {
		if (material.current) material.current.opacity = opacity.current * 0.7;
	});

	return (
		<mesh position={[0, 0.012, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
			<ringGeometry args={[1.82, 1.87, 96]} />
			<meshBasicMaterial ref={material} color={edge.color} transparent opacity={0} />
		</mesh>
	);
}

function Hotspot({
	position,
	label,
	visible,
	delay,
	portal,
}: {
	position: [number, number, number];
	label: string;
	visible: boolean;
	delay: number;
	portal: React.RefObject<HTMLDivElement | null>;
}) {
	return (
		<Html
			position={position}
			center
			portal={portal as React.RefObject<HTMLElement>}
			zIndexRange={[20, 0]}
			style={{ pointerEvents: "none" }}
		>
			<div
				className="flex items-center gap-2 whitespace-nowrap transition-all duration-700"
				style={{
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(6px)",
					transitionDelay: `${delay}ms`,
				}}
			>
				<span className="relative flex size-3">
					<span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-60" />
					<span className="relative inline-flex size-3 rounded-full border-2 border-background bg-secondary" />
				</span>
				<span className="rounded border border-secondary/40 bg-background/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm">
					{label}
				</span>
			</div>
		</Html>
	);
}

// Avancement du scan : minuté au montage, ou piloté de l'extérieur (le scroll) via `reveal`
function Scan({
	clipPlane,
	scanPlane,
	materials,
	palette,
	group,
	reveal,
	onRevealChange,
}: {
	clipPlane: THREE.Plane;
	scanPlane: React.RefObject<THREE.Mesh | null>;
	materials: Materials;
	palette: Palette;
	group: React.RefObject<THREE.Group | null>;
	reveal?: React.RefObject<number>;
	onRevealChange: (revealed: boolean) => void;
}) {
	const start = useRef<number | null>(null);
	const revealed = useRef(false);
	const localPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);

	useFrame(({ clock }) => {
		if (!reveal && revealed.current) return;
		let raw: number;
		if (reveal) {
			raw = reveal.current;
		} else {
			const now = clock.getElapsedTime();
			if (start.current === null) start.current = now;
			raw = (now - start.current - SCAN_DELAY) / SCAN_DURATION;
		}
		const p = Math.min(Math.max(raw, 0), 1);
		const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
		const height = SCAN_START + (SCAN_END - SCAN_START) * eased;

		// le plan de coupe vit dans le repère monde : on y reporte la hauteur locale,
		// pour que le scan suive la cellule même mise à l'échelle ou déplacée
		localPlane.constant = p >= 1 ? 100 : height;
		clipPlane.copy(localPlane);
		if (group.current) clipPlane.applyMatrix4(group.current.matrixWorld);

		materials.edge.opacity = 1 - (1 - palette.edgeRest) * eased;
		if (scanPlane.current) {
			scanPlane.current.position.y = height;
			const mat = scanPlane.current.material as THREE.MeshBasicMaterial;
			mat.opacity = raw <= 0 ? 0 : 0.18 * (1 - eased);
		}

		const isRevealed = p >= 1;
		if (isRevealed !== revealed.current) {
			revealed.current = isRevealed;
			onRevealChange(isRevealed);
		}
	});

	return null;
}

export function Cell({
	palette,
	labels,
	overlay,
	reveal,
}: {
	palette: Palette;
	labels: HeroSceneLabels;
	overlay: React.RefObject<HTMLDivElement | null>;
	reveal?: React.RefObject<number>;
}) {
	const group = useRef<THREE.Group>(null);
	const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), SCAN_START), []);
	const scanPlane = useRef<THREE.Mesh>(null);
	const zoneOpacity = useRef(0);
	const [revealed, setRevealed] = useState(false);

	const materials = useMemo<Materials>(() => {
		const solid = (color: string, metalness: number, roughness: number) =>
			new THREE.MeshStandardMaterial({ color, metalness, roughness, clippingPlanes: [clipPlane] });
		return {
			metal: solid(palette.metal, 0.55, 0.45),
			dark: solid(palette.dark, 0.4, 0.6),
			light: solid(palette.light, 0.15, 0.7),
			floor: solid(palette.floor, 0.1, 0.9),
			edge: new THREE.LineBasicMaterial({ color: palette.edge, transparent: true, opacity: 1 }),
		};
		// la palette est appliquée par l'effet ci-dessous, sans recréer les matériaux
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clipPlane]);

	useEffect(() => {
		materials.metal.color.set(palette.metal);
		materials.dark.color.set(palette.dark);
		materials.light.color.set(palette.light);
		materials.floor.color.set(palette.floor);
		materials.edge.color.set(palette.edge);
		if (revealed) materials.edge.opacity = palette.edgeRest;
	}, [materials, palette, revealed]);

	useEffect(
		() => () => Object.values(materials).forEach((material) => material.dispose()),
		[materials]
	);

	useFrame((_, delta) => {
		if (revealed && zoneOpacity.current < 1) {
			zoneOpacity.current = Math.min(1, zoneOpacity.current + delta * 1.5);
		}
	});

	return (
		<MaterialsContext.Provider value={materials}>
			<Scan
				clipPlane={clipPlane}
				scanPlane={scanPlane}
				materials={materials}
				palette={palette}
				group={group}
				reveal={reveal}
				onRevealChange={setRevealed}
			/>
			<group ref={group}>
				<Grid
					position={[0, -0.05, 0]}
					infiniteGrid
					cellSize={0.3}
					cellThickness={0.6}
					cellColor={palette.gridCell}
					sectionSize={1.5}
					sectionThickness={1}
					sectionColor={palette.gridSection}
					fadeDistance={16}
					fadeStrength={1.5}
				/>
				<Box size={[5.8, 0.04, 4.2]} position={[0, -0.02, -0.2]} material="floor" />
				<RobotArm />
				<Conveyor />
				<SafetyFence />
				<ControlCabinet />
				<DangerZone opacity={zoneOpacity} />
				<mesh ref={scanPlane} rotation={[-Math.PI / 2, 0, 0]} position={[0, SCAN_START, -0.2]}>
					<planeGeometry args={[6.4, 4.8]} />
					<meshBasicMaterial
						color={palette.edge}
						transparent
						opacity={0}
						side={THREE.DoubleSide}
						depthWrite={false}
					/>
				</mesh>
				<Hotspot position={[1.5, 0.05, -1.4]} label={labels.danger} visible={revealed} delay={0} portal={overlay} />
				<Hotspot position={[-1.75, 1.55, -1.05]} label={labels.emergency} visible={revealed} delay={250} portal={overlay} />
				<Hotspot position={[2.1, 1.0, CONVEYOR_Z]} label={labels.quality} visible={revealed} delay={500} portal={overlay} />
			</group>
		</MaterialsContext.Provider>
	);
}

export type HeroSceneLabels = {
	danger: string;
	emergency: string;
	quality: string;
};

export default function HeroScene({
	theme,
	labels,
	active,
}: {
	theme: "dark" | "light";
	labels: HeroSceneLabels;
	active: boolean;
}) {
	const palette = PALETTES[theme];
	// Les étiquettes Html sont montées dans ce calque stable : sans lui, drei les rattache
	// aux événements du Canvas, qui se reconnectent à chaque re-rendu (thème, pause au
	// scroll) et démontent les racines React en plein rendu.
	const overlay = useRef<HTMLDivElement>(null);

	return (
		<div className="relative size-full">
			<Canvas
				frameloop={active ? "always" : "never"}
				dpr={[1, 2]}
				camera={{ position: [4.5, 3.1, 5.0], fov: 34 }}
				gl={{ antialias: true, alpha: true }}
				onCreated={({ gl }) => {
					gl.localClippingEnabled = true;
				}}
			>
				<ambientLight intensity={0.7} />
				<hemisphereLight args={["#ffffff", "#30363d", 0.6]} />
				<directionalLight position={[5, 8, 4]} intensity={2} />
				<directionalLight position={[-6, 4, -3]} intensity={0.5} />
				<Cell palette={palette} labels={labels} overlay={overlay} />
				<OrbitControls
					target={[0, 0.6, 0]}
					enableZoom={false}
					enablePan={false}
					autoRotate
					autoRotateSpeed={0.6}
					minPolarAngle={0.55}
					maxPolarAngle={1.35}
					enableDamping
				/>
			</Canvas>
			<div ref={overlay} className="pointer-events-none absolute inset-0 overflow-hidden" />
		</div>
	);
}
