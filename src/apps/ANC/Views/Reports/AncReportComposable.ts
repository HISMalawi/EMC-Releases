import Validation from "@/components/Forms/validations/StandardValidations"
import { FieldType } from '@/components/Forms/BaseFormElements'
import { Option } from '@/components/Forms/FieldInterface'
import { isPlainObject } from 'lodash'
import HisDate from "@/utils/Date"
import { Service } from "@/services/service"

export interface WindowPrintParamInterface {
    containerID: string;
    cssFile: string;
}

// Short function name for formating dates
function fd(date: string) {
    return HisDate.toStandardHisDisplayFormat(date)
}

function showPrintWindow(params: WindowPrintParamInterface) {
    const printW = open('', '', 'width:1024px, height:768px')
    const content = document.getElementById(params.containerID)
    if (content && printW) {
        printW.document.write(`
            <html>
            <head>
                <title>Print Cohort</title>
                <link rel="stylesheet" media="print"  href="${params.cssFile}"/>
            </head>
            <body>
                ${content.innerHTML}
            </body>
            </html>
        `)
        setTimeout(() => { printW.print(); printW.close() }, 3500)
    }
}

function getMonthlyReportFields() {
    return [
        {
            id: 'year',
            helpText: 'Select Year',
            type: FieldType.TT_NUMBER,
            computedValue: (v: Option) => v.value,
            validation: (v: Option) => {
                const year = isPlainObject(v) ? v.value : -1
                return Validation.validateSeries([
                    () => Validation.required(v),
                    () => {
                        if (isNaN(parseInt(`${year}`))) {
                            return ['Invalid year']
                        }
                        return null
                    },
                    () => Validation.rangeOf(v, 2000, HisDate.getYear(Service.getSessionDate()))
                ])
            }
        },
        {
            id: 'month',
            helpText: 'Select Month',
            type: FieldType.TT_SELECT,
            validation: (v: Option) => Validation.required(v),
            computedValue: (v: Option) => v.value,
            options: () => {
                return [
                    {label: 'January', value: '01'},
                    {label: 'February', value: '02'},
                    {label: 'March', value: '03'},
                    {label: 'April', value: '04'},
                    {label: 'May', value: '05'},
                    {label: 'June', value: '06'},
                    {label: 'July', value: '07'},
                    {label: 'August', value: '08'},
                    {label: 'September', value: '09'},
                    {label: 'October', value: '10'},
                    {label: 'November', value: '11'},
                    {label: 'December', value: '12'}
                ]
            }
        }
    ]
}

export function AncReportComposable() {
    return {
        fd,
        getMonthlyReportFields,
        showPrintWindow
    }
}