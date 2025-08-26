import { Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

interface Props {
    pointsData: {
        label: string;
        coordinate: [x: number, y: number, z: number];
    }[];
}

export default function Points({ pointsData }: Props) {
    
    const handlePointClick = (_: ThreeEvent<MouseEvent>) => {
        console.log("Hi")
    }

    return (
        <>
            {
                pointsData.map((point, index) => (         
                    <mesh
                        key={`point-${index}`}
                        onClick={handlePointClick}
                        position={point.coordinate}
                        >
                        <sphereGeometry args={[0.4, 32, 32]} />
                        <meshStandardMaterial color="blue" wireframe/>
                        <Html><p className="cursor-pointer">{point.label}</p></Html>
                    </mesh>
                ))
            }
        </>
    )
}