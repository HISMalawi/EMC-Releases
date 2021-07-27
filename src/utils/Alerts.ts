import { toastController, alertController, modalController, actionSheetController } from "@ionic/vue";
import HisActionSheet from "@/components/DataViews/actionsheet/HisActionSheetModal.vue"
import { NavBtnInterface } from "@/components/HisDynamicNavFooterInterface"

async function toast(message: string, color="primary", duration=6000) {
    const toast = await toastController.create({
        message: message,
        position: "top",
        animated: true,
        duration: duration,
        color: color
    });
    return toast.present();
}

export function toastWarning(message: string, duration=6000) {
    return toast(message, 'warning', duration)
}

export function toastSuccess(message: string, duration=6000) {
    return toast(message, 'success', duration)
}

export function toastDanger(message: string, duration=6000) {
    return toast(message, 'danger', duration)
}

export async function alertAction(message: string, buttons: any) {
    const alert = await alertController.create({
        cssClass: 'my-custom-class',
        mode: 'ios',
        message,
        backdropDismiss: false,
        buttons
    });

    alert.present();    
    const { role } = await alert.onDidDismiss()
    return role || ''
}

export async function hisListActionSheet(
    title: string,
    subtitle: string,
    items: Array<string>,
    actionButtons: Array<any>)
    {
        const modal = await modalController.create({
        component: HisActionSheet,
        backdropDismiss: false,
        cssClass: "action-sheet-modal",
        componentProps: {
            title,
            subtitle,
            actionButtons,
            sheetType: 'list-sheet',
            items,
        }
        })
        modal.present()
        const { data } = await modal.onDidDismiss()
        return data.action
    }

export async function hisDecisionActionSheet(
    title: string, 
    sheetTitle: string,
    sheetDescription: string,
    actionButtons: Array<any>)
    {
        const modal = await modalController.create({
        component: HisActionSheet,
        backdropDismiss: false,
        cssClass: "action-sheet-modal",
        componentProps: {
            title,
            sheetTitle,
            sheetDescription,
            actionButtons,
            sheetType: 'info-sheet',
        }
        })
        modal.present()
        const { data } = await modal.onDidDismiss()
        return data.action
    }

export async function hisOptionsActionSheet(
    title: string, 
    subtitle: string, 
    items: Array<string>, 
    actionButtons: Array<any>)
    {
        const modal = await modalController.create({
        component: HisActionSheet,
        backdropDismiss: false,
        cssClass: "action-sheet-modal",
        componentProps: {
            title,
            subtitle,
            actionButtons,
            sheetType: 'button-sheet',
            items: items.map((b: string) => ({ label: b, value: b })),
        }
        })
        modal.present()
        const { data } = await modal.onDidDismiss()
        return data
    }

export async function actionSheet(header: string, subHeader: string, buttons: Array<string>) {
    const action = await actionSheetController.create({
        header,
        subHeader,
        mode: 'ios',
        backdropDismiss: false,
        buttons: buttons.map((i: any) => ({text: i, role: i.toLowerCase()}))
    })
    action.present()
    const { role } = await action.onDidDismiss();
    return role
}
export async function alertConfirmation(message: string, header="Confirmation") {
    const alert = await alertController.create({
        cssClass: 'my-custom-class',
        mode: 'ios',
        header,
        message,
        backdropDismiss: false,
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
            },
            {
                text: 'Confirm'
            }
        ]
    })

   alert.present();

   const { role } = await alert.onDidDismiss()

   return role != 'cancel' 
}
