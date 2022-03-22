import { GlobalPropertyService } from "@/services/global_property_service";

export enum GLOBAL_PROP {
    MILITARY_SITE = 'military_site',
    HEALTH_CENTER_ID = 'current_health_center_id',
    SITE_PREFIX = 'site_prefix',
    SITE_UUID = 'site_uuid',
    PORTAL_ENABLED = 'portal.enabled',
    PORTAL_PROPERTIES = 'portal.properties',
    DDE_ENABLED = 'dde_enabled',
    PACS_ENABLED = 'pacs_enabled'
}

function ddeEnabled() {
    return GlobalPropertyService.isProp(`${GLOBAL_PROP.DDE_ENABLED}=true`)
}

function militarySiteEnabled() {
    return GlobalPropertyService.isProp(`${GLOBAL_PROP.MILITARY_SITE}=true`)
}

function portalEnabled() {
    return GlobalPropertyService.isProp(`${GLOBAL_PROP.PORTAL_ENABLED}=true`)
}

function siteUUID() {
    return GlobalPropertyService.get(GLOBAL_PROP.SITE_UUID)
}

function sitePrefix() {
    return GlobalPropertyService.get(GLOBAL_PROP.SITE_PREFIX)
}

function portalProperties() {
    return GlobalPropertyService.get(GLOBAL_PROP.PORTAL_PROPERTIES)
}

function healthCenterID() {
    return GlobalPropertyService.get(GLOBAL_PROP.HEALTH_CENTER_ID)
}

function setHealthCenterID(centerID: string) {
    return GlobalPropertyService.set(GLOBAL_PROP.HEALTH_CENTER_ID, centerID)
}

function siteCode() {
    return GlobalPropertyService.get(GLOBAL_PROP.SITE_PREFIX)
}

function setSitePrefix(prefix: string) {
    return GlobalPropertyService.set(GLOBAL_PROP.SITE_PREFIX, prefix)
}

function setPortalIP(ipAddress: string) {
    return GlobalPropertyService.set(GLOBAL_PROP.PORTAL_PROPERTIES, ipAddress)
}

function setPortalEnabled(isTrue: boolean) {
    return GlobalPropertyService.set(GLOBAL_PROP.PORTAL_ENABLED, `${isTrue}`)
}

function PACsEnabled(isTrue: boolean){
    return GlobalPropertyService.set(GLOBAL_PROP.PACS_ENABLED, `${isTrue}`)
}

function isPACsEnabled(){
    return GlobalPropertyService.get(GLOBAL_PROP.PACS_ENABLED)
}

export default {
    setHealthCenterID,
    sitePrefix,
    siteUUID,
    portalProperties,
    ddeEnabled,
    militarySiteEnabled,
    healthCenterID,
    siteCode,
    portalEnabled,
    setSitePrefix,
    setPortalIP,
    setPortalEnabled,
    PACsEnabled,
    isPACsEnabled
}