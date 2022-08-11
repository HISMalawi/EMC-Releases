import { ref, unref } from "vue";
import { UserService } from "@/services/user_service"
import { isEmpty } from "lodash";

const providers = ref([] as any)

export async function getProviders() {
    if (isEmpty(providers.value)) {
        providers.value = await UserService.getUsers()
    }
    return unref(providers)
}

export function invalidateProviders() {
    providers.value = []
}
