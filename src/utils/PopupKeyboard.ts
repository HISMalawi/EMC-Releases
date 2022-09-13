import { Field } from "@/components/Forms/FieldInterface";
import { modalController } from "@ionic/vue";
import TouchField from "@/components/Forms/SIngleTouchField.vue"
import TouchScreenForm from "@/components/Forms/TouchScreenForm.vue";

export async function MultiStepPopupForm(fields: Field[], onFinish: Function, onCancel: Function | null =null) {
    (await modalController.create({
        component: TouchScreenForm,
        backdropDismiss: false,
        cssClass: "full-modal",
        componentProps: {
            onFinish,
            fields: fields,
            skipSummary: true,
            disableAutoModalDismiss: true,
            cancelAction: () => {
                if (typeof onCancel === 'function') { 
                    onCancel()
                }
                modalController.dismiss()
            } 
        }
    })).present()
}

export default async function PopupKeyboard(field: Field, onFinish: any) {
    (await modalController.create({
        component: TouchField,
        backdropDismiss: false,
        cssClass: "full-modal",
        componentProps: {
            dismissType: 'modal',
            currentField: field,
            onFinish
        }
    })).present()
}
