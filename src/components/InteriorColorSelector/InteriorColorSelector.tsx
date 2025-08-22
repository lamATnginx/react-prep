import { useInteriorColor } from "@/hooks/useInteriorColor";
import { InteriorColors, type Interior } from "@/types/InteriorColorType";


export default function InteriorColorSelector() {
    const { interiorColor, setInteriorColor } = useInteriorColor();
    const interiorColorValues = Object.values(InteriorColors);

    const handleInteriorColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value: Interior = event.target.value as Interior;
        setInteriorColor(value)
    }

    return (
        <select className="" value={interiorColor} onChange={handleInteriorColorChange}>
            {
                interiorColorValues.map((interiorColor) => 
                    <option key={interiorColor}>
                        {interiorColor}
                    </option>
                )
            }
        </select >
    )
}