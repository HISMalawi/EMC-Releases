import { Option } from "@/components/Forms/FieldInterface"

export function resolveObs(obs: any, tag = '') {
  const values: any = Object.values(obs)
    .filter((d: any) => d && (d.tag === tag || tag === ''))
    .reduce((accum: any, cur: any) => {
      const data = cur.obs ? cur.obs : cur
      if (Array.isArray(data)) {
        accum = accum.concat(data)
      } else if (typeof data === 'function') {
        accum.push(data())
      } else {
        accum.push(data)
      }
      return accum
    }, [])
  return Promise.all(values)
}

export function mapStrToOptions(options: Array<string>): Array<Option> {
  return options.map(option => ({ label: option, value: option }));
}

export function yesNoUnknownOptions() {
  return mapStrToOptions(["Yes", "No", "Unknown"]);
}

export function yesNoOptions() {
  return mapStrToOptions(["Yes", "No"]);
}

export function toYesNoOption(label: string, other: any={}): Option {
  return {
      label,
      value: '',
      other: {
          ...other,
          values: yesNoOptions()
      }
  } 
}