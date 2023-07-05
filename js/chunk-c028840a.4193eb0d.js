(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c028840a"],{"054e":function(e,t,o){"use strict";o("9c1a")},"44e3":function(e,t,o){"use strict";o("14d9");var n=o("1c74"),r=o("7a23"),a=o("b446"),i=o("23e6"),s=o("9283"),c=o("d867"),l=o("d6aa"),d=o("5969"),p=o("d95e"),h=o("2706"),u=o("9ceb"),m=o("2ef0"),b=Object(r["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){const t=(""+e).toUpperCase();return"M"===t||"MALE"===t?"Male":"F"===t||"FEMALE"===t?"Female":/fbf|fnp|fp/i.test(e)?t:e},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,n]=e.split("-"),r=parseInt(n);return"number"===typeof r?r:0}return 0},tdARV(e,t={}){return u["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,n=!0){const r=await c["Z"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:n,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["Z"].dismiss()}});r.present()},async drilldownData(e,t,o,n){const r=await c["Z"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:n,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["Z"].dismiss()}});r.present()},getDefaultDrillDownTable(){const e=[[u["a"].thTxt("ARV number"),u["a"].thTxt("Gender"),u["a"].thTxt("Birth Date"),u["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,n=null;if(Object(m["isArray"])(e)){const[t,o]=e;if(n=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[n,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const r=await i["a"].findByID(o),a=new i["a"](r),s=[];return n&&(t=1,s.push(n)),s.push(this.tdARV(a.getArvNumber())),s.push(u["a"].td(this.formatGender(a.getGender()))),s.push(u["a"].tdDate(a.getBirthdate().toString())),s.push(u["a"].tdBtn("Show",async()=>{await c["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),n=await Promise.all(o);return n.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:n}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,n)},drill(e,t="Drill table"){return e&&e.length>0?u["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):u["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,r=n["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:p["b"].TT_SELECT,condition:()=>e,validation:e=>h["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let n=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(n=[{label:"Set custom period",value:"custom_period",other:{}},...n]),n}},...Object(a["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(a["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,n)=>{"next"===t&&(this.endDate=n.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const O=b;t["a"]=O},"4ba2":function(e,t,o){"use strict";var n=o("7a23");const r=["innerHTML"],a={class:"header-text-list"},i=["onClick"],s={key:1},c=["innerHTML"],l={key:0},d={class:"report-content"};function p(e,t,o,p,h,u){const m=Object(n["resolveComponent"])("his-standard-form"),b=Object(n["resolveComponent"])("ion-title"),O=Object(n["resolveComponent"])("ion-img"),j=Object(n["resolveComponent"])("ion-thumbnail"),f=Object(n["resolveComponent"])("ion-chip"),w=Object(n["resolveComponent"])("ion-label"),C=Object(n["resolveComponent"])("ion-item"),g=Object(n["resolveComponent"])("ion-toolbar"),y=Object(n["resolveComponent"])("ion-header"),D=Object(n["resolveComponent"])("report-table"),v=Object(n["resolveComponent"])("ion-content"),x=Object(n["resolveComponent"])("ion-footer"),F=Object(n["resolveComponent"])("his-footer"),V=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["withDirectives"])(Object(n["createVNode"])(m,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[n["vShow"],!e.canShowReport]]),e.canShowReport?(Object(n["openBlock"])(),Object(n["createBlock"])(V,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(y,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[e.showtitleOnly?(Object(n["openBlock"])(),Object(n["createBlock"])(b,{key:0},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:e.title},null,8,r)]),_:1})):Object(n["createCommentVNode"])("",!0),e.showtitleOnly?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(C,{key:1},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,{slot:"start"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,{src:e.logo},null,8,["src"])]),_:1}),Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("ul",a,[Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Title "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.title),1)]),Object(n["createElementVNode"])("li",null,[Object(n["createTextVNode"])("Period "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.period),1)]),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerInfoList,(e,t)=>{var o,r;return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",{key:t},[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(n["openBlock"])(),Object(n["createElementBlock"])("a",{key:0,href:"#",onClick:Object(n["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(n["toDisplayString"])(e.value),9,i)):Object(n["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(r=e.other)&&void 0!==r&&r.onclick?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("b",s,[Object(n["createElementVNode"])("span",{innerHTML:e.value},null,8,c)]))])}),128)),e.showValidationStatus?(Object(n["openBlock"])(),Object(n["createElementBlock"])("li",l,[e.hasErrors?(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:0,onClick:e.showErrors,color:"danger"},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.errorCount),1),Object(n["createTextVNode"])(" Error(s) found. Click for more ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.hasErrors?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(f,{key:1,color:"success"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Report is Consistent ")]),_:1}))])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(n["createVNode"])(v,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",d,[Object(n["createVNode"])(D,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(n["createVNode"])(x,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("Date Created: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.date),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("His-Core Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(n["createVNode"])(f,{color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("API Version: "),Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(F,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0)],64)}o("14d9");var h=o("0f25"),u=o("80e3"),m=o("ba82"),b=o("9ceb"),O=o("7920"),j=o("d867"),f=o("b5e4"),w=o("1718"),C=o("1c74"),g=o("5a0c"),y=o.n(g),D=o("2ef0");const v=["innerHTML"];function x(e,t,o,r,a,i){const s=Object(n["resolveComponent"])("ion-title"),c=Object(n["resolveComponent"])("ion-toolbar"),l=Object(n["resolveComponent"])("ion-header"),d=Object(n["resolveComponent"])("ion-item"),p=Object(n["resolveComponent"])("ion-list"),h=Object(n["resolveComponent"])("ion-grid"),u=Object(n["resolveComponent"])("ion-button"),m=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(h,{class:"selector"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(e,t)=>(Object(n["openBlock"])(),Object(n["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,v)]),_:2},1024))),128))]),_:1})]),_:1}),Object(n["createVNode"])(m,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var F=Object(n["defineComponent"])({components:{IonGrid:j["p"],IonList:j["y"],IonItem:j["w"],IonFooter:j["o"],IonButton:j["d"],IonToolbar:j["S"],IonHeader:j["q"],IonTitle:j["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await j["Z"].dismiss({})}}}),V=(o("054e"),o("d959")),k=o.n(V);const T=k()(F,[["render",x],["__scopeId","data-v-0ed0c7a2"]]);var S=T,N=o("7f35"),P=o("0011"),E=Object(n["defineComponent"])({components:{HisStandardForm:O["a"],IonHeader:j["q"],ReportTable:u["a"],HisFooter:h["a"],IonPage:j["D"],IonContent:j["n"],IonToolbar:j["S"],IonChip:j["l"],IonFooter:j["o"],IonLabel:j["x"],IonThumbnail:j["Q"],IonItem:j["w"],IonImg:j["s"]},props:{encryptPDF:{type:Boolean,default:!1},showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:C["e"].getSiteUUID(),apiVersion:C["e"].getApiVersion(),coreVersion:C["e"].getCoreVersion(),artVersion:C["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(D["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(D["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(w["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(w["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(w["a"])("reports.png")},hasErrors(){return!Object(D["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await j["Z"].create({component:S,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},pdfEncryptionData(){const e=C["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},refreshTimeStamp(){this.date=y()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName||`${this.reportPrefix} ${C["e"].getLocationName()} ${Object(P["e"])(this.title)} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),j["X"].dismiss()}catch(e){Object(f["c"])(""+e),console.error(e),j["X"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),j["X"].dismiss()}catch(n){Object(f["c"])(""+n),console.error(n),j["X"].dismiss()}},async reloadReport(e=!1){Object(D["isEmpty"])(this.formData)&&Object(D["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await j["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(b["b"])(this.activeColumns,this.activeRows,"csvMode");Object(m["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID],["Generated by: "+C["e"].getUserName()]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(N["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(b["b"])(this.activeColumns,this.activeRows,e);Object(m["c"])(t,o,this.getFileName(),this.enabledPDFHorizontalPageBreak,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(f["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(D["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("6aae");const B=k()(E,[["render",p],["__scopeId","data-v-f22df5d8"]]);t["a"]=B},"6aae":function(e,t,o){"use strict";o("a942")},7920:function(e,t,o){"use strict";var n=o("7a23");function r(e,t,o,r,a,i){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=o("9441"),i=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("d959"),c=o.n(s);const l=c()(i,[["render",r]]);t["a"]=l},"9c1a":function(e,t,o){},a942:function(e,t,o){},dea4:function(e,t,o){"use strict";o.r(t);var n=o("7a23");function r(e,t,o,r,a,i){const s=Object(n["resolveComponent"])("report-template"),c=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,config:{showIndex:!0},reportPrefix:"MOH",onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])]),_:1})}o("14d9");var a=o("ad8d"),i=o("5969");class s extends i["a"]{constructor(){super()}getCohort(){return this.getReport("moh_tpt")}}var c=o("44e3"),l=o("4ba2"),d=o("9ceb"),p=o("2ef0"),h=Object(n["defineComponent"])({mixins:[c["a"]],components:{ReportTemplate:l["a"]},data:()=>({title:"MOH TPT Cohort",cohort:{},rows:[],index:0,columns:[[d["a"].thTxt("Age group"),d["a"].thTxt("Gender"),d["a"].thTxt("Initiated ART"),d["a"].thTxt("Initiated TPT"),d["a"].thTxt("Completed TPT"),d["a"].thTxt("Died"),d["a"].thTxt("Defaulted"),d["a"].thTxt("Stopped ART"),d["a"].thTxt("TO"),d["a"].thTxt("Confirmed TB "),d["a"].thTxt("Pregnant")]]}),created(){this.preGenerateRows(),this.fields=this.getDateDurationFields()},methods:{async onPeriod(e,t){this.rows=[],this.preGenerateRows(),this.report=new s,this.report.setStartDate(t.start_date),this.report.setEndDate(t.end_date),this.period=this.report.getDateIntervalPeriod(),this.cohort=await this.report.getCohort()||[],this.index=0,this.setRows("F"),this.setRows("M")},preGenerateRows(){this.rows=[];const e=e=>{a["a"].forEach(t=>{this.rows.push([d["a"].td(t),d["a"].td(e),d["a"].td("..."),d["a"].td("..."),d["a"].td("..."),d["a"].td("..."),d["a"].td("..."),d["a"].td("..."),d["a"].td("..."),d["a"].td("..."),d["a"].td("...")])})};e("Female"),e("Male")},setRows(e){a["a"].forEach(t=>{const o=Object(p["find"])(this.cohort,{age_group:t,gender:e});this.rows[this.index]=[d["a"].td(t),d["a"].td(this.formatGender(o.gender)),this.drill(o["initiated_art"],`Initiate ART ${t} ${e}`),this.drill(o["started_tpt"],`Started TPT ${t} ${e}`),this.drill(o["completed_tpt"],`Completed TPT ${t} ${e}`),this.drill(o["died"],`Died ${t} ${e}`),this.drill(o["defaulted"],`Defaulted ${t} ${e}`),this.drill(o["stopped"],`Stopped ${t} ${e}`),this.drill(o["transfer_out"],`Transfer out ${t} ${e}`),this.drill(o["confirmed_tb"],`Confirmed TB ${t} ${e}`),this.drill(o["pregnant"],`Pregnant ${t} ${e}`)],++this.index})}}}),u=o("d959"),m=o.n(u);const b=m()(h,[["render",r]]);t["default"]=b}}]);
//# sourceMappingURL=chunk-c028840a.4193eb0d.js.map