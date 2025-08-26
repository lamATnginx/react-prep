import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function RaceTrack() {
    return (
        <Canvas camera={{ position: [0, 0, 20] }}>
          <Scene />
        </Canvas>
    )
}