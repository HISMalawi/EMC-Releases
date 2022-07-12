import ART from '@/apps/ART/app';
import LOS from '@/apps/LOS/app';
import OPD from '@/apps/OPD/app';
import ANC from '@/apps/ANC/app'
import CXCA from '@/apps/CxCa/app';
import { RouteRecordRaw } from 'vue-router';
/**
 * Register Program Applications here that conform to the AppInterface
*/
const APPS = [
    ART,
    LOS,
    OPD,
    ANC,
    CXCA
]
export function  AllAppRoutes() {
    return APPS.reduce((all, app) => 
        all.concat(app.appRoutes), [] as RouteRecordRaw[])
}
export default APPS
