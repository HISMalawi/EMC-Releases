export function isValueEmpty(value: string) {
    try {
        return value.match(/(^\s*$|None|unknown)/i)
    }catch(e) {
        return true
    }
}

export function toUnderscores (str: string) {
    return str.split(/(?=[A-Z])/).join('_').toLowerCase() 
}
