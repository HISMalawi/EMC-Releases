(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-487d1d22"],{"054e":function(e,t,o){"use strict";o("9c1a")},"1d66":function(e,t,o){"use strict";o("353d")},"353d":function(e,t,o){},"4ba2":function(e,t,o){"use strict";var n=o("7a23");const i=["innerHTML"],r={class:"header-text-list"},c=["onClick"],a={key:1},s=["innerHTML"],l={key:0},d={class:"report-content"};function b(e,t,o,b,p,u){const m=Object(n["resolveComponent"])("his-standard-form"),h=Object(n["resolveComponent"])("ion-title"),O=Object(n["resolveComponent"])("ion-img"),j=Object(n["resolveComponent"])("ion-thumbnail"),f=Object(n["resolveComponent"])("ion-chip"),C=Object(n["resolveComponent"])("ion-label"),y=Object(n["resolveComponent"])("ion-item"),w=Object(n["resolveComponent"])("ion-toolbar"),g=Object(n["resolveComponent"])("ion-header"),v=Object(n["resolveComponent"])("report-table"),k=Object(n["resolveComponent"])("ion-content"),V=Object(n["resolveComponent"])("ion-footer"),N=Object(n["resolveComponent"])("his-footer"),F=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["withDirectives"])(Object(n["createVNode"])(m,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[n["vShow"],!e.canShowReport]]),e.canShowReport?(Object(n["openBlock"])(),Object(n["createBlock"])(F,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[e.showtitleOnly?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:e.title},null,8,i)]),_:1})):Object(n["createCommentVNode"])("",!0),e.showtitleOnly?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(y,{key:1},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,{slot:"start"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,{src:e.logo},null,8,["src"])]),_:1}),Object(n["createVNode"])(C,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("ul",r,[Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Title "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.title),1)]),Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Period "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.period),1)]),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerInfoList,(e,t)=>{var o,i;return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",{key:t},[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(n["openBlock"])(),Object(n["createElementBlock"])("a",{key:0,href:"#",onClick:Object(n["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(n["toDisplayString"])(e.value),9,c)):Object(n["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(i=e.other)&&void 0!==i&&i.onclick?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("b",a,[Object(n["createElementVNode"])("span",{innerHTML:e.value},null,8,s)]))])}),128)),e.showValidationStatus?(Object(n["openBlock"])(),Object(n["createElementBlock"])("li",l,[e.hasErrors?(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:0,onClick:e.showErrors,color:"danger"},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.errorCount),1),Object(n["createTextVNode"])(" Error(s) found. Click for more ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.hasErrors?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:1,color:"success"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Report is Consistent ")]),_:1}))])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(n["createVNode"])(k,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",d,[Object(n["createVNode"])(v,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(n["createVNode"])(V,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("Date Created: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.date),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("His-Core Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("API Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(N,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0)],64)}o("14d9");var p=o("0f25"),u=o("80e3"),m=o("ba82"),h=o("9ceb"),O=o("7920"),j=o("d867"),f=o("b5e4"),C=o("1718"),y=o("1c74"),w=o("5a0c"),g=o.n(w),v=o("2ef0");const k=["innerHTML"];function V(e,t,o,i,r,c){const a=Object(n["resolveComponent"])("ion-title"),s=Object(n["resolveComponent"])("ion-toolbar"),l=Object(n["resolveComponent"])("ion-header"),d=Object(n["resolveComponent"])("ion-item"),b=Object(n["resolveComponent"])("ion-list"),p=Object(n["resolveComponent"])("ion-grid"),u=Object(n["resolveComponent"])("ion-button"),m=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(a,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(p,{class:"selector"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(b,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(e,t)=>(Object(n["openBlock"])(),Object(n["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,k)]),_:2},1024))),128))]),_:1})]),_:1}),Object(n["createVNode"])(m,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var N=Object(n["defineComponent"])({components:{IonGrid:j["p"],IonList:j["y"],IonItem:j["w"],IonFooter:j["o"],IonButton:j["d"],IonToolbar:j["S"],IonHeader:j["q"],IonTitle:j["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await j["Z"].dismiss({})}}}),F=(o("054e"),o("d959")),x=o.n(F);const D=x()(N,[["render",V],["__scopeId","data-v-0ed0c7a2"]]);var B=D,S=o("7f35"),E=o("0011"),I=Object(n["defineComponent"])({components:{HisStandardForm:O["a"],IonHeader:j["q"],ReportTable:u["a"],HisFooter:p["a"],IonPage:j["D"],IonContent:j["n"],IonToolbar:j["S"],IonChip:j["l"],IonFooter:j["o"],IonLabel:j["x"],IonThumbnail:j["Q"],IonItem:j["w"],IonImg:j["s"]},props:{encryptPDF:{type:Boolean,default:!1},showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:y["e"].getSiteUUID(),apiVersion:y["e"].getApiVersion(),coreVersion:y["e"].getCoreVersion(),artVersion:y["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(v["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(v["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(C["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(C["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(C["a"])("reports.png")},hasErrors(){return!Object(v["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await j["Z"].create({component:B,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},pdfEncryptionData(){const e=y["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},refreshTimeStamp(){this.date=g()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName?this.customFileName:`${this.reportPrefix} ${y["e"].getLocationName()} ${Object(E["e"])(this.title)} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),j["X"].dismiss()}catch(e){Object(f["c"])(""+e),console.error(e),j["X"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),j["X"].dismiss()}catch(n){Object(f["c"])(""+n),console.error(n),j["X"].dismiss()}},async reloadReport(e=!1){Object(v["isEmpty"])(this.formData)&&Object(v["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await j["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(h["b"])(this.activeColumns,this.activeRows,"csvMode");Object(m["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID],["Generated by: "+y["e"].getUserName()]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(S["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(h["b"])(this.activeColumns,this.activeRows,e);Object(m["c"])(t,o,this.getFileName(),this.enabledPDFHorizontalPageBreak,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(f["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(v["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("1d66");const _=x()(I,[["render",b],["__scopeId","data-v-2feab4be"]]);t["a"]=_},7920:function(e,t,o){"use strict";var n=o("7a23");function i(e,t,o,i,r,c){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=o("9441"),c=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),a=o("d959"),s=o.n(a);const l=s()(c,[["render",i]]);t["a"]=l},"7f12":function(e,t,o){"use strict";var n=o("7a23");const i={key:0},r={key:1};function c(e,t,o,c,a,s){const l=Object(n["resolveComponent"])("ion-title"),d=Object(n["resolveComponent"])("ion-toolbar"),b=Object(n["resolveComponent"])("ion-header"),p=Object(n["resolveComponent"])("his-basic-table"),u=Object(n["resolveComponent"])("text-skeloton"),m=Object(n["resolveComponent"])("ion-content"),h=Object(n["resolveComponent"])("ion-button"),O=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(b,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(m,null,{default:Object(n["withCtx"])(()=>[e.ready?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",i,[Object(n["createVNode"])(p,{columns:e.columns,rows:e.rows},null,8,["columns","rows"])])):(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",r,[Object(n["createVNode"])(u)]))]),_:1}),Object(n["createVNode"])(O,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,{color:"danger",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var a=o("a3a5"),s=o("d867"),l=o("ded6"),d=Object(n["defineComponent"])({components:{HisBasicTable:a["a"],IonHeader:s["q"],IonToolbar:s["S"],IonContent:s["n"],IonFooter:s["o"],IonButton:s["d"],TextSkeloton:l["a"]},props:{title:{type:String,required:!0},columns:{type:Object,required:!0},onRows:{type:Function,required:!0}},data:()=>({rows:[],ready:!1}),watch:{onRows:{async handler(e){e&&(this.rows=await e(),this.ready=!0)},immediate:!0,deep:!0}},methods:{async closeModal(){await s["Z"].dismiss({})}}}),b=o("d959"),p=o.n(b);const u=p()(d,[["render",c]]);t["a"]=u},"9c1a":function(e,t,o){},fb25:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));var n=o("ade3"),i=o("1c74");class r extends i["e"]{constructor(){super(),Object(n["a"])(this,"identifierType",void 0),this.identifierType=-1}static getIdentifierTypes(){return super.getJson("types/patient_identifiers")}static async arvNumberExists(e){const t=await super.getJson(`programs/${super.getProgramID()}/lookup_arv_number/${e}`);return t.exists}getIdentifierType(){return this.identifierType}setIdentifierType(e){this.identifierType=e}getDuplicateIndentifiers(){return i["e"].getJson("search/identifiers/duplicates",{type_id:this.identifierType})}getPatientsByIdentifier(e){return i["e"].getJson("search/patients/by_identifier",{type_id:this.identifierType,identifier:e})}getMultipleIdentifiers(){return i["e"].getJson("search/identifiers/multiples",{type_id:this.identifierType})}voidMultipleIdentifiers(e,t,o){const n={identifiers:e,reason:t,identifier_type:o};return i["e"].void("void_multiple_identifiers",n)}}}}]);
//# sourceMappingURL=chunk-487d1d22.ff5771df.js.map