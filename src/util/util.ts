export const boundValue = (min: number, max: number, value: number) => {
    return Math.max(min, Math.min(max, value));
}

export const getContentHeight = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    let elementHeight = element.clientHeight;
    let elementWidth = element.clientWidth;

    elementHeight -= Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom);
    elementWidth -= Number.parseFloat(computedStyle.paddingLeft) + Number.parseFloat(computedStyle.paddingRight);
    
    return [elementHeight, elementWidth]
}

export const logError = (message: string, componentName: string) => {
    return `Error @ ${componentName} : ${message}`
}

export const convertToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const convertToDegrees = (radians: number) => radians * (180 / Math.PI);