(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fa8210c"],{"054e":function(e,t,o){"use strict";o("9c1a")},"44e3":function(e,t,o){"use strict";o("14d9");var a=o("1c74"),n=o("7a23"),r=o("b446"),i=o("23e6"),s=o("9283"),l=o("d867"),c=o("d6aa"),d=o("5969"),h=o("d95e"),u=o("2706"),p=o("9ceb"),m=o("2ef0"),b=Object(n["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){const t=(""+e).toUpperCase();return"M"===t||"MALE"===t?"Male":"F"===t||"FEMALE"===t?"Female":/fbf|fnp|fp/i.test(e)?t:e},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,a]=e.split("-"),n=parseInt(a);return"number"===typeof n?n:0}return 0},tdARV(e,t={}){return p["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,a=!0){const n=await l["Z"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:a,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["Z"].dismiss()}});n.present()},async drilldownData(e,t,o,a){const n=await l["Z"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:a,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["Z"].dismiss()}});n.present()},getDefaultDrillDownTable(){const e=[[p["a"].thTxt("ARV number"),p["a"].thTxt("Gender"),p["a"].thTxt("Birth Date"),p["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,a=null;if(Object(m["isArray"])(e)){const[t,o]=e;if(a=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[a,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const n=await i["a"].findByID(o),r=new i["a"](n),s=[];return a&&(t=1,s.push(a)),s.push(this.tdARV(r.getArvNumber())),s.push(p["a"].td(this.formatGender(r.getGender()))),s.push(p["a"].tdDate(r.getBirthdate().toString())),s.push(p["a"].tdBtn("Show",async()=>{await l["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),a=await Promise.all(o);return a.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:a}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,a)},drill(e,t="Drill table"){return e&&e.length>0?p["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):p["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,n=a["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:h["b"].TT_SELECT,condition:()=>e,validation:e=>u["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let a=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(a=[{label:"Set custom period",value:"custom_period",other:{}},...a]),a}},...Object(r["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(r["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,a)=>{"next"===t&&(this.endDate=a.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const O=b;t["a"]=O},"4ba2":function(e,t,o){"use strict";var a=o("7a23");const n=["innerHTML"],r={class:"header-text-list"},i=["onClick"],s={key:1},l=["innerHTML"],c={key:0},d={class:"report-content"};function h(e,t,o,h,u,p){const m=Object(a["resolveComponent"])("his-standard-form"),b=Object(a["resolveComponent"])("ion-title"),O=Object(a["resolveComponent"])("ion-img"),f=Object(a["resolveComponent"])("ion-thumbnail"),D=Object(a["resolveComponent"])("ion-chip"),j=Object(a["resolveComponent"])("ion-label"),w=Object(a["resolveComponent"])("ion-item"),g=Object(a["resolveComponent"])("ion-toolbar"),C=Object(a["resolveComponent"])("ion-header"),v=Object(a["resolveComponent"])("report-table"),y=Object(a["resolveComponent"])("ion-content"),T=Object(a["resolveComponent"])("ion-footer"),E=Object(a["resolveComponent"])("his-footer"),S=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["withDirectives"])(Object(a["createVNode"])(m,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[a["vShow"],!e.canShowReport]]),e.canShowReport?(Object(a["openBlock"])(),Object(a["createBlock"])(S,{key:0},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(C,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(g,null,{default:Object(a["withCtx"])(()=>[e.showtitleOnly?(Object(a["openBlock"])(),Object(a["createBlock"])(b,{key:0},{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("span",{innerHTML:e.title},null,8,n)]),_:1})):Object(a["createCommentVNode"])("",!0),e.showtitleOnly?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createBlock"])(w,{key:1},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(f,{slot:"start"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(O,{src:e.logo},null,8,["src"])]),_:1}),Object(a["createVNode"])(j,null,{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("ul",r,[Object(a["createElementVNode"])("li",null,[Object(a["createTextVNode"])("Title "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.title),1)]),Object(a["createElementVNode"])("li",null,[Object(a["createTextVNode"])("Period "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.period),1)]),(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.headerInfoList,(e,t)=>{var o,n;return Object(a["openBlock"])(),Object(a["createElementBlock"])("li",{key:t},[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(a["openBlock"])(),Object(a["createElementBlock"])("a",{key:0,href:"#",onClick:Object(a["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(a["toDisplayString"])(e.value),9,i)):Object(a["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(n=e.other)&&void 0!==n&&n.onclick?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createElementBlock"])("b",s,[Object(a["createElementVNode"])("span",{innerHTML:e.value},null,8,l)]))])}),128)),e.showValidationStatus?(Object(a["openBlock"])(),Object(a["createElementBlock"])("li",c,[e.hasErrors?(Object(a["openBlock"])(),Object(a["createBlock"])(D,{key:0,onClick:e.showErrors,color:"danger"},{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.errorCount),1),Object(a["createTextVNode"])(" Error(s) found. Click for more ")]),_:1},8,["onClick"])):Object(a["createCommentVNode"])("",!0),e.hasErrors?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createBlock"])(D,{key:1,color:"success"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(" Report is Consistent ")]),_:1}))])):Object(a["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(a["createVNode"])(y,null,{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("div",d,[Object(a["createVNode"])(v,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(a["createVNode"])(T,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(g,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(D,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("Date Created: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.date),1)]),_:1}),Object(a["createVNode"])(D,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("His-Core Version: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(a["createVNode"])(D,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("API Version: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(a["createVNode"])(E,{btns:e.btns},null,8,["btns"])]),_:1})):Object(a["createCommentVNode"])("",!0)],64)}o("14d9");var u=o("0f25"),p=o("80e3"),m=o("ba82"),b=o("9ceb"),O=o("7920"),f=o("d867"),D=o("b5e4"),j=o("1718"),w=o("1c74"),g=o("5a0c"),C=o.n(g),v=o("2ef0");const y=["innerHTML"];function T(e,t,o,n,r,i){const s=Object(a["resolveComponent"])("ion-title"),l=Object(a["resolveComponent"])("ion-toolbar"),c=Object(a["resolveComponent"])("ion-header"),d=Object(a["resolveComponent"])("ion-item"),h=Object(a["resolveComponent"])("ion-list"),u=Object(a["resolveComponent"])("ion-grid"),p=Object(a["resolveComponent"])("ion-button"),m=Object(a["resolveComponent"])("ion-footer");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createVNode"])(c,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,null,{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(a["createVNode"])(u,{class:"selector"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(h,null,{default:Object(a["withCtx"])(()=>[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.errors,(e,t)=>(Object(a["openBlock"])(),Object(a["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,y)]),_:2},1024))),128))]),_:1})]),_:1}),Object(a["createVNode"])(m,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(p,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var E=Object(a["defineComponent"])({components:{IonGrid:f["p"],IonList:f["y"],IonItem:f["w"],IonFooter:f["o"],IonButton:f["d"],IonToolbar:f["S"],IonHeader:f["q"],IonTitle:f["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await f["Z"].dismiss({})}}}),S=(o("054e"),o("d959")),R=o.n(S);const x=R()(E,[["render",T],["__scopeId","data-v-0ed0c7a2"]]);var _=x,I=o("7f35"),V=o("0011"),k=Object(a["defineComponent"])({components:{HisStandardForm:O["a"],IonHeader:f["q"],ReportTable:p["a"],HisFooter:u["a"],IonPage:f["D"],IonContent:f["n"],IonToolbar:f["S"],IonChip:f["l"],IonFooter:f["o"],IonLabel:f["x"],IonThumbnail:f["Q"],IonItem:f["w"],IonImg:f["s"]},props:{encryptPDF:{type:Boolean,default:!1},showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:w["e"].getSiteUUID(),apiVersion:w["e"].getApiVersion(),coreVersion:w["e"].getCoreVersion(),artVersion:w["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(v["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(v["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(j["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(j["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(j["a"])("reports.png")},hasErrors(){return!Object(v["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await f["Z"].create({component:_,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},pdfEncryptionData(){const e=w["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},refreshTimeStamp(){this.date=C()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName||`${this.reportPrefix} ${w["e"].getLocationName()} ${Object(V["e"])(this.title)} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),f["X"].dismiss()}catch(e){Object(D["c"])(""+e),console.error(e),f["X"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),f["X"].dismiss()}catch(a){Object(D["c"])(""+a),console.error(a),f["X"].dismiss()}},async reloadReport(e=!1){Object(v["isEmpty"])(this.formData)&&Object(v["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await f["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(b["b"])(this.activeColumns,this.activeRows,"csvMode");Object(m["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID],["Generated by: "+w["e"].getUserName()]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(I["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(b["b"])(this.activeColumns,this.activeRows,e);Object(m["c"])(t,o,this.getFileName(),this.enabledPDFHorizontalPageBreak,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(D["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(v["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("6aae");const N=R()(k,[["render",h],["__scopeId","data-v-f22df5d8"]]);t["a"]=N},"6aae":function(e,t,o){"use strict";o("a942")},7920:function(e,t,o){"use strict";var a=o("7a23");function n(e,t,o,n,r,i){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=o("9441"),i=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("d959"),l=o.n(s);const c=l()(i,[["render",n]]);t["a"]=c},"9c1a":function(e,t,o){},a942:function(e,t,o){},c92b:function(e,t,o){"use strict";o.r(t);var a=o("7a23");function n(e,t,o,n,r,i){const s=Object(a["resolveComponent"])("report-template"),l=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(l,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,showFilters:!0,onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])]),_:1})}o("14d9");var r=o("df95"),i=o("44e3"),s=o("4ba2"),l=o("9ceb"),c=o("2706"),d=o("d95e"),h=o("d867"),u=o("1c74"),p=o("b446"),m=o("2ef0"),b=Object(a["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:s["a"],IonPage:h["D"]},data:()=>({title:"Data cleaning report",rows:[],columns:[]}),created(){this.fields=[{id:"indicator",helpText:"Select indicator",type:d["b"].TT_SELECT,requireNext:!1,validation:e=>c["a"].required(e),options:()=>this.getIndicatorOptions()},...Object(p["b"])({id:"start_date",helpText:"Start",required:!0,condition:e=>!e.indicator.other.skipDateSelection,minDate:()=>"2001-01-01",maxDate:()=>u["e"].getSessionDate(),estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(p["b"])({id:"end_date",helpText:"End",required:!0,condition:e=>!e.indicator.other.skipDateSelection,minDate:(e,t)=>t.start_date,maxDate:()=>u["e"].getSessionDate(),estimation:{allowUnknown:!1},computeValue:e=>e})]},methods:{async onPeriod(e,t){this.rows=[],this.title=e.indicator.label;const o=e.indicator;this.columns=o.other.columns,await o.other.setRows(e,t)},masterCardBtn(e){return l["a"].tdBtn("View",()=>this.$router.push("/art/mastercard/"+e))},getDefaultIndicatorColumns(e=[]){return[[l["a"].thTxt("ARV Number"),l["a"].thTxt("Patient Id"),l["a"].thTxt("First Name"),l["a"].thTxt("Last Name"),l["a"].thTxt("Gender"),l["a"].thTxt("Date of birth"),...e,l["a"].thTxt("Action")]]},async setDefaultIndicatorRows(e,t,o,a=null){this.report=new r["b"],this.report.setStartDate(t),this.report.setEndDate(o),this.period=this.report.getDateIntervalPeriod();const n=this.sortByArvNumber(await this.report.getCleaningToolReport(e)||[],"arv_number");Object(m["isEmpty"])(n)||n.forEach(e=>{const t="function"===typeof a?a(e):[];this.rows.push([l["a"].td(e.arv_number),l["a"].td(e.patient_id),l["a"].td(e.given_name),l["a"].td(e.family_name),l["a"].td(this.formatGender(e.gender)),l["a"].tdDate(e.birthdate),...t,this.masterCardBtn(e.patient_id)])})},getIndicatorOptions(){return[{label:"DOB > Date enrolled",value:r["a"].DobMoreThanEnrolledDate,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns(),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].DobMoreThanEnrolledDate,t.start_date,t.end_date)}},{label:"Date enrolled < Earliest start date",value:r["a"].DateEnrolledLessThanEarliestStartDate,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns([l["a"].thTxt("Earliest start date"),l["a"].thTxt("Date enrolled")]),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].DateEnrolledLessThanEarliestStartDate,t.start_date,t.end_date,e=>[l["a"].tdDate(e.earliest_start_date),l["a"].tdDate(e.date_enrolled)])}},{label:"Encounters after Death",value:r["a"].ClientsWithEncountersAfterDeath,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns(),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].ClientsWithEncountersAfterDeath,t.start_date,t.end_date)}},{label:"Incomplete visits",value:"Incomplete visits",other:{skipDateSelection:!1,columns:[[l["a"].thTxt("ARV#"),l["a"].thTxt("NHID"),l["a"].thTxt("First name"),l["a"].thTxt("Last name"),l["a"].thTxt("Gender"),l["a"].thTxt("Birthdate"),l["a"].thTxt("Date(s)"),l["a"].thTxt("Action")]],setRows:async(e,t)=>{this.report=new r["b"],this.report.setStartDate(t.start_date),this.report.setEndDate(t.end_date),this.period=this.report.getDateIntervalPeriod();const o=await this.report.getIncompleteVisits();for(const a in o){const e=o[a];this.rows.push([l["a"].td(e.arv_number),l["a"].td(e.national_id),l["a"].td(e.given_name),l["a"].td(e.family_name),l["a"].td(this.formatGender(e.gender)),l["a"].tdDate(e.birthdate),l["a"].td(e.dates.map(e=>this.toDate(e)).join("<br/>")),this.masterCardBtn(parseInt(a.toString()))])}}}},{label:"Enrolled on ART before birth",value:"Enrolled on ART before birth",other:{skipDateSelection:!0,columns:[[l["a"].thTxt("ARV number"),l["a"].thTxt("Name"),l["a"].thTxt("Earliest start date"),l["a"].thTxt("Date enrolled"),l["a"].thTxt("Gender"),l["a"].thTxt("Birth Date"),l["a"].thTxt("Action")]],setRows:async()=>{try{this.report=new r["b"];const e=await this.report.getEnrolledOnArtBeforeBirth();e.forEach(e=>{this.rows.push([l["a"].td(e.identifier),l["a"].td(e.name),l["a"].tdDate(e.earliest_start_date),l["a"].tdDate(e.date_enrolled),l["a"].td(this.formatGender(e.gender)),l["a"].tdDate(e.birthdate),this.masterCardBtn(e.patient_id)])})}catch(e){if(!(e instanceof u["c"]))throw e}}}},{label:"Missing VL Results",value:"Missing VL Results",other:{columns:[[l["a"].thTxt("ARV number"),l["a"].thTxt("First name"),l["a"].thTxt("Last name"),l["a"].thTxt("Gender"),l["a"].thTxt("Accession number"),l["a"].thTxt("Order date"),l["a"].thTxt("Action")]],setRows:async(e,t)=>{try{this.report=new r["b"],this.report.setStartDate(t.start_date),this.report.setEndDate(t.end_date),this.period=this.report.getDateIntervalPeriod();const e=await this.report.getCleaningToolReport(r["a"].MissingVlResults);e.forEach(e=>{this.rows.push([l["a"].td(e.arv_number),l["a"].td(e.given_name),l["a"].td(e.family_name),l["a"].td(this.formatGender(e.gender)),l["a"].td(e.accession_number),l["a"].tdDate(e.order_date),this.masterCardBtn(e.patient_id)])})}catch(o){if(!(o instanceof u["c"]))throw o}}}},{label:"Male patients with female observations",value:r["a"].MalesWithFemaleObs,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns([l["a"].thTxt("Visit date")]),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].MalesWithFemaleObs,t.start_date,t.end_date,e=>[l["a"].tdDate(e.visit_date)])}},{label:"Missing important demographics elements",value:r["a"].MissingDemographics,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns(),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].MissingDemographics,t.start_date,t.end_date)}},{label:"Missing start reason",value:r["a"].MissingStartReasons,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns(),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].MissingStartReasons,t.start_date,t.end_date)}},{label:"Multiple start reasons",value:r["a"].MultipleStartReasons,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns(),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].MultipleStartReasons,t.start_date,t.end_date)}},{label:"Patients with Pre-ART / Unknown outcome",value:r["a"].PreArtOrUnknownOutcomes,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns(),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].PreArtOrUnknownOutcomes,t.start_date,t.end_date)}},{label:"Prescriptions without dispensations",value:r["a"].PrescriptionWithoutDispensation,other:{skipDateSelection:!1,columns:this.getDefaultIndicatorColumns([l["a"].thTxt("Visit Date")]),setRows:(e,t)=>this.setDefaultIndicatorRows(r["a"].PrescriptionWithoutDispensation,t.start_date,t.end_date,e=>[l["a"].tdDate(e.visit_date)])}}]}}}),O=o("d959"),f=o.n(O);const D=f()(b,[["render",n]]);t["default"]=D},df95:function(e,t,o){"use strict";o.d(t,"a",(function(){return a})),o.d(t,"b",(function(){return r}));var a,n=o("5969");(function(e){e["DobMoreThanEnrolledDate"]="DOB MORE THAN DATE ENROLLED",e["ClientsWithEncountersAfterDeath"]="CLIENTS WITH ENCOUNTERS AFTER DECLARED DEAD",e["DobMoreThanDateEnrolled"]="DOB MORE THAN DATE ENROLLED",e["DateEnrolledLessThanEarliestStartDate"]="DATE ENROLLED LESS THAN EARLIEST START DATE",e["MalesWithFemaleObs"]="MALE CLIENTS WITH FEMALE OBS",e["PrescriptionWithoutDispensation"]="PRESCRIPTION WITHOUT DISPENSATION",e["MissingDemographics"]="MISSING DEMOGRAPHICS",e["MissingStartReasons"]="MISSING START REASONS",e["MultipleStartReasons"]="MULTIPLE START REASONS",e["PreArtOrUnknownOutcomes"]="PRE ART OR UNKNOWN OUTCOMES",e["MissingVlResults"]="MISSING VL RESULTS"})(a||(a={}));class r extends n["a"]{constructor(){super()}saveDataCleaningVerification(e){return n["a"].postJson("data_cleaning_confirmation",e)}getCleaningToolReport(e){return this.getReport("art_data_cleaning_tools",{report_name:e})}getEnrolledOnArtBeforeBirth(){return n["a"].getJson("enrolled_on_art_before_birth")}getIncompleteVisits(){return this.getReport("incomplete_visits",{tool_name:"INCOMPLETE VISITS"})}}}}]);
//# sourceMappingURL=chunk-4fa8210c.09f4190e.js.map