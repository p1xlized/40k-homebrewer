import { Suspense, useDeferredValue } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { ImageUpload } from "../components/ui/imgae-uplod";
import Boltgun from "../assets/guns/boltgun.png";
import Flamer from "../assets/guns/flamer.png";
import Meltagun from "../assets/guns/meltagun.png"
import PlasmaGun from "../assets/guns/plasmagun.png"
import StormBolter from "../assets/guns/stormbolter.png"

const MODELS = {
  sm1: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/sm1.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvc20xLmdsYiIsImlhdCI6MTczOTkzMzE2OSwiZXhwIjoxODk3NjEzMTY5fQ.3mnEolq2QLtKUsdRV2p0hIxS9XVb73zhyDsI-rh2MUE"
}
const Scene = ({ url }) => {
  const deferredUrl = useDeferredValue(url);
  const { scene } = useGLTF(deferredUrl);
  const { color } = useControls("Model", { color: "#a78888" });

  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set(color);
    }
  });

  return <primitive object={scene} position={[0, -20, 10]} />;
};

export default function Editor() {
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
              fill // default = false,  true makes the pane fill the parent dom node it's rendered in
    
              oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
          
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
