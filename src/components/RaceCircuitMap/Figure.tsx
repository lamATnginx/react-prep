import { useLoader } from '@react-three/fiber'
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import Points from './Points';
import { useMemo } from 'react';

export default function Figure() {
    const scale = 0.08;
    const zCoord = 0.3;
    const pointsData = useMemo(() => {
        return [
            {
                label: "Work",
                coordinates: [10, 2.2, zCoord], // Work
            },
             {
                label: "Projects",
                coordinates: [-10, 7.5, zCoord], // Projects
            },
            {
                label: "Me",
                coordinates: [-18.3, -2, zCoord], // Me
            }
        ]
      }, []);

    const svgData = useLoader(SVGLoader, "./src/assets/racetrack.svg");
    const shapes = svgData.paths.flatMap((path) => path.toShapes(true));
    const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: 5,
        });
    geometry.center();

    return(
        <>
            <mesh geometry={geometry} scale={scale}>
                <meshPhongMaterial attach="material" color="#FF8000" side={THREE.DoubleSide}/>
            </mesh>

            <Points points={pointsData} />
        </>
    )
}