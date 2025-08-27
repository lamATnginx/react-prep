import type { ContentType } from "@/types/RaceCircuitType";
import { useMemo, type ReactNode } from "react";

interface Props {
    sectionTitle: string | undefined;
    data: ContentType;
}

export default function Content({ sectionTitle, data }: Props) {
    const content: ReactNode = useMemo(() => {
        const key = Object.keys(data)[0];
        if(sectionTitle) {
            return data[sectionTitle];
        }

        return data[key];
    }, [sectionTitle])

    return (
        <div className="bg-amber-300 w-full h-full">
            {
                content
            }
        </div>
    )
}