import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react';
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";

import Points from './Points';
import { OBJECT_SCALE, Z_COORDINATE } from '@/constants/RaceCircuitConstants';

interface Props {
    svgPath?: string // relative to the ROOT of the project
}

export default function Figure({ svgPath = "./src/assets/racetrack.svg" }: Props) {
    const pointsData: { label: string, coordinate: [x: number, y: number, z: number]}[] = useMemo(() => {
        return [
            {
                label: "Work",
                coordinate: [10, 2.2, Z_COORDINATE], // Work
            },
                {
                label: "Projects",
                coordinate: [-10, 7.5, Z_COORDINATE], // Projects
            },
            {
                label: "Me",
                coordinate: [-18.3, -2, Z_COORDINATE], // Me
            }
        ]
        }, []);

    const svgData = useMemo(() => useLoader(SVGLoader, svgPath), [svgPath]);
    const shapes = svgData.paths.flatMap((path) => path.toShapes(true));
    const geometry = useMemo(() => {
        const geo = new THREE.ExtrudeGeometry(shapes, {
            depth: 5,
            });

        geo.center();
        return geo;
    }, [shapes]);
    const edgesGeometry = useMemo(() => {
        return new THREE.EdgesGeometry(geometry); // Extract edges from geometry
    }, [geometry]);

    return(
        <>
            <lineSegments geometry={edgesGeometry} scale={OBJECT_SCALE}>
                <lineBasicMaterial color="#FF8000" />
            </lineSegments>

            <Points pointsData={pointsData} />
        </>
    )
}