export function isValueEmpty(value: string) {
    try {
        return value.match(/(^\s*$|None|unknown)/i)
    }catch(e) {
        return true
    }
}
