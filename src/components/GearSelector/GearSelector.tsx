import { DEFAULT_GEAR } from '@/constants/GearConstants';
import { Gears } from '@/types/GearType';
import { animate, createScope, createSpring, type Scope } from 'animejs';
import { useEffect, useRef, useState } from 'react';

interface Props {
    onShiftComplete?: (gear: string) => void;
}

export default function ShiftKnob({ onShiftComplete }: Props ) {
    const gearValues = Object.values(Gears);
    const [currentGear, setCurrentGear] = useState<HTMLButtonElement | undefined>(undefined);
    const rootRef = useRef(null);
    const scopeRef = useRef<Scope>(null);
    const gearButtonConfig = {
        skewX: 6,
        skewY: 10,
        duration: 350,
        clickedPosition: '5rem',  // Hard-coded on purpose - Can be inversed on smaller screens to.
        defaultGearName: "default-gear"
    }

    useEffect(() => {
        scopeRef.current = createScope({ root: rootRef }).add(self => {
            // Create the animation for the gears to move
            if(rootRef.current) {
                const bounds = (rootRef.current as HTMLDivElement).getBoundingClientRect();
                const translateX = bounds.width * 0.40;

                animate(['.gear',], {
                    x: `${translateX}px`,
                    duration: gearButtonConfig.duration,
                    skewX: gearButtonConfig.skewX,
                    skewY: gearButtonConfig.skewY,
                });

                animate(`.${gearButtonConfig.defaultGearName}`, {
                    x: `${gearButtonConfig.clickedPosition}`,
                    duration: gearButtonConfig.duration,
                })

                animate('.gear:nth-child(2)', {
                    rotate: '1turn',
                    duration: gearButtonConfig.duration + 100, // Add some "lag" to the rotation
                });

                if(self) {
                    self.add('shiftGear', (newGear, oldGear?) => {
                        // Flip-flop logic
                        if(oldGear) {
                            animate(`#${oldGear.id}`, {
                                x: `${translateX}px`,
                                duration: gearButtonConfig.duration
                            });
                        }

                        if(oldGear === newGear) {
                            // Add spring if you click same gear
                            animate(`#${newGear.id}`, {
                                x: '5rem',
                                scale: [
                                    { to: 1.25, ease: 'inOut(3)', duration: gearButtonConfig.duration - 100 },
                                    { to: 1, ease: createSpring({ stiffness: 300 }) }
                                  ],
                            })
                        }
                        else {
                            animate(`#${newGear.id}`, {
                                x: gearButtonConfig.clickedPosition,  
                                duration: gearButtonConfig.duration
                            });
                        }
                    })
                }
            }
        });

        setCurrentGear(() => {
            if(rootRef.current) {
                const root = rootRef.current as HTMLDivElement;
                for(const child of root.children) {
                    const button = child as HTMLButtonElement;
                    if(child.classList.contains(gearButtonConfig.defaultGearName)) return button;
                }
            }
            return undefined
        });

        if(scopeRef.current) {
            // Cleanup
            const scope = scopeRef.current;
            return () => scope.revert();
        }
    }, []);

    const handleGearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const element = (event.target as HTMLButtonElement);
        const gear = element.value;

        if(onShiftComplete) {
            onShiftComplete(gear);
        }

        if(scopeRef.current) {
            scopeRef.current.methods.shiftGear(element, currentGear);
        }
        setCurrentGear(element);
    }
    
    return (
      <div 
        className={'gear-container absolute grid auto-rows-min gap-12 justify-items-start items-start pl-36 mt-12 w-1/6 h-1/3'}
        ref={rootRef}
        >
        {/* Gear Indicators */}
        {
            gearValues.map((gearValue, index) => 
                <button 
                    type='button' 
                    className={`gear ${gearValue === DEFAULT_GEAR ? gearButtonConfig.defaultGearName : ""} bg-neutral-700 row-start-${index + 1} col-start-1 p-5 sm:p-6 lg:p-8 text-xl rounded-bl-lg text-white backdrop-blur-3xl shadow-xl/20 cursor-pointer`} 
                    key={`gear_${gearValue}`}
                    id={`gear_${gearValue}`}
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