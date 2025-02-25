import { Suspense, useDeferredValue, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { ImageUpload } from "../components/ui/imgae-uplod";
import Boltgun from "../assets/guns/boltgun.png";
import Flamer from "../assets/guns/flamer.png";
import Meltagun from "../assets/guns/meltagun.png";
import PlasmaGun from "../assets/guns/plasmagun.png";
import StormBolter from "../assets/guns/stormbolter.png";
import { supabase } from "../config/api";
import { useParams } from "@tanstack/react-router";
import { Button } from "react-aria-components";

// Scene Component: Use the passed-in colorConfig (with a fallback)
const Scene = ({ url, colorConfig }) => {
  const deferredUrl = useDeferredValue(url);
  const { scene } = useGLTF(deferredUrl);

  // Fallback in case colorConfig is undefined
  const safeColors = colorConfig || {
    torsoColor: "#ff0000",
    helmetColor: "#00ff00",
    shoulderPadColor: "#0000ff",
    legsColor: "#ffff00",
    waistColor: "#ffff00",
    handsColor: "#ffff00",
    kneeColor: "#ffff00",
    gloveColor: "#ffff00",
  };

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Clone the material for independent updates
        child.material = child.material.clone();
        const name = child.name.toLowerCase();

        if (
          name.includes("legs") ||
          name.includes("thigh") ||
          name.includes("foot") ||
          name.includes("shin")
        ) {
          child.material.color.set(safeColors.legsColor);
        } else if (name.includes("torso")) {
          child.material.color.set(safeColors.torsoColor);
        } else if (name.includes("helmet")) {
          child.material.color.set(safeColors.helmetColor);
        } else if (
          name.includes("shoulder") ||
          name.includes("shoulderpad")
        ) {
          child.material.color.set(safeColors.shoulderPadColor);
        } else if (name.includes("hip") || name.includes("waist")) {
          child.material.color.set(safeColors.waistColor);
        } else if (
          name.includes("forearm") ||
          name.includes("elbow") ||
          name.includes("forearms")
        ) {
          child.material.color.set(safeColors.handsColor);
        } else if (name.includes("knee")) {
          child.material.color.set(safeColors.kneeColor);
        } else if (name.includes("hand")) {
          child.material.color.set(safeColors.gloveColor);
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene, safeColors]);

  return <primitive object={scene} position={[0, -20, 10]} />;
};

// Main Editor Component
export default function Editor() {
  const params = useParams({ from: "/app/editor/$id" });
  const [fetchedColors, setFetchedColors] = useState(null);

  const MODELS = {
    sm1:
      "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/sm2.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvc20yLmdsYiIsImlhdCI6MTc0MDQ0MTM3MywiZXhwIjoyMDU1ODAxMzczfQ.qdjJrOQTwc6YmyrYQq-8aIrjYALKEivz7zKXOEcvzF8",
  };

  // Model selection control
  const { model } = useControls({
    model: { value: "sm1", options: Object.keys(MODELS) },
  });

  // Unified color controls: One Leva instance for "Model Colors"
  const [colorConfig, setColorConfig] = useControls("Model Colors", () => ({
    torsoColor: "#ff0000",
    helmetColor: "#00ff00",
    shoulderPadColor: "#0000ff",
    legsColor: "#ffff00",
    waistColor: "#ffff00",
    handsColor: "#ffff00",
    kneeColor: "#ffff00",
    gloveColor: "#ffff00",
  }));

  // Fetch saved model data from Supabase
  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const { data, error } = await supabase
          .from("spacemarine")
          .select("*")
          .eq("chapter", params.id);
        if (error) throw error;
        if (data && data.length > 0) {
          setFetchedColors(data[0]);
        }
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };

    fetchModelData();
  }, [params.id]);

  // Update Leva controls when fetchedColors is available
  useEffect(() => {
    if (fetchedColors) {
      setColorConfig({
        torsoColor: fetchedColors.torso || "#ff0000",
        helmetColor: fetchedColors.helmet || "#00ff00",
        shoulderPadColor: fetchedColors.shoulder || "#0000ff",
        legsColor: fetchedColors.legs || "#ffff00",
        waistColor: fetchedColors.waist || "#ffff00",
        handsColor: fetchedColors.hands || "#ffff00",
        kneeColor: fetchedColors.knee || "#ffff00",
        gloveColor: fetchedColors.glove || "#ffff00",
      });
    }
  }, [fetchedColors, setColorConfig]);

  // Save or update character data in Supabase
  const handleSave = async () => {
    try {
      let response;
      if (fetchedColors) {
        response = await supabase
          .from("spacemarine")
          .update({
            role: "Base",
            torso: colorConfig.torsoColor,
            helmet: colorConfig.helmetColor,
            shoulder: colorConfig.shoulderPadColor,
            legs: colorConfig.legsColor,
            waist: colorConfig.waistColor,
            hands: colorConfig.handsColor,
            knee: colorConfig.kneeColor,
            glove: colorConfig.gloveColor,
          })
          .eq("chapter", params.id);
      } else {
        response = await supabase.from("spacemarine").insert([
          {
            chapter: params.id,
            role: "Base",
            torso: colorConfig.torsoColor,
            helmet: colorConfig.helmetColor,
            shoulder: colorConfig.shoulderPadColor,
            legs: colorConfig.legsColor,
            waist: colorConfig.waistColor,
            hands: colorConfig.handsColor,
            knee: colorConfig.kneeColor,
            glove: colorConfig.gloveColor,
          },
        ]);
      }
      if (response.error) throw response.error;
      console.log("Character saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving character:", error);
    }
  };

  return (
    <div className="grid auto-rows-min gap-4 h-full grid-cols-[50%_49%] p-4">
      {/* 3D Model Viewer */}
      <div className="min-h-[60vh] flex-1 rounded-xl bg-background flex justify-center items-center">
        <Canvas
          camera={{ position: [0, 25, 55], fov: 75 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Scene url={MODELS[model]} colorConfig={colorConfig} />
            <OrbitControls />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>

      {/* Controls & Extras */}
      <div className="rounded-xl bg-background flex flex-col p-4">
        {/* Image Upload & Leva Panel */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <ImageUpload />
          <div className="h-full w-full bg-muted/50 rounded-lg">
            <Leva fill />
          </div>
        </div>

        {/* Gun Selection */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {[Boltgun, Flamer, Meltagun, PlasmaGun, StormBolter].map(
            (gun, index) => (
              <div
                key={index}
                className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80"
              >
                <img
                  src={gun}
                  alt={`Gun ${index}`}
                  className="h-22 w-22 rounded-full"
                />
              </div>
            )
          )}
        </div>
      </div>

      <Button className="w-full mt-4" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
