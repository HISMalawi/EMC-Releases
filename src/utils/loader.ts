import { loadingController } from "@ionic/vue";

export const loader = {
  /**
   * show loading spinner
   * 
   * @param message message to display while loading. default is 'Loading...'
   * @returns {Promise<void>}
   */
  async show(message?: string): Promise<void> {
    return (await loadingController.create({
      message: message || "Loading...",
      spinner: 'crescent',
      translucent: true
    })).present();
  },

  /**
   * hide loading spinner
   * 
   * @returns {Promise<boolean>}
   * */
  async hide(): Promise<boolean> {
    return loadingController.dismiss();
  }
}
