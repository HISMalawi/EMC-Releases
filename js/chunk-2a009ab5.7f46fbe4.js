(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a009ab5"],{"1afa":function(e,t,i){},"1b47":function(e,t,i){"use strict";var n=i("7a23"),a=Object(n["withScopeId"])("data-v-23709ba4"),o=a((function(e,t,i,o,s,r){var c=Object(n["resolveComponent"])("action-header"),l=Object(n["resolveComponent"])("ion-radio"),d=Object(n["resolveComponent"])("ion-label"),u=Object(n["resolveComponent"])("ion-item"),p=Object(n["resolveComponent"])("ion-radio-group"),h=Object(n["resolveComponent"])("ion-list"),m=Object(n["resolveComponent"])("ion-content"),b=Object(n["resolveComponent"])("action-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(c,{title:e.title,subtitle:e.subtitle,color:e.color},null,8,["title","subtitle","color"]),Object(n["createVNode"])(m,{class:"ion-text-center"},{default:a((function(){return[Object(n["createVNode"])(h,null,{default:a((function(){return[Object(n["createVNode"])(p,{value:e.activeLabel},{default:a((function(){return[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.list,(function(t,i){return Object(n["openBlock"])(),Object(n["createBlock"])(u,{class:"his-md-text",onClick:function(i){return e.onclick(t)},key:i},{default:a((function(){return[Object(n["createVNode"])(l,{slot:"start",value:t},null,8,["value"]),Object(n["createVNode"])(d,null,{default:a((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(t),1)]})),_:2},1024)]})),_:2},1032,["onClick"])})),128))]})),_:1},8,["value"])]})),_:1})]})),_:1}),Object(n["createVNode"])(b,{buttons:e.buttons},null,8,["buttons"])],64)})),s=i("1da1"),r=i("5530"),c=(i("96cf"),i("d81d"),i("ac1f"),i("466d"),i("b0c0"),i("8efc")),l=i("8a30"),d=i("b5e4"),u=Object(n["defineComponent"])({components:{IonList:l["y"],IonItem:l["w"],IonContent:l["n"],IonRadio:l["E"],IonRadioGroup:l["F"]},mixins:[c["a"]],data:function(){return{activeLabel:""}},props:{list:{type:Object,required:!0}},methods:{onclick:function(e){this.activeLabel=e}},computed:{buttons:function(){var e=this;return this.actionButtons.map((function(t){return Object(r["a"])(Object(r["a"])({},t),{},{onClick:function(){var i=Object(s["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(!t.role||!t.role.match(/default/i)){i.next=2;break}return i.abrupt("return",l["X"].dismiss({action:t.name}));case 2:if(!t.role||!t.role.match(/action/i)||e.activeLabel){i.next=4;break}return i.abrupt("return",Object(d["e"])("Please select one of the options"));case 4:return i.next=6,l["X"].dismiss({selection:e.activeLabel,action:t.name});case 6:case"end":return i.stop()}}),i)})));function n(){return i.apply(this,arguments)}return n}()})}))}}}),p=(i("bdcb"),i("6b0d")),h=i.n(p);const m=h()(u,[["render",o],["__scopeId","data-v-23709ba4"]]);t["a"]=m},"1f9a":function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));var n=i("1c74"),a=i("ad60"),o=i("d10e");class s extends n["e"]{constructor(){super()}static create(e){return super.postJson("/person_attributes",e)}}var r=i("4db7");class c extends n["e"]{constructor(){super(),this.personId=0}getPersonID(){return this.personId}setPersonID(e){this.personId=e}async registerPatient(e,t){await this.createPerson(e),await this.createPersonAttributes(t);const i=await this.createPatient();return await this.printPatient(),i}async registerGuardian(e){return this.createPerson(e)}updatePerson(e){return new o["a"](e).update(this.personId)}async createPerson(e){const t=await new o["a"](e).create();return this.personId=t.person_id,t}createPatient(){return a["a"].createPatient(this.personId)}async createPersonAttributes(e){for(const t in e)await s.create({...e[t],person_id:this.personId})}printPatient(){return new r["a"](this.personId).printNidLbl()}}},"4cf3":function(e,t,i){"use strict";i("1afa")},"55ff":function(e,t,i){"use strict";i("f085")},"69c8":function(e,t,i){},"7f35":function(e,t,i){"use strict";i.d(t,"d",(function(){return k})),i.d(t,"b",(function(){return w})),i.d(t,"a",(function(){return I})),i.d(t,"c",(function(){return T}));var n=i("7a23");function a(e,t,i,a,o,s){const r=Object(n["resolveComponent"])("action-header"),c=Object(n["resolveComponent"])("his-table"),l=Object(n["resolveComponent"])("ion-content"),d=Object(n["resolveComponent"])("action-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(r,{title:e.title,subtitle:e.subtitle,color:e.color},null,8,["title","subtitle","color"]),Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,{columns:e.columns,rowColors:e.rowColors,rows:e.rows},null,8,["columns","rowColors","rows"])]),_:1}),Object(n["createVNode"])(d,{buttons:e.actionButtons},null,8,["buttons"])],64)}var o=i("a3a5"),s=i("8efc"),r=Object(n["defineComponent"])({mixins:[s["a"]],components:{HisTable:o["a"]},props:{rowColors:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0}}}),c=i("6b0d"),l=i.n(c);const d=l()(r,[["render",a]]);var u=d,p=Object(n["withScopeId"])("data-v-1c798292");Object(n["pushScopeId"])("data-v-1c798292");var h={class:"info-content his-md-text"};Object(n["popScopeId"])();var m=p((function(e,t,i,a,o,s){var r=Object(n["resolveComponent"])("action-header"),c=Object(n["resolveComponent"])("ion-content"),l=Object(n["resolveComponent"])("action-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(r,{title:e.title,subtitle:e.subtitle,color:e.color},null,8,["title","subtitle","color"]),Object(n["createVNode"])(c,null,{default:p((function(){return[Object(n["createVNode"])("div",h,[Object(n["createVNode"])("h2",{class:e.color},Object(n["toDisplayString"])(e.bodyTitle),3),Object(n["createVNode"])("p",{class:"description",innerHTML:e.bodyText},null,8,["innerHTML"])])]})),_:1}),Object(n["createVNode"])(l,{buttons:e.actionButtons},null,8,["buttons"])],64)})),b=Object(n["defineComponent"])({mixins:[s["a"]],props:{bodyTitle:{type:String,required:!0},bodyText:{type:String,required:!1}}});i("55ff");const g=l()(b,[["render",m],["__scopeId","data-v-1c798292"]]);var f=g,_=i("1b47"),y=Object(n["withScopeId"])("data-v-d609962e"),v=y((function(e,t,i,a,o,s){var r=Object(n["resolveComponent"])("action-header"),c=Object(n["resolveComponent"])("ion-content"),l=Object(n["resolveComponent"])("action-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(r,{title:e.title,subtitle:e.subtitle,color:e.color},null,8,["title","subtitle","color"]),Object(n["createVNode"])(c,null,{default:y((function(){return[Object(n["createVNode"])("ul",null,[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.list,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])("li",{key:t},[Object(n["createVNode"])("span",{class:"his-md-text",innerHTML:e},null,8,["innerHTML"])])})),128))])]})),_:1}),Object(n["createVNode"])(l,{buttons:e.actionButtons},null,8,["buttons"])],64)})),C=Object(n["defineComponent"])({mixins:[s["a"]],props:{list:{type:Array,required:!0}}});i("4cf3");const O=l()(C,[["render",v],["__scopeId","data-v-d609962e"]]);var D=O,j=i("8a30");function F(){const e=(t,i)=>{setTimeout(()=>{const n=document.getElementsByClassName("modal-wrapper");if(n.length){const a=n[0],o=a.getElementsByTagName("ion-header");o.length>=2?o[1].remove():t<20&&e(t+1,i+100);const s=a.getElementsByTagName("ion-content");s.length>=2&&s[1].remove();const r=a.getElementsByTagName("ion-footer");r.length>=2&&r[1].parentElement&&r[1].parentElement.remove()}else t<5&&e(t+1,i+100)},i)};e(0,0)}async function k(e,t,i,n,a,o="",s=[]){const r=await j["X"].create({component:u,backdropDismiss:!1,cssClass:"action-sheet-modal",componentProps:{title:e,subtitle:t,columns:i,rows:n,rowColors:s,actionButtons:a,color:o}});await r.present(),F();const{data:c}=await r.onDidDismiss();return c.action}async function w(e,t,i,n,a=""){const o=await j["X"].create({component:D,backdropDismiss:!1,cssClass:"action-sheet-modal",componentProps:{title:e,subtitle:t,actionButtons:n,list:i,color:a}});await o.present(),F();const{data:s}=await o.onDidDismiss();return s.action}async function I(e,t,i,n,a=""){const o=await j["X"].create({component:f,backdropDismiss:!1,cssClass:"action-sheet-modal",componentProps:{title:e,bodyTitle:t,bodyText:i,actionButtons:n,color:a}});await o.present(),F();const{data:s}=await o.onDidDismiss();return s.action}async function T(e,t,i,n,a="darkred",o="action-sheet-modal"){const s=await j["X"].create({component:_["a"],backdropDismiss:!1,cssClass:o,componentProps:{title:e,subtitle:t,color:a,list:i,actionButtons:n}});await s.present(),F();const{data:r}=await s.onDidDismiss();return r}},"8d15":function(e,t,i){"use strict";i.r(t);var n=i("7a23");function a(e,t,i,a,o,s){const r=Object(n["resolveComponent"])("his-standard-form"),c=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(r,{onOnIndex:t[1]||(t[1]=t=>e.fieldComponent=""),skipSummary:!0,activeField:e.fieldComponent,fields:e.fields,onFinishAction:e.onFinish},null,8,["activeField","fields","onFinishAction"])]),_:1})}var o=i("d95e"),s=i("7920"),r=i("b446"),c=i("2706"),l=i("23e6"),d=i("9283"),u=i("50e7"),p=i("2ef0"),h=i("80b5"),m=i("1f9a"),b=i("3e53"),g=i("0fa1"),f=i("0011"),_=i("fa73"),y=i("b5e4"),v=i("8df6"),C=i("8a30"),O=i("7f35"),D=i("cc74"),j=i("5a0c"),F=i.n(j),k=i("8734"),w=i("8e8b"),I=Object(n["defineComponent"])({components:{HisStandardForm:s["a"],IonPage:C["D"]},data:()=>({app:b["a"].getActiveApp(),ddeInstance:{},ddeDocID:"",ddeIsReassign:!1,skipSummary:!1,currentAddressAttributes:["current_region","current_district","current_village","current_traditional_authority"],homeAddressAttributes:["home_region","home_district","home_traditional_authority","home_village"],hasIncompleteData:!1,patient:{},editPersonData:{},editPerson:-1,personAttribute:"",activeField:"",fieldComponent:"",fields:[],isMilitarySite:!1,presets:{},registrationSummary:{},form:{},ddeEnabled:!1}),watch:{$route:{async handler({query:e}){this.ddeInstance=new _["a"],e.edit_person?(this.ddeIsReassign=e.dde_reassign,this.ddeDocID=e.doc_id,this.ddeInstance.setPatientID(e.edit_person),e.person_attribute&&(this.personAttribute=e.person_attribute),await this.initEditMode(e.edit_person)):this.presets=e,this.fields=this.getFields()},immediate:!0,deep:!0}},methods:{getFields(){let e=[];return e.push(this.personIndexField()),e.push(this.givenNameField()),e.push(this.familyNameField()),e.push(this.genderField()),e.push(this.searchResultField()),e=e.concat(this.dobFields()),e.push(this.homeRegionField()),e.push(this.homeDistrictField()),e.push(this.homeTAField()),e.push(this.homeVillageField()),e.push(this.currentRegionField()),e.push(this.currentDistrictField()),e.push(this.currentTAField()),e.push(this.currentVillage()),e=e.concat(this.landmarkFields()),e.push(this.cellPhoneField()),e.push(this.patientTypeField()),e.push(this.facilityLocationField()),e.push(this.occupationField()),e.push(this.regimentField()),e=e.concat(this.dateJoinedMilitaryFields()),e.push(this.rankField()),e.push(this.relationshipField()),e.push(this.possibleDuplicatesField()),e.push(this.patientRegistrationSummary()),e},isEditMode(){return this.editPerson>=1},async initEditMode(e){this.editPerson=e,this.patient=await w["a"].get("ACTIVE_PATIENT",{patientID:parseInt(""+this.editPerson)});const{ancestryDistrict:t,ancestryTA:i,ancestryVillage:n,currentDistrict:a,currentTA:o}=this.patient.getAddresses();this.editPersonData={given_name:this.patient.getGivenName(),family_name:this.patient.getFamilyName(),gender:this.patient.getGender(),birthdate:this.patient.getBirthdate(),home_district:t,home_traditional_authority:i,home_village:n,current_district:a,current_traditional_authority:o,cell_phone_number:this.patient.getPhoneNumber(),landmark:this.patient.getClosestLandmark()},this.presets=this.editPersonData,this.skipSummary=!0,this.personAttribute&&(this.activeField=this.personAttribute,this.fieldComponent=this.activeField)},async onFinish(e,t){return this.isEditMode()?this.update(t):this.create(e,t)},async create(e,t){let i=h["a"].resolvePerson(t);i="true"==this.presets.nationalIDStatus?this.appendNationalIDData(i):i;const n=this.resolvePersonAttributes(t),a=new m["a"],o=new l["a"](await a.registerPatient(i,n)),s=a.getPersonID();if(w["a"].set("ACTIVE_PATIENT",o),"true"==this.presets.nationalIDStatus&&(this.patient=o,await this.patient.updateMWNationalId(this.presets.malawiNationalID)),this.app.onRegisterPatient){const e=await this.app.onRegisterPatient(s,i,n,this.$router,this.$route);if(e)return}if("Yes"===i.relationship)return this.$router.push("/guardian/registration/"+s);await Object(g["b"])(s,this.$router)},appendNationalIDData(e){return Object.assign(e,{given_name:this.presets.given_name,family_name:this.presets.family_name,gender:this.presets.gender,birthdate:this.presets.birthdate,birthdate_estimated:!1})},async update(e){const t=h["a"].resolvePerson(e),i=new m["a"];i.setPersonID(this.editPerson),await i.updatePerson(t);for(const n in t)n in this.editPersonData&&(this.editPersonData[n]=t[n]);if(w["a"].invalidate("ACTIVE_PATIENT"),!this.personAttribute)return this.fieldComponent="edit_user";this.$router.back()},editConditionCheck(e=[]){return!(this.isEditMode()&&!e.includes(this.activeField))},async confirmPatient(){if(this.ddeEnabled&&(!this.patient.getDocID()||this.patient.getDocID()&&this.patient.getNationalID().match(/unknown/i)))try{await this.patient.assignNpid(),await this.patient.printNationalID(),await Object(k["a"])(300)}catch(e){Object(y["c"])("Failed to assign new NPID: "+e)}this.$router.push("/patients/confirm?person_id="+this.patient.getID())},resolvePersonAttributes(e){return Object.values(e).filter(e=>Object(p["isPlainObject"])(e)&&"personAttributes"in e).map(({personAttributes:e})=>e)},mapToOption(e){return e.map(e=>({label:e,value:e}))},givenNameField(){const e=h["a"].getGivenNameField();return e.condition=()=>this.editConditionCheck(["given_name"])&&"true"!=this.presets.nationalIDStatus,e.defaultValue=()=>this.presets.given_name,e},familyNameField(){const e=h["a"].getFamilyNameField();return e.condition=()=>this.editConditionCheck(["family_name"])&&"true"!=this.presets.nationalIDStatus,e.defaultValue=()=>this.presets.family_name,e},genderField(){const e="ANC"===this.app.applicationName,t="CxCa"===this.app.applicationName,i=h["a"].getGenderField();return i.requireNext=this.isEditMode(),i.defaultValue=()=>this.presets.gender,i.condition=()=>!(!this.isEditMode()&&(e||t))&&(this.editConditionCheck(["gender"])&&"true"!=this.presets.nationalIDStatus),!e&&!t||this.isEditMode()||(i.defaultOutput=()=>({label:"Female",value:"F"}),i.defaultComputedOutput=()=>({person:"F"})),i.beforeNext=async e=>{const t=e.value,i=this.presets.gender;if(this.isEditMode()&&t!=i){const e=await Object(O["a"])("Warning",`Changing gender from ${i} to ${t}`,"This change will cause data inconsistency and will affect alot of Reports.",[{name:"Cancel",slot:"start"},{name:"Change gender",slot:"end",color:"danger"}]);return"Change gender"===e}return!0},i},dobFields(){const e=h["a"].getDobConfig();if(e.defaultValue=()=>this.presets.birthdate,e.condition=()=>this.editConditionCheck(["year_birth_date","month_birth_date","day_birth_date"]),"ANC"===this.app.applicationName){const t=l["a"].getSessionDate(),i=12;e.maxDate=()=>F()(t).subtract(i,"years").format(d["a"])}return Object(r["b"])(e)},homeRegionField(){const e=h["a"].getHomeRegionField();return e.condition=()=>this.editConditionCheck(this.homeAddressAttributes),e},homeDistrictField(){const e=h["a"].getHomeDistrictField();return e.condition=()=>this.editConditionCheck(this.homeAddressAttributes),e},homeTAField(){const e=h["a"].getHomeTaField();return e.condition=e=>this.editConditionCheck(this.homeAddressAttributes)&&!e.home_region.label.match(/foreign/i),e},homeVillageField(){const e=h["a"].getHomeVillageField();return e.condition=e=>this.editConditionCheck(this.homeAddressAttributes)&&!e.home_region.label.match(/foreign/i),e},currentRegionField(){const e=h["a"].getCurrentRegionField();return e.condition=()=>this.editConditionCheck(this.currentAddressAttributes),e},currentDistrictField(){const e=h["a"].getCurrentDistrictField();return e.condition=()=>this.editConditionCheck(this.currentAddressAttributes),e},currentTAField(){const e=h["a"].getCurrentTAfield();return e.condition=e=>this.editConditionCheck(this.currentAddressAttributes)&&!e.current_region.label.match(/foreign/i),e},currentVillage(){const e=h["a"].getCurrentVillageField();return e.condition=e=>this.editConditionCheck(this.currentAddressAttributes)&&!e.current_region.label.match(/foreign/i),e},cellPhoneField(){const e=h["a"].getCellNumberField();return e.condition=()=>this.editConditionCheck(["cell_phone_number"]),e.defaultValue=()=>this.presets.cell_phone_number,e},facilityLocationField(){const e=h["a"].getFacilityLocationField();return e.condition=e=>["Drug Refill","External consultation"].includes(e.patient_type.value),e},landmarkFields(){const e=h["a"].getLandmarkFields();return e[0].condition=()=>this.editConditionCheck(["default_landmarks"]),e},patientTypeField(){return{id:"patient_type",helpText:"Type of patient",type:o["b"].TT_SELECT,computedValue:e=>({person:e.value}),condition:()=>this.editConditionCheck(["patient_type"])&&"ART"===this.app.applicationName,validation:e=>c["a"].required(e),options:()=>v["a"].getPatientTypes()}},occupationField(){return{id:"occupation",helpText:"Occupation",type:o["b"].TT_SELECT,init:async()=>(this.isMilitarySite=await D["b"].militarySiteEnabled(),!0),computedValue:e=>({person:e.value}),condition:()=>this.editConditionCheck(["occupation"])&&this.isMilitarySite,validation:e=>c["a"].required(e),options:()=>this.mapToOption(["Military","Civilian"])}},regimentField(){return{id:"person_regiment_id",helpText:"Regiment ID",type:o["b"].TT_TEXT,computedValue:({value:e})=>({personAttributes:{person_attribute_type_id:35,value:e}}),condition:e=>this.editConditionCheck(["person_regiment_id"])&&e.occupation&&e.occupation.value.match(/Military/i),validation:e=>c["a"].required(e)}},rankField(){return{id:"rank",helpText:"Rank",type:o["b"].TT_SELECT,validation:e=>c["a"].required(e),computedValue:({value:e})=>({personAttributes:{person_attribute_type_id:36,value:e}}),condition:e=>this.editConditionCheck(["rank"])&&e.occupation&&e.occupation.value.match(/Military/i),options:()=>this.mapToOption(["First Lieutenant","Captain","Major","Lieutenant Colonel","Colonel","Brigadier General","Lieutenant General","General","Private","Corporal","Lance Corporal","Seargent","Staff Seargent","Warrant Officer class 1","Warrant Officer class 2"])}},dateJoinedMilitaryFields(){return Object(r["b"])({id:"person_date_joined_military",helpText:"Joined Military",required:!0,condition:e=>this.editConditionCheck(["year_person_date_joined_military","month_person_date_joined_military","day_person_date_joined_military"])&&e.occupation&&e.occupation.value.match(/Military/i),minDate:()=>d["b"].estimateDateFromAge(100),maxDate:()=>u["a"].getSessionDate(),estimation:{allowUnknown:!1},computeValue:e=>({date:e,personAttributes:{person_attribute_type_id:37,value:e}})})},relationshipField(){const e="CxCa"===this.app.applicationName,t="OPD"===this.app.applicationName,i="Registration"===this.app.applicationName;return{id:"relationship",helpText:"Register guardian?",type:o["b"].TT_SELECT,computedValue:e=>({person:e.value}),condition:()=>this.editConditionCheck(["relationship"])&&!e&&!t&&!i,validation:e=>c["a"].required(e),options:()=>this.mapToOption(["Yes","No"])}},searchResultField(){return{id:"results",helpText:"Search results",type:o["b"].TT_PERSON_RESULT_VIEW,init:async()=>(this.isEditMode()||(this.ddeEnabled=await w["a"].get("IS_DDE_ENABLED")),!0),dynamicHelpText:e=>"true"==this.presets.nationalIDStatus?`Search results for "${this.presets.given_name} ${this.presets.family_name} | ${this.presets.gender}"`:`Search results for "${e.given_name.value} ${e.family_name.value} | ${e.gender.label}"`,appearInSummary:()=>!1,condition:()=>!this.isEditMode(),validation:e=>c["a"].required(e),options:async e=>{let t;if("true"==this.presets.nationalIDStatus?(this.presets.gender="Male"==this.presets.gender?"M":"F",t={given_name:this.presets.given_name,family_name:this.presets.family_name,gender:this.presets.gender}):t={given_name:e.given_name.value,family_name:e.family_name.value,gender:e.gender.value},this.ddeEnabled){const e=await this.ddeInstance.searchDemographics(t);return e.map(e=>{const t=h["a"].getPersonAttributeOptions(e);return t.other.options.push({label:"Patient Type",value:e.patient_type}),t.other.options.push({label:"Doc ID",value:e.doc_id}),t})}const i=await l["a"].search(t);return i.map(e=>h["a"].getPersonAttributeOptions(e))},config:{hiddenFooterBtns:["Clear","Next","Back"],footerBtns:[{name:"Edit Search",slot:"end",onClick:()=>{this.fieldComponent="given_name"}},{name:"New Patient",slot:"end",onClick:()=>{"true"!=this.presets.nationalIDStatus?this.fieldComponent="year_birth_date":this.fieldComponent="home_region"}},{name:"Continue",color:"success",slot:"end",state:{disabled:{default:()=>!0,onValue(e,t){return Object(p["isEmpty"])(t.results)}}},onClick:e=>this.$router.push("/patients/confirm?person_id="+e.results.value)}]}}},possibleDuplicatesField(){let e={},t={};return{id:"possible_duplicates",helpText:"Possible Duplicate(s)",type:o["b"].TT_PERSON_MATCH_VIEW,condition:async(i,n)=>!(!this.ddeEnabled||this.editPerson)&&(e=h["a"].resolvePerson(n),t=await this.ddeInstance.checkPotentialDuplicates(e),t.length>=1),options:async()=>{const i=e=>d["b"].toStandardHisDisplayFormat(e);return t.map(({score:t,person:n})=>{const a=`${n.given_name} ${n.family_name}`;return{label:a,value:n.patient_id,other:{score:100*t+"%",newPerson:e,foundPerson:n,comparisons:[["Name",`${e.given_name} ${e.family_name}`,`${n.given_name} ${n.family_name}`],["Gender",e.gender,n.gender],["Birthdate",i(e.birthdate),i(n.birthdate)],["Home District",e.home_district,n.home_district],["Home TA",e.home_traditional_authority,n.home_traditional_authority]]}}})},config:{hiddenFooterBtns:["Clear","Next"],footerBtns:[{name:"Not Duplicate",slot:"start",state:{visible:{default:()=>!1,onValue:(e,t)=>!Object(p["isEmpty"])(t.possible_duplicates)}},onClick:()=>{this.fieldComponent="_NEXT_FIELD_"}},{name:"Confirm",slot:"end",color:"warning",state:{visible:{default:()=>!1,onValue:(e,t)=>!Object(p["isEmpty"])(t.possible_duplicates)}},onClick:e=>{this.$router.push("/patients/confirm?person_id="+e.possible_duplicates.value)}}]}}},personIndexField(){return{id:"edit_user",helpText:"Edit Demographics",type:o["b"].TT_TABLE_VIEWER,init:async()=>(this.isEditMode()&&(this.ddeEnabled=await w["a"].get("IS_DDE_ENABLED")),!0),condition:()=>this.isEditMode(),options:async()=>{const e=e=>({name:"Edit",type:"button",action:()=>{this.activeField=e,this.fieldComponent=this.activeField}}),t=["Attributes","Values","Edit"],i=[["Given Name",this.editPersonData.given_name,e("given_name")],["Family Name",this.editPersonData.family_name,e("family_name")],["Gender",this.editPersonData.gender,e("gender")],["Birthdate",d["b"].toStandardHisDisplayFormat(this.editPersonData.birthdate),e("year_birth_date")],["Cell Phone Number",this.editPersonData.cell_phone_number,e("cell_phone_number")],["Home District",this.editPersonData.home_district,e("home_region")],["Home TA",this.editPersonData.home_traditional_authority,e("home_region")],["Home Village",this.editPersonData.home_village,e("home_region")],["Current district",this.editPersonData.current_district,e("current_region")],["Current T/A",this.editPersonData.current_traditional_authority,e("current_region")],["Landmark",this.editPersonData.landmark,e("default_landmarks")]],n={indexes:[],class:"his-empty-set-color"};return i.forEach((e,t)=>{Object(f["d"])(e[1])&&n.indexes.push(t)}),this.hasIncompleteData=n.indexes.length>=1,[{label:"",value:"",other:{rows:i,columns:t,rowColors:[n]}}]},config:{footerBtns:[{name:"Reassign",slot:"end",color:"success",state:{visible:{default:()=>!1,onload:()=>this.ddeEnabled&&this.ddeIsReassign&&!this.hasIncompleteData}},onClick:async()=>{try{await this.ddeInstance.reassignNpid(this.ddeDocID,this.editPerson),await this.ddeInstance.printNpid(),this.$router.push("/patients/confirm?person_id="+this.editPerson)}catch(e){Object(y["e"])(""+e)}}},{name:"Confirm",slot:"end",color:"warning",state:{visible:{onload:()=>!this.ddeIsReassign&&!this.hasIncompleteData}},onClick:async()=>this.confirmPatient()}],hiddenFooterBtns:["Clear","Next"]}}},patientRegistrationSummary(){return{id:"registration_summary",helpText:"Summary",type:o["b"].TT_SUMMARY,condition:()=>!this.skipSummary,options:(e,t)=>this.buildRegistrationSummary(t),config:{hiddenFooterBtns:["Clear"]}}},buildRegistrationSummary(e){e=Object.keys(e).map((function(t,i){if(null!=e[t])return{label:t.replace(/_/g," ").replace(/(^\w|\s\w)/g,e=>e.toUpperCase()),value:"birth_date"==t?e[t]["date"]:e[t]["person"]}})),e=e.filter(e=>void 0!=e);const t=[{label:"Given Name",value:this.presets.given_name},{label:"Family Name",value:this.presets.family_name},{label:"Gender",value:this.presets.gender},{label:"Birthdate",value:this.presets.birthdate},{label:"Malawi National ID",value:this.presets.malawiNationalID}];return"true"==this.presets.nationalIDStatus&&(e=t.concat(e)),e}}}),T=i("6b0d"),N=i.n(T);const P=N()(I,[["render",a]]);t["default"]=P},bdcb:function(e,t,i){"use strict";i("69c8")},f085:function(e,t,i){}}]);
//# sourceMappingURL=chunk-2a009ab5.7f46fbe4.js.map