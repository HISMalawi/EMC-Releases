(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a2f3a59a"],{"44e3":function(e,t,o){"use strict";o("14d9");var a=o("1c74"),r=o("7a23"),n=o("b446"),i=o("23e6"),s=o("9283"),l=o("d867"),c=o("d6aa"),d=o("5969"),p=o("d95e"),u=o("2706"),h=o("9ceb"),m=o("2ef0"),b=o("8e8b"),g=o("3e53"),O=o("0011"),w=Object(r["defineComponent"])({data:()=>({app:g["a"].getActiveApp(),fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",isMilitarySite:!1,drillDownCache:{}}),methods:{formatGender(e){return Object(O["b"])(e)},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,a]=e.split("-"),r=parseInt(a);return"number"===typeof r?r:0}return 0},tdARV(e,t={}){return h["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,a=!0){const r=await l["Z"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:a,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["Z"].dismiss()}});r.present()},async drilldownData(e,t,o,a){const r=await l["Z"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:a,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["Z"].dismiss()}});r.present()},getDefaultDrillDownTable(){const e=[[h["a"].thTxt("ARV number"),h["a"].thTxt("Gender"),h["a"].thTxt("Birth Date"),h["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,a=null;if(Object(m["isArray"])(e)){const[t,o]=e;if(a=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[a,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const r=await i["a"].findByID(o),n=new i["a"](r),s=[];return a&&(t=1,s.push(a)),s.push(this.tdARV(n.getArvNumber())),s.push(h["a"].td(this.formatGender(n.getGender()))),s.push(h["a"].tdDate(n.getBirthdate().toString())),s.push(h["a"].tdBtn("Show",async()=>{await l["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),a=await Promise.all(o);return a.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:a}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,a)},drill(e,t="Drill table"){return e&&e.length>0?h["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):h["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,r=a["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:p["b"].TT_SELECT,condition:()=>e,validation:e=>u["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let a=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(a=[{label:"Set custom period",value:"custom_period",other:{}},...a]),a}},...Object(n["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(n["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,a)=>{"next"===t&&(this.endDate=a.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),{id:"occupation",helpText:"Report Group",type:p["b"].TT_SELECT,init:async()=>(this.isMilitarySite=await b["a"].get("IS_MILITARY_SITE"),!0),computedValue:e=>e.value,condition:()=>{var e;return"ART"===(null===(e=this.app)||void 0===e?void 0:e.applicationName)&&this.isMilitarySite},validation:e=>u["a"].required(e),options:()=>[{label:"All",value:"All"},{label:"Military",value:"Military"},{label:"Civilian",value:"Civilian"}]}]}}});const f=w;t["a"]=f},"552a":function(e,t,o){"use strict";var a=o("7a23");const r={class:"header-text-list"},n={key:0},i={class:"report-content"};function s(e,t,o,s,l,c){const d=Object(a["resolveComponent"])("his-standard-form"),p=Object(a["resolveComponent"])("ion-img"),u=Object(a["resolveComponent"])("ion-thumbnail"),h=Object(a["resolveComponent"])("ion-label"),m=Object(a["resolveComponent"])("report-filter"),b=Object(a["resolveComponent"])("ion-toolbar"),g=Object(a["resolveComponent"])("ion-header"),O=Object(a["resolveComponent"])("report-table"),w=Object(a["resolveComponent"])("ion-content"),f=Object(a["resolveComponent"])("pagination"),C=Object(a["resolveComponent"])("ion-chip"),D=Object(a["resolveComponent"])("ion-footer"),j=Object(a["resolveComponent"])("his-footer"),y=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["withDirectives"])(Object(a["createVNode"])(d,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[a["vShow"],e.showForm]]),e.showForm?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createBlock"])(y,{key:0},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(g,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(b,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(u,{slot:"start"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(p,{src:e.logo},null,8,["src"])]),_:1}),Object(a["createVNode"])(h,null,{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("ul",r,[Object(a["createElementVNode"])("li",null,[Object(a["createTextVNode"])("Title "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.title),1)]),Object(a["createElementVNode"])("li",null,[Object(a["createTextVNode"])("Period "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.period),1)]),e.customInfo?(Object(a["openBlock"])(),Object(a["createElementBlock"])("li",n,[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.customInfo.label)+" ",1),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.customInfo.value),1)])):Object(a["createCommentVNode"])("",!0)])]),_:1}),Object(a["createVNode"])(m,{slot:"end",showPerPageFilter:e.showFilters||e.paginated,disableSearchFilter:e.isTableLoading,disablePerPageFilter:e.isTableLoading,totalRowCount:e.tableRows.length,customFilter:e.customFilter,onOnItemsPerPage:t[0]||(t[0]=t=>e.itemsPerPage=t),onOnItemsVLtype:t[1]||(t[1]=t=>e.itemsVLtype=t),onOnSearchFilter:t[2]||(t[2]=t=>e.searchFilter=t)},null,8,["showPerPageFilter","disableSearchFilter","disablePerPageFilter","totalRowCount","customFilter"])]),_:1})]),_:1}),Object(a["createVNode"])(w,null,{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("div",i,[Object(a["createVNode"])(O,{rows:e.rows,paginated:e.paginated,asyncRows:e.asyncRows,rowParser:e.rowParser,config:{...e.config,tableCssTheme:e.tableCssTheme},columns:e.columns,showFilters:e.showFilters,newPage:e.currentPage,searchFilter:e.searchFilter,rowsPerPage:e.itemsPerPage,onOnIsLoading:t[3]||(t[3]=t=>e.isTableLoading=t),onOnTableRows:t[4]||(t[4]=t=>e.tableRows=t),onOnPagination:t[5]||(t[5]=t=>e.totalPages=t.length),onOnActiveColumns:t[6]||(t[6]=t=>e.activeColumns=t),onOnActiveRows:t[7]||(t[7]=t=>e.activeRows=t)},null,8,["rows","paginated","asyncRows","rowParser","config","columns","showFilters","newPage","searchFilter","rowsPerPage"])])]),_:1}),Object(a["createVNode"])(D,null,{default:Object(a["withCtx"])(()=>[!e.searchFilter&&e.paginated||!e.searchFilter&&e.totalPages>0&&e.paginated?(Object(a["openBlock"])(),Object(a["createBlock"])(b,{key:0},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(f,{perPage:e.itemsPerPage,maxVisibleButtons:10,totalPages:e.totalPages,onOnChangePage:t[8]||(t[8]=t=>e.currentPage=t)},null,8,["perPage","totalPages"])]),_:1})):Object(a["createCommentVNode"])("",!0),e.showReportStamp?(Object(a["openBlock"])(),Object(a["createBlock"])(b,{key:1},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(C,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("Date Created: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.date),1)]),_:1}),Object(a["createVNode"])(C,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("His-Core Version: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(a["createVNode"])(C,{color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("API Version: "),Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})):Object(a["createCommentVNode"])("",!0)]),_:1}),Object(a["createVNode"])(j,{color:e.footerColor,btns:e.btns},null,8,["color","btns"])]),_:1}))],64)}o("14d9");var l=o("0f25"),c=o("80e3"),d=o("ba82"),p=o("9ceb"),u=o("7920"),h=o("d867"),m=o("1c74"),b=o("9283"),g=o("2f2a"),O=o("1799"),w=o("b5e4"),f=o("7f35"),C=o("0011"),D=Object(a["defineComponent"])({components:{HisStandardForm:u["a"],IonHeader:h["q"],ReportTable:c["a"],HisFooter:l["a"],IonPage:h["D"],IonContent:h["n"],IonToolbar:h["S"],Pagination:O["a"],ReportFilter:g["a"],IonFooter:h["o"],IonChip:h["l"],IonLabel:h["x"]},props:{title:{type:String,required:!0},customFilter:{type:Function},period:{type:String,default:""},encryptPDF:{type:Boolean,default:!1},config:{type:Object},fields:{type:Array,default:()=>[]},columns:{type:Array,required:!0},rows:{type:Array,required:!0},paginated:{type:Boolean,default:!1},customBtns:{type:Array,default:()=>[]},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},onReportConfiguration:{type:Function,required:!1},rowParser:{type:Function},showFilters:{type:Boolean,default:!1},showVLFilter:{type:Boolean,default:!1},rowsPerPage:{type:Number},asyncRows:{type:Function},footerColor:{type:String,default:"dark"},customFileName:{type:String,default:""},canExport:{type:Boolean,default:!0},showReportStamp:{type:Boolean,default:!0},customInfo:{type:Object},reportPrefix:{type:String,default:""}},data:()=>({formData:{},computeFormData:{},btns:[],isLoadingData:!1,showForm:!1,logo:"/assets/images/login-logos/Malawi-Coat_of_arms_of_arms.png",isTableLoading:!1,searchFilter:"",itemsPerPage:50,itemsVLtype:"",currentPage:0,tableRows:[],totalPages:0,activeColumns:[],activeRows:[],date:b["b"].toStandardHisDisplayFormat(m["e"].getSessionDate()),apiVersion:m["e"].getApiVersion(),coreVersion:m["e"].getCoreVersion(),siteUUID:m["e"].getSiteUUID(),tableCssTheme:"opd-report-theme"}),methods:{getFileName(){var e,t;return`${null!==(e=this.reportPrefix)&&void 0!==e?e:""} ${m["e"].getLocationName()} ${Object(C["g"])(this.title).replace(this.reportPrefix,"")} ${null!==(t=this.period)&&void 0!==t?t:this.date}`},pdfEncryptionData(){const e=m["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},async onFinish(e,t){this.formData=e,this.computeFormData=t,this.showForm=!1,await this.presentLoading();try{this.onReportConfiguration&&await this.onReportConfiguration(this.formData,this.computeFormData),h["X"].dismiss()}catch(o){console.error(o),Object(w["c"])(""+o),h["X"].dismiss()}},async reloadReport(){await this.onFinish(this.formData,this.computeFormData)},async presentLoading(){const e=await h["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.showForm=!!this.fields.length,this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(p["b"])(this.columns,this.rows,"csvMode");Object(d["a"])(e,[...t,["Date Created: "+this.date],["Period: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID]],this.getFileName())}},{name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(f["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(p["b"])(this.activeColumns,this.activeRows,e);Object(d["c"])(t,o,this.getFileName(),!1,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}},{name:"Back",size:"large",slot:"end",color:"primary",visible:!0,onClick:()=>this.showForm=!0},{name:"Refresh",size:"large",slot:"end",color:"warning",visible:!0,onClick:()=>this.reloadReport()},{name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>this.$router.push({path:"/"})})}}),j=(o("be36"),o("d959")),y=o.n(j);const F=y()(D,[["render",s],["__scopeId","data-v-36f19a06"]]);t["a"]=F},"601a":function(e,t,o){"use strict";o.r(t);var a=o("7a23");function r(e,t,o,r,n,i){const s=Object(a["resolveComponent"])("report-template"),l=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(l,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{title:e.title,rows:e.rows,fields:e.fields,columns:e.columns,period:e.period,onReportConfiguration:e.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]),_:1})}var n=o("552a"),i=o("9ceb"),s=o("44e3"),l=o("d867"),c=o("ad9e"),d=Object(a["defineComponent"])({components:{ReportTemplate:n["a"],IonPage:l["D"]},mixins:[s["a"]],data:()=>({title:"CC Basic Results",rows:[],reportService:{},columns:[[i["a"].thTxt("Fine Age"),i["a"].thTxt("CXCA_SCRN_D"),i["a"].thTxt("CXCA_SCRN_N"),i["a"].thTxt("CXCA_SCRN_POS"),i["a"].thTxt("CXCA_SCRN_TX")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(e,t){this.reportService=new c["a"],this.reportService.setStartDate(t.start_date),this.reportService.setEndDate(t.end_date);const o=await this.reportService.getPepfarReport("CC Basic Result");this.rows=this.buildRows(o)},buildRows(e){return e.map(e=>[i["a"].td(e.age_group),i["a"].td(e["CXCA_SCRN_D"].length),i["a"].td(e["CXCA_SCRN_N"].length),i["a"].td(e["CXCA_SCRN_POS"].length),i["a"].td(e["CXCA_SCRN_TX"].length)])}}}),p=o("d959"),u=o.n(p);const h=u()(d,[["render",r]]);t["default"]=h},7920:function(e,t,o){"use strict";var a=o("7a23");function r(e,t,o,r,n,i){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var n=o("9441"),i=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:n["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("d959"),l=o.n(s);const c=l()(i,[["render",r]]);t["a"]=c},ad9e:function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));var a=o("ade3"),r=(o("14d9"),o("1c74")),n=o("9283");class i extends r["e"]{constructor(){super(),Object(a["a"])(this,"programID",void 0),Object(a["a"])(this,"startDate",void 0),Object(a["a"])(this,"endDate",void 0),Object(a["a"])(this,"date",void 0),this.endDate="",this.startDate="",this.date=r["e"].getSessionDate(),this.programID=r["e"].getProgramID()}getPepfarReport(e){return this.getReport("pepfar_cxca",{report_name:e})}getClinicReport(e){return this.getReport("screened_for_cxca",{report_name:e})}getMohReport(e){return this.getReport("screened_for_cxca",{report_name:e})}getDateIntervalPeriod(){return`${n["b"].toStandardHisDisplayFormat(this.startDate)} - ${n["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(e){this.startDate=e}setEndDate(e){this.endDate=e}getReportPeriod(){return this.startDate&&this.endDate?`${n["b"].toStandardHisDisplayFormat(this.startDate)} - ${n["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(e,t={}){return r["e"].getJson(e,this.buildRequest(t))}buildRequest(e={}){const t={date:this.date,program_id:24};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),{...t,...e}}static getReportQuarters(e=4){const t=[];let o=n["b"].getCurrentYear();for(let a=0;a<e;++a)t.push({name:"Q4 "+o,start:o+"-10-01",end:o+"-12-31"}),t.push({name:"Q3 "+o,start:o+"-07-01",end:o+"-09-30"}),t.push({name:"Q2 "+o,start:o+"-04-01",end:o+"-06-30"}),t.push({name:"Q1 "+o,start:o+"-01-01",end:o+"-03-31"}),--o;return t}}},be36:function(e,t,o){"use strict";o("d976")},d976:function(e,t,o){}}]);
//# sourceMappingURL=chunk-a2f3a59a.5548eea4.js.map