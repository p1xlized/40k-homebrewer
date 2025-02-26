import { useDeferredValue, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const Scene = ({ url, colorConfig }) => {
  const deferredUrl = useDeferredValue(url);
  const { scene } = useGLTF(deferredUrl);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        const name = child.name.toLowerCase();

        const colorMapping = {
          legs: colorConfig.legsColor,
          thigh: colorConfig.legsColor,
          foot: colorConfig.legsColor,
          shin: colorConfig.legsColor,
          torso: colorConfig.torsoColor,
          helmet: colorConfig.helmetColor,
          shoulder: colorConfig.shoulderPadColor,
          shoulderpad: colorConfig.shoulderPadColor,
          hip: colorConfig.waistColor,
          waist: colorConfig.waistColor,
          forearm: colorConfig.handsColor,
          elbow: colorConfig.handsColor,
          forearms: colorConfig.handsColor,
          knee: colorConfig.kneeColor,
          hand: colorConfig.gloveColor,
        };

        Object.entries(colorMapping).forEach(([key, color]) => {
          if (name.includes(key)) {
            child.material.color.set(color);
          }
        });

        child.material.needsUpdate = true;
      }
    });
  }, [scene, colorConfig]);

  return <primitive object={scene} position={[0, -20, 10]} />;
};

export default Scene;
