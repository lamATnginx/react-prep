import * as THREE from "three";
import type { Vector3 } from "three";

export const boundValue = (min: number, max: number, value: number) => {
    return Math.max(min, Math.min(max, value));
}

export const getContentHeight = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    let elementHeight = element.clientHeight;
    let elementWidth = element.clientWidth;

    elementHeight -= Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom);
    elementWidth -= Number.parseFloat(computedStyle.paddingLeft) + Number.parseFloat(computedStyle.paddingRight);
    
    return [elementHeight, elementWidth]
}

export const logError = (message: string, componentName: string) => {
    return `Error @ ${componentName} : ${message}`
}

export const convertToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const convertToDegrees = (radians: number) => radians * (180 / Math.PI);

export const getDistanceVector3 = (val1: Vector3 | [number, number, number], val2: Vector3 |  [number, number, number]) => {
    const vectorA: Vector3 = Array.isArray(val1) ? new THREE.Vector3(...val1) : val1;
    const vectorB: Vector3 = Array.isArray(val2) ? new THREE.Vector3(...val2) : val2;
    return vectorA.distanceTo(vectorB);

}