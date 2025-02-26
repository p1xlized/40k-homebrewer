import { Suspense, useEffect, useRef, useState } from "react";

import { Environment, OrbitControls } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { ImageUpload } from "../components/ui/imgae-uplod";
import { supabase } from "../config/api";
import { useParams } from "@tanstack/react-router";
import { Button } from "react-aria-components";
import Scene from "../components/3d_elements/scene";
import { Canvas} from "@react-three/fiber";
import Boltgun from "../assets/guns/boltgun.png";
import Flamer from "../assets/guns/flamer.png";
import Meltagun from "../assets/guns/meltagun.png";
import PlasmaGun from "../assets/guns/plasmagun.png";
import StormBolter from "../assets/guns/stormbolter.png";

const MODELS = {
  sm1:
    "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/sm2.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvc20yLmdsYiIsImlhdCI6MTc0MDQ0MTM3MywiZXhwIjoyMDU1ODAxMzczfQ.qdjJrOQTwc6YmyrYQq-8aIrjYALKEivz7zKXOEcvzF8",
};

export default function Editor() {
  const params = useParams({ from: "/app/editor/$id" });
  const [fetchedColors, setFetchedColors] = useState(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); const { model } = useControls({
    model: { value: "sm1", options: Object.keys(MODELS) },
  });

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

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const { data, error } = await supabase
          .from("spacemarine")
          .select("*")
          .eq("chapter", params.id);
        if (error) throw error;
        if (data.length > 0) {
          setFetchedColors(data[0]);
        }
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };
    fetchModelData();
  }, [params.id]);

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
  
  const handleSave = async () => {
    try {
      // Wait for the next animation frame to ensure the scene is fully rendered
      await new Promise((resolve) => requestAnimationFrame(resolve));
      
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        console.error("Canvas not found!");
        return;
      }
      
      const imageData = canvas.toDataURL("image/png");
      
      const updateData = {
        preview: imageData,
        role: "Base",
        torso: colorConfig.torsoColor,
        helmet: colorConfig.helmetColor,
        shoulder: colorConfig.shoulderPadColor,
        legs: colorConfig.legsColor,
        waist: colorConfig.waistColor,
        hands: colorConfig.handsColor,
        knee: colorConfig.kneeColor,
        glove: colorConfig.gloveColor,
      };
      
      let response;
      if (fetchedColors) {
        response = await supabase.from("spacemarine").update(updateData).eq("chapter", params.id);
      } else {
        response = await supabase.from("spacemarine").insert([{ chapter: params.id, ...updateData }]);
      }
      
      if (response.error) throw response.error;
      console.log("Screenshot saved successfully!");
      alert("Colors saved successfully!");
    } catch (error) {
      console.error("Error saving screenshot:", error);
    }
  };
  
  return (
    <div className="grid auto-rows-min gap-4 h-full grid-cols-[50%_49%] p-4">
      <div id="canvas-container" className="min-h-[60vh] flex-1 rounded-xl bg-background flex justify-center items-center">
        <Canvas camera={{ position: [0, 25, 55], fov: 75 }} style={{ width: "100%", height: "100%" }}
          gl={{ preserveDrawingBuffer: true }}>
          <Suspense fallback={null}>
            <Scene url={MODELS[model]} colorConfig={colorConfig} />
            <OrbitControls />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>

      <div className="rounded-xl bg-background flex flex-col p-4">
        <div className="grid grid-cols-2 gap-2 mt-4">
          <ImageUpload />
          <div className="h-full w-full bg-muted/50 rounded-lg">
            <Leva fill />
          </div>
        </div>
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
