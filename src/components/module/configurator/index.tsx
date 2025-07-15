"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const Configurator = () => {
  const containerRef = useRef<any>();

  useEffect(() => {
    const cubeGroups: any = [];
    let hoveredCubeGroup: any = null;
    let previousMovedGroups: any = [];
    let previousFloor = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0.5, 0.5, 0.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
    controls.update();

    // Light
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // HDR Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader().load("/env.hdr", (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      scene.background = envMap;

      texture.dispose();
      pmremGenerator.dispose();
    });

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(
      "/house.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(13, 13, 13);
        model.position.set(-0.1, -0.35, 0);
        scene.add(model);

        const edgeMaterial = new THREE.LineBasicMaterial({ color: "#A9A9A9" });

        model.traverse((child: any) => {
          if (child.isMesh) {
            child.material = child.material.clone();
            child.originalColor = child.material.color.clone();
            child.material.color.set("#FFFFFF");
            child.material.map = null;
            child.material.needsUpdate = true;

            const edgeGeo = new THREE.EdgesGeometry(child.geometry);
            const edgeLines = new THREE.LineSegments(edgeGeo, edgeMaterial);
            edgeLines.position.copy(child.getWorldPosition(new THREE.Vector3()));
            edgeLines.quaternion.copy(child.getWorldQuaternion(new THREE.Quaternion()));
            edgeLines.scale.copy(child.getWorldScale(new THREE.Vector3()));

            child.userData.outline = edgeLines;

            scene.add(edgeLines);
          }
        });

        model.children.forEach((child: any) => {
          if (child.isMesh || child.isGroup) {
            cubeGroups.push(child);
          }
        });
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      },
    );

    const setCubeHighlight = (group: any, highlight: any) => {
      group.traverse((child: any) => {
        if (child.isMesh) {
          if (highlight) {
            child.material.color.copy(child.originalColor);
          } else {
            child.material.color.set("#FFFFFF");
          }
        }
      });
    };

    const getFloorFromName = (name: string) => {
      const match = name.match(/Mesh_(\d+)_\d+/);
      return match ? parseInt(match[1]) : -1;
    };

    const moveUpperFloorsUp = (referenceMesh: any) => {
      const refFloor = getFloorFromName(referenceMesh.name);
      if (refFloor === previousFloor || refFloor === -1) return;
      previousFloor = refFloor;

      previousMovedGroups = [];
      cubeGroups.forEach((group: any) => {
        const groupFloor = getFloorFromName(group.name);
        group.userData.originalY = group.position.y;
        previousMovedGroups.push(group);

        if (groupFloor === refFloor) {
          group.userData.targetY = 0;
        } else if (groupFloor > refFloor) {
          group.userData.targetY = 0.01;
        } else {
          group.userData.targetY = 0;
        }
      });
    };

    const resetFloorPositions = () => {
      previousMovedGroups.forEach((group: any) => {
        if (group.userData.originalY !== undefined) {
          group.position.y = group.userData.originalY;
        }
      });
      previousMovedGroups = [];
    };

    const onMouseMove = (event: any) => {
      const rect = renderer.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubeGroups, true);

      if (intersects.length > 0) {
        let mesh = intersects[0].object;
        while (mesh.parent && !cubeGroups.includes(mesh)) {
          mesh = mesh.parent;
        }

        if (hoveredCubeGroup !== mesh) {
          if (hoveredCubeGroup) {
            setCubeHighlight(hoveredCubeGroup, false);
            resetFloorPositions();
          }
          setCubeHighlight(mesh, true);
          moveUpperFloorsUp(mesh);
          hoveredCubeGroup = mesh;
        }
      } else {
        if (hoveredCubeGroup) {
          setCubeHighlight(hoveredCubeGroup, false);
          // resetFloorPositions();
          hoveredCubeGroup = null;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      cubeGroups.forEach((group: any) => {
        if (group.userData.targetY !== undefined) {
          const currentY = group.position.y;
          const targetY = group.userData.targetY;
          const delta = (targetY - currentY) * 0.15;

          if (Math.abs(targetY - currentY) > 0.0001) {
            group.position.y += delta;
          } else {
            group.position.y = targetY;
            delete group.userData.targetY;
          }
        }
      });

      cubeGroups.forEach((group: any) => {
        group.traverse((child: any) => {
          if (child.isMesh && child.userData.outline) {
            const outline = child.userData.outline;
            child.updateWorldMatrix(true, false);
            outline.position.copy(child.getWorldPosition(new THREE.Vector3()));
            outline.quaternion.copy(child.getWorldQuaternion(new THREE.Quaternion()));
            outline.scale.copy(child.getWorldScale(new THREE.Vector3()));
          }
        });
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "400px", height: "500px" }} />;
};

export default Configurator;
