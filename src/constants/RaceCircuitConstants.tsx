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

export const Card = ({ title, link = undefined, description, timeframeStrings }: { title: string, link?: string, description: string, timeframeStrings?: string[] }) => {
    return (
        <div className="flex flex-col gap-2 px-4 py-2">
            <div className="flex flex-row justify-between gap-0.5">
                <h1 className="font-bebas-neue text-2xl flex-wrap">{title}</h1>
                { link && <a target="_blank" rel="noreferrer" href={link}><Link/></a> }
            </div>
            <p>{description}</p>
            { 
                timeframeStrings?.map((timeframe) => 
                    <p key={`sticky_note-timeframe-${timeframe}`} className="font-bebas-neue text-lg">{timeframe}</p>
                )
            }
        </div>
    )
}

export const workData: ContentType = {
    "NGINX":
        <Card title="NGINX" link="https://www.f5.com/go/product/welcome-to-nginx" description="Working as a front-end engineer within the NGINX DocOps and NGINX One team to deliver awesome features for our AI chatbot and new documentation site." timeframeStrings={["09/2023 - Present"]} />,
    "BMW Group":
        <Card title="BMW Group" link="https://www.bmwgroup.com/en.html" description="Worked as a full-stack intern within the Digital Life Innovation team to deliver exciting apps to our in-vehicle experience." timeframeStrings={["01/2022 - 06/2022", "06/2023-09/2023"]} />,
    "Resume":
        <div className="flex flex-col gap-2 px-4 py-2">
            <p className="font-bebas-neue text-2xl flex-wrap">Resume</p>
            <p>Download <span className="text-blue-600 text-xl">here!</span></p>
        </div>
}

export const projectsData: ContentType = {
    "Personal Site": 
        <Card title="Personal Site (aka this)" description="Personal website to simulate my professional life as a race track."/>,
    "All Keys": 
        <Card title="All Keys" link="https://github.com/lamnguynn/All-Keys" description="Published iOS app (now taken-down) for a password manager with auto-fill." />,
    "HalfModalViewController": 
        <Card title="Half Modal View Controller" link="https://github.com/lamnguynn/HalfModalViewController" description="Published Cocoapod for a customizable half-modal view controller for iOS UIKit." />,
    "DropDownButton": 
        <Card title="Drop Down Button" link="https://github.com/lamnguynn/DropDownButton" description="Published Cocoapod for an easy to use drop-down button for iOS UIKit." />,
}

export const meData: ContentType = {
    "Lam": 
        <Card title="Hi there!" description="My name is Lam Nguyen, a front-end engineer - sometimes full-stack - that is passionate about delivering awesome products that enrich customer experiences. I also like cars :)"/>,
    "LinkedIn":
        <Card title="LinkedIn" link="https://www.linkedin.com/in/lamnguynn" description="Feel free to add me on LinkedIn. Or just lurk..."/>

}
