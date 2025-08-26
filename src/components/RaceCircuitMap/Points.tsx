import { COLORS } from "@/constants/RaceCircuitConstants";
import { Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

interface Props {
    pointsData: {
        label: string;
        coordinate: [x: number, y: number, z: number];
    }[];
}

export default function Points({ pointsData }: Props) {
    const handlePointClick = (event: ThreeEvent<MouseEvent>) => {
        console.log("Hi", (event))
    }

    return (
        <>
            {
                pointsData.map((point) => (         
                    <mesh
                        onClick={handlePointClick}
                        position={point.coordinate}
                        >
                        <sphereGeometry args={[4, 32, 32]} />
                        <meshStandardMaterial color={COLORS.POINT}/>
                        <Html><p className="cursor-pointer text-xl">{point.label}</p></Html>
                    </mesh>
                ))
            }
        </>
    )
}