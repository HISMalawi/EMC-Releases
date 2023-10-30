import { ObsValue, ObservationService } from "@/services/observation_service"
import { DTForm } from "../interfaces/dt_form_field"
import { Option } from "@/components/Forms/FieldInterface";
import { toUnderscores } from "@/utils/Strs";
import { isEmpty } from "lodash";
import { loader } from "@/utils/loader";
import { toastWarning } from '@/utils/Alerts';

export async function isValidForm(form: DTForm) {
  for (const key in form) {
    const { required, value, validation } = form[key];
    if (required && isEmpty(value)) {
      form[key].error = "This field is required";
      continue;
    }
    if (typeof validation === 'function') {
      const payload = typeof value === 'object' ? value : { label: value, value };
      const errs = await validation(payload as Option, form);
      form[key].error = isEmpty(errs) ? "" : (errs as Array<string>).join();
    }
    else {
      form[key].error = '';
    }
  }
  return Object.values(form).every(({ error }) => !error);
}


export function resolveFormValues(form: DTForm, underscoreKeys = false) {
  const formData: any = {}
  const computedFormData: any = {}
  for (const key in form) {
    const { value, computedValue } = form[key];
    if(value) {
      const fKey = underscoreKeys ? toUnderscores(key) : key
      formData[fKey] = value
      if(typeof computedValue === 'function') {
        computedFormData[fKey] = computedValue(form[key].value, form)
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

export function optionsToGroupObs (conceptName: string, options: Option[]) {
  return Promise.all(options.map(async (option) => {
    return ObservationService.buildGroupValueCoded(conceptName, option.label, option.isChecked ? 'Yes' : 'No')
  }))
}

type SubmitFormCallback = (formData: Record<string, any>, computedData: Record<string, any>) => Promise<void> | void
interface SubmitOptios {
  showloader?: boolean;
  underscoreKeys?: boolean;
}

export async function submitForm (form: DTForm, callback: SubmitFormCallback, options?: SubmitOptios) {
  if(!await isValidForm(form)) return
  const showloader = options?.showloader || false
  try {
    if (showloader) await loader.show()
    const {formData, computedFormData} = resolveFormValues(form, options?.underscoreKeys)
    await callback(formData, computedFormData)
  } catch (error) {
    toastWarning(`${error}`)
    console.error(error)
  } finally {
    if(showloader) await loader.hide()
  }
}