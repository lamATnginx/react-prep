import { useLoader } from '@react-three/fiber'
import { useMemo, useState } from 'react';
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";

import Points from './Points';
import { COLORS, Z_COORDINATE } from '@/constants/RaceCircuitConstants';
import Car from './Car';
import WorkBuilding from './WorkBuilding';
import ObservationDeck from './ObservationDeck';
import FanSeating from './FanSeating';
import type { Vector3 } from '@/types/RaceCircuitType';

interface Props {
    svgPath?: string // relative to the ROOT of the project
}

export default function Figure({ svgPath = "./src/assets/racetrack.svg" }: Props) {
    const pointsData: { label: string, coordinate: Vector3}[] =
        [
            {
                label: "Career",
                coordinate: [190, -21, Z_COORDINATE], // Career
            },
                {
                label: "Projects",
                coordinate: [-149, 75, Z_COORDINATE], // Projects
            },
            {
                label: "Me",
                coordinate: [-150, -120, Z_COORDINATE], // Me
            }
        ];

    const [isCarAtTarget, setIsCarAtTarget] = useState(false);
    const [animateRowIndex, setAnimateRowIndex] = useState<number | undefined>(undefined);
    const [carTarget, setCarTarget] = useState<{label: string | undefined, coordinate: Vector3 | undefined}>({ label: undefined, coordinate: undefined })
    const svgData = useMemo(() => useLoader(SVGLoader, svgPath), [svgPath]);
    const shapes = svgData.paths.flatMap((path) => path.toShapes(true));

    const geometry = useMemo(() => {
        const geo = new THREE.ExtrudeGeometry(shapes, {
            depth: 5,
            });

        geo.center();
        return geo;
    }, [shapes]);

    const pathCurve = useMemo(() => {
        const points = shapes.flatMap((shape) =>
            shape.getPoints().map((point) => new THREE.Vector3(point.x, point.y, 0))
          );

          // Center the points or they will be too shifted to the right
          const boundingBox = new THREE.Box3().setFromPoints(points);
          const center = new THREE.Vector3();
          boundingBox.getCenter(center);
          const centeredPoints = points.map((point) => point.sub(center));

          return new THREE.CatmullRomCurve3(centeredPoints, true);
    }, [shapes])

    const edgesGeometry = useMemo(() => {
        return new THREE.EdgesGeometry(geometry); // Extract edges from geometry
    }, [geometry]);

    const handlePointClick = (label: string, coordinate: Vector3) => {
        setCarTarget({
            label,
            coordinate
        });
        setIsCarAtTarget(false);
    }

    const handleCarStop = () => {
        const index = pointsData.findIndex((point) => point.label === carTarget.label)
        setAnimateRowIndex(index + 1);
    }

    const handleXClickToClose = () => {
        setCarTarget({ label: undefined, coordinate: undefined});
        setIsCarAtTarget(false);
        setAnimateRowIndex(undefined);
    }

    return(
        <>
            <lineSegments geometry={edgesGeometry} scale={[1, 1, 1]}>
                <lineBasicMaterial color={COLORS.TRACK} />
            </lineSegments>

            <Points pointsData={pointsData} onPointClick={handlePointClick} />
            <Car pathCurve={pathCurve} targetPosition={carTarget.coordinate} onStopTarget={handleCarStop} isCarAtTarget={isCarAtTarget}  setIsCarAtTarget={setIsCarAtTarget}/>
            <WorkBuilding/>
            <ObservationDeck/>
            <FanSeating animateRowIndex={animateRowIndex} onXClick={handleXClickToClose}/>
        </>
    )
}