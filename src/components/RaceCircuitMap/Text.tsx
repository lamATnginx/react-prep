import type { Vector3 } from "@/types/RaceCircuitType";
import { type Font, TextGeometry } from "three/examples/jsm/Addons.js"

interface Props {
    text: string
    font: Font,
    size?: number;
    width: number,
    length: number,
    height: number,
    color: string,
    rotation: Vector3
}

export default function Text({ text, font, size = 7.5, width, length, height, color, rotation }: Props) {
    return (
        <mesh position={[width, length, height]} rotation={rotation}>
            <primitive
                    object={
                        new TextGeometry(
                            text, {
                                font: font,
                                size: size,
                                depth: 1,
                                curveSegments: 5,
                        })
                    }
                />
            <meshPhongMaterial color={color} />
        </mesh>
    )
}