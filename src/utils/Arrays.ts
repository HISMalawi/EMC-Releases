/**
 * A function that remove duplicates from an array
 * 
 * @param arr list of items with possible duplicates
 * @param iteratee a key or list of keys to be used to remove duplicates
 * @returns list of unique items
 */
export function uniqueBy(arr: any[], iteratee: string | string[]) {
  return [...new Map(arr.filter(Boolean).map(item => {
    const uniqueKey = Array.isArray(iteratee) 
      ? iteratee.map(k => item[k]).join('_')
      : item[iteratee]
    return [uniqueKey, item]
  })).values()]
}