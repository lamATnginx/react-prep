import { useEffect, useRef, useState } from "react";
import { animate, createScope, svg, type Scope } from "animejs";
import RaceTrack from "@/components/RaceCircuitMap/Canvas";

export default function Homepage() {
    const [showEngineStartButton, setShowEngineStartButton] = useState<boolean>(false);
    const rootRef = useRef(null);
    const scopeRef = useRef<Scope>(null);

    useEffect(() => {
        initializeMap();
    }, []);

    const initializeMap = () => {
        // Add animation to trail to start point
        scopeRef.current = createScope({ root: rootRef }).add(self => {
            if(rootRef.current) {
                animate(svg.createDrawable('path'), {
                    draw: '0 1',
                    ease: 'linear',
                    duration: 3000,
                    loop: false,
                    onComplete: (_) => setShowEngineStartButton(true)
                });
            }
        });

        if(scopeRef.current) {
            const scope = scopeRef.current;
            return () => scope.revert();
        }
    }

    return (
        <div className="flex h-screen w-screen" ref={rootRef}>
            { /* Race Track */ }
            <div className="flex w-screen justify-center items-center">
                <div className="w-full h-full relative">
                    <RaceTrack/>
                </div>
            </div>       
        </div>
    )
}