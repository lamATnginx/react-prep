import { Gears } from '@/types/GearType';
import { animate, createScope, type Scope } from 'animejs';
import { useEffect, useRef } from 'react';

interface Props {
    onShiftComplete?: (gear: number) => void;
}

export default function ShiftKnob({ onShiftComplete }: Props ) {
    const gearValues = Object.values(Gears);
    const rootRef = useRef(null);
    const scopeRef = useRef<Scope>(null);
    const gearButtonConfig = {
        skewX: 6,
        skewY: 10,
        duration: 350,
    }

    useEffect(() => {
        scopeRef.current = createScope({ root: rootRef }).add(_ => {
            // Create the animation for the gears to move
            if(rootRef.current) {
                const bounds = (rootRef.current as HTMLDivElement).getBoundingClientRect();
                const translateX = bounds.width * 0.5;

                animate(['.gear',], {
                    x: `${translateX}px`,
                    duration: gearButtonConfig.duration,
                    skewX: gearButtonConfig.skewX,
                    skewY: gearButtonConfig.skewY,
                });
                animate('.gear:nth-child(2)', {
                    rotate: '1turn',
                    duration: gearButtonConfig.duration + 100, // Add some "lag" to the rotation
                });
            }
        });

        if(scopeRef.current) {
            // Cleanup
            const scope = scopeRef.current;
            return () => scope.revert();
        }
    }, []);

    const handleGearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const gear = (event.target as HTMLButtonElement).value;
        const gearIndex = gearValues.findIndex((value) => value === gear);

        if(onShiftComplete) {
            onShiftComplete(gearIndex);
        }
    }
    
    return (
      <div 
        className={'gear-container grid auto-rows-min gap-10 justify-items-start items-start py-5 w-1/6 h-1/3'}
        ref={rootRef}
        >
        {/* Gear Indicators */}
        {
            gearValues.map((gearValue, index) => 
                <button 
                    type='button' 
                    className={`gear bg-neutral-700 row-start-${index + 1} col-start-1 p-5 sm:p-6 lg:p-8 text-xl rounded-bl-lg text-white backdrop-blur-3xl shadow-xl/20 cursor-pointer`} 
                    key={`gear-${gearValue}`}
                    value={gearValue}
                    onClick={handleGearClick}
                    >
                        {gearValue}
                </button>
            )
        }
      </div>
    )
}