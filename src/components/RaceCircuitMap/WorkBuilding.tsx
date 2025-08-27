import { COLORS, FONT_PATH } from '@/constants/RaceCircuitConstants';
import { convertToRadians } from '@/util/util';
import Text from './Text';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { useLoader } from '@react-three/fiber';

export default function WorkBuilding() {
    const fontSize = 12;
    const buildingWidth = 120;
    const buildinglength = 90;
    const buildingHeight = 10;
    const font = useLoader(FontLoader, FONT_PATH);

    return (
        <group position={[110, 160, 0]}>
            <mesh>
                <boxGeometry args={[buildingWidth, buildinglength, buildingHeight]}/>
                <meshPhongMaterial color={COLORS.BUILDING}/>
            </mesh>
            <Text text="Welcome to" font={font} size={fontSize} width={-buildingWidth / 4 - 12} length={-buildinglength / 4.5 - 8} height={buildingHeight * 2} color="white" rotation={[convertToRadians(40), 0, 0]}/>
            <Text text="Lam's" font={font} size={fontSize} width={-buildingWidth / 4} length={-buildinglength / 4.5 - 39} height={buildingHeight * 2} color={COLORS.BUILDING_TEXT} rotation={[convertToRadians(40), 0, 0]}/>
        </group>
    )
}