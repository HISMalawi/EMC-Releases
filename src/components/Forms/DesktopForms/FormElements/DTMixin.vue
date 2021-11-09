<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Option } from '../../FieldInterface'
import { DtFieldInterface } from '../DTFieldInterface'
import { isEmpty } from "lodash"

export default defineComponent({
    data: () => ({
        valueInput: '' as string | number,
        valueOption: {} as Option | null,
        checkedOptionList: [] as Option[] | null,
        optionList: [] as Option[],
        isRequired: true as boolean,
        isDisabled: false as boolean
    }),
    props: {
        clear: {
            type: String
        },
        fdata: {
            type: Object,
            required: true
        },
        cdata: {
            type: Object,
            required: true
        },
        config: {
            type: Object
        },
        formUpdate: {
            type: Object as PropType<{
                field: string;
                value: Option | Option[] | null;
            }>,
            required: true
        },
        field: {
            required: true,
            type: Object as PropType<DtFieldInterface>
        }
    },
    emits: [
        'onValue'
    ],
    watch: {
        clear(f: string) {
            if (f === this.field.id || f === 'ALL') {
                this.valueInput = ''
                this.valueOption = null
                this.checkedOptionList = []
            }
        },
        field: {
            async handler(field: DtFieldInterface) {
                if (!field) 
                    return

                if (field.options)
                    this.optionList = await field.options

                if (typeof field.required === 'boolean')
                    this.isRequired = field.required

                if (typeof field.disabled === 'boolean')
                    this.isDisabled = field.disabled
            },
            immediate: true,
            deep: true
        },
        formUpdate: {
            async handler({field, value}) {
                if (!(field && value) || !this.field) 
                    return

                if (this.field.onUpdateOptions) {
                    const res = await this.updateObserver(
                        this.field.onUpdateOptions, 
                        field, 
                        value
                    )
                    if (res != undefined) this.optionList = res
                }

                if (this.field.onUpdateDefaultValueInput) {
                    const res = await this.updateObserver(
                        this.field.onUpdateDefaultValueInput, 
                        field, 
                        value
                    )
                    if (res != undefined) this.valueInput = res
                }

                if (this.field.onUpdateDefaultValueOption) {
                    const res = await this.updateObserver(
                        this.field.onUpdateDefaultValueOption, 
                        field, 
                        value
                    )
                    if (res != undefined) this.valueOption = res
                }

                if (this.field.onUpdateDisabled) {
                    const res = await this.updateObserver(
                        this.field.onUpdateDisabled, 
                        field, 
                        value
                    )
                    if (res != undefined) this.isDisabled = res
                }

                if (this.field.onUpdateDefaultCheckOptions) {
                    const res = await this.updateObserver(
                        this.field.onUpdateDefaultCheckOptions, 
                        field, 
                        value
                    )
                    if (res != undefined) this.checkedOptionList = res
                }
            },
            deep: true
        },
        valueOption(option: Option | null) {
            this.$emit('onValue', option)
        },
        checkedOptionList: { 
            handler(option: Option | null) {
                this.$emit('onValue', option) 
            },
            deep: true
        },
        valueInput(val: string | number | boolean) {
            if (val) {
                this.$emit('onValue', { 
                    label: val, value: val
                })
            } else {
                this.$emit('onValue', null)
            }
        }
    },
    methods: {
        updateObserver(watcher: any, field: string, value: any) {
            if (watcher === undefined) 
                return
            if (isEmpty(watcher.observes) || watcher.observes.includes(field)) 
            {
                return watcher.update(
                    field, value, this.fdata, this.cdata
                )
            }
        }
    }
})
</script>
