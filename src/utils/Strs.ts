/**
 * Check for null values and Empty spaces
 * Best used for testing single words
 */
export function isValueEmpty(value: string) {
    try {
        return `${value}`.match(/(^\s*$|undefined|null)/i)
            ? true
            : false
    }catch(e) {
        return true
    }
}

/**
 * Checks null values and Unknown and None values
 * Best used for testing single words
 * @param value 
 * @returns 
 */
export function isUnknownOrEmpty(value: string) {
    return`${value}`.match(/(^\s*$|Unknown|None|undefined|null)/i)
        ? true
        : false
}

export function getNumberOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return (s[(v - 20) % 10] || s[v] || s[0]);
}

export function AppendleadingZero(num: number) {
    return num < 10 ? `0${num}` : num
}