import { FolderInterface } from "@/apps/interfaces/AppInterface";
import { UserService } from "@/services/user_service"
import { ART_GLOBAL_PROP } from "@/apps/ART/art_global_props"
import { GLOBAL_PROP } from "@/apps/GLOBAL_APP/global_prop";

function globalPropConfig(label: string, prop: string) {
    return {
        name: label,
        pathUrl: `/preferences?label=${label}&property=${prop}`
    }
}

export const PROPERTIES: FolderInterface[] = [
    {
        name: 'System Preferences',
        icon: 'diagnosis.png',
        condition: () => UserService.isAdmin(),
        files: [
            globalPropConfig(
                "Is this a military site?",
                GLOBAL_PROP.MILITARY_SITE
            ),
            globalPropConfig(
                "Activate PACs for Radiology Examination",
                GLOBAL_PROP.PACS_ENABLED
            )
        ]
    }
]