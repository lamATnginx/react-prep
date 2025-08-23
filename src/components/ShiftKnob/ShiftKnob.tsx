import { Gears } from '@/types/GearType';
import { boundValue, getContentHeight, logError } from '@/util/util';

import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { DEFAULT_GEAR } from '@/constants/GearConstants';

export default function ShiftKnob() {
    const COMPONENT_NAME = "ShiftKnob";
    const gearValues = Object.values(Gears);

    const currentGearRef = useRef(0);
    const baseContainerRef = useRef<HTMLDivElement>(null);
    const [style, api] = useSpring(() => ({ y: 0 }));
    
    const getGridInfo = () => {
        const baseContainer = baseContainerRef.current;
        let contentHeight: number;
        let rowHeight: number;

        if(baseContainer) {
            const [ baseContainerHeight ] = getContentHeight(baseContainer);
            contentHeight = baseContainerHeight;
            rowHeight = baseContainerHeight / gearValues.length;
        }
        else {
            throw new Error(logError('baseContainerRef is undefined. Unable to get gridInfo such as content and row height.', COMPONENT_NAME))
        }

        return [contentHeight, rowHeight];
    }

    const getStartingYPos = () => {
        const [_, rowHeight] = getGridInfo();
        const gearIndex: number = gearValues.findIndex((value) => value === DEFAULT_GEAR);
        const gearPos = gearIndex * rowHeight
        return [gearPos, gearIndex];
    }

    useEffect(() => {
        const [gearPos, gearIndex] = getStartingYPos();

        currentGearRef.current = gearIndex;
        style.y.set(gearPos);
    }, [])

    const bind = useDrag(({ movement: [, my], last , down}) => {
            // Movement logic
            const [contentHeight, rowHeight] = getGridInfo();
            const currentGear = currentGearRef.current
            const newGear =  currentGear + Math.round(my / rowHeight);

            if(last) { 
                // Slot into nearest gear
                const slottedPos = newGear * rowHeight;
                currentGearRef.current = newGear; 
                return api.start({ y: boundValue(0, contentHeight - rowHeight, slottedPos) });
            }

            const offsetPos = (currentGear * rowHeight) + my;
            return api.start({ y: boundValue(0, contentHeight - rowHeight, offsetPos), immediate: down });
        }
    )
    
    return (
      <div 
        className={`bg-neutral-700 grid justify-items-start items-start p-5 w-48 h-1/3 grid-rows-${gearValues.length}`} 
        ref={baseContainerRef}
        >
        {/* Gear Indicators */}
        {
            gearValues.map((gearValue, index) => 
                <button 
                    type='button' 
                    className={`row-start-${index + 1} col-start-1`} 
                    key={`gear-${gearValue}`}
                    value={gearValue}
                    >
                        {gearValue}
                </button>
            )
        }

        {/* Shift Knob */}
        <animated.div
            className={'bg-tartufo w-1/2 h-8 row-start-1 col-start-2'}
            style={style}
            {...bind()}
          />
      </div>
    )
}