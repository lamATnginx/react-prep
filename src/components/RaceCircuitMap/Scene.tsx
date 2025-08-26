import { OrbitControls } from "@react-three/drei";
import Figure from "./Figure";

export default function Scene() {
    return (
        <>
            <OrbitControls enableZoom={true} enablePan={true} />
            <ambientLight intensity={8} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Figure />  
        </>
    )
}