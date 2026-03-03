"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CRANE_BLUE = "#3498db";
const CRANE_WHITE = "#ffffff";
const BEACON_RED = "#ff3333";
const BEACON_GREEN = "#33ff66";
const MATERIAL_OPACITY = 0.25;
const STRUT_RADIUS = 0.015;

/* ========================================
   Strut — Single thin cylinder (truss member)
   ======================================== */

function Strut({
  start,
  end,
  radius = STRUT_RADIUS,
  color = CRANE_BLUE,
  opacity = MATERIAL_OPACITY,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  radius?: number;
  color?: string;
  opacity?: number;
}) {
  const { position, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    quat.setFromUnitVectors(up, dir.clone().normalize());
    return { position: mid, quaternion: quat, length: len };
  }, [start, end]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 4]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* ========================================
   TrussSection — Lattice box between two Y levels
   ======================================== */

function TrussSection({
  yBottom,
  yTop,
  width,
  color = CRANE_BLUE,
  opacity = MATERIAL_OPACITY,
}: {
  yBottom: number;
  yTop: number;
  width: number;
  color?: string;
  opacity?: number;
}) {
  const hw = width / 2;
  const struts = useMemo(() => {
    // 4 corner posts
    const corners: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(-hw, yBottom, -hw), new THREE.Vector3(-hw, yTop, -hw)],
      [new THREE.Vector3(hw, yBottom, -hw), new THREE.Vector3(hw, yTop, -hw)],
      [new THREE.Vector3(hw, yBottom, hw), new THREE.Vector3(hw, yTop, hw)],
      [new THREE.Vector3(-hw, yBottom, hw), new THREE.Vector3(-hw, yTop, hw)],
    ];

    // Top ring
    const topRing: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(-hw, yTop, -hw), new THREE.Vector3(hw, yTop, -hw)],
      [new THREE.Vector3(hw, yTop, -hw), new THREE.Vector3(hw, yTop, hw)],
      [new THREE.Vector3(hw, yTop, hw), new THREE.Vector3(-hw, yTop, hw)],
      [new THREE.Vector3(-hw, yTop, hw), new THREE.Vector3(-hw, yTop, -hw)],
    ];

    // Bottom ring
    const botRing: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(-hw, yBottom, -hw), new THREE.Vector3(hw, yBottom, -hw)],
      [new THREE.Vector3(hw, yBottom, -hw), new THREE.Vector3(hw, yBottom, hw)],
      [new THREE.Vector3(hw, yBottom, hw), new THREE.Vector3(-hw, yBottom, hw)],
      [new THREE.Vector3(-hw, yBottom, hw), new THREE.Vector3(-hw, yBottom, -hw)],
    ];

    // X-bracing on each face
    const bracing: [THREE.Vector3, THREE.Vector3][] = [
      // Front face
      [new THREE.Vector3(-hw, yBottom, -hw), new THREE.Vector3(hw, yTop, -hw)],
      [new THREE.Vector3(hw, yBottom, -hw), new THREE.Vector3(-hw, yTop, -hw)],
      // Back face
      [new THREE.Vector3(-hw, yBottom, hw), new THREE.Vector3(hw, yTop, hw)],
      [new THREE.Vector3(hw, yBottom, hw), new THREE.Vector3(-hw, yTop, hw)],
      // Left face
      [new THREE.Vector3(-hw, yBottom, -hw), new THREE.Vector3(-hw, yTop, hw)],
      [new THREE.Vector3(-hw, yBottom, hw), new THREE.Vector3(-hw, yTop, -hw)],
      // Right face
      [new THREE.Vector3(hw, yBottom, -hw), new THREE.Vector3(hw, yTop, hw)],
      [new THREE.Vector3(hw, yBottom, hw), new THREE.Vector3(hw, yTop, -hw)],
    ];

    return [...corners, ...topRing, ...botRing, ...bracing];
  }, [yBottom, yTop, hw]);

  return (
    <group>
      {struts.map((s, i) => (
        <Strut key={i} start={s[0]} end={s[1]} color={color} opacity={opacity} />
      ))}
    </group>
  );
}

/* ========================================
   JibTruss — Horizontal truss (flat lattice beam)
   ======================================== */

function JibTruss({
  length,
  height,
  width,
  color = CRANE_BLUE,
  opacity = MATERIAL_OPACITY,
}: {
  length: number;
  height: number;
  width: number;
  color?: string;
  opacity?: number;
}) {
  const hh = height / 2;
  const hw = width / 2;

  const struts = useMemo(() => {
    const segments = Math.max(Math.floor(length / 0.8), 3);
    const segLen = length / segments;
    const result: [THREE.Vector3, THREE.Vector3][] = [];

    // Bottom & top longitudinal rails + verticals + X-bracing per segment
    for (let i = 0; i <= segments; i++) {
      const x = i * segLen;

      // Cross-frame at each station (4 edges of rectangle)
      result.push(
        [new THREE.Vector3(x, -hh, -hw), new THREE.Vector3(x, -hh, hw)],
        [new THREE.Vector3(x, hh, -hw), new THREE.Vector3(x, hh, hw)],
        [new THREE.Vector3(x, -hh, -hw), new THREE.Vector3(x, hh, -hw)],
        [new THREE.Vector3(x, -hh, hw), new THREE.Vector3(x, hh, hw)],
      );

      if (i < segments) {
        const nx = (i + 1) * segLen;

        // Longitudinal rails (4 edges running along length)
        result.push(
          [new THREE.Vector3(x, -hh, -hw), new THREE.Vector3(nx, -hh, -hw)],
          [new THREE.Vector3(x, -hh, hw), new THREE.Vector3(nx, -hh, hw)],
          [new THREE.Vector3(x, hh, -hw), new THREE.Vector3(nx, hh, -hw)],
          [new THREE.Vector3(x, hh, hw), new THREE.Vector3(nx, hh, hw)],
        );

        // Diagonal bracing on top and bottom faces
        result.push(
          // Top face
          [new THREE.Vector3(x, hh, -hw), new THREE.Vector3(nx, hh, hw)],
          // Bottom face
          [new THREE.Vector3(x, -hh, hw), new THREE.Vector3(nx, -hh, -hw)],
          // Side faces
          [new THREE.Vector3(x, -hh, -hw), new THREE.Vector3(nx, hh, -hw)],
          [new THREE.Vector3(x, hh, hw), new THREE.Vector3(nx, -hh, hw)],
        );
      }
    }

    return result;
  }, [length, hh, hw]);

  return (
    <group>
      {struts.map((s, i) => (
        <Strut
          key={i}
          start={s[0]}
          end={s[1]}
          color={color}
          opacity={opacity}
          radius={STRUT_RADIUS * 0.7}
        />
      ))}
    </group>
  );
}

/* ========================================
   BeaconLight — Blinking red/green light
   ======================================== */

function BeaconLight({
  position,
  color = BEACON_RED,
  speed = 1,
}: {
  position: [number, number, number];
  color?: string;
  speed?: number;
}) {
  const ref = useRef<THREE.PointLight>(null);
  const spriteRef = useRef<THREE.Sprite>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    const pulse = (Math.sin(t * 3) + 1) * 0.5;
    if (ref.current) {
      ref.current.intensity = pulse * 0.4;
    }
    if (spriteRef.current) {
      spriteRef.current.material.opacity = 0.3 + pulse * 0.7;
      const s = 0.06 + pulse * 0.04;
      spriteRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      <pointLight ref={ref} color={color} intensity={0.3} distance={3} />
      <sprite ref={spriteRef}>
        <spriteMaterial color={color} transparent opacity={0.8} />
      </sprite>
    </group>
  );
}

/* ========================================
   TowerCrane — Full crane with truss structure
   ======================================== */

function TowerCrane({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  mastHeight = 8,
  jibLength = 6,
  counterJibLength = 2.5,
  rotationRange = 30,
  rotationSpeed = 0.15,
  rotationOffset = 0,
  color = CRANE_BLUE,
  opacity = MATERIAL_OPACITY,
}: {
  position?: [number, number, number];
  scale?: number;
  mastHeight?: number;
  jibLength?: number;
  counterJibLength?: number;
  rotationRange?: number;
  rotationSpeed?: number;
  rotationOffset?: number;
  color?: string;
  opacity?: number;
}) {
  const jibRef = useRef<THREE.Group>(null);
  const cableRef = useRef<THREE.Group>(null);
  const hookRef = useRef<THREE.Mesh>(null);

  const mastWidth = 0.35;
  const jibHeight = 0.25;
  const jibWidth = 0.2;
  const cableRestLength = mastHeight * 0.45;
  const rangeRad = THREE.MathUtils.degToRad(rotationRange);

  // Mast sections
  const mastSections = useMemo(() => {
    const count = Math.max(Math.floor(mastHeight / 1.5), 3);
    const segH = mastHeight / count;
    return Array.from({ length: count }, (_, i) => ({
      yBottom: i * segH,
      yTop: (i + 1) * segH,
    }));
  }, [mastHeight]);

  // Animate jib rotation & cable
  useFrame((state) => {
    const t = state.clock.elapsedTime * rotationSpeed + rotationOffset;
    if (jibRef.current) {
      jibRef.current.rotation.y = Math.sin(t) * rangeRad;
    }
    if (cableRef.current && hookRef.current) {
      const swing = Math.sin(t * 1.7) * 0.15;
      const cableLen = cableRestLength + swing;
      cableRef.current.scale.y = cableLen / cableRestLength;
      hookRef.current.position.y = -cableLen;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* === MAST (tower) === */}
      {mastSections.map((sec, i) => (
        <TrussSection
          key={`mast-${i}`}
          yBottom={sec.yBottom}
          yTop={sec.yTop}
          width={mastWidth}
          color={color}
          opacity={opacity}
        />
      ))}

      {/* === SLEWING UNIT (rotating part) === */}
      <group ref={jibRef} position={[0, mastHeight, 0]}>
        {/* Operator cabin */}
        <mesh position={[0.2, -0.15, 0]}>
          <boxGeometry args={[0.3, 0.25, 0.25]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.6} />
        </mesh>

        {/* === JIB (main arm) === */}
        <group position={[jibLength / 2 + 0.2, 0.1, 0]}>
          <JibTruss
            length={jibLength}
            height={jibHeight}
            width={jibWidth}
            color={color}
            opacity={opacity}
          />
        </group>

        {/* Jib tip trolley */}
        <mesh position={[jibLength + 0.2, 0, 0]}>
          <boxGeometry args={[0.1, 0.08, jibWidth]} />
          <meshBasicMaterial color={CRANE_WHITE} transparent opacity={opacity * 0.5} />
        </mesh>

        {/* === COUNTER-JIB === */}
        <group position={[-counterJibLength / 2 - 0.2, 0.1, 0]}>
          <JibTruss
            length={counterJibLength}
            height={jibHeight * 0.8}
            width={jibWidth * 0.8}
            color={color}
            opacity={opacity}
          />
        </group>

        {/* Counterweight blocks */}
        <mesh position={[-counterJibLength - 0.3, -0.05, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.25]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.8} />
        </mesh>

        {/* === CAT-HEAD (A-frame top struts) === */}
        <Strut
          start={new THREE.Vector3(0, 0.12, 0)}
          end={new THREE.Vector3(0, 0.7, 0)}
          color={color}
          opacity={opacity}
          radius={STRUT_RADIUS * 1.2}
        />
        {/* Pendant lines — jib side */}
        <Strut
          start={new THREE.Vector3(0, 0.7, 0)}
          end={new THREE.Vector3(jibLength * 0.7, 0.2, 0)}
          color={color}
          opacity={opacity * 0.7}
          radius={STRUT_RADIUS * 0.5}
        />
        <Strut
          start={new THREE.Vector3(0, 0.7, 0)}
          end={new THREE.Vector3(jibLength + 0.1, 0.15, 0)}
          color={color}
          opacity={opacity * 0.6}
          radius={STRUT_RADIUS * 0.5}
        />
        {/* Pendant lines — counter-jib side */}
        <Strut
          start={new THREE.Vector3(0, 0.7, 0)}
          end={new THREE.Vector3(-counterJibLength - 0.1, 0.15, 0)}
          color={color}
          opacity={opacity * 0.7}
          radius={STRUT_RADIUS * 0.5}
        />

        {/* === CABLE & HOOK === */}
        <group position={[jibLength + 0.2, 0, 0]}>
          <group ref={cableRef}>
            <mesh position={[0, -cableRestLength / 2, 0]}>
              <cylinderGeometry args={[0.008, 0.008, cableRestLength, 4]} />
              <meshBasicMaterial color={CRANE_WHITE} transparent opacity={opacity * 0.9} />
            </mesh>
          </group>
          <mesh ref={hookRef} position={[0, -cableRestLength, 0]}>
            <coneGeometry args={[0.04, 0.08, 6]} />
            <meshBasicMaterial color={CRANE_WHITE} transparent opacity={opacity} />
          </mesh>
        </group>

        {/* === BEACON LIGHTS === */}
        <BeaconLight position={[0, 0.75, 0]} color={BEACON_RED} speed={1} />
        <BeaconLight position={[jibLength + 0.2, 0.15, 0]} color={BEACON_RED} speed={1.2} />
        <BeaconLight position={[-counterJibLength - 0.3, 0.2, 0]} color={BEACON_RED} speed={0.9} />
      </group>

      {/* Mast top beacon */}
      <BeaconLight position={[0, mastHeight + 0.8, 0]} color={BEACON_RED} speed={1} />
      {/* Base green light */}
      <BeaconLight position={[0, 0.3, 0]} color={BEACON_GREEN} speed={0.5} />
    </group>
  );
}

/* ========================================
   Construction Particles — Dust/sparks
   ======================================== */

function ConstructionParticles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    const colBlue = new THREE.Color(CRANE_BLUE);
    const colWhite = new THREE.Color(CRANE_WHITE);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.003 + 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      const col = Math.random() < 0.6 ? colBlue : colWhite;
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }

    velocities.current = vel;
    return { positions: pos, colors: c };
  }, [count]);

  useFrame(() => {
    if (!mesh.current || !velocities.current) return;
    const posAttr = mesh.current.geometry.attributes.position;
    if (!posAttr) return;
    const posArr = posAttr.array as Float32Array;
    const vel = velocities.current;

    for (let i = 0; i < count; i++) {
      posArr[i * 3]! += vel[i * 3]!;
      posArr[i * 3 + 1]! += vel[i * 3 + 1]!;
      posArr[i * 3 + 2]! += vel[i * 3 + 2]!;

      if (posArr[i * 3 + 1]! > 12) {
        posArr[i * 3 + 1] = -10;
        posArr[i * 3] = (Math.random() - 0.5) * 30;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ========================================
   Blueprint Grid
   ======================================== */

function BlueprintGrid() {
  return (
    <group position={[0, -4.5, -5]} rotation={[-Math.PI * 0.05, 0, 0]}>
      <gridHelper
        args={[50, 50, CRANE_BLUE, CRANE_BLUE]}
        material-transparent
        material-opacity={0.04}
      />
      <gridHelper
        args={[50, 10, CRANE_BLUE, CRANE_BLUE]}
        material-transparent
        material-opacity={0.07}
      />
    </group>
  );
}

/* ========================================
   Camera parallax on mouse
   ======================================== */

function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    const { pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.6,
      0.015,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      pointer.y * 0.3 + 1,
      0.015,
    );
    camera.lookAt(0, 2, -3);
  });

  return null;
}

/* ========================================
   Main Scene
   ======================================== */

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />

        <CameraController />

        {/* Crane 1 — Main, right side, foreground */}
        <TowerCrane
          position={[3.5, -4.5, -2]}
          scale={0.6}
          mastHeight={10}
          jibLength={7}
          counterJibLength={3}
          rotationRange={25}
          rotationSpeed={0.12}
          rotationOffset={0}
          color={CRANE_BLUE}
          opacity={0.3}
        />

        {/* Crane 2 — Left, mid-depth */}
        <TowerCrane
          position={[-4, -4.5, -8]}
          scale={0.45}
          mastHeight={9}
          jibLength={6}
          counterJibLength={2.5}
          rotationRange={30}
          rotationSpeed={0.1}
          rotationOffset={2}
          color={CRANE_BLUE}
          opacity={0.2}
        />

        {/* Crane 3 — Far right, background */}
        <TowerCrane
          position={[8, -4.5, -14]}
          scale={0.35}
          mastHeight={11}
          jibLength={7.5}
          counterJibLength={3}
          rotationRange={20}
          rotationSpeed={0.08}
          rotationOffset={4}
          color={CRANE_WHITE}
          opacity={0.12}
        />

        {/* Crane 4 — Far left, deep background */}
        <TowerCrane
          position={[-8, -4.5, -18]}
          scale={0.25}
          mastHeight={12}
          jibLength={8}
          counterJibLength={3.5}
          rotationRange={35}
          rotationSpeed={0.07}
          rotationOffset={1.5}
          color={CRANE_WHITE}
          opacity={0.08}
        />

        {/* Particles — construction dust */}
        <ConstructionParticles count={180} />

        {/* Blueprint grid floor */}
        <BlueprintGrid />
      </Canvas>
    </div>
  );
}
