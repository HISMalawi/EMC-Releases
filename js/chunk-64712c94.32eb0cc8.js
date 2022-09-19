(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64712c94"],{"054e":function(e,t,o){"use strict";o("6547c")},"41b4":function(e,t,o){},"44e3":function(e,t,o){"use strict";var n=o("1c74"),r=o("7a23"),a=o("b446"),i=o("23e6"),s=o("9283"),c=o("8a30"),l=o("d6aa"),u=o("5969"),d=o("d95e"),p=o("2706"),h=o("9ceb"),b=o("2ef0"),m=Object(r["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){return"M"===e||"male"===e.toLowerCase()?"Male":"Female"},toDate(e){return s["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,o)=>this.getArvInt(e[t])>this.getArvInt(o[t])?1:-1)}catch(o){return console.error(o),e}},getArvInt(e){if("string"===typeof e){const[t,o,n]=e.split("-"),r=parseInt(n);return"number"===typeof r?r:0}return 0},tdARV(e,t={}){return h["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,o,n=!0){const r=await c["X"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:o,canExport:n,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["X"].dismiss()}});r.present()},async drilldownData(e,t,o,n){const r=await c["X"].create({component:l["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:o,rowParser:n,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>c["X"].dismiss()}});r.present()},getDefaultDrillDownTable(){const e=[[h["a"].thTxt("ARV number"),h["a"].thTxt("Gender"),h["a"].thTxt("Birth Date"),h["a"].thTxt("Actions")]],t=async e=>{let t=0;const o=e.map(async e=>{let o=null,n=null;if(Object(b["isArray"])(e)){const[t,o]=e;if(n=t,o in this.drillDownCache){const[e,...t]=this.drillDownCache[o];return[n,...t]}}else if(o=e,o in this.drillDownCache)return this.drillDownCache[o];const r=await i["a"].findByID(o),a=new i["a"](r),s=[];return n&&(t=1,s.push(n)),s.push(this.tdARV(a.getArvNumber())),s.push(h["a"].td(this.formatGender(a.getGender()))),s.push(h["a"].tdDate(a.getBirthdate().toString())),s.push(h["a"].tdBtn("Show",async()=>{await c["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+o})})),this.drillDownCache[o]=s,s}),n=await Promise.all(o);return n.sort((e,o)=>e[t].sortValue>o[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:o,rowParser:n}=this.getDefaultDrillDownTable();this.drilldownData(t,o,e,n)},drill(e,t="Drill table"){return e&&e.length>0?h["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):h["a"].td(0)},getQuaterOptions(){const e=u["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,o=5,r=n["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:d["b"].TT_SELECT,condition:()=>e,validation:e=>p["a"].required(e),options:()=>{const e=u["a"].getReportQuarters(o);let n=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(n=[{label:"Set custom period",value:"custom_period",other:{}},...n]),n}},...Object(a["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>i,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(a["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,o,n)=>{"next"===t&&(this.endDate=n.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>r,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const f=m;t["a"]=f},"4a46":function(e,t,o){"use strict";o("41b4")},"4ba2":function(e,t,o){"use strict";var n=o("7a23");const r=Object(n["withScopeId"])("data-v-47b6d7e8");Object(n["pushScopeId"])("data-v-47b6d7e8");const a={class:"header-text-list"},i=Object(n["createTextVNode"])("Title "),s=Object(n["createTextVNode"])("Period "),c={key:1},l={key:0},u=Object(n["createTextVNode"])(" Error(s) found. Click for more "),d=Object(n["createTextVNode"])(" Report is Consistent "),p={class:"report-content"},h=Object(n["createTextVNode"])("Date Created: "),b=Object(n["createTextVNode"])("His-Core Version: "),m=Object(n["createTextVNode"])("API Version: ");Object(n["popScopeId"])();const f=r((function(e,t,o,f,O,g){const j=Object(n["resolveComponent"])("his-standard-form"),v=Object(n["resolveComponent"])("ion-title"),y=Object(n["resolveComponent"])("ion-img"),D=Object(n["resolveComponent"])("ion-thumbnail"),w=Object(n["resolveComponent"])("ion-chip"),C=Object(n["resolveComponent"])("ion-label"),P=Object(n["resolveComponent"])("ion-item"),k=Object(n["resolveComponent"])("ion-toolbar"),V=Object(n["resolveComponent"])("ion-header"),A=Object(n["resolveComponent"])("report-table"),F=Object(n["resolveComponent"])("ion-content"),S=Object(n["resolveComponent"])("ion-footer"),N=Object(n["resolveComponent"])("his-footer"),I=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["withDirectives"])(Object(n["createVNode"])(j,{onOnFinish:e.onFinish,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[n["vShow"],!e.canShowReport]]),e.canShowReport?(Object(n["openBlock"])(),Object(n["createBlock"])(I,{key:0},{default:r(()=>[Object(n["createVNode"])(V,null,{default:r(()=>[Object(n["createVNode"])(k,null,{default:r(()=>[e.showtitleOnly?(Object(n["openBlock"])(),Object(n["createBlock"])(v,{key:0},{default:r(()=>[Object(n["createVNode"])("span",{innerHTML:e.title},null,8,["innerHTML"])]),_:1})):Object(n["createCommentVNode"])("",!0),e.showtitleOnly?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(P,{key:1},{default:r(()=>[Object(n["createVNode"])(D,{slot:"start"},{default:r(()=>[Object(n["createVNode"])(y,{src:e.logo},null,8,["src"])]),_:1}),Object(n["createVNode"])(C,null,{default:r(()=>[Object(n["createVNode"])("ul",a,[Object(n["createVNode"])("li",null,[i,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.title),1)]),Object(n["createVNode"])("li",null,[s,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.period),1)]),(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerInfoList,(e,t)=>{var o,r;return Object(n["openBlock"])(),Object(n["createBlock"])("li",{key:t},[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label)+" ",1),e&&null!==e&&void 0!==e&&null!==(o=e.other)&&void 0!==o&&o.onclick?(Object(n["openBlock"])(),Object(n["createBlock"])("a",{key:0,href:"#",onClick:Object(n["withModifiers"])(t=>e.other.onclick(),["prevent"])},Object(n["toDisplayString"])(e.value),9,["onClick"])):Object(n["createCommentVNode"])("",!0),!e||null!==e&&void 0!==e&&null!==(r=e.other)&&void 0!==r&&r.onclick?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])("b",c,[Object(n["createVNode"])("span",{innerHTML:e.value},null,8,["innerHTML"])]))])}),128)),e.showValidationStatus?(Object(n["openBlock"])(),Object(n["createBlock"])("li",l,[e.hasErrors?(Object(n["openBlock"])(),Object(n["createBlock"])(w,{key:0,onClick:e.showErrors,color:"danger"},{default:r(()=>[Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.errorCount),1),u]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.hasErrors?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(w,{key:1,color:"success"},{default:r(()=>[d]),_:1}))])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}))]),_:1})]),_:1}),Object(n["createVNode"])(F,null,{default:r(()=>[Object(n["createVNode"])("div",p,[Object(n["createVNode"])(A,{rows:e.rows,columns:e.columns,showFilters:e.showFilters,config:{...e.config,tableCssTheme:e.tableCssTheme},onOnActiveColumns:e.onActiveColumns,onOnActiveRows:e.onActiveRows},null,8,["rows","columns","showFilters","config","onOnActiveColumns","onOnActiveRows"])])]),_:1}),Object(n["createVNode"])(S,null,{default:r(()=>[Object(n["createVNode"])(k,null,{default:r(()=>[Object(n["createVNode"])(w,{color:"primary"},{default:r(()=>[h,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.date),1)]),_:1}),Object(n["createVNode"])(w,{color:"primary"},{default:r(()=>[b,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.coreVersion),1)]),_:1}),Object(n["createVNode"])(w,{color:"primary"},{default:r(()=>[m,Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(e.apiVersion),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(N,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0)],64)}));var O=o("0f25"),g=o("80e3"),j=o("ba82"),v=o("9ceb"),y=o("7920"),D=o("8a30"),w=o("b5e4"),C=o("1718"),P=o("1c74"),k=o("5a0c"),V=o.n(k),A=o("2ef0"),F=(o("99af"),Object(n["withScopeId"])("data-v-0ed0c7a2"));Object(n["pushScopeId"])("data-v-0ed0c7a2");var S=Object(n["createTextVNode"])(" Close ");Object(n["popScopeId"])();var N=F((function(e,t,o,r,a,i){var s=Object(n["resolveComponent"])("ion-title"),c=Object(n["resolveComponent"])("ion-toolbar"),l=Object(n["resolveComponent"])("ion-header"),u=Object(n["resolveComponent"])("ion-item"),d=Object(n["resolveComponent"])("ion-list"),p=Object(n["resolveComponent"])("ion-grid"),h=Object(n["resolveComponent"])("ion-button"),b=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:F((function(){return[Object(n["createVNode"])(c,null,{default:F((function(){return[Object(n["createVNode"])(s,null,{default:F((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]})),_:1})]})),_:1})]})),_:1}),Object(n["createVNode"])(p,{class:"selector"},{default:F((function(){return[Object(n["createVNode"])(d,null,{default:F((function(){return[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])(u,{class:"his-md-text ion-padding",key:t},{default:F((function(){return[Object(n["createVNode"])("span",{innerHTML:"(".concat(t+1,") ").concat(e)},null,8,["innerHTML"])]})),_:2},1024)})),128))]})),_:1})]})),_:1}),Object(n["createVNode"])(b,null,{default:F((function(){return[Object(n["createVNode"])(c,null,{default:F((function(){return[Object(n["createVNode"])(h,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:F((function(){return[S]})),_:1},8,["onClick"])]})),_:1})]})),_:1})],64)})),I=o("1da1"),B=(o("96cf"),Object(n["defineComponent"])({components:{IonGrid:D["p"],IonList:D["y"],IonItem:D["w"],IonFooter:D["o"],IonButton:D["d"],IonToolbar:D["Q"],IonHeader:D["q"],IonTitle:D["P"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{closeModal:function(){return Object(I["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,D["X"].dismiss({});case 2:case"end":return e.stop()}}),e)})))()}}})),R=(o("054e"),o("6b0d")),_=o.n(R);const T=_()(B,[["render",N],["__scopeId","data-v-0ed0c7a2"]]);var x=T,E=Object(n["defineComponent"])({components:{HisStandardForm:y["a"],IonHeader:D["q"],ReportTable:g["a"],HisFooter:O["a"],IonPage:D["D"],IonContent:D["n"],IonToolbar:D["Q"],IonChip:D["l"],IonFooter:D["o"],IonLabel:D["x"],IonThumbnail:D["O"],IonItem:D["w"],IonImg:D["s"]},props:{showValidationStatus:{type:Boolean,default:!1},validationErrors:{type:Array,default:()=>[]},config:{type:Object},headerInfoList:{type:Array,default:()=>[]},reportPrefix:{type:String,default:"HIS-Core"},reportLogo:{type:String},showtitleOnly:{type:Boolean,default:!1},title:{type:String,required:!0},period:{type:String},showFilters:{type:Boolean,default:!1},fields:{type:Object},columns:{type:Object,required:!0},rows:{type:Object,required:!0},customBtns:{type:Array,default:()=>[]},hasServerSideCaching:{type:Boolean,default:!1},canExportPDf:{type:Boolean,default:!0},canExportCsv:{type:Boolean,default:!0},enabledPDFHorizontalPageBreak:{type:Boolean,default:!1},onFinishBtnAction:{type:Function},onReportConfiguration:{type:Function,required:!0},onDefaultConfiguration:{type:Function},customFileName:{type:String,default:""}},data:()=>({date:"",formData:{},btns:[],computeFormData:{},activeColumns:[],activeRows:[],isLoadingData:!1,canShowReport:!1,siteUUID:P["e"].getSiteUUID(),apiVersion:P["e"].getApiVersion(),coreVersion:P["e"].getCoreVersion(),artVersion:P["e"].getAppVersion(),tableCssTheme:"art-report-theme"}),watch:{validationErrors:{handler(e){Object(A["isEmpty"])(e)||this.showErrors()},deep:!0,immediate:!0},fields:{handler(e){Object(A["isEmpty"])(e)||this.btns.forEach(e=>{"Back"===e.name&&(e.visible=!0)})},immediate:!0}},computed:{logo(){if(!this.reportLogo&&"string"===typeof this.reportPrefix){if(this.reportPrefix.match(/pepfar/i))return Object(C["a"])("login-logos/PEPFAR.png");if(this.reportPrefix.match(/moh/i))return Object(C["a"])("login-logos/Malawi-Coat_of_arms_of_arms.png")}return Object(C["a"])("reports.png")},hasErrors(){return!Object(A["isEmpty"])(this.validationErrors)},errorCount(){return this.validationErrors?this.validationErrors.length:0}},methods:{async showErrors(){const e=await D["X"].create({component:x,backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:this.validationErrors}});e.present()},refreshTimeStamp(){this.date=V()().format("DD/MMM/YYYY HH:MM:ss")},onActiveColumns(e){this.activeColumns=e},onActiveRows(e){this.activeRows=e},getFileName(){return this.customFileName?this.customFileName:`${this.reportPrefix} ${P["e"].getLocationName()} ${this.title} ${this.period}`},async onLoadDefault(){this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),this.onDefaultConfiguration&&await this.onDefaultConfiguration(),D["V"].dismiss()}catch(e){Object(w["c"])(e),console.error(e),D["V"].dismiss()}},async onFinish(e,t,o=!1){this.formData=e,this.computeFormData=t,this.canShowReport=!0,await this.presentLoading();try{this.refreshTimeStamp(),await this.onReportConfiguration(this.formData,this.computeFormData,o),D["V"].dismiss()}catch(n){Object(w["c"])(n),console.error(n),D["V"].dismiss()}},async reloadReport(e=!1){Object(A["isEmpty"])(this.formData)&&Object(A["isEmpty"])(this.computeFormData)?this.onDefaultConfiguration&&await this.onLoadDefault():await this.onFinish(this.formData,this.computeFormData,e)},async presentLoading(){const e=await D["V"].create({message:"Please wait...",backdropDismiss:!1});await e.present()}},created(){this.onDefaultConfiguration&&this.onLoadDefault(),this.btns=this.customBtns,this.btns.push({name:"CSV",size:"large",slot:"start",color:"primary",visible:this.canExportCsv,onClick:async()=>{const{columns:e,rows:t}=Object(v["b"])(this.activeColumns,this.activeRows);Object(j["a"])(e,[...t,["Date Created: "+this.date],["Quarter: "+this.period],["HIS-Core Version: "+this.coreVersion],["API Version: "+this.apiVersion],["Site UUID: "+this.siteUUID]],this.getFileName())}}),this.btns.push({name:"PDF",size:"large",slot:"start",color:"primary",visible:this.canExportPDf,onClick:async()=>{const{columns:e,rows:t}=Object(v["b"])(this.activeColumns,this.activeRows);Object(j["b"])(e,t,this.getFileName(),this.enabledPDFHorizontalPageBreak)}}),this.btns.push({name:"Refresh/Rebuild",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>{let e=!1;this.hasServerSideCaching&&(e=await Object(w["a"])("Do you want to rebuild report cache?",{header:"Rebuild Report"})),this.reloadReport(e)}}),this.btns.push({name:"Back",size:"large",slot:"end",color:"primary",visible:!Object(A["isEmpty"])(this.fields),onClick:()=>this.canShowReport=!1}),this.btns.push({name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>{this.onFinishBtnAction?this.onFinishBtnAction():this.$router.push({path:"/"})}})}});o("4a46");const q=_()(E,[["render",f],["__scopeId","data-v-47b6d7e8"]]);t["a"]=q},5969:function(e,t,o){"use strict";o.d(t,"a",(function(){return p}));var n=o("5530"),r=o("d4ec"),a=o("bee2"),i=o("262e"),s=o("2caf"),c=(o("99af"),o("1c74")),l=o("9283"),u=o("5a0c"),d=o.n(u),p=function(e){Object(i["a"])(o,e);var t=Object(s["a"])(o);function o(){var e;return Object(r["a"])(this,o),e=t.call(this),e.endDate="",e.startDate="",e.quarter="",e.date=c["e"].getSessionDate(),e.programID=c["e"].getProgramID(),e}return Object(a["a"])(o,[{key:"getDateIntervalPeriod",value:function(){return"".concat(l["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(l["b"].toStandardHisDisplayFormat(this.endDate))}},{key:"setStartDate",value:function(e){this.startDate=e}},{key:"setEndDate",value:function(e){this.endDate=e}},{key:"setQuarter",value:function(e){this.quarter=e}},{key:"getReport",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return c["e"].getJson(e,this.buildRequest(t))}},{key:"buildRequest",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.quarter&&(t["quarter"]=this.quarter),Object(n["a"])(Object(n["a"])({},t),e)}}],[{key:"getQuarterBounds",value:function(e){var t=function(t){return d()("".concat(e,"-").concat(t,"-01")).daysInMonth()},o=function(t){return"".concat(e,"-").concat(t,"-01 00:00")},n=function(o){return"".concat(e,"-").concat(o,"-").concat(t(o)," 00:00")};return{Q1:{qtr:1,start:o("01"),end:n("03")},Q2:{qtr:2,start:o("04"),end:n("06")},Q3:{qtr:3,start:o("07"),end:n("09")},Q4:{qtr:4,start:o("10"),end:n("12")}}}},{key:"getQtrByDate",value:function(e){var t=this.getQuarterBounds(e.getFullYear());for(var o in t){var n=t[o],r=n.start,a=n.end;if(e>=new Date(r)&&e<=new Date(a))return t[o]}return null}},{key:"buildQtrObj",value:function(e,t){var o=this.getQuarterBounds(t),n=o[e],r=n.start,a=n.end;return{start:r,end:a,name:"".concat(e," ").concat(t)}}},{key:"getReportQuarters",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t=[],o=new Date,n=o.getFullYear(),r=n;o=new Date("".concat(r,"-").concat(o.getMonth()+1,"-").concat(o.getDate()," 00:00"));var a=this.getQtrByDate(o),i=a.qtr,s=0;4===i&&t.push(this.buildQtrObj("Q1",n+1));while(s<e)0===s&&i<4&&t.push(this.buildQtrObj("Q".concat(i+1),n)),t.push(this.buildQtrObj("Q".concat(i),n)),i=i>0?i-=1:i,n=0==i?n-1:n,i=0==i?i+=4:i,s++;return t}}]),o}(c["e"])},"6547c":function(e,t,o){},7920:function(e,t,o){"use strict";var n=o("7a23");function r(e,t,o,r,a,i){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=o("9441"),i=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=o("6b0d"),c=o.n(s);const l=c()(i,[["render",r]]);t["a"]=l},"87e7":function(e,t,o){"use strict";o.d(t,"b",(function(){return c})),o.d(t,"c",(function(){return l})),o.d(t,"e",(function(){return u})),o.d(t,"a",(function(){return d})),o.d(t,"d",(function(){return p}));var n=o("d4ec"),r=o("bee2"),a=o("262e"),i=o("2caf"),s=o("5969"),c=["0A","2A","4A","5A","6A","7A","8A","9A","10A","11A","12A","13A","14A","15A","16A","17A","0P","2P","4PP","4PA","9PP","9PA","11PP","11PA","12PP","12PA","14PP","14PA","15PP","15PA","16P","17PP","17PA"],l=["0A","2A","4A","5A","6A","7A","8A","9A","10A","11A","12A","13A","14A","15A","16A","17A","0P","2P","4P","4PP","4PA","9P","9PP","9PA","11P","11PP","11PA","12PP","12PA","14P","14PP","14PA","15P","15PP","15PA","16P","17P","17PP","17PA"],u=["10 - 13.9 Kg","14 - 19.9 Kg","20 - 24.9 Kg","25 - 29.9 Kg","3 - 3.9 Kg","30 - 34.9 Kg","35 - 39.9 Kg","4 - 4.9 Kg","40 Kg +","40 - 49.9 Kg","50 Kg +","6 - 9.9 Kg","Unknown"],d=["pellets","tablets","granules"],p=function(e){Object(a["a"])(o,e);var t=Object(i["a"])(o);function o(){var e;return Object(n["a"])(this,o),e=t.call(this),e.type="pepfar",e}return Object(r["a"])(o,[{key:"setReportType",value:function(e){this.type=e}},{key:"getTptNewInitiations",value:function(){return this.getReport("programs/".concat(this.programID,"/reports/tpt_newly_initiated"))}},{key:"getRegimenFormulationReport",value:function(e,t){return this.getReport("programs/".concat(this.programID,"/reports/regimens_and_formulations"),{regimen:e,formulation:t})}},{key:"getRegimenReport",value:function(){return this.getReport("regimen_report",{type:this.type})}},{key:"getRegimenSwitchReport",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.getReport("regimen_switch",{pepfar:e})}},{key:"getRegimensByWeight",value:function(){return this.getReport("programs/".concat(this.programID,"/reports/regimens_by_weight_and_gender"))}},{key:"getSCReport",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.getReport("sc_arvdisp",{pepfar:e})}}]),o}(s["a"])}}]);
//# sourceMappingURL=chunk-64712c94.32eb0cc8.js.map