import { ref } from "vue";
import Store from '@/composables/ApiStore';

const facilityName = ref("");
const facilityUUID = ref("");
const district = ref("");

async function setLocation(){
  const location = await Store.get("CURRENT_LOCATION");
  facilityName.value = location.name;
  facilityUUID.value = location.uuid;
  district.value = location.district;

  // Maintained for backward compatibility
  sessionStorage.setItem('locationName', facilityName.value)
  sessionStorage.setItem('location', facilityName.value)
  sessionStorage.setItem('siteUUID', facilityUUID.value)
}

export default function useFacility() {
  return {
    facilityName,
    facilityUUID,
    district,
    setLocation,
  }
}
