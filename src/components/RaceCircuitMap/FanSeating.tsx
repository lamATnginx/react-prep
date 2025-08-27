import { COLORS, FONT_PATH } from "@/constants/RaceCircuitConstants";
import { convertToRadians } from "@/util/util";
import { useLoader, useThree } from "@react-three/fiber";
import { FontLoader } from 'three/examples/jsm/Addons.js';
import Text from "./Text";
import { animated, useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";

import Work from "@/components/Content/Work";
import Projects from "@/components/Content/Projects";
import Me from "@/components/Content/Me";

interface Props {
    animateRowIndex?: number | undefined
}

export default function FanSeating({ animateRowIndex }: Props) {
    const numRows = 5; // Must be an odd number
    const heightIncrement = 3;
    const depthIncrement = 5;
    const rowWidth = 80; // Length of row
    const rowHeight = 25; // Width of row 
    const rowDepth = depthIncrement; // Height of row
    const glassOpacity = 0.75;
    const zAngle = 18; // in degrees
    let dynamicHeight = rowHeight;
    const font = useLoader(FontLoader, FONT_PATH);
    const pullOutDistance = 75;
    const { size, viewport } = useThree();
    const scale = size.width / viewport.width;
    
    const { animatedPosition, animatedRotation } = useSpring({
        animatedPosition: animateRowIndex !== undefined
            ? [0, animateRowIndex * heightIncrement - pullOutDistance, -(animateRowIndex * depthIncrement)] as [x: number, y: number, z: number]
            : [0, 0, 0] as [x: number, y: number, z: number],
        animatedRotation: animateRowIndex !== null ? [0, 0, convertToRadians(-zAngle - 5)] : [0, 0, 0],
        config: { friction: 40, tension: 80 }, 
    });

    return (
        <>
             <group position={[0, -rowHeight - 10, 20]} rotation={[0, 0, convertToRadians(zAngle)]}>
                {Array.from({ length: numRows }).map((_, index) => {
                    const rowPositionY = index * heightIncrement;
                    const rowPositionZ = index * depthIncrement;
                    const position: [x: number, y: number, z: number] = [0, rowPositionY, -rowPositionZ]

                    if(index > 0) {
                        dynamicHeight += (heightIncrement * 2)
                    }

                    const isAnimatedRow = (animateRowIndex) === index;

                    return (
                        <animated.mesh
                            key={`fan_seating-row-${index}`}
                            position={isAnimatedRow ? animatedPosition : position}
                            rotation={isAnimatedRow ? animatedRotation : [0, 0, 0]}
                        >
                            <boxGeometry args={[rowWidth, dynamicHeight, rowDepth]} />
                            <meshPhongMaterial
                                color={index % 2 === 0 ? COLORS.SEATING_WALL : COLORS.SEATING_GLASS}
                                transparent={index % 2 !== 0}
                                opacity={index % 2 === 0 ? 1 : glassOpacity}
                            />
                            {
                                animateRowIndex !== undefined && index === animateRowIndex && 
                                <>
                                    <Html className="sticky-note flex justify-start items-start bg-amber-200 p-4 ml-4" style={{ width: `${rowWidth * scale}px`, height: `${dynamicHeight * scale}px` }}>
                                        {
                                            index === 1 ? <Work/> :
                                            index === 2 ? <Projects/> :
                                            index === 3 ? <Me/> : 
                                            <></>
                                        }
                                    </Html>
                                    <Text text={index === 1 ? "Work" : index === 2 ? "Projects" : "Me"} font={font} size={7} width={-30} length={5} height={2} color={index % 2 === 1 ? "slategrey" : COLORS.BUILDING_TEXT} rotation={[0, 0, 0]}/>
                                </>
                            }
                        </animated.mesh>
                    );
                })}
                <Text text="Track (Record)" size={9} font={font} width={-34} length={-10} height={numRows} color={COLORS.SEATING_TEXT} rotation={[convertToRadians(40), 0, 0]}/>
            </group>
        </>
    )
}