import { animated, useSpring } from "@react-spring/three";

import { convertToRadians } from "@/util/util";
import { useState } from "react";
import type { Rotation3 } from "@/types/RaceCircuitType";

interface Props {
    data: string[],
    onTireClick?: (title: string) => void; 
    onXClick?: () => void;
}

export default function Tires({ data, onTireClick, onXClick }: Props) {
    const arcSpread = convertToRadians(50);
    const radius = -25;
    const xDisplacement = 50; // Shift the buttons left (positive)
    const yDisplacement = 10; // Shift the buttons down (positive)
    const shapeDepth = 2;
    const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined);

    const handleTireClick = (title: string, index: number) => {
        if(onTireClick) onTireClick(title);
        setCurrentIndex(index);
    }
    
    const handleXClicked = () => {
        if(onXClick) onXClick()
    }
    
    return (
        <>
            {
                data.map((title, index) => {
                    const individualArcAngle = -arcSpread / 2 + (arcSpread / (2 - 1)) * index;
                    const x = radius * Math.cos(individualArcAngle);
                    const y = radius * Math.sin(individualArcAngle);

                    const { rotation } = useSpring({
                        rotation: currentIndex === index ? [convertToRadians(90), 0, convertToRadians(360)] as Rotation3 : [convertToRadians(90), 0, 0] as Rotation3,
                        config: { mass: 1, tension: 280, friction: 40, duration: 1000 },
                        loop: true,
                        onRest: () => setCurrentIndex(undefined),
                    });

                    return (
                        <animated.group
                            key={`feat_seating-button-${index}`}
                            position={[x - xDisplacement, y - yDisplacement, 0]}
                            rotation={rotation as never as Rotation3}
                            onClick={() => handleTireClick(title, index)}
                        >
                            {/* Tire */}
                            <mesh>
                                <cylinderGeometry args={[5, 5, shapeDepth, 32]} />
                                <meshStandardMaterial color={"black"} roughness={0.2} metalness={0.3} />
                            </mesh>

                            {/* Rim */}
                            <mesh>
                                <torusGeometry args={[0.1, 3, 16, 32]} />
                                <meshStandardMaterial color={"white"} roughness={0.8} metalness={0.9} />
                            </mesh>
                        </animated.group>
                    )
                })
            }

            {/* "X" mark to close */}
            <group position={[-55, -15, 0]} onClick={handleXClicked}>
                <mesh rotation={[0, 0, convertToRadians(45)]}>
                    <boxGeometry args={[12, shapeDepth, shapeDepth]} />
                    <meshStandardMaterial color={"red"} />
                </mesh>
                <mesh rotation={[0, 0, convertToRadians(-45)]}>
                    <boxGeometry args={[12, shapeDepth, shapeDepth]} />
                    <meshStandardMaterial color={"red"} />
                </mesh>
            </group>
        </>
    )
}