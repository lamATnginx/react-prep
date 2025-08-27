import { COLORS } from "@/constants/RaceCircuitConstants";
import { getDistanceVector3 } from "@/util/util";
import { useFrame } from "@react-three/fiber";
import { useRef, type Dispatch, type SetStateAction } from "react";
import type { CatmullRomCurve3, Mesh } from "three";

interface Props {
    pathCurve: CatmullRomCurve3;
    targetPosition?: [number, number, number];
    onStopTarget?: () => void;
    isCarAtTargetState: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function Car({ pathCurve, targetPosition, onStopTarget, isCarAtTargetState }: Props) {
    const carRef = useRef<Mesh | null>(null);
    const speed = 2000;

    const moveFreely = (car: Mesh, t: number) => {
        const point = pathCurve.getPointAt(t);
        if(targetPosition) {
            if(getDistanceVector3(targetPosition, point) < 3) {
                isCarAtTargetState[1](true);
                if(onStopTarget) onStopTarget();
            }
        }

        if(!isCarAtTargetState[0]) {
            car.position.set(point.x, point.y, point.z);

            const tangent = pathCurve.getTangentAt(t);
            const lookAtPoint = point.clone().add(tangent);
            car.lookAt(lookAtPoint);
        } 
    }

    useFrame(() => {
        const time = Date.now();
        const t = ((time / speed) % 6) / 6;

        if(carRef.current) {
            moveFreely(carRef.current, t);
        }
    });
    
    return (
        <mesh ref={carRef} scale={[1, 1, 1]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color={COLORS.CAR} />
        </mesh>
      );
}