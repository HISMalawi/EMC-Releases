import { GlobalPropertyService } from "@/services/global_property_service"

export enum CXCA_GLOBAL_PROP {
    REFERRAL_SITE_ENABLED = 'enable_referral_site'
}

function enableReferralCite(isTrue: boolean){
    return GlobalPropertyService.set(CXCA_GLOBAL_PROP.REFERRAL_SITE_ENABLED, `${isTrue}`)
}

function isReferralCiteEnabled(){
    return GlobalPropertyService.isProp(`${CXCA_GLOBAL_PROP.REFERRAL_SITE_ENABLED}=true`)
}

export default {
    enableReferralCite,
    isReferralCiteEnabled
}