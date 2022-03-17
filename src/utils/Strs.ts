export function isValueEmpty(value: string) {
    try {
        return value.match(/(^\s*$|None)/i)
    }catch(e) {
        return true
    }
}

export function getNumberOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return (s[(v - 20) % 10] || s[v] || s[0]);
}