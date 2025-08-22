import { useContext } from "react"
import { InteriorColorContext } from "@/context/InteriorColorContext"

export const useInteriorColor = () => {
    const context = useContext(InteriorColorContext)
    if(!context) {
        throw new Error("useInteriorColor must exist within InteriorColorProvider.")
    }

    return context;
}