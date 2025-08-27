import type { ReactNode } from "react";
import type { EulerOrder } from "three";

export type Vector3 = [x: number, y: number, z: number];
export type Rotation3 = [x: number, y: number, z: number, order?: EulerOrder | undefined];
export type ContentType =  { [key: string]: ReactNode }