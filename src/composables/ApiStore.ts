import { ref } from "vue";
import DEFS from "@/composables/storeDefs"

// Track all cached items in this reactive object
const STATES = ref({} as any)

export default {
    /**
     * Getter for retrieving data from cache or regenerating it if necessary.
     * Regenerating data is based on hook "canReloadCache"
     * @param name 
     * @param params 
     * @returns 
     */
    async get(name: string, params={} as any) {
        if (name in DEFS) {
            const p = params || {}
            if (typeof DEFS[name]?.canReloadCache === 'function' && 
                DEFS[name]?.canReloadCache(p, STATES.value[name])) {
                STATES.value[name] = await DEFS[name]?.get(p)
            }
            return STATES.value[name]
        } else {
            throw `Store ${name} not found`
        }
    },
    set(name: string, data: any) {
        STATES.value[name] = data
        return STATES.value[name]
    },
    invalidate(name: string) { 
        STATES.value[name] = undefined
    },
    invalidateAll() {
        Object.keys(STATES.value).forEach(k => {
            STATES.value[k] = undefined
        })
    }
}
