(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71d4aecb"],{3171:function(t,e,a){"use strict";a.r(e);var n=a("7a23");const i=t=>(Object(n["pushScopeId"])("data-v-6e439b60"),t=t(),Object(n["popScopeId"])(),t),s={class:"tool-bar-medium-card"},r={class:"his-sm-text"},o=i(()=>Object(n["createElementVNode"])("p",null,null,-1)),c={class:"his-sm-text"},l=i(()=>Object(n["createElementVNode"])("p",null,null,-1)),d={class:"his-sm-text"},p={class:"tool-bar-medium-card"},h={class:"his-sm-text"},u=i(()=>Object(n["createElementVNode"])("p",null,null,-1)),m={class:"his-sm-text"},g=i(()=>Object(n["createElementVNode"])("p",null,null,-1)),N={class:"his-sm-text"},f=i(()=>Object(n["createElementVNode"])("p",null,null,-1)),O={class:"tool-bar-medium-card"},D={class:"his-sm-text"},b=i(()=>Object(n["createElementVNode"])("p",null,null,-1)),E={class:"his-sm-text"},I=i(()=>Object(n["createElementVNode"])("p",null,null,-1)),y={class:"his-sm-text"},w=i(()=>Object(n["createElementVNode"])("p",null,null,-1));function A(t,e,a,i,A,_){const P=Object(n["resolveComponent"])("ion-col"),C=Object(n["resolveComponent"])("ion-row"),j=Object(n["resolveComponent"])("ion-toolbar"),T=Object(n["resolveComponent"])("ion-header"),v=Object(n["resolveComponent"])("confirmation-card"),R=Object(n["resolveComponent"])("ion-content"),V=Object(n["resolveComponent"])("ion-button"),L=Object(n["resolveComponent"])("ion-spinner"),F=Object(n["resolveComponent"])("ion-footer"),S=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(S,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(T,{translucent:!0},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(C,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(P,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",s,[Object(n["createElementVNode"])("span",r,[Object(n["createTextVNode"])("Patient Name: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.patientName),1)]),Object(n["createTextVNode"])(),o,Object(n["createElementVNode"])("span",c,[Object(n["createTextVNode"])("Birthdate: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.birthdate),1)]),Object(n["createTextVNode"])(),l,Object(n["createElementVNode"])("span",d,[Object(n["createTextVNode"])("Gender: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.gender),1)])])]),_:1}),Object(n["createVNode"])(P,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",p,[Object(n["createElementVNode"])("span",h,[Object(n["createTextVNode"])("Ancestry district: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.ancestryDistrict),1)]),u,Object(n["createElementVNode"])("span",m,[Object(n["createTextVNode"])("Ancestry TA: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.ancestryTA),1)]),g,Object(n["createElementVNode"])("span",N,[Object(n["createTextVNode"])("Ancestry village: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.ancestryVillage),1)]),f])]),_:1}),Object(n["createVNode"])(P,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",O,[Object(n["createElementVNode"])("span",D,[Object(n["createTextVNode"])("Current District:"),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.currentDistrict),1),b]),Object(n["createElementVNode"])("span",E,[Object(n["createTextVNode"])("Current TA: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.currentTA),1),I]),Object(n["createElementVNode"])("span",y,[Object(n["createTextVNode"])("Current Village: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.demographics.currentVillage),1),w])])]),_:1})]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(R,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(C,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(t.cards,(t,e)=>(Object(n["openBlock"])(),Object(n["createBlock"])(P,{"size-md":"4","size-sm":"12",key:e},{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(),Object(n["createBlock"])(v,{key:"card-"+e,title:t.label,items:t.values,isLoading:t.isLoading},null,8,["title","items","isLoading"]))]),_:2},1024))),128))]),_:1})]),_:1}),Object(n["createVNode"])(F,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,{color:"dark"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(V,{color:"danger",size:"large","router-link":"/"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Cancel ")]),_:1}),Object(n["createVNode"])(V,{disabled:!(t.facts.patientFound&&t.isAdmin),color:"danger left",size:"large",onClick:t.onVoid},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("Void Client")]),_:1},8,["disabled","onClick"]),t.facts.anc.canInitiateNewPregnancy?(Object(n["openBlock"])(),Object(n["createBlock"])(V,{key:0,slot:"end",size:"large",onClick:t.onInitiateNewAncPregnancy},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" New Pregnancy ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(V,{disabled:!t.facts.patientFound||t.facts.patientFound&&!t.isReady,slot:"end",color:"success",size:"large",onClick:t.nextTask},{default:Object(n["withCtx"])(()=>[t.isReady?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(L,{key:0,name:"crescent"})),Object(n["createTextVNode"])(" Continue ")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1})]),_:1})}a("13d5"),a("14d9");var _,P,C=a("2ef0"),j=a("9283"),T=a("3e53"),v=a("0fa1"),R=a("c1e4"),V=a("c21d"),L=a("23e6"),F=a("74f4"),S=a("b5e4"),x=a("d867"),U=a("7f35"),M=a("0011");(function(t){t["ON_CONTINUE"]="oncontinue",t["ONLOAD"]="onload"})(_||(_={})),function(t){t["FORCE_EXIT"]="forceExit",t["GO_HOME"]="gotoHome",t["GO_BACK"]="goBack",t["CONTINUE"]="continue",t["ENROLL"]="enroll",t["EXIT"]="exit",t["ACTIVATE_FN"]="activateFn",t["ASSIGN_NPID"]="assignNpid",t["UPDATE_DMG"]="updateDemographics",t["PRINT_NPID"]="printNPID",t["CREATE_NPID_WITH_REMOTE_DIFF"]="createNpiDWithRemote",t["REFRESH_DDE_DEMOGRAPHICS"]="refreshDemographicsDDE",t["UPDATE_LOCAL_DDE_DIFFS"]="updateLocalDiffs",t["RESOLVE_DUPLICATE_NPIDS"]="resolveDuplicateNpids",t["ADD_AS_DRUG_REFILL"]="addAsDrugRefill",t["ADD_AS_NEW_PATIENT"]="addAsNewPatient",t["ADD_AS_EXTERNAL_CONSULTATION"]="addAsExternalConsultation",t["INITIATE_ANC_PREGNANCY"]="initiateNewAncPregnancy",t["VIEW_MERGE_AUDIT_FOR_NPID"]="viewMergeAuditForNpid",t["SEARCH_BY_NAME"]="searchByName"}(P||(P={}));const H={"[DDE NOT ENABLED] Do not proceed if patient is not found in the system":{weight:98,targetEvent:_.ONLOAD,actions:{alert:async()=>{const t=await Object(U["a"])(" 0 Search results","Patient has not been found","Choose how to proceed",[{name:"Close",slot:"start",color:"primary"},{name:"Search by name",slot:"end",color:"success"}],"his-danger-color");return"Search by name"===t?P.SEARCH_BY_NAME:P.GO_HOME}},conditions:{globalProperties({ddeEnabled:t}){return!1===t},patientFound(t){return!1===t}}},"[DDE ENABLED] Show invalid attributes for a patient whose remote":{weight:78,targetEvent:_.ONLOAD,actions:{alert:async t=>(await Object(U["d"])("DDE Entity Error","Remote patient has invalid attributes",["Attribute","Errors"],t.demographics.invalidDemographics,[{name:"Close",slot:"start",color:"danger"}],"his-danger-color"),P.GO_BACK)},conditions:{demographics({hasInvalidDemographics:t}){return!0===t}}},"[DDE ENABLED] Do not proceed if NPID is not found and Provide history of voided NPIDS":{weight:98,targetEvent:_.ONLOAD,actions:{alert:async t=>{const e=await Object(U["d"])("Voided patients with ID "+t.scannedNpid,"NPID was not found. Please review available patient with similar ID",t.dde.voidedNpids.cols,t.dde.voidedNpids.rows,[{name:"Close",slot:"start",color:"primary"},{name:"Merge history",slot:"end",color:"primary"},{name:"Search by name",slot:"end",color:"success"}],"his-danger-color");return"Merge history"===e?P.VIEW_MERGE_AUDIT_FOR_NPID:"Search by name"===e?P.SEARCH_BY_NAME:P.GO_HOME}},conditions:{globalProperties({ddeEnabled:t}){return!0===t},patientFound(t){return!1===t}}},"[DDE NOT ENABLED] Notify the user to proceed with Remote NPID if local NPID does not match remote":{weight:77,targetEvent:_.ONLOAD,actions:{alert:async({dde:t})=>(await Object(U["a"])("Missing Local NPID",`Local NPID of "${t.localNpidDiff}" does not match remote "${t.remoteNpidDiff}"`,"Proceed to Fix issue",[{name:"Resolve issue",slot:"start",color:"danger"}],"his-danger-color"),P.CREATE_NPID_WITH_REMOTE_DIFF)},conditions:{dde({localNpidDiff:t,remoteNpidDiff:e}){return t!=e},globalProperties({ddeEnabled:t}){return!0===t}}},"Warn if patient is missing National ID and assign them one":{weight:75,targetEvent:_.ONLOAD,actions:{alert:async()=>(await Object(U["a"])("Missing National ID","Patient was found BUT has no National ID","The system is going to assign the patient with a new ID",[{name:"OK",slot:"start",color:"primary"}],"his-danger-color"),P.ASSIGN_NPID)},conditions:{currentNpid:t=>Object(M["c"])(t)}},"Detect NPID over 5 duplicates and prompt the user to resolve them":{weight:76,targetEvent:_.ONLOAD,actions:{alert:async({scannedNpid:t})=>{const e=await Object(U["a"])("More than 5 duplicates found",`There are more than 5 duplicates for this NPID (${t}). Please search by name and gender`,"Choose how to proceed",[{name:"Close",slot:"start",color:"danger"},{name:"Search by name",slot:"start",color:"primary"}],"his-danger-color");return"Search by name"===e?P.SEARCH_BY_NAME:P.GO_HOME}},conditions:{npidHasOverFiveDuplicates(t){return t}}},"Detect NPID duplicates and prompt the user to resolve them":{weight:99,targetEvent:_.ONLOAD,actions:{alert:async({scannedNpid:t})=>(await Object(U["a"])("DUPLICATE NPID",`NPID ${t} is currently assigned to multiple patients`,"Proceed to resolve the issue",[{name:"Resolve Duplicate NPIDs",slot:"start",color:"danger"}],"his-danger-color"),P.RESOLVE_DUPLICATE_NPIDS)},conditions:{npidHasDuplicates(t){return t}}},"Warn before proceeding if patient is deceased based on current Patient state":{weight:50,targetEvent:_.ON_CONTINUE,actions:{alert:async()=>{const t=await Object(U["a"])("Deceased Patient","Patient outcome is Died!","Do you want to continue?",[{name:"Yes",slot:"start",color:"danger"},{name:"No",slot:"end",color:"success"}],"his-warning-color");return"Yes"===t?P.CONTINUE:P.FORCE_EXIT}},conditions:{currentOutcome:t=>"Patient died"===t}},"Warn before proceeding if patient stopped treatment based on current Patient state":{weight:49,targetEvent:_.ON_CONTINUE,actions:{alert:async()=>{const t=await Object(U["a"])("Stopped Treatment","Patient outcome is Stopped Treatment ","Do you want to continue?",[{name:"Yes",slot:"start",color:"danger"},{name:"No",slot:"end",color:"success"}],"his-warning-color");return"Yes"===t?P.CONTINUE:P.FORCE_EXIT}},conditions:{currentOutcome:t=>"Treatment stopped"===t}},"[ART patient visit purpose] Select purpose of visit if patient is Transferred out or Drug refill":{weight:70,targetEvent:_.ON_CONTINUE,actions:{alert:async({patientType:t,currentOutcome:e})=>{let a=[];"External consultation"!==t&&"Patient transferred out"!==e||(a=[{name:"Drug refill",slot:"start",color:"primary"},{name:"New Patient",slot:"end",color:"primary"}]),"Drug Refill"===t&&(a=[{name:"External Consultation",slot:"start",color:"primary"},{name:"New Patient",slot:"end",color:"primary"}]),"New patient"===t&&(a=[{name:"External Consultation",slot:"start",color:"primary"},{name:"Drug refill",slot:"start",color:"primary"}]);const n=await Object(U["a"])("Purpose of visit",`Patient type: ${t} | State: ${e}`,"Please select purspose of the visit",[...a,{name:"Continue",slot:"end",color:"success"}]);switch(n){case"Drug refill":return P.ADD_AS_DRUG_REFILL;case"External Consultation":return P.ADD_AS_EXTERNAL_CONSULTATION;case"New Patient":return P.ADD_AS_NEW_PATIENT;default:return P.CONTINUE}}},conditions:{programName:t=>"ART"===t,patientType:(t,{currentOutcome:e})=>["Drug Refill","External consultation"].includes(t)||"Patient transferred out"===e}},"Prompt patient enrollment in current programme if not enrolled":{weight:30,targetEvent:_.ONLOAD,actions:{alert:async()=>{const t=await Object(U["a"])("Programme Enrollment","Patient is not enrolled in current programme, do you want to enroll?","",[{name:"Yes",slot:"start",color:"success"},{name:"No",slot:"end",color:"danger"}]);return"Yes"===t?P.ENROLL:P.EXIT}},conditions:{enrolledInProgram:t=>!1===t}},"(ART Filing numbers) Prompt dormant filing number reactivation if patient has a dormant filing number":{weight:25,targetEvent:_.ONLOAD,actions:{alert:async()=>{const t=await Object(U["a"])("Filing Numbers","Activate dormant #?","",[{name:"Yes",slot:"start",color:"success"},{name:"No",slot:"end",color:"danger"}]);return"Yes"===t?P.ACTIVATE_FN:P.EXIT}},conditions:{programName:t=>"ART"===t,identifiers:t=>t.includes("Archived filing number"),currentOutcome:t=>!["Treatment stopped","Patient transferred out","Patient died"].includes(t),globalProperties({useFilingNumbers:t}){return t}}},"[DDE OFF] Prompt the user to update patient demographics when data is incomplete":{weight:92,targetEvent:_.ONLOAD,actions:{alert:async()=>{const t=await Object(U["a"])("Demographics","Patient data is incomplete","Do you want to review and update now?",[{name:"Yes",slot:"start",color:"success"},{name:"No",slot:"end",color:"danger"}],"his-danger-color");return"Yes"===t?P.UPDATE_DMG:P.EXIT}},conditions:{globalProperties({ddeEnabled:t}){return!1===t},demographics:({patientIsComplete:t})=>!1===t,patientFound:t=>!0===t}},"[DDE] Alert When remote Patient demographics dont match Local Demographics ":{weight:93,targetEvent:_.ONLOAD,actions:{alert:async({dde:t})=>{const e=await Object(U["d"])("Demographics Mismatch","Local Demographics do not match Remote Demographics",["Attributes","Local","Remote"],t.diffRows,[{name:"Use Local",slot:"start",color:"primary"},{name:"Use Remote",slot:"start",color:"primary"}],"his-danger-color",t.diffRowColors);return"Use Local"===e?P.UPDATE_LOCAL_DDE_DIFFS:P.REFRESH_DDE_DEMOGRAPHICS}},conditions:{dde({hasDemographicConflict:t}){return t}}},"[DDE] Alert to print newer NPID when the scanned NPID doesnt match active NPID":{weight:69,targetEvent:_.ONLOAD,actions:{alert:async({currentNpid:t})=>(await Object(U["a"])("[DDE] NATIONAL ID","Patient has a newer National Identifier "+t,"Print and proceed",[{name:"Print",slot:"start",color:"primary"}]),P.PRINT_NPID)},conditions:{globalProperties({ddeEnabled:t}){return!0===t},scannedNpid(t,{currentNpid:e}){return!t.match(new RegExp(e,"i"))}}},"assign newer NPID when the current one is invalid":{weight:68,targetEvent:_.ONLOAD,actions:{alert:async({currentNpid:t})=>(await Object(U["a"])("NATIONAL ID",`Current NPID ${t} is invalid`,"Reasign and Print",[{name:"Reassign",slot:"start",color:"primary"}]),P.ASSIGN_NPID)},conditions:{demographics:({patientIsComplete:t})=>!0===t,patientFound:t=>!0===t,hasInvalidNpid(t){return t}}},"[DDE ON] Warn program managers when Patient has incomplete demographics. Dont force them to update though":{weight:91,targetEvent:_.ONLOAD,actions:{alert:async()=>{const t=await Object(U["a"])("Demographics","Patient data is incomplete data","Do you want to review and update now?",[{name:"Yes",slot:"start",color:"success"},{name:"No",slot:"end",color:"danger"}],"his-danger-color");return"Yes"===t?P.UPDATE_DMG:P.CONTINUE}},conditions:{globalProperties({ddeEnabled:t}){return!0===t},demographics:({patientIsComplete:t})=>!1===t,patientFound:t=>!0===t,userRoles(t){return!0===t.includes("Program Manager")}}},"[DDE ON] Force Users to update Incomplete Patient demographics":{weight:92,targetEvent:_.ONLOAD,actions:{alert:async()=>{const t=await Object(U["a"])("Patient Demographics","Demographic data is incomplete","Continue to update",[{name:"Update",slot:"start",color:"success"},{name:"Cancel",slot:"start",color:"danger"}],"his-warning-color");return"Cancel"===t?P.GO_HOME:P.UPDATE_DMG}},conditions:{globalProperties({ddeEnabled:t}){return!0===t},demographics:({patientIsComplete:t})=>!1===t,userRoles:t=>!1===t.includes("Program Manager")}},"Warn the user when patient has high viral load":{weight:45,targetEvent:_.ONLOAD,actions:{alert:async()=>(await Object(U["a"])("High Viral Load","Patient has a high viral load, please take immediate action!","",[{name:"OK",slot:"end",color:"danger"}],"his-danger-color"),P.CONTINUE)},conditions:{hasHighViralLoad:t=>!0===t}},"[ANC] Warn last LMP is more than 8 months ago and ask to initiate new pregnancy":{weight:32,targetEvent:_.ON_CONTINUE,actions:{alert:async({anc:t})=>{const e=await Object(U["a"])("Pregancy overdue",`Last menstrual period was ${t.lmpMonths} months ago!`,"Would you like to initiate new pregnancy?",[{name:"Yes",slot:"end",color:"success"},{name:"No",slot:"end",color:"danger"}],"his-danger-color");return"Yes"===e?P.INITIATE_ANC_PREGNANCY:P.CONTINUE}},conditions:{programName:t=>"ANC"===t,anc:t=>!0===t.currentPregnancyIsOverdue}},"[ANC] Exit if client is NOT ELIGIBLE for ANC":{weight:89,targetEvent:_.ONLOAD,actions:{alert:async()=>{const t=await Object(U["a"])("Client not eligible for ANC","This program is for women eligible for ANC only","If this is a mistake, please update client Demographics or Exit",[{name:"EXIT",slot:"end",color:"success"},{name:"EDIT DEMOGRAPHICS",slot:"end",color:"danger"}],"his-danger-color");return"EXIT"===t?P.GO_HOME:P.UPDATE_DMG}},conditions:{demographics:({gender:t})=>{const e=t.toLowerCase();return"m"===e||"male"===e},programName:t=>"ANC"===t}}};var k=a("4db7"),G=a("fa73"),B=a("1c74"),X=a("9b7c"),Y=a("8df6"),$=a("7957"),W=a("8734"),z=a("cc6f"),K=a("ad60"),q=a("5a0c"),J=a.n(q);class Z extends z["a"]{constructor(t,e){super(t,111,e)}async getLmpInMonths(){const t=await K["a"].getProgramInformation(this.patientID);if(t.date_of_lnmp){const e=J()(t.date_of_lnmp),a=J()(this.date);return a.diff(e,"months")}return-1}async pregnancyIsOverdue(){return await this.getLmpInMonths()>9}async canInitiateNewPregnancy(){return await this.getLmpInMonths()>=7}async createNewPregnancyStatus(){return await this.createEncounter(),this.saveValueCodedObs("Pregnancy status","New")}}var Q=a("76df"),tt=a("8e8b"),et=Object(n["defineComponent"])({name:"Patient Confirmation",components:{IonContent:x["n"],IonHeader:x["q"],IonFooter:x["o"],IonPage:x["D"],IonToolbar:x["S"],IonSpinner:x["N"],IonRow:x["H"],IonCol:x["m"],IonButton:x["d"],ConfirmationCard:Object(n["defineAsyncComponent"])(()=>a.e("chunk-1f0442db").then(a.bind(null,"8ee9")))},data:()=>({app:{},program:{},patient:{},localPatient:{},ddeInstance:{},useDDE:!1,programInfo:{},isReady:!1,cards:[],facts:{hasHighViralLoad:!1,patientFound:!1,npidHasDuplicates:!1,npidHasOverFiveDuplicates:!1,userRoles:[],scannedNpid:"",currentNpid:"",hasInvalidNpid:!1,enrolledInProgram:!1,programName:"N/A",currentOutcome:"",programs:[],identifiers:[],patientType:"N/A",anc:{lmpMonths:-1,canInitiateNewPregnancy:!1,currentPregnancyIsOverdue:!1},dde:{localNpidDiff:"",remoteNpidDiff:"",voidedNpids:{cols:[],rows:[]},hasDemographicConflict:!1,localDiffs:{},diffRows:[],diffRowColors:[]},demographics:{patientIsComplete:!1,hasInvalidDemographics:!1,invalidDemographics:[],givenName:"",familyName:"",patientName:"",landmark:"",phoneNumber:"",currentDistrict:"",currentTA:"",currentVillage:"",ancestryDistrict:"",ancestryTA:"",ancestryVillage:"",gender:"",birthdate:""},globalProperties:{useFilingNumbers:!1,ddeEnabled:!1}}}),created(){this.initCards(),this.app=T["a"].getActiveApp()||{}},mounted(){this.app&&(this.updateCards(),this.ddeInstance=new G["a"],this.setGlobalPropertyFacts().then(()=>{const t=this.$route.query;Object(C["isEmpty"])(t)||!t.person_id&&!t.patient_barcode||this.findAndSetPatient(t.person_id,t.patient_barcode)}))},computed:{demographics(){return this.facts.demographics},birthdate(){return j["b"].toStandardHisDisplayFormat(this.facts.demographics.birthdate)},isAdmin(){return R["a"].isAdmin()}},methods:{initCards(){for(let t=0;t<6;t++)this.cards[t]={label:"-",isLoading:!0,values:[]}},async updateCards(){if("function"===typeof this.app.confirmationSummary){const t=this.app.confirmationSummary(this.patient,this.program,this.facts),e=Object.keys(t);for(let a=0;a<this.cards.length;a++){const n=e[a]?t[e[a]]():[];if(this.cards[a]={label:e[a]||"-",isLoading:!1,values:n},"object"===typeof n&&n.then)this.cards[a].isLoading=!0,Object(C["isEmpty"])(this.patient)||n.then(t=>{this.cards[a].isLoading=!1,this.cards[a].values=t}).catch(t=>{this.cards[a].isLoading=!1,console.error(""+t)});else for(let t=0;t<n.length;++t){const e=n[t];this.cards[a].values[t]=e,Object(C["isEmpty"])(this.patient)||("function"===typeof e.init&&await e.init(),"function"===typeof e.asyncValue?e.asyncValue().then(e=>{this.cards[a].values[t].value=e}).catch(e=>{this.cards[a].values[t].value="_ERROR_",console.error(""+e)}):"function"===typeof e.staticValue&&(this.cards[a].values[t].value=e.staticValue()))}}}},async setViralLoadStatus(){const t=await X["a"].getOrders(this.patient.getID()),e=t.reduce((t,e)=>{const a=X["a"].getVLResults(e);return Object(C["isEmpty"])(a)||a[0].date<t.date?t:a[0]},{});this.facts.hasHighViralLoad=X["a"].isHighViralLoadResult(e)},async findAndSetPatient(t,e){let a=null;this.isReady=!1,this.localPatient={},this.facts.scannedNpid||(this.facts.scannedNpid=e||""),a=this.useDDE&&e?this.ddeInstance.searchNpid(e):t?L["a"].findByID(t):L["a"].findByNpid(e),this.handleSearchResults(a).then(()=>this.isReady=!0).catch(t=>Object(S["c"])(""+t,3e5))},async handleSearchResults(t){let e=[];try{e=await t}catch(a){if(a instanceof B["b"]&&!Object(C["isEmpty"])(a.entity))e=a.entity;else if(a instanceof B["a"]&&Array.isArray(a.errors)){const[t,...e]=a.errors;"string"===typeof t&&"Invalid parameter(s)"===t&&this.setInvalidParametersFacts(e)}else Object(S["c"])(""+a,3e5)}if(Object(C["isEmpty"])(e)&&!Object(C["isEmpty"])(this.localPatient)&&(e=this.localPatient),Array.isArray(e)&&e.length>1?(this.facts.npidHasDuplicates=e.length<=5,this.facts.npidHasOverFiveDuplicates=e.length>5):this.facts.patientFound=!Object(C["isEmpty"])(e),this.facts.patientFound){this.patient=new L["a"](Array.isArray(e)?e[0]:e),this.updateCards(),tt["a"].set("ACTIVE_PATIENT",this.patient),this.setPatientFacts();const t=[];t.push(this.setProgramFacts()),this.useDDE&&t.push(this.setDDEFacts()),"ANC"===this.facts.programName&&t.push(this.setAncFacts()),"ART"===this.facts.programName&&t.push(this.setViralLoadStatus()),this.facts.currentNpid=this.patient.getNationalID(),t.push(this.validateNpid()),await Promise.all(t)}else this.facts.scannedNpid&&this.setVoidedNpidFacts(this.facts.scannedNpid);this.onEvent(_.ONLOAD).then(()=>this.isReady=!0).catch(t=>{Object(S["c"])(""+t,3e5),this.isReady=!0})},async validateNpid(){if(this.useDDE)this.facts.hasInvalidNpid=!this.patient.getDocID()||this.patient.getDocID()&&Object(M["c"])(this.patient.getNationalID());else{const t=await L["a"].findByNpid(this.facts.currentNpid,{page_size:2});this.facts.hasInvalidNpid=Array.isArray(t)&&t.length>1}},setInvalidParametersFacts(t){this.facts.demographics.hasInvalidDemographics=!0,this.facts.demographics.invalidDemographics=t.map(t=>{const e=Object.entries(t),a=e[0][0],n=e[0][1];return[a,n.join(", ")]})},reloadPatient(){return this.findAndSetPatient(this.patient.getID(),void 0)},setPatientFacts(){this.facts.demographics.patientIsComplete=this.patient.patientIsComplete(),this.facts.demographics.patientName=this.patient.getFullName(),this.facts.demographics.givenName=this.patient.getGivenName(),this.facts.demographics.familyName=this.patient.getFamilyName(),this.facts.demographics.landmark=this.patient.getAttribute(19),this.facts.demographics.phoneNumber=this.patient.getAttribute(12),this.facts.demographics.gender=this.patient.getGender(),this.facts.demographics.birthdate=this.patient.getBirthdate(),this.facts.demographics.ancestryDistrict=this.patient.getHomeDistrict(),this.facts.demographics.ancestryTA=this.patient.getHomeTA(),this.facts.demographics.ancestryVillage=this.patient.getHomeVillage(),this.facts.demographics.currentDistrict=this.patient.getCurrentDistrict(),this.facts.demographics.currentTA=this.patient.getCurrentTA(),this.facts.demographics.currentVillage=this.patient.getCurrentVillage(),this.facts.identifiers=this.patient.getIdentifiers().map(t=>t.type.name)},async setGlobalPropertyFacts(){this.facts.globalProperties.ddeEnabled=await tt["a"].get("IS_DDE_ENABLED"),this.useDDE=this.facts.globalProperties.ddeEnabled,"ART"===this.app.applicationName&&(this.facts.globalProperties.useFilingNumbers=await tt["a"].get("IS_ART_FILING_NUMBER_ENABLED"))},async setAncFacts(){const t=new Z(this.patient.getID(),-1);this.facts.anc.canInitiateNewPregnancy=await t.canInitiateNewPregnancy(),this.facts.anc.currentPregnancyIsOverdue=await t.pregnancyIsOverdue(),this.facts.anc.lmpMonths=await t.getLmpInMonths()},buildDDEDiffs(t){const e=[],a={givenName:{label:"First Name",ref:"given_name"},familyName:{label:"Last Name",ref:"family_name"},birthdate:{label:"Birthdate",ref:"birthdate"},gender:{label:"Gender",ref:"gender"},phoneNumber:{label:"Phone number",ref:"phone_number"},ancestryDistrict:{label:"Home District",ref:"home_district"},ancestryTA:{label:"Home TA",ref:"home_traditional_authority"},ancestryVillage:{label:"Home Village",ref:"home_village"},currentDistrict:{label:"Current District",ref:"current_district"},currentTA:{label:"Current TA",ref:"current_traditional_authority"},currentVillage:{label:"Current Village",ref:"current_village"}};let n=0;const i={indexes:[],class:"his-empty-set-color"};for(const s in a){let r=this.facts.demographics[s],o=r;a[s].ref in t&&(i.indexes.push(n),r=t[a[s].ref].local,o=t[a[s].ref].remote),e.push([a[s].label,r,o]),++n}return{comparisons:e,rowColors:[i]}},async setProgramFacts(){this.facts.programName=this.app.applicationName;try{this.program=new F["a"](this.patient.getID()),this.programInfo=await this.program.getProgram(),tt["a"].set("PATIENT_PROGRAM",this.programInfo);const{program:t,outcome:e}=this.programInfo;this.facts.enrolledInProgram=!(Object(M["d"])(t)||t.match(/n\/a/i)),this.facts.currentOutcome=e,this.facts.userRoles=R["a"].getUserRoles().map(t=>t.role),this.facts.patientType=await $["a"].getFirstValueCoded(this.patient.getID(),"Type of patient")||"N/A"}catch(t){console.error(""+t)}},async setDDEFacts(){try{var t;const e=null===(t=await this.ddeInstance.getLocalAndRemoteDiffs())||void 0===t?void 0:t.diff;this.facts.dde.localDiffs=this.ddeInstance.formatDiffValuesByType(e,"local");const{comparisons:a,rowColors:n}=this.buildDDEDiffs(e);if(this.facts.dde.diffRows=a,this.facts.dde.diffRowColors=n,e.npid){const{local:t,remote:a}=e.npid;this.facts.dde.localNpidDiff=t,this.facts.dde.remoteNpidDiff=a,delete e.npid}this.facts.dde.hasDemographicConflict=!Object(C["isEmpty"])(e)}catch(e){console.warn(e)}},async setVoidedNpidFacts(t){const e=["Name","Birthdate","Gender","Ancestry Home","CurrentID","Action"];let a=[];const n=await this.ddeInstance.findVoidedIdentifier(t);n&&(a=n.map(t=>{const e=new L["a"](t);return[e.getFullName(),e.getBirthdate(),e.getGender(),e.getHomeTA(),e.getNationalID(),{type:"button",name:"Select",action:async()=>{if(!e.patientIsComplete())return this.$router.push("/patient/registration?edit_person="+e.getID());if(e.getNationalID().match(/unknown/i)||!e.getDocID())try{return await e.assignNpid(),await this.findAndSetPatient(e.getID(),void 0),x["Z"].dismiss()}catch(t){return Object(S["e"])("Failed to assign npid to patient with unknown npid."),console.error(t)}await x["Z"].dismiss(),await this.findAndSetPatient(void 0,e.getNationalID())}}]}),this.facts.dde.voidedNpids.cols=e,this.facts.dde.voidedNpids.rows=a)},async onEvent(t,e={}){const a=Object(V["a"])(this.facts,H,"",t,"weight");for(const s in a){var n;const t=a[s];if(null!==t&&void 0!==t&&null!==(n=t.actions)&&void 0!==n&&n.alert){var i;const e=await(null===t||void 0===t||null===(i=t.actions)||void 0===i?void 0:i.alert(this.facts));if(await this.runFlowState(e)===P.FORCE_EXIT)return!1}}"function"===typeof e&&e()},async onInitiateNewAncPregnancy(){await Object(S["a"])("Are you sure you want to initiate new pregnancy?")&&(await this.initiateNewAncPregnancy()?(this.facts.anc.canInitiateNewPregnancy=!1,this.facts.anc.currentPregnancyIsOverdue=!1,this.nextTask()):Object(S["e"])("Unable to initiate new pregnancy"))},initiateNewAncPregnancy(){return new Z(this.patient.getID(),-1).createNewPregnancyStatus()},async runFlowState(t){const e={};if(e[P.GO_HOME]=()=>(this.$router.push("/"),P.FORCE_EXIT),e[P.GO_BACK]=()=>(this.$router.back(),P.FORCE_EXIT),e[P.ENROLL]=()=>this.program.enrollProgram(),e[P.ACTIVATE_FN]=()=>(this.$router.push(`/art/filing_numbers/${this.patient.getID()}?assign=true`),P.FORCE_EXIT),e[P.UPDATE_DMG]=()=>(this.$router.push("/patient/registration?edit_person="+this.patient.getID()),P.FORCE_EXIT),e[P.PRINT_NPID]=async()=>(await this.ddeInstance.printNpid(this.patient.getID()),await Object(W["a"])(1800),P.CONTINUE),e[P.CREATE_NPID_WITH_REMOTE_DIFF]=async()=>{const t=this.facts.dde.remoteNpidDiff;try{if(t&&await this.ddeInstance.createNPID(t))return this.facts.scannedNpid=t,this.facts.currentNpid=t,this.facts.dde.localNpidDiff=t,Object(S["d"])("Remote NPID successfully updated"),await Object(W["a"])(300),await this.ddeInstance.printNpid(),await this.findAndSetPatient(void 0,t),P.FORCE_EXIT}catch(e){const t=/Identifier already assigned to another patient/i;if(e instanceof B["a"]&&e.errors.join(",").match(t)){const t=await this.ddeInstance.reassignNpid(this.patient.getDocID());if(t)return this.patient=new L["a"](t),Object(S["d"])("Patient has been reassigned NPID"),await Object(W["a"])(300),await this.ddeInstance.printNpid(),await this.findAndSetPatient(void 0,this.patient.getNationalID()),P.FORCE_EXIT}Object(S["c"])("Unable to assign NPID: "+e)}},e[P.ASSIGN_NPID]=async()=>(await this.patient.assignNpid(),await new k["a"](this.patient.getID()).printNidLbl(),await Object(W["a"])(300),await this.reloadPatient(),P.FORCE_EXIT),e[P.INITIATE_ANC_PREGNANCY]=async()=>(await this.initiateNewAncPregnancy(),P.CONTINUE),e[P.VIEW_MERGE_AUDIT_FOR_NPID]=()=>(this.$router.push("/merge/rollback/"+this.facts.scannedNpid),P.FORCE_EXIT),e[P.RESOLVE_DUPLICATE_NPIDS]=()=>(this.$router.push("/npid/duplicates/"+this.facts.scannedNpid),P.FORCE_EXIT),e[P.REFRESH_DDE_DEMOGRAPHICS]=async()=>(await this.ddeInstance.refreshDemographics(),await this.reloadPatient(),P.FORCE_EXIT),e[P.ADD_AS_DRUG_REFILL]=async()=>(await this.createPatientType("Drug Refill"),P.CONTINUE),e[P.ADD_AS_NEW_PATIENT]=async()=>(await this.createPatientType("New patient"),P.CONTINUE),e[P.ADD_AS_EXTERNAL_CONSULTATION]=async()=>(await this.createPatientType("External consultation"),P.CONTINUE),e[P.SEARCH_BY_NAME]=()=>(this.$router.push("/patient/registration"),P.FORCE_EXIT),e[P.UPDATE_LOCAL_DDE_DIFFS]=async()=>(await this.ddeInstance.updateLocalDifferences(this.facts.dde.localDiffs),await this.reloadPatient(),P.FORCE_EXIT),t in e)try{return await e[t]()}catch(a){Object(S["c"])(""+a)}return t},async createPatientType(t){const e=new Y["a"](this.patient.getID(),-1);await e.createEncounter(),await e.savePatientType(t)},async onVoid(){Object(Q["a"])(async t=>{try{await L["a"].voidPatient(this.patient.getID(),t),this.$router.push("/")}catch(e){Object(S["c"])(""+e)}},"void-modal")},nextTask(){this.onEvent(_.ON_CONTINUE,()=>{Object(v["b"])(this.patient.getID(),this.$router)})}}}),at=(a("4297"),a("d959")),nt=a.n(at);const it=nt()(et,[["render",A],["__scopeId","data-v-6e439b60"]]);e["default"]=it},4297:function(t,e,a){"use strict";a("d69b")},"76df":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var n=a("7f35");async function i(t,e="action-sheet-modal"){const a=await Object(n["c"])("Are you sure you want to void record?","Please specify reason for voiding this record",["Mistake/ Wrong Entry","Duplicate","System Error"],[{name:"Cancel",slot:"start"},{name:"Void",color:"danger",slot:"end",role:"action"}],"",e);a.selection&&"Void"===a.action&&await t(a.selection)}},c21d:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("14d9");function n(t,e){const a=[],n=[-1,"",null,void 0];for(const i in e){if(!(i in t))continue;const s=t[i];n.includes(s)?a.push(!1):a.push(e[i](s,t))}return a.every(Boolean)}function i(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function s(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function r(t,e,a="",r="",o="priority"){const c=[];for(const i in e){const s=e[i],o=[s.target&&a&&s.target!=a,s.targetEvent&&r&&s.targetEvent!=r];o.some(Boolean)||n(t,s.conditions)&&(s.title=i,s.description&&(s.description.text=s.description.info(t)),c.push(s))}return"priority"===o?i(c):s(c)}},d69b:function(t,e,a){}}]);
//# sourceMappingURL=chunk-71d4aecb.295649af.js.map