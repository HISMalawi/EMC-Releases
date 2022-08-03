import { isPlatform } from "@ionic/vue";
import { isEmpty } from "lodash";
import { onMounted, ref, watch } from "vue";

export enum PLATFORM_SESSION_KEY {
  ACTIVE_PLOFILE = 'active_profile',
  PLATFORM_PROFILES = 'platformProfiles'
}

export enum FileExportType {
  WEB = 'WEB',
  FILE_SYSTEM  = 'FILE_SYSTEM'
}

export enum ScannerType {
  BARCODE_SCANNER = 'BARCODE_SCANNER',
  CAMERA_SCANNER = 'CAMERA_SCANNER'
}

export enum PrinterType {
  WEB = 'WEB',
  BLUETOOTH = 'BLUETOOTH'
}

export enum KeyboardType { 
  HIS_KEYBOARD_ONLY = 'HIS_KEYBOARD_ONLY',
  NATIVE_AND_HIS_KEYBOARD = 'NATIVE_AND_HIS_KEYBOARD'
}

export interface PlatformProfileInterface {
  profileName? : string;
  fileExport: FileExportType;
  scanner: ScannerType;
  printer: PrinterType;
  keyboard: KeyboardType;
}

const DefaultProfiles: Record<string, PlatformProfileInterface> = {
  "Desktop": {
    fileExport: FileExportType.WEB,
    scanner: ScannerType.BARCODE_SCANNER,
    printer: PrinterType.WEB,
    keyboard: KeyboardType.NATIVE_AND_HIS_KEYBOARD
  },
  "Mobile" : {
    fileExport: FileExportType.FILE_SYSTEM,
    scanner: ScannerType.CAMERA_SCANNER,
    printer: PrinterType.BLUETOOTH,
    keyboard: KeyboardType.HIS_KEYBOARD_ONLY
  },
  "OCOM Android" : {
    fileExport: FileExportType.FILE_SYSTEM,
    scanner: ScannerType.BARCODE_SCANNER,
    printer: PrinterType.BLUETOOTH,
    keyboard: KeyboardType.HIS_KEYBOARD_ONLY
  }
}
const DefaultProfile = {
  profileName: "Desktop",
  fileExport: FileExportType.WEB,
  scanner: ScannerType.BARCODE_SCANNER,
  printer: PrinterType.WEB,
  keyboard: KeyboardType.NATIVE_AND_HIS_KEYBOARD
}

export default function usePlatform () {
  const activePlatformProfile = ref(DefaultProfile as PlatformProfileInterface)
  const platformProfiles = ref({} as Record<string, PlatformProfileInterface>)
  const configuredProfile: string | null = localStorage.getItem(PLATFORM_SESSION_KEY.ACTIVE_PLOFILE)  
  const profiles: string | null = sessionStorage.getItem(PLATFORM_SESSION_KEY.PLATFORM_PROFILES)

  if (typeof profiles === 'string') {
    platformProfiles.value = JSON.parse(profiles)
  } else {
    platformProfiles.value = DefaultProfiles
  }

  if (typeof configuredProfile === 'string') {
    activePlatformProfile.value = JSON.parse(configuredProfile)
  } else {
    if (!isEmpty(platformProfiles.value)) {
      if (isPlatform('mobile') && 'Mobile' in platformProfiles.value) {
        activePlatformProfile.value = platformProfiles.value['Mobile']
      } else if (isPlatform('desktop') && 'Desktop' in platformProfiles.value) {
        activePlatformProfile.value = platformProfiles.value['Desktop']
      }
    }
  }

  watch(() => activePlatformProfile.value, profile => {
    localStorage.setItem(PLATFORM_SESSION_KEY.ACTIVE_PLOFILE, JSON.stringify(profile))
  })

  return {
    activePlatformProfile,
    platformProfiles
  }
}
