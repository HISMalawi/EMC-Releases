(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b3c9471e"],{"054e":function(e,t,o){"use strict";o("9c1a")},"4ba2":function(e,t,o){"use strict";var n=o("7a23");const a=["innerHTML"],r={class:"header-text-list"},i=["onClick"],c={key:1},s=["innerHTML"],l={key:0},d={class:"report-content"};function u(e,t,o,u,b,p){const m=Object(n["resolveComponent"])("his-standard-form"),h=Object(n["resolveComponent"])("ion-title"),O=Object(n["resolveComponent"])("ion-img"),j=Object(n["resolveComponent"])("ion-thumbnail"),f=Object(n["resolveComponent"])("ion-chip"),g=Object(n["resolveComponent"])("ion-label"),y=Object(n["resolveComponent"])("ion-item"),v=Object(n["resolveComponent"])("ion-toolbar"),C=Object(n["resolveComponent"])("ion-header"),w=Object(n["resolveComponent"])("report-table"),D=Object(n["resolveComponent"])("ion-content"),F=Object(n["resolveComponent"])("ion-footer"),k=Object(n["resolveComponent"])("his-footer"),V=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["withDirectives"])(Object(n["createVNode"])(m,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[n["vShow"],!e.canShowReport]]),e.canShowReport?(Object(n["openBlock"])(),Object(n["createBlock"])(V,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(C,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(v,null,{default:Object(n["withCtx"])(()=>[e.showtitleOnly?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:e.title},null,8,a)]),_:1})):Object(n["createCommentVNode"])("",!0),e.showtitleOnly?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(y,{key:1},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,{slot:"start"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,{src:e.logo},null,8,["src"])]),_:1}),Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("ul",r,[Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Title "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.title),1)]),Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Period "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.period),1)]),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerInfoList,(e,t)=>{var o,a;return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",{key:t},[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(n["openBlock"])(),Object(n["createElementBlock"])("a",{key:0,href:"#",onClick:Object(n["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(n["toDisplayString"])(e.value),9,i)):Object(n["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(a=e.other)&&void 0!==a&&a.onclick?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("b",c,[Object(n["createElementVNode"])("span",{innerHTML:e.value},null,8,s)]))])}),128)),e.showValidationStatus?(Object(n["openBlock"])(),Object(n["createElementBlock"])("li",l,[e.hasErrors?(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:0,onClick:e.showErrors,color:"danger"},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.errorCount),1),Object(n["createTextVNode"])(" Error(s) found. Click for more ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.hasErrors?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:1,color:"success"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Report is Consistent ")]),_:1}))])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(n["createVNode"])(D,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",d,[Object(n["createVNode"])(w,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(n["createVNode"])(F,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(v,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("Date Created: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.date),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("His-Core Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("API Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(k,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0)],64)}o("14d9");var b=o("0f25"),p=o("80e3"),m=o("ba82"),h=o("9ceb"),O=o("7920"),j=o("d867"),f=o("b5e4"),g=o("1718"),y=o("1c74"),v=o("5a0c"),C=o.n(v),w=o("2ef0");const D=["innerHTML"];function F(e,t,o,a,r,i){const c=Object(n["resolveComponent"])("ion-title"),s=Object(n["resolveComponent"])("ion-toolbar"),l=Object(n["resolveComponent"])("ion-header"),d=Object(n["resolveComponent"])("ion-item"),u=Object(n["resolveComponent"])("ion-list"),b=Object(n["resolveComponent"])("ion-grid"),p=Object(n["resolveComponent"])("ion-button"),m=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(b,{class:"selector"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(e,t)=>(Object(n["openBlock"])(),Object(n["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,D)]),_:2},1024))),128))]),_:1})]),_:1}),Object(n["createVNode"])(m,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(p,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var k=Object(n["defineComponent"])({components:{IonGrid:j["p"],IonList:j["y"],IonItem:j["w"],IonFooter:j["o"],IonButton:j["d"],IonToolbar:j["S"],IonHeader:j["q"],IonTitle:j["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await j["Z"].dismiss({})}}}),V=(o("054e"),o("d959")),x=o.n(V);const N=x()(k,[["render",F],["__scopeId","data-v-0ed0c7a2"]]);var S=N,B=o("7f35"),E=o("0011"),I=Object(n["defineComponent"])({components:{HisStandardForm:O["a"],IonHeader:j["q"],ReportTable:p["a"],HisFooter:b["a"],IonPage:j["D"],IonContent:j["n"],IonToolbar:j["S"],IonChip:j["l"],IonFooter:j["o"],IonLabel:j["x"],IonThumbnail:j["Q"],IonItem:j["w"],IonImg:j["s"]},props:{encryptPDF:{type:Boolean,default:!1},showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:y["e"].getSiteUUID(),apiVersion:y["e"].getApiVersion(),coreVersion:y["e"].getCoreVersion(),artVersion:y["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(w["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(w["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(g["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(g["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(g["a"])("reports.png")},hasErrors(){return!Object(w["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await j["Z"].create({component:S,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},pdfEncryptionData(){const e=y["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},refreshTimeStamp(){this.date=C()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName||`${this.reportPrefix} ${y["e"].getLocationName()} ${Object(E["e"])(this.title)} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),j["X"].dismiss()}catch(e){Object(f["c"])(""+e),console.error(e),j["X"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),j["X"].dismiss()}catch(n){Object(f["c"])(""+n),console.error(n),j["X"].dismiss()}},async reloadReport(e=!1){Object(w["isEmpty"])(this.formData)&&Object(w["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await j["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(h["b"])(this.activeColumns,this.activeRows,"csvMode");Object(m["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID],["Generated by: "+y["e"].getUserName()]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(B["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(h["b"])(this.activeColumns,this.activeRows,e);Object(m["c"])(t,o,this.getFileName(),this.enabledPDFHorizontalPageBreak,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(f["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(w["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("6aae");const T=x()(I,[["render",u],["__scopeId","data-v-f22df5d8"]]);t["a"]=T},"501f":function(e,t,o){"use strict";o.d(t,"a",(function(){return h}));o("14d9");var n=o("2706"),a=o("d95e"),r=o("2ef0"),i=o("9283"),c=o("1c74"),s=o("d867"),l=o("d6aa"),d=o("9ceb"),u=o("23e6"),b=o("6605"),p=o("7a23"),m=o("b446");function h(e="Report"){const t=Object(p["reactive"])({title:e,rows:[],columns:[],fields:[],period:"",drill:[],service:{},other:{}}),o=Object(p["computed"])(()=>t.rows),h=Object(p["computed"])(()=>t.period),O=Object(p["computed"])(()=>t.fields),j=Object(p["computed"])(()=>t.columns),f=Object(p["computed"])(()=>t.title),g=Object(b["i"])();function y(e){g.push("/patient/dashboard/"+e)}function v(e){return i["b"].toStandardHisDisplayFormat(e)}function C(e){const t=open("","","width:1024px, height:768px"),o=document.getElementById(e.containerID);o&&t&&(t.document.write(`\n                <html>\n                <head>\n                    <title>Print Cohort</title>\n                    <link rel="stylesheet" media="print"  href="${e.cssFile}"/>\n                </head>\n                <body>\n                    ${o.innerHTML}\n                </body>\n                </html>\n            `),setTimeout(()=>{t.print(),t.close()},3500))}async function w(e,o){(await s["Z"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e||"Drilldown",columns:[[d["a"].thTxt("National ID"),d["a"].thTxt("First name"),d["a"].thTxt("Last name"),d["a"].thTxt("Birthdate"),d["a"].thTxt("Action")]],rows:o,rowParser:async e=>{const o=[];for(const a of e)if(t.drill[a])o.push(t.drill[a]);else try{const e=new u["a"](await u["a"].findByID(a));t.drill[a]=[d["a"].td(e.getNationalID()),d["a"].td(e.getGivenName()),d["a"].td(e.getFamilyName()),d["a"].tdDate(""+e.getBirthdate()),d["a"].tdBtn("Show",()=>{g.push({path:"/patient/dashboard/"+a}),s["Z"].dismiss({})})],o.push(t.drill[a])}catch(n){console.error(n)}return o},showFilters:!0,footerColor:"light",showReportStamp:!1,paginated:!0,rowsPerPage:20,onFinish:()=>s["Z"].dismiss()}})).present()}function D(e,t){return t.length?d["a"].tdLink(t.length,()=>w(e,t)):d["a"].td(0)}function F(e={}){return[...Object(m["b"])({id:"start_date",helpText:"Start",required:!0,minDate:()=>(null===e||void 0===e?void 0:e.minDate)||null,maxDate:()=>(null===e||void 0===e?void 0:e.maxDate)||null,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(m["b"])({id:"end_date",helpText:"End",required:!0,minDate:(e,t)=>t.start_date,maxDate:()=>(null===e||void 0===e?void 0:e.maxDate)||null,estimation:{allowUnknown:!1},computeValue:e=>e})]}function k(){return[{id:"year",helpText:"Select Year",type:a["b"].TT_NUMBER,computedValue:e=>e.value,validation:e=>{const t=Object(r["isPlainObject"])(e)?e.value:-1;return n["a"].validateSeries([()=>n["a"].required(e),()=>isNaN(parseInt(""+t))?["Invalid year"]:null,()=>n["a"].rangeOf(e,2e3,i["b"].getYear(c["e"].getSessionDate()))])}},{id:"month",helpText:"Select Month",type:a["b"].TT_SELECT,validation:e=>n["a"].required(e),computedValue:e=>e.value,options:()=>[{label:"January",value:"01"},{label:"February",value:"02"},{label:"March",value:"03"},{label:"April",value:"04"},{label:"May",value:"05"},{label:"June",value:"06"},{label:"July",value:"07"},{label:"August",value:"08"},{label:"September",value:"09"},{label:"October",value:"10"},{label:"November",value:"11"},{label:"December",value:"12"}]}]}return t.fields=F(),{fd:v,drill:D,presentDrillDown:w,getMonthlyReportFields:k,showPrintWindow:C,buildTimeIntervalFields:F,gotoPatientDashboard:y,reportData:t,rows:o,period:h,fields:O,columns:j,title:f}}},"60bf":function(e,t,o){"use strict";o.d(t,"a",(function(){return a}));var n=o("fa94");class a extends n["a"]{generateDisaggregated(e){return n["a"].getJson("anc_cohort_disaggregated",{date:this.date,start_date:e,rebuild_outcome:!1,program_id:n["a"].getProgramID()})}generatePmtctStatArt(){return n["a"].getJson(`programs/${this.programID}/reports/pmtct_stat_art`,{start_date:this.startDate,end_date:this.endDate})}}},"6aae":function(e,t,o){"use strict";o("a942")},7920:function(e,t,o){"use strict";var n=o("7a23");function a(e,t,o,a,r,i){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=o("9441"),i=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),c=o("d959"),s=o.n(c);const l=s()(i,[["render",a]]);t["a"]=l},"9c1a":function(e,t,o){},a942:function(e,t,o){}}]);
//# sourceMappingURL=chunk-b3c9471e.9f9c2f88.js.map