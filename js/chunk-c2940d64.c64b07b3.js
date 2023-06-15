(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c2940d64"],{2843:function(e,t,o){},"44e3":function(e,t,o){"use strict";o("14d9");var r=o("1c74"),a=o("7a23"),n=o("b446"),i=o("23e6"),s=o("9283"),c=o("d867"),l=o("d6aa"),d=o("5969"),p=o("d95e"),u=o("2706"),h=o("9ceb"),m=o("2ef0"),g=Object(a["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){const t=(""+e).toUpperCase();return"M"===t||"MALE"===t?"Male":"F"===t||"FEMALE"===t?"Female":/fbf|fnp|fp/i.test(e)?t:e},toDate(e){return s["c"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,r]=e.split("-"),a=parseInt(r);return"number"===typeof a?a:0}return 0},tdARV(e,t={}){return h["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,r=!0){const a=await c["modalController"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:r,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["modalController"].dismiss()}});a.present()},async drilldownData(e,t,o,r){const a=await c["modalController"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:r,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["modalController"].dismiss()}});a.present()},getDefaultDrillDownTable(){const e=[[h["a"].thTxt("ARV number"),h["a"].thTxt("Gender"),h["a"].thTxt("Birth Date"),h["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,r=null;if(Object(m["isArray"])(e)){const[t,o]=e;if(r=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[r,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const a=await i["a"].findByID(o),n=new i["a"](a),s=[];return r&&(t=1,s.push(r)),s.push(this.tdARV(n.getArvNumber())),s.push(h["a"].td(this.formatGender(n.getGender()))),s.push(h["a"].tdDate(n.getBirthdate().toString())),s.push(h["a"].tdBtn("Show",async()=>{await c["modalController"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),r=await Promise.all(o);return r.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:r}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,r)},drill(e,t="Drill table"){return e&&e.length>0?h["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):h["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,a=r["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:p["b"].TT_SELECT,condition:()=>e,validation:e=>u["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let r=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(r=[{label:"Set custom period",value:"custom_period",other:{}},...r]),r}},...Object(n["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>a,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(n["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,r)=>{"next"===t&&(this.endDate=r.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>a,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const b=g;t["a"]=b},"552a":function(e,t,o){"use strict";var r=o("7a23");const a={class:"header-text-list"},n={key:0},i={class:"report-content"};function s(e,t,o,s,c,l){const d=Object(r["resolveComponent"])("his-standard-form"),p=Object(r["resolveComponent"])("ion-img"),u=Object(r["resolveComponent"])("ion-thumbnail"),h=Object(r["resolveComponent"])("ion-label"),m=Object(r["resolveComponent"])("report-filter"),g=Object(r["resolveComponent"])("ion-toolbar"),b=Object(r["resolveComponent"])("ion-header"),D=Object(r["resolveComponent"])("report-table"),f=Object(r["resolveComponent"])("ion-content"),w=Object(r["resolveComponent"])("pagination"),O=Object(r["resolveComponent"])("ion-chip"),y=Object(r["resolveComponent"])("ion-footer"),j=Object(r["resolveComponent"])("his-footer"),P=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["withDirectives"])(Object(r["createVNode"])(d,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[r["vShow"],e.showForm]]),e.showForm?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])(P,{key:0},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(b,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(g,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(u,{slot:"start"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(p,{src:e.logo},null,8,["src"])]),_:1}),Object(r["createVNode"])(h,null,{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("ul",a,[Object(r["createElementVNode"])("li",null,[Object(r["createTextVNode"])("Title "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.title),1)]),Object(r["createElementVNode"])("li",null,[Object(r["createTextVNode"])("Period "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.period),1)]),e.customInfo?(Object(r["openBlock"])(),Object(r["createElementBlock"])("li",n,[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.customInfo.label)+" ",1),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.customInfo.value),1)])):Object(r["createCommentVNode"])("",!0)])]),_:1}),Object(r["createVNode"])(m,{slot:"end",showPerPageFilter:e.showFilters||e.paginated,disableSearchFilter:e.isTableLoading,disablePerPageFilter:e.isTableLoading,totalRowCount:e.tableRows.length,onOnItemsPerPage:t[0]||(t[0]=t=>e.itemsPerPage=t),onOnSearchFilter:t[1]||(t[1]=t=>e.searchFilter=t)},null,8,["showPerPageFilter","disableSearchFilter","disablePerPageFilter","totalRowCount"])]),_:1})]),_:1}),Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("div",i,[Object(r["createVNode"])(D,{rows:e.rows,paginated:e.paginated,asyncRows:e.asyncRows,rowParser:e.rowParser,config:{...e.config,tableCssTheme:e.tableCssTheme},columns:e.columns,showFilters:e.showFilters,newPage:e.currentPage,searchFilter:e.searchFilter,rowsPerPage:e.itemsPerPage,onOnIsLoading:t[2]||(t[2]=t=>e.isTableLoading=t),onOnTableRows:t[3]||(t[3]=t=>e.tableRows=t),onOnPagination:t[4]||(t[4]=t=>e.totalPages=t.length),onOnActiveColumns:t[5]||(t[5]=t=>e.activeColumns=t),onOnActiveRows:t[6]||(t[6]=t=>e.activeRows=t)},null,8,["rows","paginated","asyncRows","rowParser","config","columns","showFilters","newPage","searchFilter","rowsPerPage"])])]),_:1}),Object(r["createVNode"])(y,null,{default:Object(r["withCtx"])(()=>[!e.searchFilter&&e.paginated||!e.searchFilter&&e.totalPages>0&&e.paginated?(Object(r["openBlock"])(),Object(r["createBlock"])(g,{key:0},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(w,{perPage:e.itemsPerPage,maxVisibleButtons:10,totalPages:e.totalPages,onOnChangePage:t[7]||(t[7]=t=>e.currentPage=t)},null,8,["perPage","totalPages"])]),_:1})):Object(r["createCommentVNode"])("",!0),e.showReportStamp?(Object(r["openBlock"])(),Object(r["createBlock"])(g,{key:1},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(O,{color:"primary"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])("Date Created: "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.date),1)]),_:1}),Object(r["createVNode"])(O,{color:"primary"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])("His-Core Version: "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(r["createVNode"])(O,{color:"primary"},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])("API Version: "),Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})):Object(r["createCommentVNode"])("",!0)]),_:1}),Object(r["createVNode"])(j,{color:e.footerColor,btns:e.btns},null,8,["color","btns"])]),_:1}))],64)}o("14d9");var c=o("0f25"),l=o("80e3"),d=o("ba82"),p=o("9ceb"),u=o("7920"),h=o("d867"),m=o("1c74"),g=o("9283"),b=o("2f2a"),D=o("1799"),f=o("b5e4"),w=o("7f35"),O=Object(r["defineComponent"])({components:{HisStandardForm:u["a"],IonHeader:h["IonHeader"],ReportTable:l["a"],HisFooter:c["a"],IonPage:h["IonPage"],IonContent:h["IonContent"],IonToolbar:h["IonToolbar"],Pagination:D["a"],ReportFilter:b["a"],IonFooter:h["IonFooter"],IonChip:h["IonChip"],IonLabel:h["IonLabel"]},props:{title:{type:String,required:!0},period:{type:String,default:""},encryptPDF:{type:Boolean,default:!1},config:{type:Object},fields:{type:Array,default:()=>[]},columns:{type:Array,required:!0},rows:{type:Array,required:!0},paginated:{type:Boolean,default:!1},customBtns:{type:Array,default:()=>[]},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},onReportConfiguration:{type:Function,required:!1},rowParser:{type:Function},showFilters:{type:Boolean,default:!1},rowsPerPage:{type:Number},asyncRows:{type:Function},footerColor:{type:String,default:"dark"},customFileName:{type:String,default:""},canExport:{type:Boolean,default:!0},showReportStamp:{type:Boolean,default:!0},customInfo:{type:Object}},data:()=>({formData:{},computeFormData:{},btns:[],isLoadingData:!1,showForm:!1,logo:"/assets/images/login-logos/Malawi-Coat_of_arms_of_arms.png",isTableLoading:!1,searchFilter:"",itemsPerPage:50,currentPage:0,tableRows:[],totalPages:0,activeColumns:[],activeRows:[],date:g["c"].toStandardHisDisplayFormat(m["e"].getSessionDate()),apiVersion:m["e"].getApiVersion(),coreVersion:m["e"].getCoreVersion(),siteUUID:m["e"].getSiteUUID(),tableCssTheme:"opd-report-theme"}),methods:{getFileName(){return`${m["e"].getLocationName()} ${this.title} ${this.period}`},pdfEncryptionData(){const e=m["e"].getUserName();return{encryption:{userPassword:e,ownerPassword:e,userPermissions:["print"]}}},async onFinish(e,t){this.formData=e,this.computeFormData=t,this.showForm=!1,await this.presentLoading();try{this.onReportConfiguration&&await this.onReportConfiguration(this.formData,this.computeFormData),h["loadingController"].dismiss()}catch(o){console.error(o),Object(f["c"])(""+o),h["loadingController"].dismiss()}},async reloadReport(){await this.onFinish(this.formData,this.computeFormData)},async presentLoading(){const e=await h["loadingController"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.showForm=!!this.fields.length,this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(p["b"])(this.columns,this.rows);Object(d["a"])(e,[...t,["Date Created: "+this.date],["Period: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID]],this.getFileName())}},{name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{let e="pdfMode";if(this.encryptPDF){const t=await Object(w["a"])("Security warning","PDF may contain private data that will require a password to unlock","To access private data choose Secure PDF over Regular PDF",[{name:"Secure PDF",slot:"start",color:"success"},{name:"Regular PDF",slot:"start",color:"success"}],"his-danger-color");e="Secure PDF"===t?"pdfMode":"ignorePDFColumnexport"}const{columns:t,rows:o}=Object(p["b"])(this.activeColumns,this.activeRows,e);Object(d["c"])(t,o,this.getFileName(),!1,this.encryptPDF&&"ignorePDFColumnexport"!=e?this.pdfEncryptionData():{})}},{name:"Back",size:"large",slot:"end",color:"primary",visible:!0,onClick:()=>this.showForm=!0},{name:"Refresh",size:"large",slot:"end",color:"warning",visible:!0,onClick:()=>this.reloadReport()},{name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>this.$router.push({path:"/"})})}}),y=(o("5d70"),o("d959")),j=o.n(y);const P=j()(O,[["render",s],["__scopeId","data-v-1fd58e0f"]]);t["a"]=P},"5d70":function(e,t,o){"use strict";o("2843")},7920:function(e,t,o){"use strict";var r=o("7a23");function a(e,t,o,a,n,i){return Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var n=o("9441"),i=Object(r["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:n["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("d959"),c=o.n(s);const l=c()(i,[["render",a]]);t["a"]=l},d48c:function(e,t,o){"use strict";o.r(t);var r=o("7a23");function a(e,t,o,a,n,i){const s=Object(r["resolveComponent"])("report-template"),c=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(c,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(s,{title:e.title,rows:e.rows,fields:e.fields,columns:e.columns,itemsPerPage:12,period:e.period,onReportConfiguration:e.init,paginated:""},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]),_:1})}var n=o("fcd5"),i=o("552a"),s=o("9ceb"),c=o("9283"),l=o("44e3"),d=o("d867"),p=Object(r["defineComponent"])({components:{ReportTemplate:i["a"],IonPage:d["IonPage"]},mixins:[l["a"]],data:()=>({title:"OPD medication given (without prescription)",rows:[],columns:[[s["a"].thTxt("First Name"),s["a"].thTxt("Last Name"),s["a"].thTxt("Gender"),s["a"].thTxt("DOB"),s["a"].thTxt("Drug"),s["a"].thTxt("Quantity"),s["a"].thTxt("Date")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(e,t){const o=new n["d"];o.setStartDate(t.start_date),o.setEndDate(t.end_date),this.period=o.getDateIntervalPeriod(),this.rows=this.buildRows(await o.getDrugsGivenWithoutPrescription())},buildRows(e){return e.length?e.map(e=>[s["a"].td(e.given_name),s["a"].td(e.family_name),s["a"].td(e.gender),s["a"].td(c["c"].toStandardHisDisplayFormat(e.birthdate)),s["a"].td(e.drug_name),s["a"].td(e.quantity),s["a"].td(c["c"].toStandardHisDisplayFormat(e.date))]):[]}}}),u=o("d959"),h=o.n(u);const m=h()(p,[["render",a]]);t["default"]=m},fcd5:function(e,t,o){"use strict";o.d(t,"a",(function(){return c})),o.d(t,"c",(function(){return l})),o.d(t,"b",(function(){return d})),o.d(t,"d",(function(){return p}));var r=o("ade3"),a=(o("14d9"),o("1c74")),n=o("9283"),i=o("b89f"),s=o("bef6");const c={one:"AL 1",two:"AL 2",three:"AL 3",four:"LA 4"},l=["Diabetes","Hypertension","Stroke","Suspected cancer","Confirmed cancer","Palliative cancer","Asthma","Depression","Acute psychosis","Chronic psychosis","Epilepsy"],d=["Organic mental disorder (Chronic)","Organic mental disorder (acute)","Alcohol use mental disorder","Drug use mental disorder","Schizophrenia","Acute and transient psychotic disorder","Schizo-affective disorder","Mood-affective disorder (MANIC)","Mood-affective disorder (BIPOLAR)","Mood-affective disorder (DEPRESSION)","Anxiety disorder","Stress reaction adjustment disorder","Dissociative conversion disorder","Somatoform disorder","Puerperal mental disorder","Personality/Behaviour disorder","Mental retardation","Psychological mental disorder","Hyperkinetic conduct disorder","Epilepsy"];class p extends a["e"]{constructor(){super(),Object(r["a"])(this,"programID",void 0),Object(r["a"])(this,"startDate",void 0),Object(r["a"])(this,"endDate",void 0),Object(r["a"])(this,"date",void 0),Object(r["a"])(this,"epiweek",void 0),this.endDate="",this.startDate="",this.epiweek="",this.date=a["e"].getSessionDate(),this.programID=a["e"].getProgramID()}getPatientsWithNIDs(){return this.getReport("with_nids")}getClinicRegistrations(){return this.getReport("registration")}getAttendance(){return this.getReport(`programs/${this.programID}/reports/attendance`)}getDrugsGivenWithoutPrescription(){return this.getReport("drugs_given_without_prescription")}getDrugsGivenWithPrescription(){return this.getReport("drugs_given_with_prescription")}getDiagnosis(){const e=`programs/${this.programID}/reports/diagnosis`;return a["e"].getJson(e,{start_date:this.startDate,end_date:this.endDate,date:this.date})}getDiagnosisByAddress(){return this.getReport("diagnosis_by_address")}getLaPrescriptions(){const e=`programs/${this.programID}/reports/la_prescriptions`;return a["e"].getJson(e,{start_date:this.startDate,end_date:this.endDate})}getMalariaReport(){const e=`programs/${this.programID}/reports/malaria_report`;return a["e"].getJson(e,{start_date:this.startDate,end_date:this.endDate,date:this.date})}printLaReport(e){const t=new i["a"],o=`programs/${this.programID}/barcodes/la_report`,r={"date[start]":this.startDate,"date[end]":this.endDate};return Object.keys(c).forEach((t,o)=>{o++,r[o+"[prescription]"]=e[`total_la_${t}_prescribed_drugs`],r[o+"[dispensed]"]=e[`total_la_${t}_dispensed_drugs`]}),t.printLbl(`${o}?${s["a"].parameterizeObjToString(r)}`)}getDateIntervalPeriod(){return`${n["c"].toStandardHisDisplayFormat(this.startDate)} - ${n["c"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(e){this.startDate=e}setEndDate(e){this.endDate=e}setEpiWeek(e){this.epiweek=e}getReportPeriod(){return this.startDate&&this.endDate?`${n["c"].toStandardHisDisplayFormat(this.startDate)} - ${n["c"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(e,t={}){return a["e"].getJson(e,this.buildRequest(t))}buildRequest(e={}){const t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.epiweek&&(t["epiweek"]=this.epiweek),{...t,...e}}static getReportQuarters(e=4){const t=[];let o=n["c"].getCurrentYear();for(let r=0;r<e;++r)t.push({name:"Q4 "+o,start:o+"-10-01",end:o+"-12-31"}),t.push({name:"Q3 "+o,start:o+"-07-01",end:o+"-09-30"}),t.push({name:"Q2 "+o,start:o+"-04-01",end:o+"-06-30"}),t.push({name:"Q1 "+o,start:o+"-01-01",end:o+"-03-31"}),--o;return t}}}}]);
//# sourceMappingURL=chunk-c2940d64.c64b07b3.js.map