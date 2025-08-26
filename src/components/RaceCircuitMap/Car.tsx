import { COLORS } from "@/constants/RaceCircuitConstants";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { CatmullRomCurve3, Mesh } from "three";


interface Props {
    pathCurve: CatmullRomCurve3;
}

export default function Car({ pathCurve }: Props) {
    const carRef = useRef<Mesh | null>(null);

    useFrame(() => {
        const time = Date.now();
        const t = ((time / 2000) % 6) / 6;

        if(carRef.current) {
            const point = pathCurve.getPointAt(t);
            carRef.current.position.set(point.x, point.y, point.z);

            const tangent = pathCurve.getTangentAt(t);
            const lookAtPoint = point.clone().add(tangent);
            carRef.current.lookAt(lookAtPoint); 
        }
    });
    
    return (
        <mesh ref={carRef} scale={[1, 1, 1]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color={COLORS.CAR} />
        </mesh>
      );
}