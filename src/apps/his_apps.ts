import ART from "@/apps/ART/app";
import LOS from "@/apps/LOS/app";
import EMC from "@/apps/EMC/app";
import ANC from '@/apps/ANC/app';
import CXCA from '@/apps/CxCa/app';
import RADIOLOGY from '@/apps/RADIOLOGY/app';
import Registration from '@/apps/Registration/app';
import OPD from "./OPD/app";

/**
 * Register Program Applications here that conform to the AppInterface
*/
export default [ 
    ART,
    LOS,
    OPD,
    ANC,
    CXCA,
    RADIOLOGY,
    Registration,
    EMC,
]
