import Apps from "@/apps/his_apps";
import ApplicationModal from "@/components/ApplicationModal.vue";
import { modalController } from "@ionic/vue";
import { find, isEmpty } from 'lodash';
import GlobalApp from "@/apps/GLOBAL_APP/global_app"
import { AppInterface } from "./interfaces/AppInterface";
import { Service } from "@/services/service";
import { nextTask } from "@/utils/WorkflowTaskHelper"

/**
* Merge global configurations with app configurations
*/
function applyGlobalConfig(app: AppInterface) {
    const _app = {...app}
    _app.secondaryPatientActivites = [
        ...GlobalApp.GlobalProgramActivities,
        ..._app.secondaryPatientActivites
    ]
    if (_app.globalPropertySettings) {
        _app.globalPropertySettings = [
            ...GlobalApp.GlobalAppSettings,
            ..._app.globalPropertySettings
        ]
    } else {
        _app.globalPropertySettings = GlobalApp.GlobalAppSettings
    }
    return _app
}

function getActiveApp(): AppInterface | undefined {
    const appName = sessionStorage.getItem('applicationName')

    if (appName) {
        const app: AppInterface | undefined = find(Apps, { applicationName: appName })
        if (app) return applyGlobalConfig(app)
    }
}

/**
 * Updates global configuration with current running application
 * @param app 
 * @returns 
 */
async function startApplication(app: AppInterface) {
    sessionStorage.setItem('applicationName', app.applicationName)
    const configuredApp = applyGlobalConfig(app)
    if (app.init) await app.init('')
    return configuredApp
}

/**
 * Perform a silent application switch and go directly to it's workflow
 * @param appName
 * @param patientID
 * @param router
 */
async function switchAppWorkflow(
    appName: string,
    patientID: number,
    router: any,
    beforeNextTask=undefined as Function | undefined
    ) {
    const app: AppInterface | undefined = find(Apps, { applicationName: appName })
    if (app) {
        await startApplication(app)
        if (typeof beforeNextTask === 'function') { 
            await beforeNextTask()
        }
        nextTask(patientID, router)
    }
}

/**
 * Presents a modal to the user to select an application and switch to it
 * @param context 
 * @param canClose 
 * @returns 
 */
async function selectApplication(context='', canClose=false) {
    const modal = await modalController.create({
        component: ApplicationModal,
        cssClass: "large-modal",
        backdropDismiss: false,
        componentProps: {
            appVersion: Service.getFullVersion(),
            canClose
        }
    });

    modal.present()

    const { data } = await modal.onDidDismiss()

    if (!data || isEmpty(data)) return

    return startApplication(data)
}

export default {
    switchAppWorkflow,
    selectApplication,
    getActiveApp
}