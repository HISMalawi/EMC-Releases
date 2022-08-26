<template>
  <ion-label class="ion-padding-bottom bold" v-if="model.label"> 
    <span>{{ model.label }}</span>
    <span class="ion-float-right ion-margin-end checkbox-label" v-if="allowCustom">
      Add Custom {{ model.label }}?
      <ion-checkbox v-model="isCustom" @ionChange="model.value = ''"></ion-checkbox>
    </span>
  </ion-label>
  <ion-input
    v-if="isCustom"
    class="ion-margin-top"
    :class="model.error ? 'box-input-error'  : 'box-input'"
    v-model="customOption"
    :placeholder="model.placeholder || model.label"
    :disabled="model.disabled"
    @ionFocus="() => model.error = ''"
    @ionBlur="validate"
    @ionInput="onCustomValue"
  />
  <div v-else class="ion-margin-top outer-input-box box-input" :class="{'box-input-error': model.error }">
    <div class="inner-input-box">
      <div style="display: flex; flex-wrap: wrap;" @click="onShowOptions">
        <ion-label v-if="showPlaceholder" class="input-placeholder" contenteditable>{{ model.placeholder || 'select option' }}</ion-label>
        <ion-chip v-for="(tag, index) of tags" :key="index">
          <ion-label>{{ tag.label }}</ion-label>
          <ion-icon :icon="closeCircle" color="danger" @click="diselect(tag)" style="z-index: 90"></ion-icon>
        </ion-chip>
        <ion-input :disabled="!searchable" v-model="filter" class="search-input" ref="searchInput" />
      </div>
      <div class="input-options" v-if="showOptions">
        <ion-list>
          <ion-item 
            v-for="(option, index) of filteredOptions" 
            :key="index"
            :lines="index + 1 === filteredOptions.length ? 'none' : ''"
            @click="onSelect(option)"
          >
            <ion-checkbox class="input-option-checkbox" slot="start" v-model="option.isChecked" v-if="multiple"></ion-checkbox>
            <ion-label>{{ option.label }}</ion-label>
          </ion-item>
        </ion-list>
        <!-- <ion-infinite-scroll @ionInfinite="pushMoreOptions($event)" threshold="100px" :disabled="!infiniteScrolling" >
          <ion-infinite-scroll-content loading-spinner="crescent" loading-text="Loading more data..." />
        </ion-infinite-scroll> -->
      </div>
      <div class="input-icon">
        <ion-icon :icon="close" v-if="filter || tags.length > 0" @click="onReset"></ion-icon>
        <ion-icon :icon="showOptions ? chevronUp : chevronDown" @click="showOptions ? onCloseOptions() : onShowOptions()"></ion-icon>
      </div>
    </div>
  </div>
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonCheckbox, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonLabel, IonNote } from "@ionic/vue";
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref, watch } from "vue";
import { DTForm, DTFormField } from "../../interfaces/dt_form_field";
import { Option } from '@/components/Forms/FieldInterface';
import { chevronDown, chevronUp, close, closeCircle } from "ionicons/icons"
import { filter, isEmpty } from "lodash";

export default defineComponent({
  name: "SelectInput",
  props: {
    modelValue: {
      type: Object as PropType<DTFormField>,
      default: () => ({}),
    },
    form: {
      type: Object as PropType<DTForm>,
      default: () => ({}),
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    asyncOptions: {
      type: Function as PropType<(filter: string, page: number) => Promise<Option[]>>,
      required: false,
    },
    allowCustom: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    infiniteScrolling: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonLabel,
    IonInput,
    IonNote,
    IonIcon,
    IonCheckbox,
    // IonInfiniteScroll, 
    // IonInfiniteScrollContent
  },
  emits: ["update:modelValue"],
  setup(props, { emit}) {
    const isCustom = ref(false);
    const customOption = ref('')
    const selectedOption = ref<Option>();
    const showOptions = ref(false)
    const filter = ref('')
    const filteredOptions = ref<Option[]>([])
    const currentPage = ref(1)

    const tags = computed<Option[]>(() => {
      if(props.multiple) return filteredOptions.value.filter(({ isChecked }) => isChecked)
      return selectedOption.value ? [ selectedOption.value ] : []
    })

    const showPlaceholder = computed(() => {
      return !filter.value && isEmpty(tags.value) &&  !showOptions.value
    })

    const model = computed<DTFormField>({
      get: () => props.modelValue as DTFormField,
      set: (value) => emit("update:modelValue", value)
    })

    const setDefaults = () => {
      if(isEmpty(model.value.value)) return
      if (Array.isArray(model.value.value) && props.multiple) {
        return model.value.value.forEach((option: Option) => {
          const index = filteredOptions.value.findIndex(({ value }: Option) => value === option.value)
          if(index === -1) {
            filteredOptions.value.push({...option, isChecked: true})
          } else {
            filteredOptions.value[index].isChecked = true
          }
        })
      }
      const defaultOption = filteredOptions.value.find(option => option.value === model.value.value)
      if (defaultOption) {
        selectedOption.value = defaultOption
      }else {
        selectedOption.value = {
          label: model.value.value,
          value: model.value.value
        }
      }
    }

    const filterOptions = async () => {
      const filtered = typeof props.asyncOptions === 'function' 
        ? await props.asyncOptions(filter.value, currentPage.value)
        : props.options.filter(({label}) => label.toLowerCase().includes(filter.value.toLowerCase()))

      tags.value.forEach(tag => {
        const index = filtered.findIndex(f => f.value === tag.value)
        if(index === -1) filtered.push(tag)
        else filtered[index].isChecked = true
      })
      
      filteredOptions.value = filtered
    }

    const pushMoreOptions = async (event: any) => {
      if(props.infiniteScrolling && typeof props.asyncOptions === 'function'){
        currentPage.value++;
        const data = await props.asyncOptions(filter.value, currentPage.value);
        if (data.length > 0) {
          filteredOptions.value = [
            ...filteredOptions.value, 
            ...data.filter(entry => !filteredOptions.value.find(item => item.value === entry.value))
          ];
        } else {
          event.target.disabled = true
        }        
      }
      event.target.complete();
    }

    const validate = async () => {
      if (model.value.required && isEmpty(model.value.value)) {
        return model.value.error = "This field is required";
      }
      if (model.value.validation) {
        const errors = await model.value.validation({label: model.value.value, value: model.value.value}, props.form);
        if (errors && errors.length) {
          return model.value.error += errors.toString();
        }
      }
      return model.value.error = "";
    };

    const onCloseOptions = () => {
      showOptions.value = false;
      model.value.value = props.multiple ? tags.value : !isEmpty(tags.value) ? tags.value[0] : undefined
      filter.value = ''
      validate()
    }

    const onShowOptions = () => {
      showOptions.value = true
      model.value.error = ''
    }

    const onCustomValue = () => {
      model.value.value = {
        label: customOption.value,
        value: customOption.value
      }
    }

    const onSelect = (item: Option) => {  
      if(!props.multiple) {
        selectedOption.value = item
        onCloseOptions()
      }
      model.value.value = props.multiple ? tags.value : !isEmpty(tags.value) ? tags.value[0] : undefined
      filter.value = ''
    }

    const diselect = (tag: Option) => {
      if(props.multiple) return tag.isChecked = false
      return selectedOption.value = undefined
    }

    const onReset = () => {
      filter.value = '';
      selectedOption.value = undefined;
      filteredOptions.value.forEach(option => option.isChecked = false)
    }

    watch(filter, async() => {
      currentPage.value++;
      await filterOptions()
    })

    watch([() => props.options, () => props.asyncOptions], async () => filterOptions())

    onMounted(async () => {
      await filterOptions()
      setDefaults()
      addEventListener('click', (e: any) => {
        const isClosest = e.target.closest('.inner-input-box')
        if(!isClosest && showOptions.value) {
          onCloseOptions()
        }
      })
    });

    onBeforeUnmount(() => removeEventListener('click', e => console.log(e)))

    return {
      validate,
      onSelect,
      onReset,
      onShowOptions,
      onCloseOptions,
      diselect,
      pushMoreOptions,
      onCustomValue,
      model,
      customOption,
      isCustom,
      chevronDown,
      chevronUp,
      close,
      closeCircle,
      selectedOption,
      showOptions,
      showPlaceholder,
      filteredOptions,
      filter,
      tags,
    };
  }
});
</script>

<style scoped>
.outer-input-box {
  width: 100%; 
  height: fit-content; 
  background-color: #fff;
}

.inner-input-box {
  position: relative; 
  width: 100%; 
}

.search-input {
  height: 2.5rem;
  width: 100%;
  display: inline-block;
}

.input-options {
  position: absolute;
  width: 100%;
  max-height: 25rem;
  overflow-y: auto;
  background-color: #fff;
  z-index: 100;
  border-radius: 0.25rem;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}
.input-icon {
  font-size: 12px !important;
  position: absolute;
  top: 0;
  right: 0;
  height: 2.5rem;
  width: 2rem;
  color: rgb(138, 138, 138);
  padding-right: .5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 90;
}
.input-option-checkbox {
  --size: 18px !important;
}
.input-placeholder {
  color: #a0a0a0;
  margin: 0.5rem;
}
</style>