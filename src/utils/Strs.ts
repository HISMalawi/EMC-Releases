export function isValueEmpty(value: string) {
    try {
        return value.match(/(^\s*$|None|unknown)/i)
    }catch(e) {
        return true
    }
}

export function getNumberOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return (s[(v - 20) % 10] || s[v] || s[0]);
}

export function AppendleadingZero(num: number) {
    return num < 10 ? `0${num}` : num
}