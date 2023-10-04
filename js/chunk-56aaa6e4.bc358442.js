(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56aaa6e4"],{"054e":function(e,t,o){"use strict";o("9c1a")},"44e3":function(e,t,o){"use strict";o("14d9");var n=o("1c74"),r=o("7a23"),a=o("b446"),i=o("23e6"),s=o("9283"),c=o("d867"),l=o("d6aa"),d=o("5969"),p=o("d95e"),u=o("2706"),h=o("9ceb"),m=o("2ef0"),b=o("8e8b"),O=o("3e53"),j=o("0011"),f=Object(r["defineComponent"])({data:()=>({app:O["a"].getActiveApp(),fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",isMilitarySite:!1,drillDownCache:{}}),methods:{formatGender(e){return Object(j["b"])(e)},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,n]=e.split("-"),r=parseInt(n);return"number"===typeof r?r:0}return 0},tdARV(e,t={}){return h["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,n=!0){const r=await c["Z"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:n,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["Z"].dismiss()}});r.present()},async drilldownData(e,t,o,n){const r=await c["Z"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:n,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["Z"].dismiss()}});r.present()},getDefaultDrillDownTable(){const e=[[h["a"].thTxt("ARV number"),h["a"].thTxt("Gender"),h["a"].thTxt("Birth Date"),h["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,n=null;if(Object(m["isArray"])(e)){const[t,o]=e;if(n=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[n,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const r=await i["a"].findByID(o),a=new i["a"](r),s=[];return n&&(t=1,s.push(n)),s.push(this.tdARV(a.getArvNumber())),s.push(h["a"].td(this.formatGender(a.getGender()))),s.push(h["a"].tdDate(a.getBirthdate().toString())),s.push(h["a"].tdBtn("Show",async()=>{await c["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),n=await Promise.all(o);return n.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:n}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,n)},drill(e,t="Drill table"){return e&&e.length>0?h["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):h["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,r=n["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:p["b"].TT_SELECT,condition:()=>e,validation:e=>u["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let n=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(n=[{label:"Set custom period",value:"custom_period",other:{}},...n]),n}},...Object(a["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(a["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,n)=>{"next"===t&&(this.endDate=n.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),{id:"occupation",helpText:"Report Group",type:p["b"].TT_SELECT,init:async()=>(this.isMilitarySite=await b["a"].get("IS_MILITARY_SITE"),!0),computedValue:e=>e.value,condition:()=>{var e;return"ART"===(null===(e=this.app)||void 0===e?void 0:e.applicationName)&&this.isMilitarySite},validation:e=>u["a"].required(e),options:()=>[{label:"All",value:"All"},{label:"Military",value:"Military"},{label:"Civilian",value:"Civilian"}]}]}}});const w=f;t["a"]=w},"4ba2":function(e,t,o){"use strict";var n=o("7a23");const r=["innerHTML"],a={class:"header-text-list"},i=["onClick"],s={key:1},c=["innerHTML"],l={key:0},d={class:"report-content"};function p(e,t,o,p,u,h){const m=Object(n["resolveComponent"])("his-standard-form"),b=Object(n["resolveComponent"])("ion-title"),O=Object(n["resolveComponent"])("ion-img"),j=Object(n["resolveComponent"])("ion-thumbnail"),f=Object(n["resolveComponent"])("ion-chip"),w=Object(n["resolveComponent"])("ion-label"),C=Object(n["resolveComponent"])("ion-item"),y=Object(n["resolveComponent"])("ion-toolbar"),g=Object(n["resolveComponent"])("ion-header"),v=Object(n["resolveComponent"])("report-table"),D=Object(n["resolveComponent"])("ion-content"),x=Object(n["resolveComponent"])("ion-footer"),V=Object(n["resolveComponent"])("his-footer"),F=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["withDirectives"])(Object(n["createVNode"])(m,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[n["vShow"],!e.canShowReport]]),e.canShowReport?(Object(n["openBlock"])(),Object(n["createBlock"])(F,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(y,null,{default:Object(n["withCtx"])(()=>[e.showtitleOnly?(Object(n["openBlock"])(),Object(n["createBlock"])(b,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:e.title},null,8,r)]),_:1})):Object(n["createCommentVNode"])("",!0),e.showtitleOnly?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(C,{key:1},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,{slot:"start"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,{src:e.logo},null,8,["src"])]),_:1}),Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("ul",a,[Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Title "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.title),1)]),Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Period "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.period),1)]),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerInfoList,(e,t)=>{var o,r;return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",{key:t},[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(n["openBlock"])(),Object(n["createElementBlock"])("a",{key:0,href:"#",onClick:Object(n["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(n["toDisplayString"])(e.value),9,i)):Object(n["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(r=e.other)&&void 0!==r&&r.onclick?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("b",s,[Object(n["createElementVNode"])("span",{innerHTML:e.value},null,8,c)]))])}),128)),e.showValidationStatus?(Object(n["openBlock"])(),Object(n["createElementBlock"])("li",l,[e.hasErrors?(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:0,onClick:e.showErrors,color:"danger"},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.errorCount),1),Object(n["createTextVNode"])(" Error(s) found. Click for more ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.hasErrors?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:1,color:"success"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Report is Consistent ")]),_:1}))])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(n["createVNode"])(D,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",d,[Object(n["createVNode"])(v,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(n["createVNode"])(x,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(y,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("Date Created: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.date),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("His-Core Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("API Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(V,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0)],64)}o("14d9");var u=o("0f25"),h=o("80e3"),m=o("ba82"),b=o("9ceb"),O=o("7920"),j=o("d867"),f=o("b5e4"),w=o("1718"),C=o("1c74"),y=o("5a0c"),g=o.n(y),v=o("2ef0");const D=["innerHTML"];function x(e,t,o,r,a,i){const s=Object(n["resolveComponent"])("ion-title"),c=Object(n["resolveComponent"])("ion-toolbar"),l=Object(n["resolveComponent"])("ion-header"),d=Object(n["resolveComponent"])("ion-item"),p=Object(n["resolveComponent"])("ion-list"),u=Object(n["resolveComponent"])("ion-grid"),h=Object(n["resolveComponent"])("ion-button"),m=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(u,{class:"selector"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(e,t)=>(Object(n["openBlock"])(),Object(n["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,D)]),_:2},1024))),128))]),_:1})]),_:1}),Object(n["createVNode"])(m,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var V=Object(n["defineComponent"])({components:{IonGrid:j["p"],IonList:j["y"],IonItem:j["w"],IonFooter:j["o"],IonButton:j["d"],IonToolbar:j["S"],IonHeader:j["q"],IonTitle:j["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await j["Z"].dismiss({})}}}),F=(o("054e"),o("d959")),k=o.n(F);const S=k()(V,[["render",x],["__scopeId","data-v-0ed0c7a2"]]);var T=S,N=o("7f35"),E=o("0011"),_=Object(n["defineComponent"])({components:{HisStandardForm:O["a"],IonHeader:j["q"],ReportTable:h["a"],HisFooter:u["a"],IonPage:j["D"],IonContent:j["n"],IonToolbar:j["S"],IonChip:j["l"],IonFooter:j["o"],IonLabel:j["x"],IonThumbnail:j["Q"],IonItem:j["w"],IonImg:j["s"]},props:{encryptPDF:{type:Boolean,default:!1},showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:""},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Array,default:()=>[]},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:C["e"].getSiteUUID(),apiVersion:C["e"].getApiVersion(),coreVersion:C["e"].getCoreVersion(),artVersion:C["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(v["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(v["isEmpty"])(e)?(this.canShowReport=!0,this.refreshTimeStamp()):(this.canShowReport=!1,this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)}))},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(w["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(w["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(w["a"])("reports.png")},hasErrors(){return!Object(v["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0},footerRows(){const e=[["Date Created: "+this.date]];return this.period&&e.push(["Quarter: "+this.period]),e.push(["HIS-Core Version: "+this.coreVersion]),e.push(["API Version: "+this.apiVersion]),e.push(["Site UUID: "+this.siteUUID]),e.push(["Generated by: "+C["e"].getUserName()]),e}},methods:{async showErrors(){const e=await j["Z"].create({component:T,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},pdfEncryptionData(){const e=C["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},refreshTimeStamp(){this.date=g()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){var e;return this.customFileName||`${this.reportPrefix} ${C["e"].getLocationName()} ${Object(E["g"])(this.title).replace(this.reportPrefix,"")} ${null!==(e=this.period)&&void 0!==e?e:this.date}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),j["X"].dismiss()}catch(e){Object(f["c"])(""+e),console.error(e),j["X"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),j["X"].dismiss()}catch(n){Object(f["c"])(""+n),console.error(n),j["X"].dismiss()}},async reloadReport(e=!1){Object(v["isEmpty"])(this.formData)&&Object(v["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await j["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(b["b"])(this.activeColumns,this.activeRows,"csvMode");Object(m["a"])(e,[...t,...this.footerRows],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(N["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(b["b"])(this.activeColumns,this.activeRows,e);Object(m["c"])(t,o,this.getFileName(),this.enabledPDFHorizontalPageBreak,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(f["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(v["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("68a7");const P=k()(_,[["render",p],["__scopeId","data-v-5ed78ee7"]]);t["a"]=P},"633c":function(e,t,o){},"68a7":function(e,t,o){"use strict";o("633c")},7920:function(e,t,o){"use strict";var n=o("7a23");function r(e,t,o,r,a,i){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=o("9441"),i=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("d959"),c=o.n(s);const l=c()(i,[["render",r]]);t["a"]=l},"9c1a":function(e,t,o){},d20c:function(e,t,o){"use strict";o.r(t);var n=o("7a23");function r(e,t,o,r,a,i){const s=Object(n["resolveComponent"])("report-template"),c=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,showtitleOnly:!0,canExportPDf:!0,encryptPDF:!0,onReportConfiguration:e.onPeriod,"report-prefix":"Clinic"},null,8,["title","period","rows","fields","columns","onReportConfiguration"])]),_:1})}o("14d9");var a=o("ad8d"),i=o("44e3"),s=o("4ba2"),c=o("9ceb"),l=o("d867"),d=o("d1ca"),p=o("5a0c"),u=o.n(p),h=o("1c74"),m=Object(n["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:s["a"],IonPage:l["D"]},data:()=>({title:"Clinic Clients due for VL <small>(clients with appointments in specified period)</small>",rows:[],columns:[]}),async created(){const e=await d["b"].filingNumbersEnabled();this.columns.push([c["a"].thTxt(e?"Filing #":"ARV#"),c["a"].thTxt("First name",{csvExportable:!1,pdfExportable:!0}),c["a"].thTxt("Last name",{csvExportable:!1,pdfExportable:!0}),c["a"].thTxt("Gender"),c["a"].thTxt("Age"),c["a"].thTxt("App."),c["a"].thTxt("ART started"),c["a"].thTxt("Months on ART"),c["a"].thTxt("Milestone"),c["a"].thTxt("Ordered"),c["a"].thTxt("Result"),c["a"].thTxt("Released")]),this.fields=this.getDateDurationFields(!1,!1,5,null)},methods:{async onPeriod(e,t){this.rows=[],this.report=new a["b"],this.report.setStartDate(t.start_date),this.report.setEndDate(t.end_date),this.report.setOccupation(t.occupation),this.period=this.report.getDateIntervalPeriod();const o=await this.report.getClientsDueForVl();this.setRows(o)},async setRows(e){e.forEach(e=>{this.rows.push([c["a"].tdLink(e.arv_number,()=>this.confirmPatient(e.patient_id)),c["a"].td(e.given_name),c["a"].td(e.family_name),c["a"].td(this.formatGender(e.gender)),c["a"].td(e.birthdate?u()(h["e"].getSessionDate()).diff(e.birthdate,"years"):"N/A"),c["a"].tdDate(e.appointment_date),c["a"].tdDate(e.start_date),c["a"].td(e.months_on_art),c["a"].tdDate(e.mile_stone),c["a"].tdDate(e.last_result_order_date),c["a"].td(e.last_result),c["a"].tdDate(e.last_result_date)])})}}}),b=o("d959"),O=o.n(b);const j=O()(m,[["render",r]]);t["default"]=j}}]);
//# sourceMappingURL=chunk-56aaa6e4.bc358442.js.map