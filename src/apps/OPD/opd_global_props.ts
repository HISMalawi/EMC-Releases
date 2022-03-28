import { GlobalPropertyService } from "@/services/global_property_service"

export enum OPD_GLOBAL_PROP {
    PACS_ENABLED = 'enable_pacs'
}


function enablePACs(isTrue: boolean){
    return GlobalPropertyService.set(OPD_GLOBAL_PROP.PACS_ENABLED, `${isTrue}`)
}

function isPACsEnabled(){
    return GlobalPropertyService.get(OPD_GLOBAL_PROP.PACS_ENABLED)
}

export default {
    enablePACs,
    isPACsEnabled
}