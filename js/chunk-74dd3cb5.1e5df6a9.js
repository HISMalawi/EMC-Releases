(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74dd3cb5"],{"054e":function(e,t,r){"use strict";r("6547c")},"2ef6":function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r("1da1"),o=r("d4ec"),a=r("bee2"),i=r("262e"),s=r("2caf"),c=(r("96cf"),r("5969")),l=r("ad8d"),u=function(e){Object(i["a"])(r,e);var t=Object(s["a"])(r);function r(){var e;return Object(o["a"])(this,r),e=t.call(this),e.gender="",e.ageGroup=l["a"][0],e.initialize=!0,e.rebuildOutcome=!0,e}return Object(a["a"])(r,[{key:"init",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.initialize=!0,e.next=3,this.getCohort();case 3:if(t=e.sent,!t||"created"!==t.temp_disaggregated){e.next=7;break}return this.initialize=!1,e.abrupt("return",!0);case 7:return e.abrupt("return",!1);case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setAgeGroup",value:function(e){this.ageGroup=e}},{key:"setInitialization",value:function(e){this.initialize=e}},{key:"setRebuildOutcome",value:function(e){this.rebuildOutcome=e}},{key:"setGender",value:function(e){this.gender=e}},{key:"getGender",value:function(){return this.gender}},{key:"getCohort",value:function(){return this.getReport("cohort_disaggregated",{age_group:"".concat(this.ageGroup),rebuild_outcome:"".concat(this.rebuildOutcome),initialize:"".concat(this.initialize)})}},{key:"getTxIpt",value:function(){return this.getReport("clients_given_ipt",{gender:this.gender,age_group:"".concat(this.ageGroup)})}},{key:"getTxCurrTB",value:function(){return this.getReport("screened_for_tb",{gender:this.gender,age_group:"".concat(this.ageGroup)})}},{key:"getRegimenDistribution",value:function(){return this.getReport("disaggregated_regimen_distribution",{gender:"".concat(this.gender),age_group:"".concat(this.ageGroup)})}}]),r}(c["a"])},"41b4":function(e,t,r){},"44e3":function(e,t,r){"use strict";var n=r("1c74"),o=r("7a23"),a=r("b446"),i=r("23e6"),s=r("9283"),c=r("8a30"),l=r("d6aa"),u=r("5969"),d=r("d95e"),h=r("2706"),p=r("9ceb"),m=r("2ef0"),b=Object(o["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){return"M"===e||"male"===e.toLowerCase()?"Male":"Female"},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,r)=>this.getArvInt(e[t])>this.getArvInt(r[t])?1:-1)}catch(r){return console.error(r),e}},getArvInt(e){if("string"===typeof e){const[t,r,n]=e.split("-"),o=parseInt(n);return"number"===typeof o?o:0}return 0},tdARV(e,t={}){return p["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,r,n=!0){const o=await c["X"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:r,canExport:n,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["X"].dismiss()}});o.present()},async drilldownData(e,t,r,n){const o=await c["X"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:r,rowParser:n,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["X"].dismiss()}});o.present()},getDefaultDrillDownTable(){const e=[[p["a"].thTxt("ARV number"),p["a"].thTxt("Gender"),p["a"].thTxt("Birth Date"),p["a"].thTxt("Actions")]],t=async e=>{let t=0;const r=e.map(async e=>{let r=null,n=null;if(Object(m["isArray"])(e)){const[t,r]=e;if(n=t,r in this.drillDownCache){const[e,...t]=this.drillDownCache[r];return[n,...t]}}else if(r=e,r in this.drillDownCache)return this.drillDownCache[r];const o=await i["a"].findByID(r),a=new i["a"](o),s=[];return n&&(t=1,s.push(n)),s.push(this.tdARV(a.getArvNumber())),s.push(p["a"].td(this.formatGender(a.getGender()))),s.push(p["a"].tdDate(a.getBirthdate().toString())),s.push(p["a"].tdBtn("Show",async()=>{await c["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+r})})),this.drillDownCache[r]=s,s}),n=await Promise.all(r);return n.sort((e,r)=>e[t].sortValue>r[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:r,rowParser:n}=this.getDefaultDrillDownTable();this.drilldownData(t,r,e,n)},drill(e,t="Drill table"){return e&&e.length>0?p["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):p["a"].td(0)},getQuaterOptions(){const e=u["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,r=5,o=n["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:d["b"].TT_SELECT,condition:()=>e,validation:e=>h["a"].required(e),options:()=>{const e=u["a"].getReportQuarters(r);let n=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(n=[{label:"Set custom period",value:"custom_period",other:{}},...n]),n}},...Object(a["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>o,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(a["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,r,n)=>{"next"===t&&(this.endDate=n.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>o,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const f=b;t["a"]=f},"4a46":function(e,t,r){"use strict";r("41b4")},"4ba2":function(e,t,r){"use strict";var n=r("7a23");const o=Object(n["withScopeId"])("data-v-47b6d7e8");Object(n["pushScopeId"])("data-v-47b6d7e8");const a={class:"header-text-list"},i=Object(n["createTextVNode"])("Title "),s=Object(n["createTextVNode"])("Period "),c={key:1},l={key:0},u=Object(n["createTextVNode"])(" Error(s) found. Click for more "),d=Object(n["createTextVNode"])(" Report is Consistent "),h={class:"report-content"},p=Object(n["createTextVNode"])("Date Created: "),m=Object(n["createTextVNode"])("His-Core Version: "),b=Object(n["createTextVNode"])("API Version: ");Object(n["popScopeId"])();const f=o((function(e,t,r,f,g,v){const O=Object(n["resolveComponent"])("his-standard-form"),j=Object(n["resolveComponent"])("ion-title"),w=Object(n["resolveComponent"])("ion-img"),y=Object(n["resolveComponent"])("ion-thumbnail"),D=Object(n["resolveComponent"])("ion-chip"),C=Object(n["resolveComponent"])("ion-label"),k=Object(n["resolveComponent"])("ion-item"),x=Object(n["resolveComponent"])("ion-toolbar"),R=Object(n["resolveComponent"])("ion-header"),_=Object(n["resolveComponent"])("report-table"),T=Object(n["resolveComponent"])("ion-content"),F=Object(n["resolveComponent"])("ion-footer"),V=Object(n["resolveComponent"])("his-footer"),I=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["withDirectives"])(Object(n["createVNode"])(O,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[n["vShow"],!e.canShowReport]]),e.canShowReport?(Object(n["openBlock"])(),Object(n["createBlock"])(I,{key:0},{default:o(()=>[Object(n["createVNode"])(R,null,{default:o(()=>[Object(n["createVNode"])(x,null,{default:o(()=>[e.showtitleOnly?(Object(n["openBlock"])(),Object(n["createBlock"])(j,{key:0},{default:o(()=>[Object(n["createVNode"])("span",{innerHTML:e.title},null,8,["innerHTML"])]),_:1})):Object(n["createCommentVNode"])("",!0),e.showtitleOnly?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(k,{key:1},{default:o(()=>[Object(n["createVNode"])(y,{slot:"start"},{default:o(()=>[Object(n["createVNode"])(w,{src:e.logo},null,8,["src"])]),_:1}),Object(n["createVNode"])(C,null,{default:o(()=>[Object(n["createVNode"])("ul",a,[Object(n["createVNode"])("li",null,[i,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.title),1)]),Object(n["createVNode"])("li",null,[s,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.period),1)]),(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerInfoList,(e,t)=>{var r,o;return Object(n["openBlock"])(),Object(n["createBlock"])("li",{key:t},[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(r=e.other)&&void 0!==r&&r.onclick?(Object(n["openBlock"])(),Object(n["createBlock"])("a",{key:0,href:"#",onClick:Object(n["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(n["toDisplayString"])(e.value),9,["onClick"])):Object(n["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])("b",c,[Object(n["createVNode"])("span",{innerHTML:e.value},null,8,["innerHTML"])]))])}),128)),e.showValidationStatus?(Object(n["openBlock"])(),Object(n["createBlock"])("li",l,[e.hasErrors?(Object(n["openBlock"])(),Object(n["createBlock"])(D,{key:0,onClick:e.showErrors,color:"danger"},{default:o(()=>[Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.errorCount),1),u]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.hasErrors?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(D,{key:1,color:"success"},{default:o(()=>[d]),_:1}))])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(n["createVNode"])(T,null,{default:o(()=>[Object(n["createVNode"])("div",h,[Object(n["createVNode"])(_,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(n["createVNode"])(F,null,{default:o(()=>[Object(n["createVNode"])(x,null,{default:o(()=>[Object(n["createVNode"])(D,{color:"primary"},{default:o(()=>[p,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.date),1)]),_:1}),Object(n["createVNode"])(D,{color:"primary"},{default:o(()=>[m,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(n["createVNode"])(D,{color:"primary"},{default:o(()=>[b,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(V,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0)],64)}));var g=r("0f25"),v=r("80e3"),O=r("ba82"),j=r("9ceb"),w=r("7920"),y=r("8a30"),D=r("b5e4"),C=r("1718"),k=r("1c74"),x=r("5a0c"),R=r.n(x),_=r("2ef0"),T=(r("99af"),Object(n["withScopeId"])("data-v-0ed0c7a2"));Object(n["pushScopeId"])("data-v-0ed0c7a2");var F=Object(n["createTextVNode"])(" Close ");Object(n["popScopeId"])();var V=T((function(e,t,r,o,a,i){var s=Object(n["resolveComponent"])("ion-title"),c=Object(n["resolveComponent"])("ion-toolbar"),l=Object(n["resolveComponent"])("ion-header"),u=Object(n["resolveComponent"])("ion-item"),d=Object(n["resolveComponent"])("ion-list"),h=Object(n["resolveComponent"])("ion-grid"),p=Object(n["resolveComponent"])("ion-button"),m=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:T((function(){return[Object(n["createVNode"])(c,null,{default:T((function(){return[Object(n["createVNode"])(s,null,{default:T((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]})),_:1})]})),_:1})]})),_:1}),Object(n["createVNode"])(h,{class:"selector"},{default:T((function(){return[Object(n["createVNode"])(d,null,{default:T((function(){return[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])(u,{class:"his-md-text ion-padding",key:t},{default:T((function(){return[Object(n["createVNode"])("span",{innerHTML:"(".concat(t+1,") ").concat(e)},null,8,["innerHTML"])]})),_:2},1024)})),128))]})),_:1})]})),_:1}),Object(n["createVNode"])(m,null,{default:T((function(){return[Object(n["createVNode"])(c,null,{default:T((function(){return[Object(n["createVNode"])(p,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:T((function(){return[F]})),_:1},8,["onClick"])]})),_:1})]})),_:1})],64)})),I=r("1da1"),N=(r("96cf"),Object(n["defineComponent"])({components:{IonGrid:y["p"],IonList:y["y"],IonItem:y["w"],IonFooter:y["o"],IonButton:y["d"],IonToolbar:y["Q"],IonHeader:y["q"],IonTitle:y["P"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{closeModal:function(){return Object(I["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,y["X"].dismiss({});case 2:case"end":return e.stop()}}),e)})))()}}})),S=(r("054e"),r("6b0d")),B=r.n(S);const A=B()(N,[["render",V],["__scopeId","data-v-0ed0c7a2"]]);var P=A,E=Object(n["defineComponent"])({components:{HisStandardForm:w["a"],IonHeader:y["q"],ReportTable:v["a"],HisFooter:g["a"],IonPage:y["D"],IonContent:y["n"],IonToolbar:y["Q"],IonChip:y["l"],IonFooter:y["o"],IonLabel:y["x"],IonThumbnail:y["O"],IonItem:y["w"],IonImg:y["s"]},props:{showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:k["e"].getSiteUUID(),apiVersion:k["e"].getApiVersion(),coreVersion:k["e"].getCoreVersion(),artVersion:k["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(_["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(_["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(C["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(C["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(C["a"])("reports.png")},hasErrors(){return!Object(_["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await y["X"].create({component:P,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},refreshTimeStamp(){this.date=R()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName?this.customFileName:`${this.reportPrefix} ${k["e"].getLocationName()} ${this.title} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),y["V"].dismiss()}catch(e){Object(D["c"])(e),console.error(e),y["V"].dismiss()}},async onFinish(e,t,r=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,r),y["V"].dismiss()}catch(n){Object(D["c"])(n),console.error(n),y["V"].dismiss()}},async reloadReport(e=!1){Object(_["isEmpty"])(this.formData)&&Object(_["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await y["V"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(j["b"])(this.activeColumns,this.activeRows);Object(O["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{const{columns:e,rows:t}=Object(j["b"])(this.activeColumns,this.activeRows);Object(O["b"])(e,t,this.getFileName(),this.enabledPDFHorizontalPageBreak)}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(D["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(_["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});r("4a46");const M=B()(E,[["render",f],["__scopeId","data-v-47b6d7e8"]]);t["a"]=M},5969:function(e,t,r){"use strict";r.d(t,"a",(function(){return h}));var n=r("5530"),o=r("d4ec"),a=r("bee2"),i=r("262e"),s=r("2caf"),c=(r("99af"),r("1c74")),l=r("9283"),u=r("5a0c"),d=r.n(u),h=function(e){Object(i["a"])(r,e);var t=Object(s["a"])(r);function r(){var e;return Object(o["a"])(this,r),e=t.call(this),e.endDate="",e.startDate="",e.quarter="",e.date=c["e"].getSessionDate(),e.programID=c["e"].getProgramID(),e}return Object(a["a"])(r,[{key:"getDateIntervalPeriod",value:function(){return"".concat(l["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(l["b"].toStandardHisDisplayFormat(this.endDate))}},{key:"setStartDate",value:function(e){this.startDate=e}},{key:"setEndDate",value:function(e){this.endDate=e}},{key:"setQuarter",value:function(e){this.quarter=e}},{key:"getReport",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return c["e"].getJson(e,this.buildRequest(t))}},{key:"buildRequest",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.quarter&&(t["quarter"]=this.quarter),Object(n["a"])(Object(n["a"])({},t),e)}}],[{key:"getQuarterBounds",value:function(e){var t=function(t){return d()("".concat(e,"-").concat(t,"-01")).daysInMonth()},r=function(t){return"".concat(e,"-").concat(t,"-01 00:00")},n=function(r){return"".concat(e,"-").concat(r,"-").concat(t(r)," 00:00")};return{Q1:{qtr:1,start:r("01"),end:n("03")},Q2:{qtr:2,start:r("04"),end:n("06")},Q3:{qtr:3,start:r("07"),end:n("09")},Q4:{qtr:4,start:r("10"),end:n("12")}}}},{key:"getQtrByDate",value:function(e){var t=this.getQuarterBounds(e.getFullYear());for(var r in t){var n=t[r],o=n.start,a=n.end;if(e>=new Date(o)&&e<=new Date(a))return t[r]}return null}},{key:"buildQtrObj",value:function(e,t){var r=this.getQuarterBounds(t),n=r[e],o=n.start,a=n.end;return{start:o,end:a,name:"".concat(e," ").concat(t)}}},{key:"getReportQuarters",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t=[],r=new Date,n=r.getFullYear(),o=n;r=new Date("".concat(o,"-").concat(r.getMonth()+1,"-").concat(r.getDate()," 00:00"));var a=this.getQtrByDate(r),i=a.qtr,s=0;4===i&&t.push(this.buildQtrObj("Q1",n+1));while(s<e)0===s&&i<4&&t.push(this.buildQtrObj("Q".concat(i+1),n)),t.push(this.buildQtrObj("Q".concat(i),n)),i=i>0?i-=1:i,n=0==i?n-1:n,i=0==i?i+=4:i,s++;return t}}]),r}(c["e"])},"6547c":function(e,t,r){},7920:function(e,t,r){"use strict";var n=r("7a23");function o(e,t,r,o,a,i){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=r("9441"),i=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=r("6b0d"),c=r.n(s);const l=c()(i,[["render",o]]);t["a"]=l},ad8d:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return a}));var n=r("5969");const o=["<1 year","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90 plus years"];class a extends n["a"]{constructor(){super()}getBookedAppointments(e){return n["a"].getJson(`programs/${this.programID}/scheduled_appointments`,{date:e})}getViralLoadResults(e){return this.getReport(`/programs/${this.programID}/reports/high_vl_patients`,{range:e})}getOtherOutcome(e){return this.getReport("patient_outcome_list",{outcome:e})}getPatientVisitTypes(){return this.getReport("patient_visit_types")}getClientsDueForVl(){return this.getReport("clients_due_vl")}getClientRentention(){return this.getReport(`/programs/${this.programID}/reports/retention`)}getExternalConsultationClients(){return this.getReport(this.programID+"/external_consultation_clients")}getMissedAppointments(){return this.getReport("missed_appointments")}getPregnantWomen(){return this.getReport(`/programs/${this.programID}/reports/pregnant_patients`)}getArchivingCandidates(){return n["a"].getJson(`programs/${this.programID}/reports/archiving_candidates`,{start_date:this.date})}}},b31c:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n,o=r("d4ec"),a=r("bee2"),i=r("262e"),s=r("2caf"),c=(r("99af"),r("e9c4"),r("d3b7"),r("b64b"),r("2ef0")),l=r("5969");(function(e){e["MOH_CACHE"]="mohCache"})(n||(n={}));var u=function(e){Object(i["a"])(r,e);var t=Object(s["a"])(r);function r(){var e;return Object(o["a"])(this,r),e=t.call(this),e.regenerate=!1,e}return Object(a["a"])(r,[{key:"cohortUrl",value:function(){return"programs/".concat(this.programID,"/reports/cohort")}},{key:"setRegenerate",value:function(e){this.regenerate=e}},{key:"getCohortDrillDown",value:function(e){return l["a"].getJson("cohort_report_drill_down",{id:e,date:this.date,program_id:this.programID})}},{key:"requestCohort",value:function(e){return l["a"].ajxGet(this.cohortUrl(),e)}},{key:"qaurterRequestParams",value:function(){return{name:this.quarter,regenerate:this.regenerate}}},{key:"datePeriodRequestParams",value:function(){return{name:"Cohort-".concat(this.startDate,"-").concat(this.endDate),start_date:this.startDate,end_date:this.endDate,regenerate:this.regenerate}}},{key:"getCachedCohortValues",value:function(){var e=sessionStorage.getItem(n.MOH_CACHE);if(e){var t=JSON.parse(e);if(t.start_date===this.startDate&&t.end_date===this.endDate||t.quarter===this.quarter)return t.data}}},{key:"cacheCohort",value:function(e){sessionStorage.setItem(n.MOH_CACHE,JSON.stringify({start_date:this.startDate,end_date:this.endDate,quarter:this.quarter,data:e}))}},{key:"validateIndicators",value:function(e,t){var r=this.getCachedCohortValues();if(r){var n=Object.keys(e).reduce((function(t,n){var o=Object(c["find"])(r,{name:n}),a=e[n],i=o?o.contents:null,s=a.param,l=a.check(parseInt(i),s);return l&&t.push(a.error(i,s)),t}),[]);return t(n)}return-1}}]),r}(l["a"])},c753:function(e,t,r){"use strict";r.r(t);var n=r("7a23");function o(e,t,r,o,a,i){var s=Object(n["resolveComponent"])("report-template"),c=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(c,null,{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(s,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,reportPrefix:"PEPFAR",config:{showIndex:!0},validationErrors:e.errors,showValidationStatus:e.canValidate,hasServerSideCaching:!0,headerInfoList:e.headerList,onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","validationErrors","showValidationStatus","headerInfoList","onReportConfiguration"])]})),_:1})}var a=r("1da1"),i=(r("96cf"),r("d3b7"),r("4e82"),r("b64b"),r("99af"),r("4de4"),r("ac1f"),r("466d"),r("caad"),r("2532"),r("3ca3"),r("ddb0"),r("44e3")),s=r("4ba2"),c=r("9ceb"),l=r("2ef0"),u=r("8a30"),d=r("ad8d"),h=r("b5e4"),p=r("b31c"),m=r("2ef6"),b=Object(n["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:s["a"],IonPage:u["D"]},data:function(){return{title:"PEPFAR Disaggregated Report",headerList:[],errors:[],columns:[[c["a"].thTxt("Age group"),c["a"].thTxt("Gender"),c["a"].thNum("Tx new (new on ART)"),c["a"].thNum("TX curr (receiving ART)"),c["a"].thNum("TX curr (received IPT)"),c["a"].thNum("TX curr (screened for TB)")]],aggregations:[],mohCohort:{},maleFemaleAgeGroupData:{},canValidate:!1,sortIndexes:{},initiated:!1}},created:function(){this.fields=this.getDateDurationFields()},computed:{rows:function(){var e=this;return Object.keys(this.sortIndexes).sort((function(e,t){return parseInt(e)-parseInt(t)})).reduce((function(t,r){return t.concat(e.sortIndexes[r])}),[])}},watch:{canValidate:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!e){r.next=3;break}return r.next=3,t.validateReport();case 3:case"end":return r.stop()}}),r)})))()}},methods:{onPeriod:function(e,t){var r=arguments,n=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var o,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o=!(r.length>2&&void 0!==r[2])||r[2],n.errors=[],n.maleFemaleAgeGroupData={},n.sortIndexes={},n.aggregations=[],n.canValidate=!1,n.report=new m["a"],n.mohCohort=new p["a"],n.report.setQuarter("pepfar"),n.report.setStartDate(t.start_date),n.report.setEndDate(t.end_date),n.mohCohort.setStartDate(t.start_date),n.mohCohort.setEndDate(t.end_date),n.period=n.report.getDateIntervalPeriod(),n.report.setRebuildOutcome(!n.initiated||o),e.next=17,n.report.init();case 17:if(a=e.sent,a){e.next=20;break}return e.abrupt("return",Object(h["e"])("Unable to initialise report"));case 20:return e.next=22,n.setTableRows();case 22:n.setHeaderInfoList(),n.canValidate=!0,n.initiated=!0;case 25:case"end":return e.stop()}}),e)})))()},getTotals:function(e){return this.aggregations.filter((function(t){return e(t)})).reduce((function(e,t){return e.concat(t.data)}),[])},setHeaderInfoList:function(){var e=this,t=this.getTotals((function(e){return"txCurr"===e.col&&e.gender.match(/male|female/i)}));this.headerList=[{label:"Total Alive and on ART",value:t.length,other:{onclick:function(){return e.runTableDrill(t,"Total Alive and on ART")}}}]},setTableRows:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.setFemaleRows(1);case 2:return t.next=4,e.setMaleRows(2);case 4:return t.next=6,e.setTotalMalesRow(3);case 6:return t.next=8,e.setFemalePregnantRows(4);case 8:return t.next=10,e.setFemaleBreastFeedingRows(6);case 10:return t.next=12,e.setFemaleNotPregnantRows(5);case 12:case"end":return t.stop()}}),t)})))()},getValue:function(e,t,r){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){var a;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:a=[],o.t0=e,o.next="tx_given_ipt"===o.t0?4:"tx_screened_for_tb"===o.t0?8:12;break;case 4:return o.next=6,n.report.getTxIpt();case 6:return a=o.sent,o.abrupt("break",14);case 8:return o.next=10,n.report.getTxCurrTB();case 10:return a=o.sent,o.abrupt("break",14);case 12:return a=t in r?r[t][e]:[],o.abrupt("break",14);case 14:return o.abrupt("return",a);case 15:case"end":return o.stop()}}),o)})))()},setTotalMalesRow:function(e){var t=this,r=function(e,r){var n=t.aggregations.filter((function(t){return t.col===e&&"Male"===t.gender})).reduce((function(e,t){return e.concat(t.data)}),[]);return t.drill(n,r)},n=[c["a"].td("All"),c["a"].td("Male"),r("txNew","Tx New (new on ART) Males"),r("txCurr","Total Curr (received ART) Males"),r("txGivenIpt","Total Curr (received IPT) Males"),r("txScreenTB","Total Curr (screened for TB) Males")];this.sortIndexes[e]=[n]},setFemaleNotPregnantRows:function(e){var t=this,r=function(e,r){return t.aggregations.filter((function(e){return e.gender.match(/fp|fbf/i)&&e.col===r})).reduce((function(e,t){return e.concat(t.data||[])}),[]).includes(e)},n=function(e,n){var o=t.aggregations.filter((function(t){return"Female"===t.gender&&t.col===e})).reduce((function(t,n){return t.concat(n.data.filter((function(t){return!r(t,e)})))}),[]);return t.drill(o,n)},o=[c["a"].td("All"),c["a"].td("FNP"),n("txNew","Tx New (new on ART) FNP"),n("txCurr","Tx Curr (received ART) FNP"),n("txGivenIpt","Tx Curr (received IPT) FNP"),n("txScreenTB","Tx Curr (screened for TB) FNP")];this.sortIndexes[e]=[o]},setFemaleRows:function(e){return this.report.setGender("female"),this.setRows(e,"F",d["a"],"Female")},setMaleRows:function(e){return this.report.setGender("male"),this.setRows(e,"M",d["a"],"Male")},setFemalePregnantRows:function(e){return this.report.setGender("pregnant"),this.setRows(e,"F",["All"],"FP","Pregnant")},setFemaleBreastFeedingRows:function(e){return this.report.setGender("breastfeeding"),this.setRows(e,"F",["All"],"FBf","Breastfeeding")},setRows:function(e,t,r,n){var o=arguments,i=this;return Object(a["a"])(regeneratorRuntime.mark((function a(){var s,u,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:s=o.length>4&&void 0!==o[4]?o[4]:"",u=regeneratorRuntime.mark((function o(a){var u,d,h,p,m,b,f,g;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(u=[],d=[],h=[],p=[],m=s||r[a],i.report.setAgeGroup(m),m in i.maleFemaleAgeGroupData){o.next=12;break}return o.next=9,i.report.getCohort();case 9:b=o.sent,i.report.setRebuildOutcome(!1),i.maleFemaleAgeGroupData[m]=Object(l["isEmpty"])(b)?{}:b[m];case 12:if(Object(l["isEmpty"])(i.maleFemaleAgeGroupData[m])){o.next=31;break}return f=function(e){return i.getValue(e,t,i.maleFemaleAgeGroupData[m])},g=function(e,t){return i.aggregations.push({gender:n,col:e,data:t})},o.next=17,f("tx_new");case 17:return u=o.sent,o.next=20,f("tx_curr");case 20:return d=o.sent,o.next=23,f("tx_given_ipt");case 23:return h=o.sent,o.next=26,f("tx_screened_for_tb");case 26:p=o.sent,g("txNew",u),g("txCurr",d),g("txGivenIpt",h),g("txScreenTB",p);case 31:i.sortIndexes[e]||(i.sortIndexes[e]=[]),i.sortIndexes[e].push([c["a"].td(r[a]),c["a"].td(n),i.drill(u,"Tx new (new on ART) | ".concat(m," | ").concat(n)),i.drill(d,"Tx curr (receiving ART) | ".concat(m," | ").concat(n)),i.drill(h,"TX curr (received IPT) | ".concat(m," | ").concat(n)),i.drill(p,"TX curr (screened for TB) | ".concat(m," | ").concat(n))]);case 33:case"end":return o.stop()}}),o)})),a.t0=regeneratorRuntime.keys(r);case 3:if((a.t1=a.t0()).done){a.next=8;break}return d=a.t1.value,a.delegateYield(u(d),"t2",6);case 6:a.next=3;break;case 8:case"end":return a.stop()}}),a)})))()},validateReport:function(){var e=this,t={initiated_on_art_first_time:{param:this.getTotals((function(e){return"txNew"===e.col&&e.gender.match(/male|female/i)})).length,check:function(e,t){return e!=t},error:function(e,t){return"\n                        MOH cohort initiated on ART first time <b>(".concat(e,")</b> is not matching Tx New <b>(").concat(t,")</b>\n                    ")}},initial_pregnant_females_all_ages:{param:this.getTotals((function(e){return"txNew"===e.col&&"FP"===e.gender})).length,check:function(e,t){return e!=t},error:function(e,t){return"\n                        MOH cohort initial pregnant females all ages \n                        <b>(".concat(e,")</b> is not matching with TX new Pregnant women <b>").concat(t,"</b>\n                    ")}},males_initiated_on_art_first_time:{param:this.getTotals((function(e){return"txNew"===e.col&&"Male"===e.gender})).length,check:function(e,t){return e!=t},error:function(e,t){return"\n                        MoH Cohort males initiated on ART first time <b>(".concat(e,")</b>\n                        is not matching with TX new All male <b>(").concat(t,")</b>\n                    ")}}},r=this.mohCohort.validateIndicators(t,(function(t){return e.errors=t}));-1===r&&(this.errors=["Report not validated. Run the MoH cohort report for similar reporting period and then run this report"])}}}),f=r("6b0d"),g=r.n(f);const v=g()(b,[["render",o]]);t["default"]=v}}]);
//# sourceMappingURL=chunk-74dd3cb5.1e5df6a9.js.map