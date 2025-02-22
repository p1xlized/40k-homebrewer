import { Suspense, useDeferredValue, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { ImageUpload } from "../components/ui/imgae-uplod";
import Boltgun from "../assets/guns/boltgun.png";
import Flamer from "../assets/guns/flamer.png";
import Meltagun from "../assets/guns/meltagun.png"
import PlasmaGun from "../assets/guns/plasmagun.png"
import StormBolter from "../assets/guns/stormbolter.png"

const Scene = ({ url }) => {
  const deferredUrl = useDeferredValue(url);
  const { scene } = useGLTF(deferredUrl);

  // Set up individual color controls via Leva
  const { torsoColor, helmetColor, shoulderPadColor, legsColor, waistColor, handsColor, kneeColor, gloveColor} = useControls("Model Colors", {
    torsoColor: "#ff0000",
    helmetColor: "#00ff00",
    shoulderPadColor: "#0000ff",
    legsColor: "#ffff00",
    waistColor: "#ffff00",
    handsColor: "#ffff00",
    kneeColor: "#ffff00",
    gloveColor: "#ffff00",
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Clone the material for independent updates
        child.material = child.material.clone();
        const name = child.name.toLowerCase();
  
        if (name.includes("legs") || name.includes("thigh") || name.includes("foot") || name.includes("shin")) {
          child.material.color.set(legsColor);
        } else if (name.includes("torso")) {
          child.material.color.set(torsoColor);
        } else if (name.includes("helmet")) {
          child.material.color.set(helmetColor);
        } else if (name.includes("shoulder") || name.includes("shoulderpad")) {
          // This groups both "shoulder" and "shoulder_pad" together
          child.material.color.set(shoulderPadColor);
        } else if (name.includes("hip") || name.includes("waist")) {
          // Group hips and waist together with legsColor
          child.material.color.set(waistColor);
        } else if (
          name.includes("forearms") || name.includes("forearm") || name.includes("elbow") 
        ) {
          child.material.color.set(handsColor);
        } else if (name.includes("knee")) {
          // Group arms together with torsoColor
          child.material.color.set(kneeColor);
        }else if (name.includes("hand")) {
          child.material.color.set(gloveColor);
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene, torsoColor, helmetColor, shoulderPadColor, legsColor, waistColor, handsColor]);
  
  return <primitive object={scene} position={[0, -20, 10]} />;
};

export default function Editor() {
  const MODELS = {
    sm1: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/sm2.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvc20yLmdsYiIsImlhdCI6MTc0MDI2OTI0NywiZXhwIjoxODk3OTQ5MjQ3fQ.5w56ClhrG9-4y3jH8bLT4YeDayvmLcTH8RU0aejV93E",
  };
  const { model } = useControls({ model: { value: "sm1", options: Object.keys(MODELS) } });
  return (

    <div className="grid auto-rows-min gap-4 h-full grid-cols-[50%_49%] p-4">

      {/* Left (50%) - 3D Model Viewer */}
      <div className="min-h-[60vh] flex-1 rounded-xl bg-background flex justify-center items-center">
        <Canvas camera={{ position: [0, 25,55], fov: 75 }} style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={null}>
            <Scene url={MODELS[model]} />
            <OrbitControls />
            <Environment preset="sunset" />
          </Suspense>
          {/* <ContactShadows scale={20} blur={10} far={20} /> */}
        </Canvas>
      </div>

      {/* Middle (25%) - Extra Content */}
      <div className="rounded-xl bg-background flex flex-col p-4">
        {/* Image Upload Section */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <ImageUpload />
          <div className="h-full w-full bg-muted/50 rounded-lg">
            <Leva
              fill 
    
              
          
            />
          </div>
        </div>

        {/* Gun Selection (Bottom) */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">
            <img src={Boltgun} alt="Logo" className="h-22 w-22 rounded-full" />
          </div>
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">
            <img src={Flamer} alt="Logo" className="h-22 w-22 rounded-full" />
          </div>
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">
            <img src={Meltagun} alt="Logo" className="h-22 w-22 rounded-full" />
          </div>
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">
            <img src={PlasmaGun} alt="Logo" className="h-22 w-22 rounded-full" />
          </div>
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">
            <img src={StormBolter} alt="Logo" className="h-22 w-22 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}