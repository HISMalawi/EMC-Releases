<script lang="ts">
import { defineComponent } from 'vue'
import { Option } from '../../FieldInterface'

export default defineComponent({
    data: () => ({
        valueInput: '' as string | number,
        valueOption: {} as Option | null,
        checkedOptionList: [] as Option[] | null,
        optionList: [] as Option[],
        isRequired: false as boolean,
        isDisabled: false as boolean
    }),
    props: {
        required: {
            type: Boolean,
            default: true
        },
        config: {
            type: Object,
            default: ()=>({})
        },
        options: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        defaultCheckedOptions: {
            type: Array,
            default: () => []
        },
        defaultValueOption: {
            type: Object,
            default: () => ({})
        },
        defaultValueInput: {
            type: String,
            default: ''
        }
    },
    emits: [
        'onValue'
    ],
    watch: {
        defaultValueInput: {
            async handler(value: Promise<string | number>) {
                try{
                    this.valueInput = await value
                }catch(e){
                    console.warn('default_value_handler', e)
                }
            },
            deep: true,
            immediate: true
        },
        defaultValueOption: {
            async handler(value: Promise<Option> | Option) {
                try{
                    this.valueOption = await value
                }catch(e){
                    console.warn('default_value_handler', e)
                }
            },
            deep: true,
            immediate: true
        },
        defaultCheckedOptions: {
            async handler(value: Promise<Option[]> | Option[] | null) {
                try{
                    this.checkedOptionList = await value
                }catch(e){
                    console.warn('default_value_handler', e)
                }
            },
            deep: true,
            immediate: true
        },
        disabled: {
            async handler(disabled: Promise<boolean> | boolean) {
                try {
                    this.isDisabled = await disabled
                }catch(e) {
                    console.warn('disabled_handler',e)
                }
            },
            deep: true,
            immediate: true
        },
        required: {
            async handler(required: Promise<boolean> | boolean) {
                try {
                    this.isRequired = await required
                } catch(e) {
                    console.warn('required_handler', e)
                }
            },
            deep: true,
            immediate: true
        },
        options: {
            async handler(options: Promise<Option[]> | Option[]) {
                try {
                    this.optionList = (await options) || []
                } catch(e) {
                    console.warn('options_handler', e)
                }
            },
            deep: true,
            immediate: true
        },
        valueOption(option: Option | null) {
            this.$emit('onValue', option)
        },
        checkedOptionList(option: Option | null) {
            this.$emit('onValue', option)
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
    }
})
</script>
