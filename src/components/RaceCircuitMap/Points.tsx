import { Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

interface Props {
    points: {
        label: string;
        coordinates: number;
    }[];
}

export default function Points({ points }: Props) {
    
    const handlePointClick = (e: ThreeEvent<MouseEvent>) => {
        console.log("Hi")
    }

    return (
        <>
            {
                points.map((point, index) => (
                    <mesh
                        key={`point-${index}`}
                        onClick={handlePointClick}
                        position={point.coordinates}
                        >
                        <sphereGeometry args={[0.3, 32, 32]} />
                        <meshStandardMaterial color="blue" />
                        <Html><p>{point.label}</p></Html>
                    </mesh>
                ))
            }
        </>
    )
}