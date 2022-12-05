import StandardValidations from '@/components/Forms/validations/StandardValidations';

describe('StandardValidations.ts', () => {
  it('validate if a number is a positive integer', () => {
    expect(StandardValidations.isNumber({value: 10}, "POSITIVE_INTEGERS")).toBe(null)
    expect(StandardValidations.isNumber({value: 0.1}, "POSITIVE_INTEGERS")).toStrictEqual(["Value must be a positive whole number"])
    expect(StandardValidations.isNumber({value: -1}, "POSITIVE_INTEGERS")).toStrictEqual(["Value must be a positive whole number"])
  })

  it('validate if a number is a negative integer', () => {
    expect(StandardValidations.isNumber({value: -10}, "NEGATIVE_INTEGERS")).toBe(null)
    expect(StandardValidations.isNumber({value: 0.1}, "NEGATIVE_INTEGERS")).toStrictEqual(["Value must be a negative whole number"])
    expect(StandardValidations.isNumber({value: 1}, "NEGATIVE_INTEGERS")).toStrictEqual(["Value must be a negative whole number"])
  })

  it('validate if a number is a decimal number', () => {
    expect(StandardValidations.isNumber({value: 0.1}, "DECIMALS")).toBe(null)
    expect(StandardValidations.isNumber({value: 10}, "DECIMALS")).toStrictEqual(["Value must be a decimal number"])
    expect(StandardValidations.isNumber({value: -1}, "DECIMALS")).toStrictEqual(["Value must be a decimal number"])
  })

  it('validate if a value is a number', () => {
    expect(StandardValidations.isNumber({value: 0.1})).toBe(null)
    expect(StandardValidations.isNumber({value: 10})).toBe(null)
    expect(StandardValidations.isNumber({value: -1})).toBe(null)
    expect(StandardValidations.isNumber({value: "13"})).toBe(null)
    expect(StandardValidations.isNumber({value: "fhfb323"})).toStrictEqual(["Value must be a number"])
    expect(StandardValidations.isNumber({value: "112abc"})).toStrictEqual(["Value must be a number"])
  })
})
