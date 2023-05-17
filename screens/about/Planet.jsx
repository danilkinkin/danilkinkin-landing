import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import styles from "./Planet.module.css";
import { Fragment } from "react";
import { useSpring } from '@react-spring/three'
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib";
import useIsDarkMode from "@/utils/useIsDarkMode";

function Earth() {
  const { nodes, materials } = useGLTF("/earth-transformed.glb");
  const isDarkMode = useIsDarkMode();
  const ref = useRef(null);
  const [rotationSpeedSpring, rotationSpeedApi] = useSpring(() => ({
      value: 10,
      config: {
        mass: 3,
        friction: 200,
        tension: 600,
      },
  }), []);
  const [scaleSpring, scaleApi] = useSpring(() => ({
    value: 0,
    config: {
      mass: 1,
      friction: 16,
      tension: 160,
    },
}), []);

  useEffect(() => {
    ref.current.rotation.y = 8.6;

    RectAreaLightUniformsLib.init();

    setTimeout(() => {
      rotationSpeedApi.start({ value: 0.4 });
      scaleApi.start({ value: 1.4 });
    }, 8200);
  }, []);

  useFrame((_, delta) => {
    const rotationSpeed = rotationSpeedSpring.value.get();
    const scale = scaleSpring.value.get();

    ref.current.rotation.y += delta * rotationSpeed;
    ref.current.scale.setScalar(scale);
  });

  const ambientColor = isDarkMode ? "#8299ba" : "#FFF6F3";
  const lightColor = isDarkMode ? "#8c8c8c" : "#FFFFFF";

  return (
    <Fragment>
      <ambientLight color={ambientColor} intensity={0.5} />
      <spotLight color={lightColor} position={[0, 20, 0]} lookAt={[0, 0, 0]} intensity={1.3} decay={2} distance={40} penumbra={1} angle={Math.PI/2} />
      <spotLight color={lightColor} position={[10, 16, 0]} lookAt={[0, 0, 0]} intensity={1.3} decay={2} distance={40} penumbra={1} angle={Math.PI/2} />
      <spotLight color={lightColor} position={[-10, 16, 0]} lookAt={[0, 0, 0]} intensity={1.3} decay={2} distance={40} penumbra={1} angle={Math.PI/2} />
      <spotLight color={lightColor} position={[0, 16, 10]} lookAt={[0, 0, 0]} intensity={1.3} decay={2} distance={40} penumbra={1} angle={Math.PI/2} />
      <group ref={ref} dispose={null}>
        <mesh
          geometry={nodes.Icosphere.geometry}
          material={materials.water}
          rotation={[-3.11, 0.84, 3.12]}
        />
        <mesh
          geometry={nodes.Icosphere004.geometry}
          material={materials.ground}
          rotation={[-3.11, 0.84, 3.12]}
          scale={0.98}
        />
      </group>
    </Fragment>
  );
}

function Planet() {

  return (
    <span className={styles.root}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }} dpr={window.devicePixelRatio}>
          <Earth />
        </Canvas>
      </div>
    </span>
  );
}

// useGLTF.preload("earth-transformed.glb");

function Waiter() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    });
  }, []);

  if (process.browser && show) return <Planet />;

  return null;
}

export default Waiter;
