import { GlobalPropertyService } from "@/services/global_property_service"

export enum OPD_GLOBAL_PROP {
    PACS_ENABLED = 'enable_pacs'
}

function enablePACs(isTrue: boolean){
    return GlobalPropertyService.set(OPD_GLOBAL_PROP.PACS_ENABLED, `${isTrue}`)
}

function isPACsEnabled(){
    return GlobalPropertyService.isProp(`${OPD_GLOBAL_PROP.PACS_ENABLED}=true`)
}

export default {
    enablePACs,
    isPACsEnabled
}