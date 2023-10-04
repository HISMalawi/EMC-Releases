(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-050ba3b6"],{2048:function(e,t,a){"use strict";var n=a("7a23");function r(e,t,a,r,o,i){const l=Object(n["resolveComponent"])("v2Datatable"),s=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,{title:e.title,subtitle:e.subtitle,columnData:e.reportData,columns:e.columns,"on-finish":e.onFinish,rowsPerPage:e.ITEMS_PER_PAGE},null,8,["title","subtitle","columnData","columns","on-finish","rowsPerPage"])]),_:1})}a("14d9");var o=a("d867"),i=a("99ae"),l=a("6605"),s=a("2ef0"),u=a("8734"),d=a("23e6"),c=a("0011");const p=20;var v=Object(n["defineComponent"])({props:{title:{type:String,default:"Drilldown"},patientIdentifiers:{type:Object},onFinish:{type:Function}},components:{IonPage:o["D"],v2Datatable:i["a"]},setup(e){const t=Object(n["ref"])("-"),a=Object(n["ref"])([]),r=Object(l["i"])(),o=[[{label:"National ID",ref:"national_id"},{label:"First name",ref:"given_name"},{label:"Last name",ref:"family_name"},{label:"Birthdate",ref:"birthdate"},{label:"Action",ref:"patient_id",exportable:!1,tdClick:({data:e})=>r.push({path:"/patient/dashboard/"+e.patient_id}),value:()=>"View client"}]];return Object(n["watch"])(()=>e.patientIdentifiers,async e=>{if(a.value=[],t.value="Total: 0",!e||!e.length)return;const n=Object(s["chunk"])(e,p);for(const o of n){for(const n of o){try{const e=new d["a"](await d["a"].findByID(n));a.value.push({patient_id:e.getID(),national_id:e.getNationalID(),given_name:e.getGivenName(),family_name:e.getFamilyName(),birthdate:Object(c["h"])(e.getBirthdate())})}catch(r){console.error(r),a.value.push({})}t.value=`Total: ${a.value.length} of ${(e||[]).length}`}await Object(u["a"])(500)}},{immediate:!0}),{columns:o,subtitle:t,reportData:a,ITEMS_PER_PAGE:p}}}),m=a("d959"),f=a.n(m);const _=f()(v,[["render",r]]);t["a"]=_},"6be2":function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"g",(function(){return i})),a.d(t,"f",(function(){return l})),a.d(t,"e",(function(){return s})),a.d(t,"c",(function(){return u})),a.d(t,"b",(function(){return d})),a.d(t,"h",(function(){return p})),a.d(t,"a",(function(){return v}));var n=a("3800");const r=[n["m"],[["","Delete"]]],o=[n["j"],[["Delete"]]],i=[n["j"],[["Delete","Unknown"]]],l=[n["j"],[["N/A"],["Delete","Unknown"]]],s=[n["j"],[["Delete"]]],u=[n["j"],[["Unknown","Delete"],["Qwerty","A-Z"]]],d=[n["h"],[["Unknown"]]],c=[n["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],p=[n["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],v=[{btn:"0-9",keyboard:u},{btn:"?123",keyboard:r},{btn:"A-Z",keyboard:c},{btn:"Qwerty",keyboard:p}]},"775a":function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var n,r,o=a("d95e"),i=a("1c74"),l=a("b446"),s=a("0011"),u=a("c731"),d=a("b5e4"),c=a("d867"),p=a("7a23"),v=a("2706");(function(e){e["MULTI_FIELD_DATE"]="Multipage date fields",e["CALENDAR_FIELD"]="Calendar",e["SINGLE_DATE_INPUT_FIELD"]="Single page date"})(n||(n={})),function(e){e["PERIOD_INPUT_TYPE"]="hts_report_date_period_type"}(r||(r={}));const m=Object(p["reactive"])({datePeriodInputType:localStorage.getItem(r.PERIOD_INPUT_TYPE)||n.MULTI_FIELD_DATE});function f(e){Object(u["a"])([...Object(l["b"])({id:"start_date",helpText:"Start",required:!0,minDate:()=>(null===e||void 0===e?void 0:e.minDate)||"",maxDate:()=>(null===e||void 0===e?void 0:e.maxDate)||i["e"].getSessionDate(),condition:()=>m.datePeriodInputType===n.MULTI_FIELD_DATE,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(l["b"])({id:"end_date",helpText:"End",required:!0,minDate:(e,t)=>t.start_date,maxDate:()=>(null===e||void 0===e?void 0:e.maxDate)||i["e"].getSessionDate(),condition:()=>m.datePeriodInputType===n.MULTI_FIELD_DATE,estimation:{allowUnknown:!1},computeValue:e=>e}),{id:"alt_start_date",proxyID:"start_date",helpText:"Start Date",type:o["b"].TT_FULL_DATE,validation:t=>{if(!t)return["Date is required"];const a=e.maxDate||i["e"].getSessionDate();return e.minDate&&new Date(t.value)<new Date(e.minDate)?[`${Object(s["h"])(""+t.value)} is less than minimum date of ${Object(s["h"])(e.minDate)}`]:a&&new Date(t.value)>new Date(a)?[`${Object(s["h"])(""+t.value)} is greater than max date of ${Object(s["h"])(a)}`]:null},computedValue:e=>e.value,condition:()=>m.datePeriodInputType===n.SINGLE_DATE_INPUT_FIELD},{id:"alt_end_date",proxyID:"end_date",helpText:"End Date",type:o["b"].TT_FULL_DATE,defaultValue:e=>e.start_date.value,validation:(t,a)=>{if(!t)return["Date is required"];const n=e.maxDate||i["e"].getSessionDate();return a.start_date.value&&new Date(t.value)<new Date(a.start_date.value)?[`${Object(s["h"])(""+t.value)} is less than minimum date of ${Object(s["h"])(a.start_date.value)}`]:n&&new Date(t.value)>new Date(n)?[`${Object(s["h"])(""+t.value)} is greater than max date of ${Object(s["h"])(n)}`]:null},computedValue:e=>e.label,condition:()=>m.datePeriodInputType===n.SINGLE_DATE_INPUT_FIELD},{id:"calendar_start_date",proxyID:"start_date",helpText:"Start Date",type:o["b"].TT_DATE_PICKER,computedValue:e=>e,condition:()=>m.datePeriodInputType===n.CALENDAR_FIELD,validation:e=>v["a"].required(e),config:{minDate:()=>e.minDate||null,maxDate:()=>e.maxDate||i["e"].getSessionDate(),infoItems:(e,t)=>[{label:"Start Date",value:Object(s["h"])(e)||"-"},{label:"End Date",value:Object(s["h"])(t.end_date)||"-"}],persistInfoItems:!1}},{id:"calendar_end_date",proxyID:"end_date",helpText:"End Date",type:o["b"].TT_DATE_PICKER,validation:e=>v["a"].required(e),defaultValue:e=>e.start_date.value,computedValue:e=>e,condition:()=>m.datePeriodInputType===n.CALENDAR_FIELD,config:{minDate:e=>e.start_date.value,maxDate:()=>e.maxDate||i["e"].getSessionDate(),infoItems:(e,t)=>[{label:"Start Date",value:Object(s["h"])(t.start_date)||"-"},{label:"End Date",value:Object(s["h"])(e)}],persistInfoItems:!1}}],async(t,a)=>{console.log(a),c["Z"].dismiss();try{const t=`${Object(s["h"])(a.start_date)} to ${Object(s["h"])(a.end_date)}`;e.onFinish(a.start_date,a.end_date,t)}catch(n){Object(d["c"])("An error has occurred")}})}},"937e":function(e,t,a){"use strict";a.r(t);var n=a("7a23");function r(e,t,a,r,o,i){const l=Object(n["resolveComponent"])("ion-loading"),s=Object(n["resolveComponent"])("v2Datatable"),u=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(u,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,{"is-open":e.isLoading,message:"Please wait..."},null,8,["is-open"]),Object(n["createVNode"])(s,{title:"CXCA SCRN Report",csvQuarter:e.csvQuarter,subtitle:e.period,columns:e.columns,columnData:e.reportData,rowsPerPage:25,onConfigure:e.configure,onRefresh:()=>e.generate()},null,8,["csvQuarter","subtitle","columns","columnData","onConfigure","onRefresh"])]),_:1})}a("13d5"),a("14d9");var o=a("d867"),i=a("99ae"),l=a("ad9e"),s=a("775a"),u=a("b5e4"),d=a("2048"),c=a("0011");const p=Object(n["ref"])([]),v=Object(n["ref"])(""),m=Object(n["ref"])(""),f=Object(n["ref"])(""),_=Object(n["ref"])(!1),b=Object(n["ref"])("");var D=Object(n["defineComponent"])({components:{IonPage:o["D"],IonLoading:o["z"],v2Datatable:i["a"]},setup(){const e=async(e,t)=>{(await o["Z"].create({component:d["a"],backdropDismiss:!1,cssClass:"large-modal",componentProps:{title:e,subtitle:f,patientIdentifiers:t,onFinish:()=>o["Z"].getTop().then(e=>e&&o["Z"].dismiss())}})).present()},t=[[{label:"#",ref:"index",span:{thRowspan:2}},{label:"Age group",ref:"age_group",span:{thRowspan:2}},{label:"Gender",ref:"gender",exportable:!1,span:{thRowspan:2}},{label:"1st time screened",ref:"",span:{thColspan:3}},{label:"Rescreened after previous negative",ref:"",span:{thColspan:3}},{label:"Post-treatment follow-up",ref:"",span:{thColspan:3}}],[{label:"Negative",ref:"first_time_screened_negative",secondaryLabel:"1st screened (Negative)",value:e=>e.first_time_screened.negative.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.first_time_screened.negative)},{label:"Positive",ref:"first_time_screened_positive",secondaryLabel:"1st time screened (Positive)",value:e=>e.first_time_screened.positive.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.first_time_screened.positive)},{label:"Suspected Cancer",ref:"first_time_screened_suspected_cancer",secondaryLabel:"1st screened(Suspected cancer)",value:e=>e.first_time_screened.suspected.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.first_time_screened.suspected)},{label:"Negative",ref:"rescreened_after_prev_visit_negative",secondaryLabel:"Rescreen after prev visit (Negative)",value:e=>e.rescreened_after_prev_visit.negative.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.rescreened_after_prev_visit.negative)},{label:"Positive",ref:"rescreened_after_prev_visit_positive",secondaryLabel:"Rescreen after prev visit (Positive)",value:e=>e.rescreened_after_prev_visit.positive.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.rescreened_after_prev_visit.positive)},{label:"Suspected cancer",ref:"rescreened_after_prev_visit_suspected",secondaryLabel:"Rescreen after prev visit (Suspected)",value:e=>e.rescreened_after_prev_visit.suspected.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.rescreened_after_prev_visit.suspected)},{label:"Negative",ref:"post_treatment_followup_negative",secondaryLabel:"Post-treatment followup(Negative)",value:e=>e.post_treatment_followup.negative.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.post_treatment_followup.negative)},{label:"Positive",ref:"post_treatment_followup_positive",secondaryLabel:"Post-treatment followup (Positive)",value:e=>e.post_treatment_followup.positive.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.post_treatment_followup.positive)},{label:"Suspected cancer",ref:"post_treatment_followup_suspected",secondaryLabel:"Post-treatment followup (Suspected)",value:e=>e.post_treatment_followup.suspected.length,tdClick:({column:t,data:a})=>e(`${a.age_group} ${t.secondaryLabel}`,a.post_treatment_followup.suspected)}]],a=async()=>{if(!v.value||!m.value)return Object(u["e"])("Start date and end date required!");_.value=!0,p.value=[];const e=new l["a"];e.startDate=v.value,e.endDate=m.value;try{p.value=(await e.getClinicReport("CXCA SCRN")).slice(5).map((e,t)=>(e.index=t+1,e.gender="Female",e));const t=e=>{const t=t=>p.value.reduce((a,n)=>a.concat(n[e][t]||[]),[]);return{positive:t("positive"),negative:t("negative"),suspected:t("suspected")}};p.value.push({age_group:"All",gender:"Female",index:p.value.length+1,first_time_screened:t("first_time_screened"),post_treatment_followup:t("post_treatment_followup"),rescreened_after_prev_visit:t("rescreened_after_prev_visit")})}catch(t){Object(u["c"])("Unable to generate report!")}_.value=!1},r=()=>Object(s["a"])({onFinish:(e,t,n)=>{v.value=e,m.value=t,f.value=`Period (${n})`,b.value=`${Object(c["h"])(v.value)} to ${Object(c["h"])(m.value)}`,a()}});return Object(n["onMounted"])(()=>!p.value.length&&r()),{columns:t,isLoading:_,reportData:p,period:f,csvQuarter:b,generate:a,configure:r}}}),g=a("d959"),h=a.n(g);const y=h()(D,[["render",r]]);t["default"]=y},ad9e:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("ade3"),r=(a("14d9"),a("1c74")),o=a("9283");class i extends r["e"]{constructor(){super(),Object(n["a"])(this,"programID",void 0),Object(n["a"])(this,"startDate",void 0),Object(n["a"])(this,"endDate",void 0),Object(n["a"])(this,"date",void 0),this.endDate="",this.startDate="",this.date=r["e"].getSessionDate(),this.programID=r["e"].getProgramID()}getPepfarReport(e){return this.getReport("pepfar_cxca",{report_name:e})}getClinicReport(e){return this.getReport("screened_for_cxca",{report_name:e})}getMohReport(e){return this.getReport("screened_for_cxca",{report_name:e})}getDateIntervalPeriod(){return`${o["b"].toStandardHisDisplayFormat(this.startDate)} - ${o["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(e){this.startDate=e}setEndDate(e){this.endDate=e}getReportPeriod(){return this.startDate&&this.endDate?`${o["b"].toStandardHisDisplayFormat(this.startDate)} - ${o["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(e,t={}){return r["e"].getJson(e,this.buildRequest(t))}buildRequest(e={}){const t={date:this.date,program_id:24};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),{...t,...e}}static getReportQuarters(e=4){const t=[];let a=o["b"].getCurrentYear();for(let n=0;n<e;++n)t.push({name:"Q4 "+a,start:a+"-10-01",end:a+"-12-31"}),t.push({name:"Q3 "+a,start:a+"-07-01",end:a+"-09-30"}),t.push({name:"Q2 "+a,start:a+"-04-01",end:a+"-06-30"}),t.push({name:"Q1 "+a,start:a+"-01-01",end:a+"-03-31"}),--a;return t}}},b446:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return T}));a("14d9"),a("13d5");var n,r=a("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],i=a("9283"),l=a("2706"),s=a("3800"),u=a("6be2"),d=a("5a0c"),c=a.n(d),p=a("1c74");function v(e,t,a=!0){const n=[];return a&&n.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:r["b"].TT_TEXT,config:{customKeyboard:[s["j"],[n,["DELETE"]]]}}}function m(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:r["b"].TT_SELECT,options:()=>o}}function f(e,t){return{id:e,helpText:t+" Day",type:r["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function _(e,t){return{id:e,helpText:t+" Estimated period",type:r["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function b(e,t){return{id:e,helpText:t+" Age Estimate",type:r["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:u["e"]}}}function D(e){return parseInt(e)<10?"0"+e:e}async function g(e,t,a){if(t.defaultValue){const n=await t.defaultValue(e);if(n){const[e,t,r]=n.split("-");switch(a){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(r)||""}}}return""}function h(e){return i["b"].toStandardHisDisplayFormat(e)}function y(e,t,a,n){if(t.minDate){const r=t.minDate(a,n);if(new Date(e)<new Date(r))return[`${h(e)} is less than minimum date of ${h(r)}`]}if(t.maxDate){const r=t.maxDate(a,n);if(r&&new Date(e)>new Date(r))return[`${h(e)} is greater than max date of  ${h(r)}`]}}function T(e,t=""){let a="",r="",s="",u="",d=!1;const T="year_"+e.id,w="month_"+e.id,I="day_"+e.id,x="age_estimate_"+e.id,E="duration_estimate_"+e.id,O=v(T,e.helpText,e.estimation.allowUnknown),j=m(w,e.helpText),$=f(I,e.helpText),S=b(x,e.helpText),L=_(E,e.helpText),k="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,N=t=>!(t[T]&&t[T].value&&["Unknown"].includes(t[T].value))&&(!e.condition||e.condition(t)),P=(e,t)=>{const a=[{type:"year",value:r,default:"YYYY"},{type:"month",value:s,default:"MM"},{type:"day",value:u,default:"DD"}];return a.reduce((a,n)=>{const r=[null,void 0,"Unknown",""];return t===n.type?r.includes(e)?a.push(n.default):a.push(e):r.includes(n.value)?a.push(n.default):a.push(n.value),a},[]).join("-")};"function"===typeof e.init&&(O.init=e.init),O.updateHelpTextOnValue=e=>`${O.helpText} (${P(null===e||void 0===e?void 0:e.label,"year")})`,O.proxyID=e.id,O.unload=e=>r=e.value.toString(),O.config={...O.config,...e.config},O.defaultValue=t=>g(t,e,"Year"),O.condition=t=>!e.condition||e.condition(t),O.validation=(t,a,n)=>{if(e.required&&l["a"].required(t))return["Year cannot be empty"];const r=t?t.value:"";if(!e.estimation.allowUnknown&&r.toString().match(/unknown/i))return["Value unknown is not permitted"];if(r&&!["Unknown"].includes(r)&&isNaN(r)||r<1900)return["Invalid Year"];if(r&&"function"===typeof e.minDate){const t=i["b"].getYear(e.minDate(a,n));if(parseInt(r)<t)return[`Year of ${r} is less than Minimum year of ${t}`]}if(r&&"function"===typeof e.maxDate){const t=e.maxDate(a,n);if(t&&r>i["b"].getYear(t))return[`Year of ${r} exceeds Maximum year of ${i["b"].getYear(t)}`]}return null},O.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:a?h(a):"Unknown"}),O.appearInSummary=(t,a)=>a===e.id,O.computedValue=t=>{if(a){const[n,r,o]=a.split("-");return a=`${t.value}-${r}-${o}`,e.computeValue(a,!1)}if(t&&"Unknown"===t.value)return a="",e.computeValue("Unknown",!1)},j.updateHelpTextOnValue=e=>`${j.helpText} (${P(null===e||void 0===e?void 0:e.label,"month")})`,j.proxyID=e.id,j.unload=e=>s=D(e.value.toString()),j.condition=e=>N(e),j.validation=e=>l["a"].required(e),j.defaultValue=t=>g(t,e,"Month"),k&&(j.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),j.computedValue=(t,n)=>{if((""+t.value).match(/unknown/i))return a=n[T].value+"-07-15",e.computeValue(a,!0);if(a){const[n,r,o]=a.split("-"),i=D(""+t.value);return a=`${n}-${i}-${o}`,e.computeValue(a,!1)}},$.proxyID=e.id,$.updateHelpTextOnValue=e=>`${$.helpText} (${P(null===e||void 0===e?void 0:e.label,"day")})`,$.condition=e=>!(""+e[w].value).match(/unknown/i)&&N(e),$.validation=(t,n,o)=>l["a"].required(t)?["Day is required for date"]:(d=!!(""+t.value).match(/unknown/i),u=d?"15":D(""+t.value),a=`${r}-${s}-${u}`,y(a,e,n,o)),$.defaultValue=t=>g(t,e,"Day"),$.computedValue=()=>e.computeValue(a,d),$.unload=(t,a,n,r)=>{e.unload&&e.unload(t,a,n,r)},$.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(a,n),$.config={year:e=>e[T].value,month:e=>e[w].value},k||($.config.keyboardActions=[]);const C=(t,a)=>{const n=["Unknown"===t[T].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===a];return n.every(Boolean)};return S.proxyID=e.id,S.validation=(t,n,r)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const i=c()(p["e"].getSessionDate()).subtract(t.value,"years").year();return a=i+"-07-15",y(a,e,n,r)},S.condition=e=>C(e,n.AGE_ESTIMATE_FIELD),S.computedValue=()=>e.computeValue(a,!0),S.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(a,n),L.proxyID=e.id,L.validation=(t,n,r)=>l["a"].required(t)?["Please select an estimate"]:(a=c()(p["e"].getSessionDate()).subtract(t.value,"day").format(i["a"]),y(a,e,n,r)),L.condition=e=>C(e,n.MONTH_ESTIMATE_FIELD),L.computedValue=()=>e.computeValue(a,!0),L.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(a,n),[O,j,$,S,L]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(n||(n={}))}}]);
//# sourceMappingURL=chunk-050ba3b6.fb879d13.js.map