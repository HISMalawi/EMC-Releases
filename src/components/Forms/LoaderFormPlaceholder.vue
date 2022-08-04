<template>
    <view-port> 
        <text-skeleton :itemCount="6"/>
    </view-port>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TextSkeleton from "@/components/TextSkeleton.vue"
import ViewPort from "@/components/DataViews/ViewPort.vue"
export default defineComponent({
    components: {
        TextSkeleton,
        ViewPort
    }
})
</script>
