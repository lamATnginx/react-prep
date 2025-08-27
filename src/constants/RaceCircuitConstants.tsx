import type { ContentType } from "@/types/RaceCircuitType";
import { Link } from "lucide-react";

export const Z_COORDINATE = 0.0;
export const OBJECT_SCALE = 0.08;

export const COLORS = {
    "BUILDING": "red",
    "BUILDING_TEXT": "white",
    "TRACK": "#FF8000", // Mclaren color
    "POINT": "blue",
    "CAR": "blue",
    "TOWER_ROOF": "darkred",
    "TOWER_GLASS": "blue",
    "TOWER_RAILS": "silver",
    "TOWER_DECK": "darkblue",
    "TOWER_BASE": "gray",
    "SEATING_GLASS": "lightblue",
    "SEATING_WALL": "#636363",
    "SEATING_TEXT": "#00FF80"
};

export const FONT_PATH = "./src/assets/fonts/Bebas Neue_Regular.json";

export const Card = ({ title, link = undefined, description }: { title: string, link?: string, description: string}) => {
    return (
        <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex flex-row justify-between gap-0.5">
            <h1 className="font-bebas-neue text-xl flex-wrap">{title}</h1>
            { link && <a target="_blank" rel="noreferrer" href={link}><Link/></a> }
        </div>
        <p>{description}</p>
    </div>
    )
}

export const workData: ContentType = {
    "NGINX": <div>
        <p>I work at NGINX</p>
    </div>,
    "BMW Group": <div>
        <p>I worked at the BMW Group</p>
    </div>,
}

export const projectsData: ContentType = {
    "All Keys": 
        <Card title="All Keys" link="https://github.com/lamnguynn/All-Keys" description="Published iOS app (now taken-down) for a password manager with auto-fill." />,
    "HalfModalViewController": 
        <Card title="Half Modal View Controller" link="https://github.com/lamnguynn/HalfModalViewController" description="Published Cocoapod for a customizable half-modal view controller for iOS UIKit." />,
    "DropDownButton": 
        <Card title="Drop Down Button" link="https://github.com/lamnguynn/DropDownButton" description="Published Cocoapod for an easy to use drop-down button for iOS UIKit." />,
}

export const meData: ContentType = {
    "Lam": <Card title="Hi there!" description="This is some info about me"/>,

}
