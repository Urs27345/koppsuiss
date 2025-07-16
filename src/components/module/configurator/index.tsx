"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

type Props = {
  hoveredRoom: string | undefined;
};

const Configurator: React.FC<Props> = ({ hoveredRoom }) => {
  const containerRef = useRef<any>();
  const cubeGroupsRef = useRef<any[]>([]);
  const hoveredCubeGroupRef = useRef<any>(null);
  const hoveredRoomRef = useRef<any>(null);

  const previousMovedGroupsRef = useRef<any[]>([]);
  const previousFloorRef = useRef<number>(0);
  const raycaster = new THREE.Raycaster();

  const getFloorFromName = (name: string) => {
    const match = name.match(/Mesh_(\d+)_\d+/);
    return match ? parseInt(match[1]) : -1;
  };

  const moveUpperFloorsUp = (referenceMesh: any) => {
    const refFloor = getFloorFromName(referenceMesh.name);
    if (refFloor === previousFloorRef.current || refFloor === -1) return;
    previousFloorRef.current = refFloor;

    previousMovedGroupsRef.current = [];
    cubeGroupsRef.current.forEach((group: any) => {
      const groupFloor = getFloorFromName(group.name);
      group.userData.originalY = group.position.y;
      previousMovedGroupsRef.current.push(group);

      if (groupFloor === refFloor) {
        group.userData.targetY = 0;
      } else if (groupFloor > refFloor) {
        group.userData.targetY = 0.01;
      } else {
        group.userData.targetY = 0;
      }
    });
  };

  const setCubeHighlight = (mesh: any, highlight: any) => {
    mesh.traverse((child: any) => {
      if (child.isMesh) {
        if (highlight) {
          child.material.color.copy(child.originalColor);
        } else {
          child.material.color.set("#FFFFFF");
        }
      }
    });
  };

  const resetFloorPositions = () => {
    previousMovedGroupsRef.current.forEach((group: any) => {
      if (group.userData.originalY !== undefined) {
        group.position.y = group.userData.originalY;
      }
    });
    previousMovedGroupsRef.current = [];
  };

  useEffect(() => {
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

        cubeGroupsRef.current.length = 0;
        model.children.forEach((child: any) => {
          if (child.isMesh || child.isGroup) {
            cubeGroupsRef.current.push(child);
          }
        });
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      },
    );

    const onMouseMove = (event: any) => {
      const rect = renderer.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubeGroupsRef.current, true);

      if (intersects.length > 0) {
        let mesh = intersects[0].object;
        while (mesh.parent && !cubeGroupsRef.current.includes(mesh)) {
          mesh = mesh.parent;
        }

        if (hoveredCubeGroupRef.current !== mesh) {
          if (hoveredCubeGroupRef.current) {
            setCubeHighlight(hoveredCubeGroupRef.current, false);
            resetFloorPositions();
          }
          setCubeHighlight(mesh, true);
          moveUpperFloorsUp(mesh);
          hoveredCubeGroupRef.current = mesh;
        }
      } else {
        if (hoveredCubeGroupRef.current) {
          setCubeHighlight(hoveredCubeGroupRef.current, false);
          // resetFloorPositions();
          hoveredCubeGroupRef.current = null;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      cubeGroupsRef.current.forEach((group: any) => {
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

      cubeGroupsRef.current.forEach((group: any) => {
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

  useEffect(() => {
    if (hoveredRoom) {
      const hoveredMeshName = `Mesh_${hoveredRoom.substring(0, 1)}_${hoveredRoom.slice(-1)}`;
      const hoveredMesh = cubeGroupsRef.current.find((group) => group.name === hoveredMeshName);
      moveUpperFloorsUp(hoveredMesh);

      if (hoveredRoomRef.current && hoveredRoomRef.current !== hoveredMesh) {
        setCubeHighlight(hoveredRoomRef.current, false);
      }

      setCubeHighlight(hoveredMesh, true);
      hoveredRoomRef.current = hoveredMesh;
    }
  }, [hoveredRoom]);

  return <div ref={containerRef} className="w-full tablet:w-[400px] h-[500px]" />;
};

export default Configurator;
