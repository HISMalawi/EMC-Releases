export const nationalIDRegex = /^(?=[a-zA-Z0-9]*$)(?=\d+[a-zA-Z]|[a-zA-Z]+\d)([a-zA-Z\d]){8}$/

export function isValidNationalID (id: string) {
  return nationalIDRegex.test(id)
}