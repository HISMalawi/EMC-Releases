(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eb49a1a2"],{"1ad6":function(e,t,o){"use strict";o("a002")},"2e46":function(e,t,o){"use strict";o.r(t);var a=o("7a23");function r(e,t,o,r,n,i){const s=Object(a["resolveComponent"])("report-template"),l=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(l,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,showtitleOnly:!0,config:{showIndex:!1},encryptPDF:!0,reportPrefix:"Clinic",onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])]),_:1})}o("14d9");var n=o("ad8d"),i=o("44e3"),s=o("552a"),l=o("d95e"),c=o("2706"),d=o("9283"),p=o("9ceb"),u=o("d867"),m=o("017e"),b=Object(a["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:s["a"],IonPage:u["D"]},data:()=>({title:"Booked clients",date:"",rows:[],appointments:{},columns:[[p["a"].thTxt("ARV#"),p["a"].thTxt("First name",{csvExportable:!1,pdfExportable:!0}),p["a"].thTxt("Last name",{csvExportable:!1,pdfExportable:!0}),p["a"].thTxt("Gender"),p["a"].thTxt("birthdate"),p["a"].thTxt("Outcome"),p["a"].thTxt("Current Address",{csvExportable:!1,pdfExportable:!0}),p["a"].thTxt("Actions",{csvExportable:!1,pdfExportable:!1})]]}),created(){this.report=new n["b"],this.fields=[{id:"date",helpText:"Select date",type:l["b"].TT_DATE_PICKER,defaultValue:()=>n["b"].getSessionDate(),validation:e=>c["a"].required(e),onValue:async e=>(this.report.setStartDate(e),this.appointments[e]||(this.appointments[e]=await this.report.getBookedAppointments(e)||[]),!0),config:{infoItems:e=>{var t;return[{label:"Appointments",value:(null===(t=this.appointments[e])||void 0===t?void 0:t.length)||0}]}}}]},methods:{onPeriod(e){this.rows=[],this.period=d["b"].toStandardHisDisplayFormat(e.date),this.setRows(this.appointments[e.date])},setRows(e){Object(m["a"])(e).asc(e=>e.given_name).forEach(e=>{this.rows.push([this.tdARV(e.arv_number||"N/A"),p["a"].td(e.given_name),p["a"].td(e.family_name),p["a"].td(this.formatGender(e.gender)),p["a"].tdDate(e.birthdate),p["a"].td(e.outcome),p["a"].td(`District: <br/> <b>${e.district}</b><br/>\n                        Village: <br/> <b>${e.village}</b><br/>\n                        Land-mark: <br/> <b>${e.land_mark}</b><br/>\n                        Cellphone: <br/> <b>${e.cell_phone}</b>`),p["a"].tdBtn("Select",()=>this.confirmPatient(e.person_id))])})}}}),h=o("6b0d"),g=o.n(h);const O=g()(b,[["render",r]]);t["default"]=O},"44e3":function(e,t,o){"use strict";o("14d9");var a=o("1c74"),r=o("7a23"),n=o("b446"),i=o("23e6"),s=o("9283"),l=o("d867"),c=o("d6aa"),d=o("5969"),p=o("d95e"),u=o("2706"),m=o("9ceb"),b=o("2ef0"),h=o("8e8b"),g=o("3e53"),O=o("0011"),f=Object(r["defineComponent"])({data:()=>({app:g["a"].getActiveApp(),fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",isMilitarySite:!1,drillDownCache:{}}),methods:{formatGender(e){return Object(O["b"])(e)},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const t=e.split("-")[2],o=parseInt(t);return"number"===typeof o?o:0}return 0},tdARV(e,t={}){return m["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,a=!0){const r=await l["X"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:a,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["X"].dismiss()}});r.present()},async drilldownData(e,t,o,a){const r=await l["X"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:a,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["X"].dismiss()}});r.present()},getDefaultDrillDownTable(){const e=[[m["a"].thTxt("ARV number"),m["a"].thTxt("Gender"),m["a"].thTxt("Birth Date"),m["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,a=null;if(Object(b["isArray"])(e)){const[t,o]=e;if(a=t,o in this.drillDownCache)return[a,...this.drillDownCache[o].slice(1)]}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const r=await i["a"].findByID(o),n=new i["a"](r),s=[];return a&&(t=1,s.push(a)),s.push(this.tdARV(n.getArvNumber())),s.push(m["a"].td(this.formatGender(n.getGender()))),s.push(m["a"].tdDate(n.getBirthdate().toString())),s.push(m["a"].tdBtn("Show",async()=>{await l["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),a=await Promise.all(o);return a.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:a}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,a)},drill(e,t="Drill table"){return e&&e.length>0?m["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):m["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,r=a["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:p["b"].TT_SELECT,condition:()=>e,validation:e=>u["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let a=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(a=[{label:"Set custom period",value:"custom_period",other:{}},...a]),a}},...Object(n["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(n["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,a)=>{"next"===t&&(this.endDate=a.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),{id:"occupation",helpText:"Report Group",type:p["b"].TT_SELECT,init:async()=>(this.isMilitarySite=await h["a"].get("IS_MILITARY_SITE"),!0),computedValue:e=>e.value,condition:()=>{var e;return"ART"===(null===(e=this.app)||void 0===e?void 0:e.applicationName)&&this.isMilitarySite},validation:e=>u["a"].required(e),options:()=>[{label:"All",value:"All"},{label:"Military",value:"Military"},{label:"Civilian",value:"Civilian"}]}]}}});const w=f;t["a"]=w},"552a":function(e,t,o){"use strict";var a=o("7a23");const r=e=>(Object(a["pushScopeId"])("data-v-b87105ea"),e=e(),Object(a["popScopeId"])(),e),n={class:"header-text-list"},i={key:0},s=r(()=>Object(a["createElementVNode"])("template",null,null,-1)),l={class:"report-content"};function c(e,t,o,r,c,d){const p=Object(a["resolveComponent"])("his-standard-form"),u=Object(a["resolveComponent"])("ion-img"),m=Object(a["resolveComponent"])("ion-thumbnail"),b=Object(a["resolveComponent"])("ion-label"),h=Object(a["resolveComponent"])("report-filter"),g=Object(a["resolveComponent"])("ion-toolbar"),O=Object(a["resolveComponent"])("ion-header"),f=Object(a["resolveComponent"])("report-table"),w=Object(a["resolveComponent"])("ion-content"),j=Object(a["resolveComponent"])("pagination"),y=Object(a["resolveComponent"])("ion-chip"),v=Object(a["resolveComponent"])("ion-footer"),F=Object(a["resolveComponent"])("his-footer"),C=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["withDirectives"])(Object(a["createVNode"])(p,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[a["vShow"],e.showForm]]),e.showForm?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createBlock"])(C,{key:0},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(O,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(g,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(m,{slot:"start"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(u,{src:e.logo},null,8,["src"])]),_:1}),Object(a["createVNode"])(b,null,{default:Object(a["withCtx"])(()=>{var o;return[Object(a["createElementVNode"])("ul",n,[Object(a["createElementVNode"])("li",null,[Object(a["createTextVNode"])("Title "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.title),1)]),Object(a["createElementVNode"])("li",null,[Object(a["createTextVNode"])("Period "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.period),1)]),e.customInfo?(Object(a["openBlock"])(),Object(a["createElementBlock"])("li",i,[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.customInfo.label)+" ",1),Object(a["createElementVNode"])("b",null,["function"===typeof(null===(o=e.customInfo)||void 0===o||null===(o=o.other)||void 0===o?void 0:o.click)?(Object(a["openBlock"])(),Object(a["createElementBlock"])("a",{key:0,href:"#",onClick:t[0]||(t[0]=Object(a["withModifiers"])(t=>e.customInfo.other.click(),["prevent"]))},Object(a["toDisplayString"])(e.customInfo.value),1)):(Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],{key:1},[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.customInfo.value),1)],64))])])):Object(a["createCommentVNode"])("",!0),s])]}),_:1}),Object(a["createVNode"])(h,{slot:"end",showPerPageFilter:e.showFilters||e.paginated,disableSearchFilter:e.isTableLoading,disablePerPageFilter:e.isTableLoading,totalRowCount:e.tableRows.length,customFilter:e.customFilter,onOnItemsPerPage:t[1]||(t[1]=t=>e.itemsPerPage=t),onOnItemsVLtype:t[2]||(t[2]=t=>e.itemsVLtype=t),onOnSearchFilter:t[3]||(t[3]=t=>e.searchFilter=t)},null,8,["showPerPageFilter","disableSearchFilter","disablePerPageFilter","totalRowCount","customFilter"])]),_:1})]),_:1}),Object(a["createVNode"])(w,null,{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("div",l,[Object(a["createVNode"])(f,{rows:e.rows,paginated:e.paginated,asyncRows:e.asyncRows,rowParser:e.rowParser,config:{...e.config,tableCssTheme:e.tableCssTheme},columns:e.columns,showFilters:e.showFilters,newPage:e.currentPage,searchFilter:e.searchFilter,rowsPerPage:e.itemsPerPage,onOnIsLoading:t[4]||(t[4]=t=>e.isTableLoading=t),onOnTableRows:t[5]||(t[5]=t=>e.tableRows=t),onOnPagination:t[6]||(t[6]=t=>e.totalPages=t.length),onOnActiveColumns:t[7]||(t[7]=t=>e.activeColumns=t),onOnActiveRows:t[8]||(t[8]=t=>e.activeRows=t)},null,8,["rows","paginated","asyncRows","rowParser","config","columns","showFilters","newPage","searchFilter","rowsPerPage"])])]),_:1}),Object(a["createVNode"])(v,null,{default:Object(a["withCtx"])(()=>[!e.searchFilter&&e.paginated||!e.searchFilter&&e.totalPages>0&&e.paginated?(Object(a["openBlock"])(),Object(a["createBlock"])(g,{key:0},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(j,{perPage:e.itemsPerPage,maxVisibleButtons:10,totalPages:e.totalPages,onOnChangePage:t[9]||(t[9]=t=>e.currentPage=t)},null,8,["perPage","totalPages"])]),_:1})):Object(a["createCommentVNode"])("",!0),e.showReportStamp?(Object(a["openBlock"])(),Object(a["createBlock"])(g,{key:1},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(y,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("Date Created: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.date),1)]),_:1}),Object(a["createVNode"])(y,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("His-Core Version: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(a["createVNode"])(y,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("API Version: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})):Object(a["createCommentVNode"])("",!0)]),_:1}),Object(a["createVNode"])(F,{color:e.footerColor,btns:e.btns},null,8,["color","btns"])]),_:1}))],64)}o("14d9");var d=o("0f25"),p=o("80e3"),u=o("ba82"),m=o("9ceb"),b=o("7920"),h=o("d867"),g=o("1c74"),O=o("9283"),f=o("2f2a"),w=o("1799"),j=o("b5e4"),y=o("7f35"),v=o("0011"),F=Object(a["defineComponent"])({components:{HisStandardForm:b["a"],IonHeader:h["q"],ReportTable:p["a"],HisFooter:d["a"],IonPage:h["D"],IonContent:h["n"],IonToolbar:h["S"],Pagination:w["a"],ReportFilter:f["a"],IonFooter:h["o"],IonChip:h["l"],IonLabel:h["x"]},props:{title:{type:String,required:!0},customFilter:{type:Function},period:{type:String,default:""},encryptPDF:{type:Boolean,default:!1},config:{type:Object},fields:{type:Array,default:()=>[]},columns:{type:Array,required:!0},rows:{type:Array,required:!0},paginated:{type:Boolean,default:!1},customBtns:{type:Array,default:()=>[]},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},onReportConfiguration:{type:Function,required:!1},rowParser:{type:Function},showFilters:{type:Boolean,default:!1},showVLFilter:{type:Boolean,default:!1},rowsPerPage:{type:Number},asyncRows:{type:Function},footerColor:{type:String,default:"dark"},customFileName:{type:String,default:""},canExport:{type:Boolean,default:!0},showReportStamp:{type:Boolean,default:!0},customInfo:{type:Object},reportPrefix:{type:String,default:""}},data:()=>({formData:{},computeFormData:{},btns:[],isLoadingData:!1,showForm:!1,logo:"/assets/images/login-logos/Malawi-Coat_of_arms_of_arms.png",isTableLoading:!1,searchFilter:"",itemsPerPage:50,itemsVLtype:"",currentPage:0,tableRows:[],totalPages:0,activeColumns:[],activeRows:[],date:O["b"].toStandardHisDisplayFormat(g["e"].getSessionDate()),apiVersion:g["e"].getApiVersion(),coreVersion:g["e"].getCoreVersion(),siteUUID:g["e"].getSiteUUID(),tableCssTheme:"opd-report-theme"}),methods:{getFileName(){var e,t;return`${null!==(e=this.reportPrefix)&&void 0!==e?e:""} ${g["e"].getLocationName()} ${Object(v["g"])(this.title).replace(this.reportPrefix,"")} ${null!==(t=this.period)&&void 0!==t?t:this.date}`},pdfEncryptionData(){const e=g["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},async onFinish(e,t){this.formData=e,this.computeFormData=t,this.showForm=!1,await this.presentLoading();try{this.onReportConfiguration&&await this.onReportConfiguration(this.formData,this.computeFormData),h["W"].dismiss()}catch(o){console.error(o),Object(j["c"])(""+o),h["W"].dismiss()}},async reloadReport(){await this.onFinish(this.formData,this.computeFormData)},async presentLoading(){const e=await h["W"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.showForm=!!this.fields.length,this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(m["b"])(this.columns,this.rows,"csvMode");Object(u["a"])(e,[...t,["Date Created: "+this.date],["Period: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID]],this.getFileName())}},{name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(y["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(m["b"])(this.activeColumns,this.activeRows,e);Object(u["c"])(t,o,this.getFileName(),!1,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}},{name:"Back",size:"large",slot:"end",color:"primary",visible:!0,onClick:()=>this.showForm=!0},{name:"Refresh",size:"large",slot:"end",color:"warning",visible:!0,onClick:()=>this.reloadReport()},{name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>this.$router.push({path:"/"})})}}),C=(o("1ad6"),o("6b0d")),P=o.n(C);const D=P()(F,[["render",c],["__scopeId","data-v-b87105ea"]]);t["a"]=D},7920:function(e,t,o){"use strict";var a=o("7a23");function r(e,t,o,r,n,i){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var n=o("9441"),i=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:n["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("6b0d"),l=o.n(s);const c=l()(i,[["render",r]]);t["a"]=c},a002:function(e,t,o){}}]);
//# sourceMappingURL=chunk-eb49a1a2.5a590538.js.map