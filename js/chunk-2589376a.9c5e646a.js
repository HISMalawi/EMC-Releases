(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2589376a"],{"054e":function(e,t,o){"use strict";o("9c1a")},"4ba2":function(e,t,o){"use strict";var n=o("7a23");const i=["innerHTML"],r={class:"header-text-list"},a=["onClick"],s={key:1},c=["innerHTML"],l={key:0},d={class:"report-content"};function p(e,t,o,p,u,b){const h=Object(n["resolveComponent"])("his-standard-form"),m=Object(n["resolveComponent"])("ion-title"),O=Object(n["resolveComponent"])("ion-img"),j=Object(n["resolveComponent"])("ion-thumbnail"),f=Object(n["resolveComponent"])("ion-chip"),y=Object(n["resolveComponent"])("ion-label"),C=Object(n["resolveComponent"])("ion-item"),w=Object(n["resolveComponent"])("ion-toolbar"),g=Object(n["resolveComponent"])("ion-header"),v=Object(n["resolveComponent"])("report-table"),k=Object(n["resolveComponent"])("ion-content"),V=Object(n["resolveComponent"])("ion-footer"),N=Object(n["resolveComponent"])("his-footer"),D=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["withDirectives"])(Object(n["createVNode"])(h,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[n["vShow"],!e.canShowReport]]),e.canShowReport?(Object(n["openBlock"])(),Object(n["createBlock"])(D,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[e.showtitleOnly?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:e.title},null,8,i)]),_:1})):Object(n["createCommentVNode"])("",!0),e.showtitleOnly?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(C,{key:1},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,{slot:"start"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,{src:e.logo},null,8,["src"])]),_:1}),Object(n["createVNode"])(y,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("ul",r,[Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Title "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.title),1)]),Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Period "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.period),1)]),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerInfoList,(e,t)=>{var o,i;return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",{key:t},[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(n["openBlock"])(),Object(n["createElementBlock"])("a",{key:0,href:"#",onClick:Object(n["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(n["toDisplayString"])(e.value),9,a)):Object(n["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(i=e.other)&&void 0!==i&&i.onclick?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("b",s,[Object(n["createElementVNode"])("span",{innerHTML:e.value},null,8,c)]))])}),128)),e.showValidationStatus?(Object(n["openBlock"])(),Object(n["createElementBlock"])("li",l,[e.hasErrors?(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:0,onClick:e.showErrors,color:"danger"},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.errorCount),1),Object(n["createTextVNode"])(" Error(s) found. Click for more ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.hasErrors?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:1,color:"success"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Report is Consistent ")]),_:1}))])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(n["createVNode"])(k,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",d,[Object(n["createVNode"])(v,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(n["createVNode"])(V,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("Date Created: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.date),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("His-Core Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("API Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(N,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0)],64)}o("14d9");var u=o("0f25"),b=o("80e3"),h=o("ba82"),m=o("9ceb"),O=o("7920"),j=o("d867"),f=o("b5e4"),y=o("1718"),C=o("1c74"),w=o("5a0c"),g=o.n(w),v=o("2ef0");const k=["innerHTML"];function V(e,t,o,i,r,a){const s=Object(n["resolveComponent"])("ion-title"),c=Object(n["resolveComponent"])("ion-toolbar"),l=Object(n["resolveComponent"])("ion-header"),d=Object(n["resolveComponent"])("ion-item"),p=Object(n["resolveComponent"])("ion-list"),u=Object(n["resolveComponent"])("ion-grid"),b=Object(n["resolveComponent"])("ion-button"),h=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(u,{class:"selector"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(e,t)=>(Object(n["openBlock"])(),Object(n["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,k)]),_:2},1024))),128))]),_:1})]),_:1}),Object(n["createVNode"])(h,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(b,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var N=Object(n["defineComponent"])({components:{IonGrid:j["p"],IonList:j["y"],IonItem:j["w"],IonFooter:j["o"],IonButton:j["d"],IonToolbar:j["S"],IonHeader:j["q"],IonTitle:j["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await j["Z"].dismiss({})}}}),D=(o("054e"),o("d959")),x=o.n(D);const F=x()(N,[["render",V],["__scopeId","data-v-0ed0c7a2"]]);var B=F,S=o("7f35"),I=o("0011"),T=Object(n["defineComponent"])({components:{HisStandardForm:O["a"],IonHeader:j["q"],ReportTable:b["a"],HisFooter:u["a"],IonPage:j["D"],IonContent:j["n"],IonToolbar:j["S"],IonChip:j["l"],IonFooter:j["o"],IonLabel:j["x"],IonThumbnail:j["Q"],IonItem:j["w"],IonImg:j["s"]},props:{encryptPDF:{type:Boolean,default:!1},showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:""},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Array,default:()=>[]},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:C["e"].getSiteUUID(),apiVersion:C["e"].getApiVersion(),coreVersion:C["e"].getCoreVersion(),artVersion:C["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(v["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(v["isEmpty"])(e)?(this.canShowReport=!0,this.refreshTimeStamp()):(this.canShowReport=!1,this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)}))},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(y["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(y["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(y["a"])("reports.png")},hasErrors(){return!Object(v["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0},footerRows(){const e=[["Date Created: "+this.date]];return this.period&&e.push(["Quarter: "+this.period]),e.push(["HIS-Core Version: "+this.coreVersion]),e.push(["API Version: "+this.apiVersion]),e.push(["Site UUID: "+this.siteUUID]),e.push(["Generated by: "+C["e"].getUserName()]),e}},methods:{async showErrors(){const e=await j["Z"].create({component:B,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},pdfEncryptionData(){const e=C["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},refreshTimeStamp(){this.date=g()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){var e;return this.customFileName||`${this.reportPrefix} ${C["e"].getLocationName()} ${Object(I["g"])(this.title).replace(this.reportPrefix,"")} ${null!==(e=this.period)&&void 0!==e?e:this.date}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),j["X"].dismiss()}catch(e){Object(f["c"])(""+e),console.error(e),j["X"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),j["X"].dismiss()}catch(n){Object(f["c"])(""+n),console.error(n),j["X"].dismiss()}},async reloadReport(e=!1){Object(v["isEmpty"])(this.formData)&&Object(v["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await j["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(m["b"])(this.activeColumns,this.activeRows,"csvMode");Object(h["a"])(e,[...t,...this.footerRows],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(S["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(m["b"])(this.activeColumns,this.activeRows,e);Object(h["c"])(t,o,this.getFileName(),this.enabledPDFHorizontalPageBreak,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(f["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(v["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("68a7");const E=x()(T,[["render",p],["__scopeId","data-v-5ed78ee7"]]);t["a"]=E},"633c":function(e,t,o){},"68a7":function(e,t,o){"use strict";o("633c")},7920:function(e,t,o){"use strict";var n=o("7a23");function i(e,t,o,i,r,a){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=o("9441"),a=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("d959"),c=o.n(s);const l=c()(a,[["render",i]]);t["a"]=l},"7bdc":function(e,t,o){"use strict";o.r(t);var n=o("7a23");function i(e,t,o,i,r,a){const s=Object(n["resolveComponent"])("report-template");return Object(n["openBlock"])(),Object(n["createBlock"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,canExportCsv:!1,canExportPDf:!1,onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])}o("14d9");var r=o("4ba2"),a=o("d95e"),s=o("9ceb"),c=o("fb25"),l=o("2706"),d=o("7f12"),p=o("d867"),u=o("23e6"),b=o("9283"),h=o("fa73"),m=o("b5e4"),O=Object(n["defineComponent"])({components:{ReportTemplate:r["a"]},data:()=>({service:{},dde:{},title:"Duplicate Identifiers",fields:[],rows:[],columns:[[s["a"].thTxt("Identifier"),s["a"].thTxt("Count"),s["a"].thTxt("View"),s["a"].thTxt("Resolve")]]}),async created(){this.fields=this.getFormFields(),this.dde=new h["a"],await this.dde.loadDDEStatus()},methods:{async onPeriod({identifier:e}){const t=parseInt(e.value.toString());this.title=e.label+" Duplicates",this.service=new c["a"],this.service.setIdentifierType(t),this.rows=await this.getRows()},getFormFields(){return[{id:"identifier",helpText:"Select Identifier type",type:a["b"].TT_SELECT,validation:e=>l["a"].required(e),options:async()=>(await c["a"].getIdentifierTypes()).map(e=>({label:e.name,value:e.patient_identifier_type_id}))}]},toDate(e){return b["b"].toStandardHisDisplayFormat(e)},async drillDuplicates(e){const t=await p["Z"].create({component:d["a"],cssClass:"custom-modal",componentProps:{title:"Persons using identifier "+e,columns:["Given name","Family name","Gender","Birth date","Action"],onRows:async()=>{const t=await this.service.getPatientsByIdentifier(e);return t.map(e=>{try{const t=new u["a"](e);return[t.getGivenName(),t.getFamilyName(),t.getGender(),this.toDate(t.getBirthdate()),{type:"button",name:"View",action:()=>{p["Z"].dismiss().then(()=>{this.$router.push("/patient/dashboard/"+t.getID())})}}]}catch(t){return Object(m["c"])("Unable to load patient details"),["N/A","N/A","N/A","N/A","N/A"]}})}}});t.present()},async getRows(){return(await this.service.getDuplicateIndentifiers()).map(e=>[s["a"].td(e.identifier),s["a"].td(e.count),s["a"].tdBtn("Select",()=>this.drillDuplicates(e.identifier)),s["a"].tdBtn("Resolve",()=>{this.$router.push("/npid/duplicates/"+e.identifier)},{event:{disabled:3!=this.service.getIdentifierType()}},"danger")])}}}),j=o("d959"),f=o.n(j);const y=f()(O,[["render",i]]);t["default"]=y},"7f12":function(e,t,o){"use strict";var n=o("7a23");const i={key:0},r={key:1};function a(e,t,o,a,s,c){const l=Object(n["resolveComponent"])("ion-title"),d=Object(n["resolveComponent"])("ion-toolbar"),p=Object(n["resolveComponent"])("ion-header"),u=Object(n["resolveComponent"])("his-basic-table"),b=Object(n["resolveComponent"])("text-skeloton"),h=Object(n["resolveComponent"])("ion-content"),m=Object(n["resolveComponent"])("ion-button"),O=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(h,null,{default:Object(n["withCtx"])(()=>[e.ready?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",i,[Object(n["createVNode"])(u,{columns:e.columns,rows:e.rows},null,8,["columns","rows"])])):(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",r,[Object(n["createVNode"])(b)]))]),_:1}),Object(n["createVNode"])(O,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(m,{color:"danger",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var s=o("a3a5"),c=o("d867"),l=o("ded6"),d=Object(n["defineComponent"])({components:{HisBasicTable:s["a"],IonHeader:c["q"],IonToolbar:c["S"],IonContent:c["n"],IonFooter:c["o"],IonButton:c["d"],TextSkeloton:l["a"]},props:{title:{type:String,required:!0},columns:{type:Object,required:!0},onRows:{type:Function,required:!0}},data:()=>({rows:[],ready:!1}),watch:{onRows:{async handler(e){e&&(this.rows=await e(),this.ready=!0)},immediate:!0,deep:!0}},methods:{async closeModal(){await c["Z"].dismiss({})}}}),p=o("d959"),u=o.n(p);const b=u()(d,[["render",a]]);t["a"]=b},"9c1a":function(e,t,o){},fb25:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));var n=o("ade3"),i=o("1c74");class r extends i["e"]{constructor(){super(),Object(n["a"])(this,"identifierType",void 0),this.identifierType=-1}static getIdentifierTypes(){return super.getJson("types/patient_identifiers")}static async arvNumberExists(e){const t=await super.getJson(`programs/${super.getProgramID()}/lookup_arv_number/${e}`);return t.exists}getIdentifierType(){return this.identifierType}setIdentifierType(e){this.identifierType=e}getDuplicateIndentifiers(){return i["e"].getJson("search/identifiers/duplicates",{type_id:this.identifierType})}getPatientsByIdentifier(e){return i["e"].getJson("search/patients/by_identifier",{type_id:this.identifierType,identifier:e})}getMultipleIdentifiers(){return i["e"].getJson("search/identifiers/multiples",{type_id:this.identifierType})}voidMultipleIdentifiers(e,t,o){const n={identifiers:e,reason:t,identifier_type:o};return i["e"].void("void_multiple_identifiers",n)}}}}]);
//# sourceMappingURL=chunk-2589376a.9c5e646a.js.map