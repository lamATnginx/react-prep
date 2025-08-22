import type React from "react";
import { createContext, useState } from "react";
import type { Interior } from "@/types/InteriorColorType";
import { DEFAULT_INTERIOR_COLOR } from "@/constants/InteriorColorConstants";

export const InteriorColorContext = createContext<
  | { interiorColor: Interior; setInteriorColor: (color: Interior) => void; }
  | undefined
  >(undefined);

export function InteriorColorProvider({ children }: { children: React.ReactNode }){
    const [interiorColor, setInteriorColor] = useState<Interior>(DEFAULT_INTERIOR_COLOR);

    return (
        <InteriorColorContext.Provider value={{ interiorColor, setInteriorColor }}>
          { children }
        </InteriorColorContext.Provider>
    );
}