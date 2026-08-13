"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CabinetConfig } from "../../types/cabinet";
import { Camera, Eye, RotateCcw, DoorClosed, DoorOpen } from "lucide-react";

interface CabinetViewerProps {
  config: CabinetConfig;
  onToggleDoorOpen: () => void;
}

export const CabinetViewer: React.FC<CabinetViewerProps> = ({ config, onToggleDoorOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cabinetGroupRef = useRef<THREE.Group | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Initialize Three.js Scene, Camera, Renderer, Lighting
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F8FAFC");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(1.4, 1.1, 1.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 0.5;
    controls.maxDistance = 4.0;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight("#FFFFFF", 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight("#FFFFFF", 1.8);
    dirLight1.position.set(3, 4, 3);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 2048;
    dirLight1.shadow.mapSize.height = 2048;
    dirLight1.shadow.bias = -0.0001;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight("#E2E8F0", 0.8);
    dirLight2.position.set(-3, 2, -2);
    scene.add(dirLight2);

    // Floor Shadow & Grid
    const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.3601;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const grid = new THREE.GridHelper(4, 20, "#CBD5E1", "#E2E8F0");
    grid.position.y = -0.3602;
    scene.add(grid);

    // Cabinet Container Group
    const cabinetGroup = new THREE.Group();
    scene.add(cabinetGroup);
    cabinetGroupRef.current = cabinetGroup;

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mounted]);

  // 2. Re-build 3D Parametric Cabinet Geometry when Config Changes
  useEffect(() => {
    if (!cabinetGroupRef.current) return;
    const group = cabinetGroupRef.current;

    // Clear previous geometries
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
    }

    const { dimensions, doors, finishes, hardware } = config;

    const W = dimensions.width / 1000; // Width in meters
    const H = dimensions.height / 1000; // 0.72 m
    const D = dimensions.depth / 1000; // 0.56 m
    const T = dimensions.panelThickness / 1000; // 0.018 m
    const BT = dimensions.backThickness / 1000; // 0.008 m
    const GAP = dimensions.doorGap / 1000; // 0.002 m

    const innerW = W - 2 * T;

    // Materials
    const carcassMat = new THREE.MeshStandardMaterial({
      color: finishes.carcass.colorHex,
      roughness: finishes.carcass.type === "lacquer" ? 0.3 : 0.65,
      metalness: 0.05,
    });

    const frontMat = new THREE.MeshStandardMaterial({
      color: finishes.front.colorHex,
      roughness: finishes.front.type === "lacquer" ? 0.25 : 0.5,
      metalness: 0.05,
    });

    const backMat = new THREE.MeshStandardMaterial({
      color: finishes.carcass.colorHex,
      roughness: 0.8,
      metalness: 0.0,
    });

    const hingeMat = new THREE.MeshStandardMaterial({
      color: "#B8BAC0",
      metalness: 0.85,
      roughness: 0.25,
    });

    const handleMat = new THREE.MeshStandardMaterial({
      color: "#D8DCE0",
      metalness: 0.9,
      roughness: 0.2,
    });

    const rootGroup = new THREE.Group();
    rootGroup.position.set(-W / 2, -H / 2, -D / 2);

    // 1. Left Side Panel
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(T, H, D), carcassMat);
    sideL.position.set(T / 2, H / 2, D / 2);
    sideL.castShadow = true;
    sideL.receiveShadow = true;
    rootGroup.add(sideL);

    // 2. Right Side Panel
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(T, H, D), carcassMat);
    sideR.position.set(W - T / 2, H / 2, D / 2);
    sideR.castShadow = true;
    sideR.receiveShadow = true;
    rootGroup.add(sideR);

    // 3. Bottom Panel
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(innerW, T, D), carcassMat);
    bottom.position.set(W / 2, T / 2, D / 2);
    bottom.castShadow = true;
    bottom.receiveShadow = true;
    rootGroup.add(bottom);

    // 4. Front Top Rail
    const topRailF = new THREE.Mesh(new THREE.BoxGeometry(innerW, T, 0.1), carcassMat);
    topRailF.position.set(W / 2, H - T / 2, 0.05);
    topRailF.castShadow = true;
    topRailF.receiveShadow = true;
    rootGroup.add(topRailF);

    // 5. Rear Top Rail
    const topRailR = new THREE.Mesh(new THREE.BoxGeometry(innerW, 0.1, T), carcassMat);
    topRailR.position.set(W / 2, H - 0.05, D - 0.02);
    topRailR.castShadow = true;
    topRailR.receiveShadow = true;
    rootGroup.add(topRailR);

    // 6. Back Panel
    const backPanel = new THREE.Mesh(new THREE.BoxGeometry(W - 0.016, H - 0.016, BT), backMat);
    backPanel.position.set(W / 2, H / 2, D - 0.015);
    backPanel.castShadow = true;
    backPanel.receiveShadow = true;
    rootGroup.add(backPanel);

    // 7. Doors & DTC 110° Hinges
    const doorCount = doors.count;
    const doorW = doorCount === 1 ? W - 2 * GAP : W / 2 - 1.5 * GAP;
    const doorH = H - 2 * GAP;
    const doorT = T;
    const isOpen = doors.isOpen;

    const buildDoorGroup = (hingeSide: "L" | "R", pivotX: number) => {
      const doorGroup = new THREE.Group();
      doorGroup.position.set(pivotX, H / 2, 0);

      const isLeft = hingeSide === "L";
      const rotY = isOpen ? (isLeft ? -1.65 : 1.65) : 0;
      doorGroup.rotation.y = rotY;

      // Door Panel
      const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, doorT), frontMat);
      doorMesh.position.set(isLeft ? doorW / 2 : -doorW / 2, 0, -doorT / 2);
      doorMesh.castShadow = true;
      doorMesh.receiveShadow = true;
      doorGroup.add(doorMesh);

      // 3 DTC 110° Concealed Hinges
      const hingeHeights = [-H / 2 + 0.1, 0, H / 2 - 0.1];
      hingeHeights.forEach((hz) => {
        const hGroup = new THREE.Group();
        hGroup.position.set(0, hz, 0);

        // Cup
        const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.0175, 0.0175, 0.0115, 24), hingeMat);
        cup.rotation.x = Math.PI / 2;
        cup.position.set(isLeft ? 0.0225 : -0.0225, 0, -0.005);
        hGroup.add(cup);

        // Hinge Arm
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.015, 0.025), hingeMat);
        arm.position.set(isLeft ? 0.035 : -0.035, 0, 0.015);
        hGroup.add(arm);

        // Base Plate
        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.045, 0.006), hingeMat);
        plate.position.set(isLeft ? 0.015 : -0.015, 0, 0.032);
        hGroup.add(plate);

        doorGroup.add(hGroup);
      });

      // Handle
      if (hardware.handle.id === "BAR01") {
        const handleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.14, 0.025), handleMat);
        handleMesh.position.set(isLeft ? doorW - 0.04 : -doorW + 0.04, 0, -doorT - 0.015);
        handleMesh.castShadow = true;
        doorGroup.add(handleMesh);
      }

      return doorGroup;
    };

    if (doorCount === 1) {
      const isLeft = doors.hingeSide === "L";
      const pivotX = isLeft ? GAP : W - GAP;
      rootGroup.add(buildDoorGroup(isLeft ? "L" : "R", pivotX));
    } else {
      rootGroup.add(buildDoorGroup("L", GAP));
      rootGroup.add(buildDoorGroup("R", W - GAP));
    }

    group.add(rootGroup);
  }, [config]);

  // Camera Presets
  const setPerspectiveView = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(1.4, 1.1, 1.8);
    controlsRef.current.target.set(0, 0, 0);
  };

  const setFrontView = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 0, 2.2);
    controlsRef.current.target.set(0, 0, 0);
  };

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating Toolbar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200/80 pointer-events-auto">
          <button
            onClick={setPerspectiveView}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-red-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Vista Perspectiva"
          >
            <Camera className="w-4 h-4 text-red-600" />
            <span>Perspectiva</span>
          </button>
          <button
            onClick={setFrontView}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-red-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Vista Frontal"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Frontal</span>
          </button>
          <button
            onClick={setPerspectiveView}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reiniciar Cámara"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Door Toggle Button */}
        <div className="pointer-events-auto">
          <button
            onClick={onToggleDoorOpen}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl shadow-lg transition-all transform active:scale-95 ${
              config.doors.isOpen
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {config.doors.isOpen ? (
              <>
                <DoorOpen className="w-4 h-4 text-red-200" />
                <span>Cerrar Puertas</span>
              </>
            ) : (
              <>
                <DoorClosed className="w-4 h-4 text-slate-300" />
                <span>Abrir Puertas (Bisagras DTC)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
