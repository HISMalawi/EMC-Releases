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

export default function usePlatform () {
  const activePlatformProfile = ref({} as PlatformProfileInterface)
  const platformProfiles = ref({} as Record<string, PlatformProfileInterface>)
  const defaultProfile: string | null = localStorage.getItem(PLATFORM_SESSION_KEY.ACTIVE_PLOFILE)
  
  if (typeof defaultProfile === 'string') { 
    activePlatformProfile.value = JSON.parse(defaultProfile)
  } else {
    activePlatformProfile.value = {
      profileName: "Desktop",
      fileExport: FileExportType.WEB,
      scanner: ScannerType.BARCODE_SCANNER,
      printer: PrinterType.WEB,
      keyboard: KeyboardType.NATIVE_AND_HIS_KEYBOARD
    }
  }

  const profiles: string | null = sessionStorage.getItem(PLATFORM_SESSION_KEY.PLATFORM_PROFILES)

  if (typeof profiles === 'string') {
    platformProfiles.value = JSON.parse(profiles)
  } else {
    platformProfiles.value = {
      "Desktop": {
        fileExport: FileExportType.WEB,
        scanner: ScannerType.BARCODE_SCANNER,
        printer: PrinterType.WEB,
        keyboard: KeyboardType.NATIVE_AND_HIS_KEYBOARD
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
