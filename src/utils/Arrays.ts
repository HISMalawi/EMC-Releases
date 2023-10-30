import { isEmpty } from "lodash";

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

type SortOrder = "asc" | "desc";
type ObjArray = Array<Record<string, any>>;

/**
 * Sorts an array of objects based on a specified property and order.
 *
 * @param arr - The array of objects to be sorted.
 * @param prop - The property by which to sort the objects.
 * @param order - Optional sorting order ("asc" for ascending, "desc" for descending). default is "asc"
 * @returns The sorted array of objects.
 */
export function sortBy(arr: ObjArray, prop: string, order?: SortOrder) {
  if(isEmpty(arr)) return arr;
  const sortOrder = order === "desc" ? -1 : 1;
  return arr.sort((a, b) => {
    if (a[prop] > b[prop]) return 1 * sortOrder;
    if (a[prop] < b[prop]) return -1 * sortOrder;
    return 0;
  })
}

 /* Joins items in an array with commas and an "and" for the last element.
 * 
 * @param arr - The array of items to join.
 * @returns The joined string.
 * 
 * @example 
 * const fruits = ['apple', 'banana', 'cherry', 'date'];
 * const result = joinWithCommasAnd(fruits);
 * console.log(result); 
 * // Output: "apple, banana, cherry and date"
 */
export function joinWithCommasAnd(arr: Array<any>): string {
  const length = arr.length;
  if (length === 0) return '';
  if (length === 1) return arr[0];
  return `${arr.slice(0, length - 1).join(', ')} and ${arr[length - 1]}`;
}
