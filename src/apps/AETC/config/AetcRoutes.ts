import { AETC_GLOBAL_PROP } from "../aetc_global_props"

export default [
    {
        name: AETC_GLOBAL_PROP.SET_TOP_10_DIAGNOSIS,
        path: "/aetc/preferences/top_ten_diagnosis",
        component: () => import("@/apps/AETC/views/preferences/DefaultPreferences.vue")
    },
    {
        name: AETC_GLOBAL_PROP.SET_TOP_10_DRUGS,
        path: "/aetc/preferences/top_ten_drugs",
        component: () => import("@/apps/AETC/views/preferences/DefaultPreferences.vue")
    },
]
