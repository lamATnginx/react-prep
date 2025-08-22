import { InteriorOptions, type Interior } from "@/types/InteriorColorType";

export const BACKGROUND_COLOR_CLASSES: Record<string, string> = Object.values(InteriorOptions).reduce(
    (acc, color) => {
        const key: string = color.toLowerCase();
        acc[key] = `bg-interior-${key}`;
        return acc;
    },
    {} as Record<string, string>
);

export const DEFAULT_INTERIOR_COLOR: Interior = InteriorOptions.TARTUFO;
export const DEFAULT_BG_COLOR: string = BACKGROUND_COLOR_CLASSES[DEFAULT_INTERIOR_COLOR.toLowerCase()];