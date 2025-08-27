import { COLORS, FONT_PATH } from "@/constants/RaceCircuitConstants";
import { convertToRadians } from "@/util/util";
import { useLoader } from "@react-three/fiber";
import { FontLoader } from 'three/examples/jsm/Addons.js';
import Text from "./Text";

export default function FanSeating() {
    const numRows = 5; // Must be an odd number
    const heightIncrement = 3;
    const depthIncrement = 5;
    const rowWidth = 80; // Length of row
    const rowHeight = 25; // Width of row 
    const rowDepth = depthIncrement; // Height of row
    const glassOpacity = 0.75;
    let dynamicHeight = rowHeight;
    const font = useLoader(FontLoader, FONT_PATH);

    return (
        <>
             <group position={[0, -rowHeight - 10, 20]} rotation={[0, 0, convertToRadians(18)]}>
                {Array.from({ length: numRows }).map((_, index) => {
                    const rowPositionY = index * heightIncrement;
                    const rowPositionZ = index * depthIncrement;

                    if(index > 0) {
                        dynamicHeight += (heightIncrement * 2)
                    }

                    return (
                        <mesh
                            key={`fan_seating-row-${index}`}
                            position={[0, rowPositionY, -rowPositionZ]}
                        >
                            <boxGeometry args={[rowWidth, dynamicHeight, rowDepth]} />
                            <meshPhongMaterial color={index % 2 === 0 ? COLORS.SEATING_WALL : COLORS.SEATING_GLASS} transparent={index % 2 !== 0 } opacity={index % 2 === 0 ? 1 : glassOpacity }/>
                        </mesh>
                    );
                })}
                <Text text="Track (Record)" size={9} font={font} width={-34} length={-10} height={numRows} color={COLORS.SEATING_TEXT} rotation={[convertToRadians(40), 0, 0]}/>
            </group>
        </>
    )
}