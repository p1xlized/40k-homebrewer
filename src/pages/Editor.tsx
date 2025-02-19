import { Suspense, useDeferredValue } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { ImageUpload } from "../components/ui/imgae-uplod";
const MODELS = {
  Beech: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/tech-marine/tech-marine.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvdGVjaC1tYXJpbmUvdGVjaC1tYXJpbmUuZ2xiIiwiaWF0IjoxNzM4NTYxMzYwLCJleHAiOjE4NjQ3MDUzNjB9.mGlnXDSTpzO9T8Pgen8EJKoQPWJSdOU7AzLEX0BxsIM",
  Lime: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/ImageToStl.com_mk5%20apothocary%20.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvSW1hZ2VUb1N0bC5jb21fbWs1IGFwb3Rob2NhcnkgLmdsYiIsImlhdCI6MTczODU2Mjk5MCwiZXhwIjoxNzcwMDk4OTkwfQ.Lx7dO5MqDKpHbaNEL_66JeUz8taRFUu7O1FdnyyZoJw",
  Spruce: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf",
};

const Scene = ({ url }) => {
  const deferredUrl = useDeferredValue(url);
  const { scene } = useGLTF(deferredUrl);
  const { color } = useControls("Model", { color: "#ff0000" });

  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set(color);
    }
  });

  return <primitive object={scene} position={[0, -10, 7]} />;
};

export default function Editor() {
  const { model } = useControls({ model: { value: "Beech", options: Object.keys(MODELS) } });

  return (

    <div className="grid auto-rows-min gap-4 h-full grid-cols-[50%_49%] p-4">

      {/* Left (50%) - 3D Model Viewer */}
      <div className="min-h-[60vh] flex-1 rounded-xl bg-background flex justify-center items-center">
        <Canvas camera={{ position: [0, 75, 5], fov: 75 }} style={{ width: "100%", height: "100%" }}>
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
          <div className="h-full w-full bg-muted/50" />
        </div>

        {/* Gun Selection (Bottom) */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">Gun 1</div>
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">Gun 2</div>
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">Gun 3</div>
          <div className="w-full aspect-square rounded-lg bg-muted hover:bg-muted/80">Gun 4</div>
        </div>
      </div>



    </div>
  );
}
