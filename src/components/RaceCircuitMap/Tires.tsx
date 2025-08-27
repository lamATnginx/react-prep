import { animated, useSpring } from "@react-spring/three";

import { convertToRadians } from "@/util/util";
import { useState } from "react";
import type { Rotation3 } from "@/types/RaceCircuitType";

interface Props {
    data: string[],
    onCircleClick?: (title: string) => void; 
    onXClick?: () => void;
}

export default function Tires({ data, onCircleClick, onXClick }: Props) {
    const arcSpread = convertToRadians(50);
    const radius = -25;
    const xDisplacement = 50; // Shift the buttons left (positive)
    const yDisplacement = 10; // Shift the buttons down (positive)
    const shapeDepth = 2;
    const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined);

    const handleCircleClick = (title: string, index: number) => {
        if(onCircleClick) onCircleClick(title);
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
                        rotation: currentIndex === index ? [convertToRadians(90), 0, convertToRadians(0)] as Rotation3 : [convertToRadians(90), 0, 0] as Rotation3,
                        config: { mass: 1, tension: 280, friction: 40, duration: 2000 },
                        loop: true,
                        onRest: () => setCurrentIndex(undefined),
                    });

                    return <animated.mesh key={`feat_seating-button-${index}`} position={[x - xDisplacement, y - yDisplacement, 0]} rotation={rotation as never as Rotation3} onClick={() => handleCircleClick(title, index)}>
                        <cylinderGeometry args={[5, 5, shapeDepth, 32]} />
                        <meshStandardMaterial color={"slategrey"} roughness={0.9} metalness={0.75}/>
                    </animated.mesh>
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