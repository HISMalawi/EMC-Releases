(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e86ac12"],{"054e":function(e,t,o){"use strict";o("9c1a")},"1d66":function(e,t,o){"use strict";o("353d")},"353d":function(e,t,o){},"44e3":function(e,t,o){"use strict";o("14d9");var r=o("1c74"),n=o("7a23"),a=o("b446"),i=o("23e6"),s=o("9283"),c=o("d867"),l=o("d6aa"),d=o("5969"),u=o("d95e"),p=o("2706"),h=o("9ceb"),m=o("2ef0"),b=Object(n["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){const t=(""+e).toUpperCase();return"M"===t||"MALE"===t?"Male":"F"===t||"FEMALE"===t?"Female":/fbf|fnp|fp/i.test(e)?t:e},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,r]=e.split("-"),n=parseInt(r);return"number"===typeof n?n:0}return 0},tdARV(e,t={}){return h["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,r=!0){const n=await c["Z"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:r,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["Z"].dismiss()}});n.present()},async drilldownData(e,t,o,r){const n=await c["Z"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:r,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["Z"].dismiss()}});n.present()},getDefaultDrillDownTable(){const e=[[h["a"].thTxt("ARV number"),h["a"].thTxt("Gender"),h["a"].thTxt("Birth Date"),h["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,r=null;if(Object(m["isArray"])(e)){const[t,o]=e;if(r=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[r,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const n=await i["a"].findByID(o),a=new i["a"](n),s=[];return r&&(t=1,s.push(r)),s.push(this.tdARV(a.getArvNumber())),s.push(h["a"].td(this.formatGender(a.getGender()))),s.push(h["a"].tdDate(a.getBirthdate().toString())),s.push(h["a"].tdBtn("Show",async()=>{await c["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),r=await Promise.all(o);return r.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:r}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,r)},drill(e,t="Drill table"){return e&&e.length>0?h["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):h["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,n=r["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:u["b"].TT_SELECT,condition:()=>e,validation:e=>p["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let r=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(r=[{label:"Set custom period",value:"custom_period",other:{}},...r]),r}},...Object(a["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(a["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,r)=>{"next"===t&&(this.endDate=r.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const O=b;t["a"]=O},"4ba2":function(e,t,o){"use strict";var r=o("7a23");const n=["innerHTML"],a={class:"header-text-list"},i=["onClick"],s={key:1},c=["innerHTML"],l={key:0},d={class:"report-content"};function u(e,t,o,u,p,h){const m=Object(r["resolveComponent"])("his-standard-form"),b=Object(r["resolveComponent"])("ion-title"),O=Object(r["resolveComponent"])("ion-img"),j=Object(r["resolveComponent"])("ion-thumbnail"),g=Object(r["resolveComponent"])("ion-chip"),f=Object(r["resolveComponent"])("ion-label"),y=Object(r["resolveComponent"])("ion-item"),D=Object(r["resolveComponent"])("ion-toolbar"),w=Object(r["resolveComponent"])("ion-header"),C=Object(r["resolveComponent"])("report-table"),v=Object(r["resolveComponent"])("ion-content"),F=Object(r["resolveComponent"])("ion-footer"),V=Object(r["resolveComponent"])("his-footer"),x=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["withDirectives"])(Object(r["createVNode"])(m,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[r["vShow"],!e.canShowReport]]),e.canShowReport?(Object(r["openBlock"])(),Object(r["createBlock"])(x,{key:0},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(w,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(D,null,{default:Object(r["withCtx"])(()=>[e.showtitleOnly?(Object(r["openBlock"])(),Object(r["createBlock"])(b,{key:0},{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("span",{innerHTML:e.title},null,8,n)]),_:1})):Object(r["createCommentVNode"])("",!0),e.showtitleOnly?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])(y,{key:1},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(j,{slot:"start"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(O,{src:e.logo},null,8,["src"])]),_:1}),Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("ul",a,[Object(r["createElementVNode"])("li",null,[Object(r["createTextVNode"])("Title "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.title),1)]),Object(r["createElementVNode"])("li",null,[Object(r["createTextVNode"])("Period "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.period),1)]),(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.headerInfoList,(e,t)=>{var o,n;return Object(r["openBlock"])(),Object(r["createElementBlock"])("li",{key:t},[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(r["openBlock"])(),Object(r["createElementBlock"])("a",{key:0,href:"#",onClick:Object(r["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(r["toDisplayString"])(e.value),9,i)):Object(r["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(n=e.other)&&void 0!==n&&n.onclick?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createElementBlock"])("b",s,[Object(r["createElementVNode"])("span",{innerHTML:e.value},null,8,c)]))])}),128)),e.showValidationStatus?(Object(r["openBlock"])(),Object(r["createElementBlock"])("li",l,[e.hasErrors?(Object(r["openBlock"])(),Object(r["createBlock"])(g,{key:0,onClick:e.showErrors,color:"danger"},{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.errorCount),1),Object(r["createTextVNode"])(" Error(s) found. Click for more ")]),_:1},8,["onClick"])):Object(r["createCommentVNode"])("",!0),e.hasErrors?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])(g,{key:1,color:"success"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(" Report is Consistent ")]),_:1}))])):Object(r["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(r["createVNode"])(v,null,{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("div",d,[Object(r["createVNode"])(C,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(r["createVNode"])(F,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(D,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(g,{color:"primary"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])("Date Created: "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.date),1)]),_:1}),Object(r["createVNode"])(g,{color:"primary"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])("His-Core Version: "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(r["createVNode"])(g,{color:"primary"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])("API Version: "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(r["createVNode"])(V,{btns:e.btns},null,8,["btns"])]),_:1})):Object(r["createCommentVNode"])("",!0)],64)}o("14d9");var p=o("0f25"),h=o("80e3"),m=o("ba82"),b=o("9ceb"),O=o("7920"),j=o("d867"),g=o("b5e4"),f=o("1718"),y=o("1c74"),D=o("5a0c"),w=o.n(D),C=o("2ef0");const v=["innerHTML"];function F(e,t,o,n,a,i){const s=Object(r["resolveComponent"])("ion-title"),c=Object(r["resolveComponent"])("ion-toolbar"),l=Object(r["resolveComponent"])("ion-header"),d=Object(r["resolveComponent"])("ion-item"),u=Object(r["resolveComponent"])("ion-list"),p=Object(r["resolveComponent"])("ion-grid"),h=Object(r["resolveComponent"])("ion-button"),m=Object(r["resolveComponent"])("ion-footer");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["createVNode"])(l,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(c,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(s,null,{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(r["createVNode"])(p,{class:"selector"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(u,null,{default:Object(r["withCtx"])(()=>[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.errors,(e,t)=>(Object(r["openBlock"])(),Object(r["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,v)]),_:2},1024))),128))]),_:1})]),_:1}),Object(r["createVNode"])(m,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(c,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(h,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var V=Object(r["defineComponent"])({components:{IonGrid:j["p"],IonList:j["y"],IonItem:j["w"],IonFooter:j["o"],IonButton:j["d"],IonToolbar:j["S"],IonHeader:j["q"],IonTitle:j["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await j["Z"].dismiss({})}}}),x=(o("054e"),o("d959")),k=o.n(x);const _=k()(V,[["render",F],["__scopeId","data-v-0ed0c7a2"]]);var N=_,S=o("7f35"),R=o("0011"),B=Object(r["defineComponent"])({components:{HisStandardForm:O["a"],IonHeader:j["q"],ReportTable:h["a"],HisFooter:p["a"],IonPage:j["D"],IonContent:j["n"],IonToolbar:j["S"],IonChip:j["l"],IonFooter:j["o"],IonLabel:j["x"],IonThumbnail:j["Q"],IonItem:j["w"],IonImg:j["s"]},props:{encryptPDF:{type:Boolean,default:!1},showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:y["e"].getSiteUUID(),apiVersion:y["e"].getApiVersion(),coreVersion:y["e"].getCoreVersion(),artVersion:y["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(C["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(C["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(f["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(f["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(f["a"])("reports.png")},hasErrors(){return!Object(C["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await j["Z"].create({component:N,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},pdfEncryptionData(){const e=y["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},refreshTimeStamp(){this.date=w()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName?this.customFileName:`${this.reportPrefix} ${y["e"].getLocationName()} ${Object(R["e"])(this.title)} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),j["X"].dismiss()}catch(e){Object(g["c"])(""+e),console.error(e),j["X"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),j["X"].dismiss()}catch(r){Object(g["c"])(""+r),console.error(r),j["X"].dismiss()}},async reloadReport(e=!1){Object(C["isEmpty"])(this.formData)&&Object(C["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await j["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(b["b"])(this.activeColumns,this.activeRows,"csvMode");Object(m["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID],["Generated by: "+y["e"].getUserName()]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(S["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(b["b"])(this.activeColumns,this.activeRows,e);Object(m["c"])(t,o,this.getFileName(),this.enabledPDFHorizontalPageBreak,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(g["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(C["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("1d66");const E=k()(B,[["render",u],["__scopeId","data-v-2feab4be"]]);t["a"]=E},5969:function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));var r=o("ade3"),n=(o("14d9"),o("1c74")),a=o("9283"),i=o("5a0c"),s=o.n(i);class c extends n["e"]{constructor(){super(),Object(r["a"])(this,"programID",void 0),Object(r["a"])(this,"startDate",void 0),Object(r["a"])(this,"endDate",void 0),Object(r["a"])(this,"date",void 0),Object(r["a"])(this,"quarter",void 0),this.endDate="",this.startDate="",this.quarter="",this.date=n["e"].getSessionDate(),this.programID=n["e"].getProgramID()}getDateIntervalPeriod(){return`${a["b"].toStandardHisDisplayFormat(this.startDate)} - ${a["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(e){this.startDate=e}setEndDate(e){this.endDate=e}setQuarter(e){this.quarter=e}getReport(e,t={}){return n["e"].getJson(e,this.buildRequest(t))}buildRequest(e={}){const t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.quarter&&(t["quarter"]=this.quarter),{...t,...e}}static getQuarterBounds(e){const t=t=>s()(`${e}-${t}-01`).daysInMonth(),o=t=>`${e}-${t}-01 00:00`,r=o=>`${e}-${o}-${t(o)} 00:00`;return{Q1:{qtr:1,start:o("01"),end:r("03")},Q2:{qtr:2,start:o("04"),end:r("06")},Q3:{qtr:3,start:o("07"),end:r("09")},Q4:{qtr:4,start:o("10"),end:r("12")}}}static getQtrByDate(e){const t=this.getQuarterBounds(e.getFullYear());for(const o in t){const{start:r,end:n}=t[o];if(e>=new Date(r)&&e<=new Date(n))return t[o]}return null}static buildQtrObj(e,t){const o=this.getQuarterBounds(t),{start:r,end:n}=o[e];return{start:r,end:n,name:`${e} ${t}`}}static getReportQuarters(e=5){const t=[];let o=new Date,r=o.getFullYear();const n=r;o=new Date(`${n}-${o.getMonth()+1}-${o.getDate()} 00:00`);const a=this.getQtrByDate(o);let i=a.qtr,s=0;4===i&&t.push(this.buildQtrObj("Q1",r+1));while(s<e)0===s&&i<4&&t.push(this.buildQtrObj("Q"+(i+1),r)),t.push(this.buildQtrObj("Q"+i,r)),i=i>0?i-=1:i,r=0==i?r-1:r,i=0==i?i+=4:i,s++;return t}}},7920:function(e,t,o){"use strict";var r=o("7a23");function n(e,t,o,n,a,i){return Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=o("9441"),i=Object(r["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("d959"),c=o.n(s);const l=c()(i,[["render",n]]);t["a"]=l},"9c1a":function(e,t,o){},ad8d:function(e,t,o){"use strict";o.d(t,"a",(function(){return n})),o.d(t,"b",(function(){return a}));var r=o("5969");const n=["<1 year","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90 plus years"];class a extends r["a"]{constructor(){super()}getBookedAppointments(e){return r["a"].getJson(`programs/${this.programID}/scheduled_appointments`,{date:e})}getViralLoadResults(e){return this.getReport(`/programs/${this.programID}/reports/high_vl_patients`,{range:e})}getOtherOutcome(e){return this.getReport("patient_outcome_list",{outcome:e})}getPatientVisitTypes(){return this.getReport("patient_visit_types")}getClientsDueForVl(){return this.getReport("clients_due_vl")}getClientRentention(){return this.getReport(`/programs/${this.programID}/reports/retention`)}getExternalConsultationClients(){return this.getReport(this.programID+"/external_consultation_clients")}getMissedAppointments(){return this.getReport("missed_appointments")}getPregnantWomen(){return this.getReport(`/programs/${this.programID}/reports/pregnant_patients`)}getArchivingCandidates(){return r["a"].getJson(`programs/${this.programID}/reports/archiving_candidates`,{start_date:this.date})}}},d20c:function(e,t,o){"use strict";o.r(t);var r=o("7a23");function n(e,t,o,n,a,i){const s=Object(r["resolveComponent"])("report-template"),c=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(c,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,showtitleOnly:!0,canExportPDf:!0,customFileName:e.exportedReportTitle,onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","customFileName","onReportConfiguration"])]),_:1})}o("14d9");var a=o("ad8d"),i=o("44e3"),s=o("4ba2"),c=o("9ceb"),l=o("d867"),d=o("d1ca"),u=Object(r["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:s["a"],IonPage:l["D"]},data:()=>({title:"Clinic Clients due for VL <small>(clients with appointments in specified period)</small>",exportedReportTitle:"",rows:[],columns:[]}),async created(){const e=await d["b"].filingNumbersEnabled();this.columns.push([c["a"].thTxt(e?"Filing #":"ARV#"),c["a"].thTxt("App."),c["a"].thTxt("ART started"),c["a"].thTxt("Months on ART"),c["a"].thTxt("Milestone"),c["a"].thTxt("Ordered"),c["a"].thTxt("Result"),c["a"].thTxt("Released")]),this.fields=this.getDateDurationFields(!1,!1,5,null)},methods:{async onPeriod(e,t){this.rows=[],this.report=new a["b"],this.report.setStartDate(t.start_date),this.report.setEndDate(t.end_date),this.period=this.report.getDateIntervalPeriod();const o=await this.report.getClientsDueForVl();this.exportedReportTitle=`${a["b"].getLocationName()} Clinic Clients due for VL (clients with appointments in specified period) ${this.period}`,this.setRows(o)},async setRows(e){e.forEach(e=>{this.rows.push([c["a"].tdLink(e.arv_number,()=>this.confirmPatient(e.patient_id)),c["a"].tdDate(e.appointment_date),c["a"].tdDate(e.start_date),c["a"].td(e.months_on_art),c["a"].tdDate(e.mile_stone),c["a"].tdDate(e.last_result_order_date),c["a"].td(e.last_result),c["a"].tdDate(e.last_result_date)])})}}}),p=o("d959"),h=o.n(p);const m=h()(u,[["render",n]]);t["default"]=m}}]);
//# sourceMappingURL=chunk-8e86ac12.3399c1f2.js.map