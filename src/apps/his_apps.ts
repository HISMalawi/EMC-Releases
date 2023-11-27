import ART from "@/apps/ART/app";
import LOS from "@/apps/LOS/app";
import EMC from "@/apps/EMC/app";
import ANC from '@/apps/ANC/app';
import CXCA from '@/apps/CxCa/app';
import AETC from '@/apps/AETC/app';
import { RouteRecordRaw } from 'vue-router';
import RADIOLOGY from '@/apps/RADIOLOGY/app';
import Registration from '@/apps/Registration/app';
import OPD from "./OPD/app";
import CRVS from '@/apps/CRVS/app';
import SPINE from '@/apps/SPINE/app';

/**
 * Register Program Applications here that conform to the AppInterface
*/
const APPS = [
    ART,
    LOS,
    OPD,
    ANC,
    CXCA,
    AETC,
    SPINE,
    RADIOLOGY,
    Registration,
    EMC,
    CRVS,
    Registration
]
export function  AllAppRoutes() {
    return APPS.reduce((all, app) => 
        all.concat(app.appRoutes), [] as RouteRecordRaw[])
}
export default APPS
