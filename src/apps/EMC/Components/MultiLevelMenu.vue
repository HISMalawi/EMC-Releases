<template>
  <div class="custom-side-menu">
    <ion-list class="accordion-menu">
      <template v-for="item of menuList" :key="item.id">
        <template v-if="showItem(item)">
          <template v-if="!item.children">
            <ion-menu-toggle auto-hide="true">
              <router-link :to="item.url || '#'" #="{ isActive, isExactActive}">
                <ion-item button :color="isActive && isExactActive ? 'primary' : ''">
                  <img v-if="item.img" :src="img(item.img)" class="ion-margin-end icon" />
                  <ion-icon v-if="item.icon" :icon="item.icon" slot="start"></ion-icon>
                  <ion-label>{{ item.title }}</ion-label>
                </ion-item>
              </router-link>
            </ion-menu-toggle>
          </template>
          <template v-else>
            <ion-item button detail :detail-icon="item.isExpanded ? chevronDown : chevronForward" class="header" @click="() => item.isExpanded = !item.isExpanded">
              <img v-if="item.img" :src="img(item.img)" class="ion-margin-end icon" />
              <ion-icon v-if="item.icon" slot="start" :icon="item.icon"></ion-icon>
              <ion-label >{{ item.title }}</ion-label>
            </ion-item>
            <div :style="{ height: item.isExpanded ? (optionHeight * (getActiveChildrens(item) + activeChildrenLength)) + 'px' : '0px' }" class="options">
              <template v-for="subItem of item.children" :key="subItem.id">
                <template v-if="showItem(subItem)">
                  <template v-if="!subItem.children">
                    <ion-menu-toggle auto-hide="true">
                      <router-link :to="subItem.url || '#'" #="{ isActive, isExactActive}">
                        <ion-item button :color="isActive && isExactActive ? 'primary' : ''" :style="{ paddingLeft:  '16px' }">
                          <img v-if="subItem.img" :src="img(subItem.img)" class="ion-margin-end icon" />
                          <ion-icon v-if="subItem.icon" :icon="subItem.icon" slot="start"></ion-icon>
                          <ion-label>{{ subItem.title }}</ion-label>
                        </ion-item>
                      </router-link>
                    </ion-menu-toggle>
                  </template>
                  <template v-else>
                    <ion-item button detail :detail-icon="subItem.isExpanded ? chevronDown : chevronForward" :style="{ paddingLeft: '16px' }" class="header" @click="toggle(subItem)">
                      <img v-if="subItem.img" :src="img(subItem.img)" class="ion-margin-end icon" />
                      <ion-icon v-if="subItem.icon" slot="start" :icon="subItem.icon"></ion-icon>
                      <ion-label >{{ subItem.title }}</ion-label>
                    </ion-item>
                    <div :style="{ height: subItem.isExpanded ? (optionHeight * subItem.children.length) + 'px' : '0px' }" class="options">
                      <template v-for="subItem2 of subItem.children" :key="subItem2.id">
                        <template v-if="showItem(subItem2)">
                          <ion-menu-toggle auto-hide="true">
                            <router-link :to="subItem2.url || '#'" #="{ isActive, isExactActive}">
                              <ion-item button :color="isActive && isExactActive ? 'primary' : ''" :style="{ paddingLeft: '32px' }">
                                <img v-if="subItem2.img" :src="img(subItem2.img)" class="ion-margin-end icon" />
                                <ion-icon v-if="subItem2.icon" :icon="subItem2.icon" slot="start"></ion-icon>
                                <ion-label>{{ subItem2.title }}</ion-label>
                              </ion-item>
                            </router-link>
                          </ion-menu-toggle>
                        </template>
                      </template>
                    </div>
                  </template>
                </template>
              </template>
            </div>
          </template>
        </template>
      </template>
    </ion-list>
  </div>
</template>

<script lang="ts">
import { IonItem, IonList, IonLabel, IonIcon, IonMenuToggle } from "@ionic/vue";
import { defineComponent, PropType, ref } from "vue";
import { MenuItem } from "../interfaces/menu";
import { chevronDown, chevronForward } from "ionicons/icons";
import img from "@/utils/Img";

export default defineComponent({
  name: "MultiLevelMenu",
  props: {
    items: {
      type: Array as PropType<Array<MenuItem>>,
      default: () => [],
    },
  },
  components: {
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonMenuToggle,
  },
  setup(props) {
    const optionHeight = ref(50)
    const activeChildrenLength = ref(0)
    const menuList = ref([...props.items])
    
    const showItem = (item: MenuItem) => {
      if(typeof item.condition === 'function') return item.condition()
      return item.condition !== false 
    }

    const getActiveChildrens = (item: MenuItem) => {
      return item.children?.filter(child => showItem(child)).length || 0
    } 

    const toggle = (item: MenuItem) => {
      item.isExpanded = !item.isExpanded;
      activeChildrenLength.value = item.isExpanded 
        ? getActiveChildrens(item)
        : 0;
    }

    return {
      activeChildrenLength,
      optionHeight,
      menuList,
      chevronDown, 
      chevronForward,
      toggle,
      showItem,
      getActiveChildrens,
      img,
    }
  },
})
</script>

<style scoped>
.custom-side-menu {
  margin-top: 45px;
  border-top: 1px solid #c2c2c2;
}

.custom-side-menu img {
  width: 25px;
  height: 25px;
  margin-right: 16px;
}

.custom-side-menu ion-menu ion-content .scroll-content::-webkit-scrollbar {
  display: none;
}

.custom-side-menu ion-item [item-left],
.custom-side-menu ion-item [item-right] {
  margin-left: 0;
}

.custom-side-menu ion-item ion-icon[item-left]+.item-inner,
.custom-side-menu ion-item ion-icon[item-left]+.item-input {
  margin-left: 8px;
}

.custom-side-menu ion-list.accordion-menu ion-item {
  --background: $header-color-bg;
  color: var(--ion-color-medium);
  font-weight: bold;
  font-size: 14px;
}

.custom-side-menu ion-list.accordion-menu ion-item.header ion-icon.header-icon {
  will-change: transform;
  transition: transform 0.2s ease;
}

.custom-side-menu ion-list.accordion-menu ion-item.header ion-icon.header-icon.rotate {
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
}

.custom-side-menu ion-list.accordion-menu div.options {
  will-change: height;
  overflow-y: hidden;
  height: 0;
}

.custom-side-menu ion-list.accordion-menu ion-item.item.item-block.item-ios.no-icon .item-inner {
  margin-left: 48px;
}

.custom-side-menu ion-list.accordion-menu ion-item.item.item-block.item-md.no-icon .item-inner,
.custom-side-menu ion-list.accordion-menu ion-item.item.item-block.item-wp.no-icon .item-inner {
  margin-left: 40px;
}

.custom-side-menu .active {
  background: var(--ion-color-primary);
  color: var(--ion-color-dark) !important;
}

a {
  text-decoration: none !important;
}
</style>