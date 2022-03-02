import { getPlatforms } from "@ionic/vue";
import { computed, nextTick, readonly, ref, watch } from "vue";

export enum PLATFORM_SESSION_KEY {
  ACTIVE_PLATFORM = 'cur_platform'
}

export const MOBILE_PLATFORMS = [
  'ios',
  'iphone',
  'android',
  'tablet',
  'mobileweb',
  'ipad'
]

export const DESKTOP_PLATFORMS = [
  'desktop',
  'electron'
]

const isPlatform = (platformList: string[]) => getPlatforms().map(p => platformList.includes(p)).some(Boolean)

const isMobile = () => isPlatform(MOBILE_PLATFORMS) || !isPlatform(DESKTOP_PLATFORMS)

const isDesktop = () => isPlatform(DESKTOP_PLATFORMS) || !isMobile()

const configuredPlatform = localStorage.getItem(PLATFORM_SESSION_KEY.ACTIVE_PLATFORM)

const platformType = ref(configuredPlatform!=null ? configuredPlatform : isDesktop() ? 'desktop' : 'mobile')

const useVirtualInput = computed(() => platformType.value === 'mobile')

const setPlatformType = (platform: 'mobile' | 'desktop') => {
  nextTick(() => {
    localStorage.setItem(PLATFORM_SESSION_KEY.ACTIVE_PLATFORM, platform)
    platformType.value = platform
  })
}

export default function usePlatform () {
  return {
    platformType,
    useVirtualInput,
    isMobile,
    isDesktop,
    setPlatformType
  }
}
