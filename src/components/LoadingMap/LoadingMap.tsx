import { useEffect, useRef } from "react";
import { animate, createScope, svg, type Scope } from "animejs";

export default function LoadingMap() {
    const rootRef = useRef(null);
    const scopeRef = useRef<Scope>(null);

    useEffect(() => {
        initializeMap();
    }, []);
    
    const initializeMap = () => {
        scopeRef.current = createScope({ root: rootRef }).add(_ => {
            if(rootRef.current) {
                animate(svg.createDrawable('path'), {
                    draw: '0 1',
                    ease: 'linear',
                    duration: 3000,
                    loop: false,
                });
            }
        });

        if(scopeRef.current) {
            const scope = scopeRef.current;
            return () => scope.revert();
        }
    }

    return (
        <div className="w-1/3 h-1/3" ref={rootRef}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="88 75.5 493.6 271.7">
                <path d="M200 300c200 100 0-50 250 0 100 0 150-50 100-100S450 300 400 250q0 0-150-50-50 0-50-100-50-50-100 100Z" stroke="#000000" strokeWidth="12" fill="none"/>
            </svg>
        </div>
    )
}