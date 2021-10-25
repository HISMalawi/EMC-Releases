<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Option } from '../../FieldInterface'

export default defineComponent({
    data: () => ({
        valueInput: '' as string | number,
        optionList: [] as Option[],
        isRequired: false as boolean,
        isDisabled: false as boolean
    }),
    props: {
        required: Object,
        config: Object,
        options: Object as PropType<Option>,
        disabled: Boolean,
        defaultValue: Object as PropType<string | number | Array<any>>
    },
    emits: [
        'onValue'
    ],
    watch: {
        defaultValue: {
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
        disabled: {
            async handler(disabled: Promise<boolean>) {
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
            async handler(required: Promise<boolean>) {
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
            async handler(options: Promise<Option[]>) {
                try {
                    this.optionList = (await options) || []
                } catch(e) {
                    console.warn('options_handler', e)
                }
            },
            deep: true,
            immediate: true
        },
        valueInput: {
            handler(val: string | number) {
                if (val) {
                    this.$emit('onValue', { 
                        label: val, value: val
                    })
                } else {
                    this.$emit('onValue', null)
                }
            },
            immediate: true
        }
    }
})
</script>
