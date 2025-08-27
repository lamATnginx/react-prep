import { COLORS } from "@/constants/RaceCircuitConstants";
import { getDistanceVector3 } from "@/util/util";
import { useFrame } from "@react-three/fiber";
import { useRef, type Dispatch, type SetStateAction } from "react";
import type { CatmullRomCurve3, Mesh } from "three";

interface Props {
    pathCurve: CatmullRomCurve3;
    targetPosition?: [number, number, number];
    onStopTarget?: () => void;
    isCarAtTarget: boolean;
    setIsCarAtTarget: Dispatch<SetStateAction<boolean>>;
}

export default function Car({ pathCurve, targetPosition, onStopTarget, isCarAtTarget, setIsCarAtTarget}: Props) {
    const carRef = useRef<Mesh | null>(null);
    const timeRef = useRef(0); 
    const speed = 500;

    const moveFreely = (car: Mesh, t: number) => {
        const point = pathCurve.getPointAt(t);
        // Stop at the target if it exists AND call callback to slide out row
        if(targetPosition) {
            if(getDistanceVector3(targetPosition, point) < 3) {
                setIsCarAtTarget(true);
            }
            if(onStopTarget) onStopTarget();
        }

        // Move freely if there is no target
        if(!isCarAtTarget) {
            car.position.set(point.x, point.y, point.z);

            const tangent = pathCurve.getTangentAt(t);
            const lookAtPoint = point.clone().add(tangent);
            car.lookAt(lookAtPoint);
        } 
    }

    useFrame((_, delta) => {
        if(!isCarAtTarget) {
            timeRef.current += delta * speed;
            const t = ((timeRef.current) % 6000) / 6000;

            if(carRef.current) {
                moveFreely(carRef.current, t);
            }
        }
    });
    
    return (
        <mesh ref={carRef} scale={[1, 1, 1]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color={COLORS.CAR} />
        </mesh>
      );
}