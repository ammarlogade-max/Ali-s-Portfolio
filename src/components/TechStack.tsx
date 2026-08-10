import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const mobile =
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  (window.innerWidth <= 1024 && "ontouchstart" in window);

type TechToolDef = {
  label: string;
  bg: string;
  accent?: string;
  icon: string;
};

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawExcel(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#185C37";
  roundedRect(ctx, 70, 58, 116, 126, 14);
  ctx.fill();
  ctx.fillStyle = "#21A366";
  roundedRect(ctx, 108, 72, 82, 98, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 4;
  for (let x = 128; x <= 168; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 78);
    ctx.lineTo(x, 166);
    ctx.stroke();
  }
  for (let y = 98; y <= 146; y += 24) {
    ctx.beginPath();
    ctx.moveTo(112, y);
    ctx.lineTo(186, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#ffffff";
  ctx.font = '900 64px "Segoe UI", Arial, sans-serif';
  ctx.fillText("X", 88, 134);
}

function drawPowerBi(ctx: CanvasRenderingContext2D) {
  const bars = [
    [76, 128, 25, 48, "#F2C811"],
    [112, 102, 25, 74, "#F9D95C"],
    [148, 76, 25, 100, "#D7A300"],
  ];
  bars.forEach(([x, y, w, h, c]) => {
    ctx.fillStyle = c as string;
    roundedRect(ctx, x as number, y as number, w as number, h as number, 9);
    ctx.fill();
  });
}

function drawPostgresql(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(126, 110, 56, 48, -0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#336791";
  ctx.beginPath();
  ctx.ellipse(111, 106, 10, 15, 0, 0, Math.PI * 2);
  ctx.ellipse(144, 106, 10, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 15;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(142, 142);
  ctx.quadraticCurveTo(150, 178, 105, 176);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(78, 102);
  ctx.quadraticCurveTo(50, 92, 68, 72);
  ctx.quadraticCurveTo(91, 74, 92, 103);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(177, 102);
  ctx.quadraticCurveTo(206, 92, 188, 72);
  ctx.quadraticCurveTo(164, 74, 163, 103);
  ctx.fill();
}

function drawTableau(ctx: CanvasRenderingContext2D) {
  const colors = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"];
  const points = [
    [128, 80],
    [96, 112],
    [160, 112],
    [112, 152],
    [144, 152],
  ];
  points.forEach(([x, y], i) => {
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(x - 16, y);
    ctx.lineTo(x + 16, y);
    ctx.moveTo(x, y - 16);
    ctx.lineTo(x, y + 16);
    ctx.stroke();
  });
}

function drawPython(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#3776AB";
  roundedRect(ctx, 72, 62, 76, 72, 20);
  ctx.fill();
  ctx.fillStyle = "#FFD43B";
  roundedRect(ctx, 108, 114, 76, 72, 20);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(111, 83, 5, 0, Math.PI * 2);
  ctx.arc(146, 165, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawPandas(ctx: CanvasRenderingContext2D) {
  const bars = [
    [88, 74, 18, 96, "#ffffff"],
    [116, 54, 18, 136, "#E70488"],
    [144, 74, 18, 96, "#ffffff"],
    [172, 54, 18, 136, "#FFCA00"],
  ];
  bars.forEach(([x, y, w, h, c]) => {
    ctx.fillStyle = c as string;
    roundedRect(ctx, x as number, y as number, w as number, h as number, 6);
    ctx.fill();
  });
}

function drawNumpy(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#4DABCF";
  ctx.beginPath();
  ctx.moveTo(128, 54);
  ctx.lineTo(184, 88);
  ctx.lineTo(128, 122);
  ctx.lineTo(72, 88);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#013243";
  ctx.beginPath();
  ctx.moveTo(72, 94);
  ctx.lineTo(124, 126);
  ctx.lineTo(124, 192);
  ctx.lineTo(72, 160);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#7CC6E2";
  ctx.beginPath();
  ctx.moveTo(184, 94);
  ctx.lineTo(132, 126);
  ctx.lineTo(132, 192);
  ctx.lineTo(184, 160);
  ctx.closePath();
  ctx.fill();
}

function drawChart(ctx: CanvasRenderingContext2D, color: string) {
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(72, 174);
  ctx.lineTo(72, 68);
  ctx.moveTo(70, 174);
  ctx.lineTo(190, 174);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = 12;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(82, 150);
  ctx.lineTo(110, 126);
  ctx.lineTo(132, 138);
  ctx.lineTo(166, 88);
  ctx.lineTo(188, 108);
  ctx.stroke();
}

function drawSeaborn(ctx: CanvasRenderingContext2D) {
  ["#A1C9F4", "#8DE5A1", "#FF9F9B"].forEach((color, i) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    for (let x = 62; x <= 194; x += 4) {
      const y = 100 + i * 28 + Math.sin((x + i * 22) / 15) * 15;
      if (x === 62) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
}

function drawScikit(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#3499CD";
  ctx.beginPath();
  ctx.arc(106, 116, 36, 0, Math.PI * 2);
  ctx.arc(154, 116, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#F7931E";
  ctx.beginPath();
  ctx.moveTo(128, 58);
  ctx.lineTo(156, 166);
  ctx.lineTo(100, 166);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = '900 44px "Segoe UI", Arial, sans-serif';
  ctx.fillText("sk", 128, 129);
}

function drawNetwork(ctx: CanvasRenderingContext2D, color: string) {
  const nodes = [
    [88, 82],
    [154, 76],
    [116, 128],
    [174, 150],
    [78, 168],
  ];
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 5;
  [[0, 2], [1, 2], [2, 3], [2, 4], [0, 4], [1, 3]].forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });
  nodes.forEach(([x, y]) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();
  });
}

function drawIcon(ctx: CanvasRenderingContext2D, icon: string) {
  if (icon === "excel") drawExcel(ctx);
  if (icon === "powerbi") drawPowerBi(ctx);
  if (icon === "postgresql") drawPostgresql(ctx);
  if (icon === "tableau") drawTableau(ctx);
  if (icon === "python") drawPython(ctx);
  if (icon === "pandas") drawPandas(ctx);
  if (icon === "numpy") drawNumpy(ctx);
  if (icon === "matplotlib") drawChart(ctx, "#E24A33");
  if (icon === "seaborn") drawSeaborn(ctx);
  if (icon === "scikit") drawScikit(ctx);
  if (icon === "ml") drawNetwork(ctx, "#86EFAC");
  if (icon === "ai") drawNetwork(ctx, "#DDD6FE");
}

function createTechTexture(tool: TechToolDef): THREE.CanvasTexture {
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = tool.bg;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  drawIcon(ctx, tool.icon);
  ctx.restore();

  ctx.fillStyle = tool.accent ?? "#ffffff";
  ctx.font = '800 24px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(tool.label, s / 2, 224);

  return new THREE.CanvasTexture(canvas);
}

const techToolDefs: TechToolDef[] = [
  { label: "Excel", bg: "#217346", icon: "excel" },
  { label: "Power BI", bg: "#201A00", icon: "powerbi", accent: "#F2C811" },
  { label: "PostgreSQL", bg: "#336791", icon: "postgresql" },
  { label: "Tableau", bg: "#ffffff", icon: "tableau", accent: "#1f2937" },
  { label: "Python", bg: "#111827", icon: "python", accent: "#FFD43B" },
  { label: "Pandas", bg: "#150458", icon: "pandas" },
  { label: "NumPy", bg: "#102230", icon: "numpy", accent: "#7CC6E2" },
  { label: "Matplotlib", bg: "#11557C", icon: "matplotlib" },
  { label: "Seaborn", bg: "#1E3A5F", icon: "seaborn" },
  { label: "Scikit Learn", bg: "#ffffff", icon: "scikit", accent: "#252525" },
  { label: "ML", bg: "#16A34A", icon: "ml" },
  { label: "AI", bg: "#7C3AED", icon: "ai" },
];

const allTextures = techToolDefs.map((t) => createTechTexture(t));

const sphereGeometry = new THREE.SphereGeometry(
  1,
  mobile ? 14 : 20,
  mobile ? 14 : 20
);

const BALL_COUNT = techToolDefs.length;

const textureAssignment = (() => {
  const arr = Array.from({ length: BALL_COUNT }, (_, i) => i % allTextures.length);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
})();

const spheres = [...Array(BALL_COUNT)].map((_, i) => ({
  scale: [0.7, 1, 0.8, 1, 0.9][Math.floor(Math.random() * 5)],
  texIdx: textureAssignment[i],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

const _impulseVec = new THREE.Vector3();

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const t = api.current!.translation();
    vec.set(t.x, t.y, t.z).normalize();
    _impulseVec.set(
      vec.x * -50 * delta * scale,
      vec.y * -150 * delta * scale,
      vec.z * -50 * delta * scale
    );
    api.current?.applyImpulse(_impulseVec, true);
    state.invalidate();
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow={!mobile}
        receiveShadow={!mobile}
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

const _pointerTarget = new THREE.Vector3();

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame((state) => {
    if (!isActive) return;
    const { pointer, viewport } = state;
    _pointerTarget.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    vec.lerp(_pointerTarget, 0.2);
    ref.current?.setNextKinematicTranslation(vec);
    state.invalidate();
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [enableAO, setEnableAO] = useState(false);

  useEffect(() => {
    const workEl = document.getElementById("work");
    let ticking = false;
    const handleScroll = () => {
      if (!ticking && workEl) {
        ticking = true;
        requestAnimationFrame(() => {
          const threshold = workEl.getBoundingClientRect().top;
          setIsActive(
            (window.scrollY || document.documentElement.scrollTop) > threshold
          );
          ticking = false;
        });
      }
    };
    const onNavClick = () => {
      let count = 0;
      const id = setInterval(() => {
        handleScroll();
        if (++count >= 50) clearInterval(id);
      }, 20);
    };
    document.querySelectorAll(".header a").forEach((el) => {
      (el as HTMLAnchorElement).addEventListener("click", onNavClick);
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.querySelectorAll(".header a").forEach((el) => {
        (el as HTMLAnchorElement).removeEventListener("click", onNavClick);
      });
    };
  }, []);

  const materials = useMemo(() => {
    return allTextures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  useEffect(() => {
    if (mobile) return;
    const cores = (navigator as any).hardwareConcurrency ?? 4;
    const dpr = window.devicePixelRatio ?? 1;
    setEnableAO(cores >= 6 && dpr <= 2);
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows={!mobile}
        frameloop="demand"
        dpr={mobile ? [1, 1] : [1, 1.5]}
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{
          position: [0, 0, 20],
          fov: mobile ? 40 : 32.5,
          near: 1,
          far: 100,
        }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow={!mobile}
          shadow-mapSize={mobile ? [128, 128] : [256, 256]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.texIdx]}
              isActive={isActive}
            />
          ))}
        </Physics>
        {!mobile && (
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
        )}
        {enableAO && (
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#001a14" aoRadius={2} intensity={1.0} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default TechStack;
