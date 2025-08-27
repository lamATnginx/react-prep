import { COLORS } from "@/constants/RaceCircuitConstants";
import type { Vector3 } from "@/types/RaceCircuitType";
import { convertToRadians } from "@/util/util";
import { Euler, Vector3 as ThreeVector3 } from "three";

export default function ObservationDeck() {
    // Tower name - "The cocktail"
    const numRailings = 20;
    const numSupports = 8;
    const roofAngle = 26; // in degrees
    const towerAngle = 90; // in degrees
    const towerPosition: Vector3 = [-200, -50, 20];
    const glassOpacity = 0.2;

    return (
        <group position={towerPosition} rotation={[convertToRadians(towerAngle), 0, 0]}>

            {/* Tower Base */}
            {
                Array.from({ length: numSupports }, (_, i) => {
                    const angle = (i * Math.PI * 2) / numSupports;
                    const baseRadius = 9;
                    const x = Math.cos(angle) * baseRadius;
                    const z = Math.sin(angle) * baseRadius;
                    const platformHeight = 50;
                    const convergePoint = [0, -platformHeight / 2, 0]
                    const topPosition = new ThreeVector3(x, platformHeight, z);
                    const bottomPosition = new ThreeVector3(...convergePoint);
                    const topRadius = 2 / 5;
                    const bottomRadius = 3 / 5;

                    const direction = topPosition.clone().sub(bottomPosition).normalize();
                    const quaternion = new Euler().setFromVector3(direction);

                    return (
                        <mesh
                            key={`observation_deck-support-${i}`}
                            position={bottomPosition.clone().add(direction.multiplyScalar(platformHeight / 2))}
                            rotation={quaternion}
                        >
                            <cylinderGeometry args={[ topRadius, bottomRadius, platformHeight, numSupports]} />
                            <meshPhongMaterial color={COLORS.TOWER_BASE} />
                        </mesh>
                    );
                })
            }

            {/* Observation Deck Platform */}
            <mesh position={[0, 25, 0]}> 
                <cylinderGeometry args={[10, 10, 2, 32]} />
                <meshPhongMaterial color={COLORS.TOWER_DECK} />
            </mesh>
    
            {/* Railings */}
            {
                Array.from({ length: numRailings }, (_, i) => {
                    const angle = (i * Math.PI * 2) / numRailings;
                    const baseRadius = 9;
                    const x = Math.cos(angle) * baseRadius;
                    const z = Math.sin(angle) * baseRadius;
                    const platformHeight = 5;
                    const topRadius = 0.1;
                    const bottomRadius = 0.1;

                    return (
                        <mesh key={`observation_deck-railing-${i}`} position={[x, 27, z]}>
                            <cylinderGeometry args={[topRadius, bottomRadius, platformHeight, numRailings]} />
                            <meshPhongMaterial color={COLORS.TOWER_RAILS} />
                        </mesh>
                    );
                }
            )}
    
            {/* Handrail */}
            <mesh position={[0, 28, 0]}>
                <cylinderGeometry args={[9.7, 9.7, 0.5, 64]} />
                <meshPhongMaterial color={COLORS.TOWER_RAILS} />
            </mesh>
    
            {/* Observation Room */}
            <mesh position={[0, 30, 0]}>
                <cylinderGeometry args={[8, 8, 5, 32]} />
                <meshPhongMaterial color={COLORS.TOWER_GLASS} transparent opacity={glassOpacity} />
            </mesh>
    
            {/* Roof */}
            <mesh position={[0, 34, 0]} rotation={[0, 0, convertToRadians(roofAngle)]}>
                <cylinderGeometry args={[10, 0, 5, 32]} /> 
                <meshPhongMaterial color={COLORS.TOWER_ROOF} />
            </mesh>
      </group>
    )
}