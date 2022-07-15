import { AppInterface } from "../interfaces/AppInterface";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import EmcRoutes from "./Config/EmcRoutes";

const EMC: AppInterface = {
  programID: 1,
  isPocApp: false,
  appLandingPage: "/emc/home",
  applicationName: "EMC",
  applicationIcon: "aids.png",
  applicationDescription: "HIV Electronic Master card App",
  appRoutes: EmcRoutes,
  homeOverviewComponent: {},
  primaryPatientActivites: [],
  secondaryPatientActivites: [],
  globalPropertySettings: [],
  programReports: [],
  programPatientIdentifiers: {
    "ARV Number": {
      id: 4,
      name: "ARV Number",
      isPrimary: true,
      useForSearch: true,
      prefix: async () => `${await GLOBAL_PROP.sitePrefix()}-ARV-`,
    },
  },
};
export default EMC;
