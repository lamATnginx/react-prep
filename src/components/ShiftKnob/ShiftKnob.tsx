import { Gears } from '@/types/GearType';
import { getContentHeight } from '@/util/util';

import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function ShiftKnob() {
    const baseContainerRef = useRef<HTMLDivElement>(null);
    const [style, api] = useSpring(() => ({ y: 0 }));
    const gearValues = Object.values(Gears);

    const bind = useDrag(({ down, offset: [, oy], last }) => {
            if(last) {
                // Snap logic
                const baseContainer = baseContainerRef.current;
                if(baseContainer) {
                    const [ baseContainerHeight ] = getContentHeight(baseContainer);
                    const rowHeight = baseContainerHeight / 4;
                    const gearIndex = Math.round(oy / rowHeight);
                    const slottedHeight = gearIndex * rowHeight

                    api.start({ y: slottedHeight, immediate: down})
                }
            }
            else {  
                // Freeflow movement
                api.start({ y: oy, immediate: down })
            }
        },
        {
            bounds: () => {
                const baseContainer = baseContainerRef.current;

                if(baseContainer) {
                    const [ baseContainerHeight ] = getContentHeight(baseContainer);
                    const rowHeight = baseContainerHeight / 4;
                    const minHeight = 0;
                    const maxHeight = baseContainerHeight - rowHeight;

                    return {top: minHeight, bottom: maxHeight}
                }
                return { }
            }
        }   
    )
    
    return (
      <div 
        className='bg-neutral-700 grid grid-rows-4 justify-items-start items-start p-5 w-48 h-1/2' 
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