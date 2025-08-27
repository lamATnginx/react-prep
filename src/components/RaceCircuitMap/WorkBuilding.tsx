import { COLORS, FONT_PATH } from '@/constants/RaceCircuitConstants';
import { convertToRadians } from '@/util/util';
import { useLoader } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import Text from './Text';

export default function WorkBuilding() {
    const font = useLoader(FontLoader, FONT_PATH);
    const fontSize = 12;
    const buildingWidth = 120;
    const buildinglength = 90;
    const buildingHeight = 10;

    return (
        <group position={[110, 160, 0]}>
            <mesh>
                <boxGeometry args={[buildingWidth, buildinglength, buildingHeight]}/>
                <meshPhongMaterial color={COLORS.BUILDING}/>
            </mesh>
            <Text text="Welcome to" font={font} size={fontSize} width={-buildingWidth / 4 - 12} length={-buildinglength / 4 - 8} height={buildingHeight * 2} color="white" rotation={[convertToRadians(40), convertToRadians(-3), 0]}/>
            <Text text="Lam's" font={font} size={fontSize} width={-buildingWidth / 4} length={-buildinglength / 4 - 39} height={buildingHeight * 2} color={COLORS.BUILDING_TEXT} rotation={[convertToRadians(40), convertToRadians(-5), 0]}/>
        </group>
    )
}