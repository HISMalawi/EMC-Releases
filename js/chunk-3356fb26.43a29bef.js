(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3356fb26"],{"008b":function(e,t,o){"use strict";o.r(t);var r=o("7a23");function n(e,t,o,n,a,i){const s=Object(r["resolveComponent"])("report-template");return Object(r["openBlock"])(),Object(r["createBlock"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])}var a=o("ad8d"),i=o("44e3"),s=o("2ef0"),c=o("4ba2"),l=o("9ceb"),d=Object(r["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:c["a"]},data:()=>({title:"Clinic Retention report",totalClients:[],rows:[],cohort:{},columns:[[l["a"].thTxt("Age group"),l["a"].thTxt("Gender"),l["a"].thTxt("Initiated one month"),l["a"].thTxt("Completed one month"),l["a"].thTxt("Initiated Three months"),l["a"].thTxt("Completed Three months"),l["a"].thTxt("Initiated Six months"),l["a"].thTxt("Completed Six months")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async onPeriod(e,t){this.rows=[],this.report=new a["b"],this.report.setStartDate(t.start_date),this.report.setEndDate(t.end_date),this.period=this.report.getDateIntervalPeriod(),this.cohort=await this.report.getClientRentention(),this.setRows("F"),this.setRows("M")},getValue(e,t,o,r){try{const n=this.cohort[e][r].filter(e=>e.gender===t&&e.age_group===o).map(e=>e.patient_id);return this.drill(n)}catch(n){return console.warn(n),0}},setRows(e){const t=[...a["a"],"Unknown"];for(const o in t){const r=t[o],n=[l["a"].td(r),l["a"].td(this.formatGender(e))];if(Object(s["isEmpty"])(this.cohort))this.rows.push([...n,l["a"].td(0),l["a"].td(0),l["a"].td(0),l["a"].td(0),l["a"].td(0),l["a"].td(0)]);else{for(const t in this.cohort)n.push(this.getValue(parseInt(t),e,r,"all")),n.push(this.getValue(parseInt(t),e,r,"retained"));this.rows.push(n)}}}}}),u=o("6b0d"),p=o.n(u);const h=p()(d,[["render",n]]);t["default"]=h},"054e":function(e,t,o){"use strict";o("6547c")},"41b4":function(e,t,o){},"44e3":function(e,t,o){"use strict";var r=o("1c74"),n=o("7a23"),a=o("b446"),i=o("23e6"),s=o("9283"),c=o("8a30"),l=o("d6aa"),d=o("5969"),u=o("d95e"),p=o("2706"),h=o("9ceb"),m=o("2ef0"),b=Object(n["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){return"M"===e||"male"===e.toLowerCase()?"Male":"Female"},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,r]=e.split("-"),n=parseInt(r);return"number"===typeof n?n:0}return 0},tdARV(e,t={}){return h["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,r=!0){const n=await c["X"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:r,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["X"].dismiss()}});n.present()},async drilldownData(e,t,o,r){const n=await c["X"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:r,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["X"].dismiss()}});n.present()},getDefaultDrillDownTable(){const e=[[h["a"].thTxt("ARV number"),h["a"].thTxt("Gender"),h["a"].thTxt("Birth Date"),h["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,r=null;if(Object(m["isArray"])(e)){const[t,o]=e;if(r=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[r,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const n=await i["a"].findByID(o),a=new i["a"](n),s=[];return r&&(t=1,s.push(r)),s.push(this.tdARV(a.getArvNumber())),s.push(h["a"].td(this.formatGender(a.getGender()))),s.push(h["a"].tdDate(a.getBirthdate().toString())),s.push(h["a"].tdBtn("Show",async()=>{await c["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),r=await Promise.all(o);return r.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:r}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,r)},drill(e,t="Drill table"){return e&&e.length>0?h["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):h["a"].td(0)},getQuaterOptions(){const e=d["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,n=r["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:u["b"].TT_SELECT,condition:()=>e,validation:e=>p["a"].required(e),options:()=>{const e=d["a"].getReportQuarters(o);let r=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(r=[{label:"Set custom period",value:"custom_period",other:{}},...r]),r}},...Object(a["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(a["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,r)=>{"next"===t&&(this.endDate=r.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const f=b;t["a"]=f},"4a46":function(e,t,o){"use strict";o("41b4")},"4ba2":function(e,t,o){"use strict";var r=o("7a23");const n=Object(r["withScopeId"])("data-v-47b6d7e8");Object(r["pushScopeId"])("data-v-47b6d7e8");const a={class:"header-text-list"},i=Object(r["createTextVNode"])("Title "),s=Object(r["createTextVNode"])("Period "),c={key:1},l={key:0},d=Object(r["createTextVNode"])(" Error(s) found. Click for more "),u=Object(r["createTextVNode"])(" Report is Consistent "),p={class:"report-content"},h=Object(r["createTextVNode"])("Date Created: "),m=Object(r["createTextVNode"])("His-Core Version: "),b=Object(r["createTextVNode"])("API Version: ");Object(r["popScopeId"])();const f=n((function(e,t,o,f,O,g){const j=Object(r["resolveComponent"])("his-standard-form"),y=Object(r["resolveComponent"])("ion-title"),v=Object(r["resolveComponent"])("ion-img"),D=Object(r["resolveComponent"])("ion-thumbnail"),w=Object(r["resolveComponent"])("ion-chip"),C=Object(r["resolveComponent"])("ion-label"),V=Object(r["resolveComponent"])("ion-item"),k=Object(r["resolveComponent"])("ion-toolbar"),F=Object(r["resolveComponent"])("ion-header"),S=Object(r["resolveComponent"])("report-table"),I=Object(r["resolveComponent"])("ion-content"),_=Object(r["resolveComponent"])("ion-footer"),N=Object(r["resolveComponent"])("his-footer"),B=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],null,[Object(r["withDirectives"])(Object(r["createVNode"])(j,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[r["vShow"],!e.canShowReport]]),e.canShowReport?(Object(r["openBlock"])(),Object(r["createBlock"])(B,{key:0},{default:n(()=>[Object(r["createVNode"])(F,null,{default:n(()=>[Object(r["createVNode"])(k,null,{default:n(()=>[e.showtitleOnly?(Object(r["openBlock"])(),Object(r["createBlock"])(y,{key:0},{default:n(()=>[Object(r["createVNode"])("span",{innerHTML:e.title},null,8,["innerHTML"])]),_:1})):Object(r["createCommentVNode"])("",!0),e.showtitleOnly?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])(V,{key:1},{default:n(()=>[Object(r["createVNode"])(D,{slot:"start"},{default:n(()=>[Object(r["createVNode"])(v,{src:e.logo},null,8,["src"])]),_:1}),Object(r["createVNode"])(C,null,{default:n(()=>[Object(r["createVNode"])("ul",a,[Object(r["createVNode"])("li",null,[i,Object(r["createVNode"])("b",null,Object(r["toDisplayString"])(e.title),1)]),Object(r["createVNode"])("li",null,[s,Object(r["createVNode"])("b",null,Object(r["toDisplayString"])(e.period),1)]),(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(e.headerInfoList,(e,t)=>{var o,n;return Object(r["openBlock"])(),Object(r["createBlock"])("li",{key:t},[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(r["openBlock"])(),Object(r["createBlock"])("a",{key:0,href:"#",onClick:Object(r["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(r["toDisplayString"])(e.value),9,["onClick"])):Object(r["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(n=e.other)&&void 0!==n&&n.onclick?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])("b",c,[Object(r["createVNode"])("span",{innerHTML:e.value},null,8,["innerHTML"])]))])}),128)),e.showValidationStatus?(Object(r["openBlock"])(),Object(r["createBlock"])("li",l,[e.hasErrors?(Object(r["openBlock"])(),Object(r["createBlock"])(w,{key:0,onClick:e.showErrors,color:"danger"},{default:n(()=>[Object(r["createVNode"])("b",null,Object(r["toDisplayString"])(e.errorCount),1),d]),_:1},8,["onClick"])):Object(r["createCommentVNode"])("",!0),e.hasErrors?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])(w,{key:1,color:"success"},{default:n(()=>[u]),_:1}))])):Object(r["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(r["createVNode"])(I,null,{default:n(()=>[Object(r["createVNode"])("div",p,[Object(r["createVNode"])(S,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(r["createVNode"])(_,null,{default:n(()=>[Object(r["createVNode"])(k,null,{default:n(()=>[Object(r["createVNode"])(w,{color:"primary"},{default:n(()=>[h,Object(r["createVNode"])("b",null,Object(r["toDisplayString"])(e.date),1)]),_:1}),Object(r["createVNode"])(w,{color:"primary"},{default:n(()=>[m,Object(r["createVNode"])("b",null,Object(r["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(r["createVNode"])(w,{color:"primary"},{default:n(()=>[b,Object(r["createVNode"])("b",null,Object(r["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(r["createVNode"])(N,{btns:e.btns},null,8,["btns"])]),_:1})):Object(r["createCommentVNode"])("",!0)],64)}));var O=o("0f25"),g=o("80e3"),j=o("ba82"),y=o("9ceb"),v=o("7920"),D=o("8a30"),w=o("b5e4"),C=o("1718"),V=o("1c74"),k=o("5a0c"),F=o.n(k),S=o("2ef0"),I=(o("99af"),Object(r["withScopeId"])("data-v-0ed0c7a2"));Object(r["pushScopeId"])("data-v-0ed0c7a2");var _=Object(r["createTextVNode"])(" Close ");Object(r["popScopeId"])();var N=I((function(e,t,o,n,a,i){var s=Object(r["resolveComponent"])("ion-title"),c=Object(r["resolveComponent"])("ion-toolbar"),l=Object(r["resolveComponent"])("ion-header"),d=Object(r["resolveComponent"])("ion-item"),u=Object(r["resolveComponent"])("ion-list"),p=Object(r["resolveComponent"])("ion-grid"),h=Object(r["resolveComponent"])("ion-button"),m=Object(r["resolveComponent"])("ion-footer");return Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],null,[Object(r["createVNode"])(l,null,{default:I((function(){return[Object(r["createVNode"])(c,null,{default:I((function(){return[Object(r["createVNode"])(s,null,{default:I((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.title),1)]})),_:1})]})),_:1})]})),_:1}),Object(r["createVNode"])(p,{class:"selector"},{default:I((function(){return[Object(r["createVNode"])(u,null,{default:I((function(){return[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(e.errors,(function(e,t){return Object(r["openBlock"])(),Object(r["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:I((function(){return[Object(r["createVNode"])("span",{innerHTML:"(".concat(t+1,") ").concat(e)},null,8,["innerHTML"])]})),_:2},1024)})),128))]})),_:1})]})),_:1}),Object(r["createVNode"])(m,null,{default:I((function(){return[Object(r["createVNode"])(c,null,{default:I((function(){return[Object(r["createVNode"])(h,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:I((function(){return[_]})),_:1},8,["onClick"])]})),_:1})]})),_:1})],64)})),B=o("1da1"),R=(o("96cf"),Object(r["defineComponent"])({components:{IonGrid:D["p"],IonList:D["y"],IonItem:D["w"],IonFooter:D["o"],IonButton:D["d"],IonToolbar:D["Q"],IonHeader:D["q"],IonTitle:D["P"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{closeModal:function(){return Object(B["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,D["X"].dismiss({});case 2:case"end":return e.stop()}}),e)})))()}}})),T=(o("054e"),o("6b0d")),x=o.n(T);const P=x()(R,[["render",N],["__scopeId","data-v-0ed0c7a2"]]);var A=P,E=Object(r["defineComponent"])({components:{HisStandardForm:v["a"],IonHeader:D["q"],ReportTable:g["a"],HisFooter:O["a"],IonPage:D["D"],IonContent:D["n"],IonToolbar:D["Q"],IonChip:D["l"],IonFooter:D["o"],IonLabel:D["x"],IonThumbnail:D["O"],IonItem:D["w"],IonImg:D["s"]},props:{showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:V["e"].getSiteUUID(),apiVersion:V["e"].getApiVersion(),coreVersion:V["e"].getCoreVersion(),artVersion:V["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(S["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(S["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(C["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(C["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(C["a"])("reports.png")},hasErrors(){return!Object(S["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await D["X"].create({component:A,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},refreshTimeStamp(){this.date=F()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName?this.customFileName:`${this.reportPrefix} ${V["e"].getLocationName()} ${this.title} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),D["V"].dismiss()}catch(e){Object(w["c"])(e),console.error(e),D["V"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),D["V"].dismiss()}catch(r){Object(w["c"])(r),console.error(r),D["V"].dismiss()}},async reloadReport(e=!1){Object(S["isEmpty"])(this.formData)&&Object(S["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await D["V"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(y["b"])(this.activeColumns,this.activeRows);Object(j["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{const{columns:e,rows:t}=Object(y["b"])(this.activeColumns,this.activeRows);Object(j["b"])(e,t,this.getFileName(),this.enabledPDFHorizontalPageBreak)}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(w["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(S["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("4a46");const q=x()(E,[["render",f],["__scopeId","data-v-47b6d7e8"]]);t["a"]=q},5969:function(e,t,o){"use strict";o.d(t,"a",(function(){return p}));var r=o("5530"),n=o("d4ec"),a=o("bee2"),i=o("262e"),s=o("2caf"),c=(o("99af"),o("1c74")),l=o("9283"),d=o("5a0c"),u=o.n(d),p=function(e){Object(i["a"])(o,e);var t=Object(s["a"])(o);function o(){var e;return Object(n["a"])(this,o),e=t.call(this),e.endDate="",e.startDate="",e.quarter="",e.date=c["e"].getSessionDate(),e.programID=c["e"].getProgramID(),e}return Object(a["a"])(o,[{key:"getDateIntervalPeriod",value:function(){return"".concat(l["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(l["b"].toStandardHisDisplayFormat(this.endDate))}},{key:"setStartDate",value:function(e){this.startDate=e}},{key:"setEndDate",value:function(e){this.endDate=e}},{key:"setQuarter",value:function(e){this.quarter=e}},{key:"getReport",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return c["e"].getJson(e,this.buildRequest(t))}},{key:"buildRequest",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.quarter&&(t["quarter"]=this.quarter),Object(r["a"])(Object(r["a"])({},t),e)}}],[{key:"getQuarterBounds",value:function(e){var t=function(t){return u()("".concat(e,"-").concat(t,"-01")).daysInMonth()},o=function(t){return"".concat(e,"-").concat(t,"-01 00:00")},r=function(o){return"".concat(e,"-").concat(o,"-").concat(t(o)," 00:00")};return{Q1:{qtr:1,start:o("01"),end:r("03")},Q2:{qtr:2,start:o("04"),end:r("06")},Q3:{qtr:3,start:o("07"),end:r("09")},Q4:{qtr:4,start:o("10"),end:r("12")}}}},{key:"getQtrByDate",value:function(e){var t=this.getQuarterBounds(e.getFullYear());for(var o in t){var r=t[o],n=r.start,a=r.end;if(e>=new Date(n)&&e<=new Date(a))return t[o]}return null}},{key:"buildQtrObj",value:function(e,t){var o=this.getQuarterBounds(t),r=o[e],n=r.start,a=r.end;return{start:n,end:a,name:"".concat(e," ").concat(t)}}},{key:"getReportQuarters",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t=[],o=new Date,r=o.getFullYear(),n=r;o=new Date("".concat(n,"-").concat(o.getMonth()+1,"-").concat(o.getDate()," 00:00"));var a=this.getQtrByDate(o),i=a.qtr,s=0;4===i&&t.push(this.buildQtrObj("Q1",r+1));while(s<e)0===s&&i<4&&t.push(this.buildQtrObj("Q".concat(i+1),r)),t.push(this.buildQtrObj("Q".concat(i),r)),i=i>0?i-=1:i,r=0==i?r-1:r,i=0==i?i+=4:i,s++;return t}}]),o}(c["e"])},"6547c":function(e,t,o){},7920:function(e,t,o){"use strict";var r=o("7a23");function n(e,t,o,n,a,i){return Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=o("9441"),i=Object(r["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("6b0d"),c=o.n(s);const l=c()(i,[["render",n]]);t["a"]=l},ad8d:function(e,t,o){"use strict";o.d(t,"a",(function(){return n})),o.d(t,"b",(function(){return a}));var r=o("5969");const n=["<1 year","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90 plus years"];class a extends r["a"]{constructor(){super()}getBookedAppointments(e){return r["a"].getJson(`programs/${this.programID}/scheduled_appointments`,{date:e})}getViralLoadResults(e){return this.getReport(`/programs/${this.programID}/reports/high_vl_patients`,{range:e})}getOtherOutcome(e){return this.getReport("patient_outcome_list",{outcome:e})}getPatientVisitTypes(){return this.getReport("patient_visit_types")}getClientsDueForVl(){return this.getReport("clients_due_vl")}getClientRentention(){return this.getReport(`/programs/${this.programID}/reports/retention`)}getExternalConsultationClients(){return this.getReport(this.programID+"/external_consultation_clients")}getMissedAppointments(){return this.getReport("missed_appointments")}getPregnantWomen(){return this.getReport(`/programs/${this.programID}/reports/pregnant_patients`)}getArchivingCandidates(){return r["a"].getJson(`programs/${this.programID}/reports/archiving_candidates`,{start_date:this.date})}}}}]);
//# sourceMappingURL=chunk-3356fb26.43a29bef.js.map