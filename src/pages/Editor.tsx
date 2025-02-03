import { Suspense, useDeferredValue } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { useControls } from "leva";
import { EditorSidebar } from "../components/editor-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

const MODELS = {
  Beech: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/tech-marine/tech-marine.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvdGVjaC1tYXJpbmUvdGVjaC1tYXJpbmUuZ2xiIiwiaWF0IjoxNzM4NTYxMzYwLCJleHAiOjE4NjQ3MDUzNjB9.mGlnXDSTpzO9T8Pgen8EJKoQPWJSdOU7AzLEX0BxsIM",
  Lime: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/sign/models/ImageToStl.com_mk5%20apothocary%20.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvSW1hZ2VUb1N0bC5jb21fbWs1IGFwb3Rob2NhcnkgLmdsYiIsImlhdCI6MTczODU2Mjk5MCwiZXhwIjoxNzcwMDk4OTkwfQ.Lx7dO5MqDKpHbaNEL_66JeUz8taRFUu7O1FdnyyZoJw",
  Spruce: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf",
};

const Scene = ({ url }) => {
  const deferredUrl = useDeferredValue(url);
  const { scene } = useGLTF(deferredUrl);
  return <primitive object={scene} position={[0, 0.25, 0]} />;
};

export default function Editor() {
  const { model } = useControls({ model: { value: "Beech", options: Object.keys(MODELS) } });

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>3D Model Viewer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex justify-center items-center">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: "100%", height: "100%" }}>
              <Suspense fallback={null}>
                <Scene url={MODELS[model]} />
                <OrbitControls />
                <Environment preset="sunset" />
              </Suspense>
              <ContactShadows scale={20} blur={10} far={20} />
            </Canvas>
          </div>
        </div>
      </SidebarInset>
      <EditorSidebar side="right" />
    </SidebarProvider>
  );
}
