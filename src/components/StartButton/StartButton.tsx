import { animate, createScope, createSpring, type Scope } from "animejs";
import { useEffect, useRef } from "react"

interface Props {
    onEngineStart?: (isStarted: boolean) => void
}

export default function StartButton({ onEngineStart }: Props) {
    const rootRef = useRef(null);
    const scopeRef = useRef<Scope>(null);

    useEffect(() => {
        scopeRef.current = createScope({ root: rootRef }).add(_ => {
            animate('.engine-button', { 
                scale: [
                    { to: 1.25, ease: 'inOut(3)', duration: 200 },
                    { to: 1, ease: createSpring({ stiffness: 300 }) }
                  ],
                  loop: true,
                  loopDelay: 500,
            });
        });

        if(scopeRef.current) {
            const scope = scopeRef.current;
            return () => scope.revert();
        }
    }, []);

    const handleEngineStartClick = () => {
        if(onEngineStart) onEngineStart(true); 
    }

    return (
        <div className="flex-1 content-center" ref={rootRef}>
            <div className="flex justify-center">
                <button className="engine-button flex flex-col justify-center items-center bg-red-500 text-white rounded-full w-35 h-35 p-12 border-6 border-solid border-red-800 text-xl cursor-pointer" type="button" onClick={handleEngineStartClick}>
                    <p>Start</p>
                    <p>Engine</p>
                    <p>Stop</p>
                </button>
            </div>
        </div>
    )
}