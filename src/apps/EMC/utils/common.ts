export function sortByARV(arvNumber: string) {
  return parseInt(arvNumber.split("-")[2]) || 0
}