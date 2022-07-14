<template>
    <ion-grid> 
        <ion-row>
            <ion-col 
                v-for="(item, index) in viewableItems" 
                :key="index"
                size-lg="4"
                size-sm="12"
                >
                <task-card
                    @click="onClick(item)"
                    :title="item.name"
                    :icon="itemIcon(item)"
                >
                </task-card>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TaskCard from "@/components/DataViews/TaskCard.vue";
import { FolderInterface } from "@/apps/interfaces/AppInterface"
import img from '@/utils/Img'
import {
    IonGrid,
    IonRow,
    IonCol
} from "@ionic/vue";
import { arrowBack } from 'ionicons/icons';
export default defineComponent({
    setup() {
        return {
            arrowBack
        }
    },
    components: { 
        TaskCard,
        IonGrid,
        IonRow,
        IonCol
    },
    props: {
        resetList: {
            type: Number,
            required: true
        },
        items: {
            type: Object as PropType<FolderInterface[]>,
            required: true
        }
    },
    data: () => ({
        defaultIcon: 'sys-setting.png' as string,
        viewableItems: [] as any
    }),
    watch: {
        resetList: {
            handler() {
                this.setItems(this.items)  
            }
        },
        items: {
            async handler(items: FolderInterface[]) {
                if (items) this.setItems(items)
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        async setItems(items: any) {
            this.viewableItems = await this.filterViewable(items)
        },
        async filterViewable(items: any) {
            const verified: any = items.map(async (i: any) => {
                const d: any = {...i}
                d.canShow = d.condition ? await d.condition() : true
                return d
            })
            return (await Promise.all(verified)).filter((i: any) => i.canShow)
        },
        async onClick(item: any){
            if (item.pathUrl) {
                this.$router.push(item.pathUrl)
            } else if (typeof item.action === 'function') {
                item.action()
            } else if (item.pathName) {
                this.$router.push({ name: item.pathName })
            } else if (item.files) {
                this.defaultIcon = 'sys-setting.png'
                if (item.defaultFilesIcon) {
                    this.defaultIcon = item.defaultFilesIcon
                }
                this.setItems(item.files)
            }
        },
        itemIcon(item: any) {
            return img(item.icon ? item.icon : this.defaultIcon)
        }
    }
})
</script>
