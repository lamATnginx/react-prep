import { useInteriorColor } from "@/hooks/useInteriorColor";
import { InteriorOptions, type Interior } from "@/types/InteriorColorType";


export default function InteriorColorSelector() {
    const { interiorColor, setInteriorColor } = useInteriorColor();

    const handleInteriorColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value: Interior = event.target.value as Interior;
        setInteriorColor(value)
    }

    return (
        <select className="" value={interiorColor} onChange={handleInteriorColorChange}>
            {
                Object.values(InteriorOptions).map((interiorOption) => 
                    <option key={interiorOption}>
                        {interiorOption}
                    </option>
                )
            }
        </select >
    )
}