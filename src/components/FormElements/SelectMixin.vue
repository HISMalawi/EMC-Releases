<script lang='ts'>
import { defineComponent } from 'vue'
import HisKeyboard from "@/components/Keyboard/HisKeyboard.vue"
import handleVirtualInput from "@/components/Keyboard/KbHandler"
import HisTextInput from "@/components/FormElements/BaseTextInput.vue";
import { Option } from '../Forms/FieldInterface'
import { QWERTY } from "@/components/Keyboard/HisKbConfigurations"
import ViewPort from "@/components/DataViews/ViewPort.vue"
import FieldMixinVue from './FieldMixin.vue';
import {
    IonList, 
    IonItem, 
    IonLabel, 
    IonGrid, 
    IonRow, 
    IonCol
} from "@ionic/vue"
import { find } from 'lodash';

export default defineComponent({
    components: { IonList, IonItem, IonLabel, HisTextInput, HisKeyboard, ViewPort, IonGrid, IonRow, IonCol },
    mixins: [FieldMixinVue],
    data: () => ({ 
        showKeyboard: false,
        selected: '',
        filter: '',
        filtered: [] as any,
        keyboard: QWERTY,
        listData: [] as Array<Option>
    }),
    created(){
        if (this.config) {
            this.showKeyboard = this.config?.showKeyboard === true
        }
    },
    watch: {
        listData: {
            handler(data: any) { if (data) this.filtered = data },
            deep: true,
            immediate: true
        },
        filter: {
            async handler(filter: string) {
                // restore initial list data if filter used is empty
                if (!filter) return this.filtered = this.listData
                /** Filter data from an external source  if config is true*/
                if (this.config?.isFilterDataViaApi) {
                    this.filtered = await this.options(this.fdata, filter)
                    // Find and select data that matches selected value
                    if (this.selected === this.filter) {
                        const foundOption = find(this.filtered, { label: this.filter})
                        if (foundOption) {
                            this.$emit('onValue', foundOption)
                        }
                    }
                    return
                }
                // Filter locallist
                this.filtered = this.listData.filter(item => this.isMatch(item.label, this.filter))
            },
            immediate: true
        }
    },
    methods: {
        isMatch(itemA: string, itemB: string){
            return itemA.match(new RegExp(itemB, 'i')) 
        },
        clearSelection() {
            this.filter = ''
            this.selected = ''
        },
        onKbValue(text: any, filtered = true) {
            // check if a selected item from list matches keyboard input. 
            // We dont want selected options to filter anything
            if (!filtered || this.selected === text) return

            this.filter = text
            this.selected = this.filter
        },
        keypress(text: any){
            if (!this.filter) this.selected = ''

            this.filter = handleVirtualInput(text, this.selected)
            this.selected = this.filter
        }
    }
})
</script>