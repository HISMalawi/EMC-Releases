import { ObsValue, ObservationService } from "@/services/observation_service"
import { isEmpty } from "lodash"
import { DTForm } from "../interfaces/dt_form_field"
import { Option } from "@/components/Forms/FieldInterface";

export function isValidForm (form: DTForm) {
  for (const key in form) {
    if (form[key].required && !form[key].value) {
      form[key].error = "This field is required";
      continue;
    }
    if(typeof form[key].validation !== 'function') {
      form[key].error = ''
      continue
    }
    const payload = typeof form[key].value === 'object'
        ? form[key].value
        : { label: form[key].value, value: form[key].value }

    const errs = form[key].validation!(payload as Option, form)
    if(errs && errs.length > 0) {
      form[key].error = errs.toString()
      console.log(key, form[key].error)
    } else {
      form[key].error = ''
    }       
  }
  return Object.values(form).every(({ error }) => !error)
}

export function resolveFormValues(form: DTForm){
  const formData: any = {}
  const computedFormData: any = {}
  for (const key in form) {
    if(form[key].value) {
      formData[key] = typeof form[key].value === 'object' ? form[key].value.value : form[key].value
      if(typeof form[key].computedValue === 'function') {
        computedFormData[key] = form[key].computedValue!(form[key].value)
      }
    }
  }
  return { formData, computedFormData }
}

export function resolveObs (obs: any, tag=''): Promise<ObsValue[]> {
  const values: any = Object.values(obs)
    .filter((d: any) => d && (d.tag === tag || tag === ''))
    .reduce((accum: any, cur: any) => { 
      const data = cur.obs ? cur.obs : cur
      if (Array.isArray(data)) {
        accum = accum.concat(data)
      } else {
          accum.push(data)
      }
      return accum
    }, [])
  return Promise.all(values)
}

export async function optionsToGroupObs (conceptName: string, options: Option[]) {
  return await Promise.all(options.map(async (option) => {
    return ObservationService.buildGroupValueCoded(conceptName, option.label, option.isChecked ? 'Yes' : 'No')
  }))
}