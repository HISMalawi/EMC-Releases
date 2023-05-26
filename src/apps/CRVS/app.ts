import { AppInterface } from "../interfaces/AppInterface";
const CRVS: AppInterface = {
    programID: -1,
    applicationName: 'CRVS',
    applicationIcon: 'login-logos/Malawi-Coat_of_arms_of_arms.png',
    applicationDescription: "CRVS module",
    appRoutes: [],
    init: async () =>{
        //launching link to new window
        const newWindow = window.open('https://www.bbc.com/news', '_blank');
        if (newWindow) {
            newWindow.focus();
        }
    }, 
    primaryPatientActivites: [],
    secondaryPatientActivites: [],
    globalPropertySettings: [],
    homeOverviewComponent: null,
    programReports: []
}
export default CRVS
