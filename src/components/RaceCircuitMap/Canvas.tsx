import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function RaceTrack() {
    return (
      <div className="flex w-screen justify-center items-center">
        <div className="w-full h-full relative">
          <Canvas camera={{ position: [0, -225, 200] }}>
            <Scene />
          </Canvas>
        </div>
      </div>
    )
}