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

/**
 * Swap two adjacent items in an array
 * 
 * @param arr list of items 
 * @param index position of the first item to be swapped
 * @returns 
 */
export function swapAdjacentItems<T = any>(arr: Array<T>, index: number) {
  if (index < 0 || index >= arr.length - 1) {
    throw new Error("Invalid index or no adjacent items to swap.");
  }

  [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
  return arr
}