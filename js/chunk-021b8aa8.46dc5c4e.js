(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-021b8aa8"],{"188c":function(e,t,n){"use strict";n.r(t);var a=n("7a23");function i(e,t,n,i,o,r){const s=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(s,{key:e.hisFormKey,fields:e.fields,activeField:e.fieldComponent,skipSummary:!0,onOnIndex:t[0]||(t[0]=t=>e.fieldComponent=""),onOnFinish:e.onFinish},null,8,["fields","activeField","onOnFinish"])}n("13d5"),n("14d9");var o=n("7920"),r=n("d95e"),s=n("b446"),l=n("ade3"),u=n("9b7c"),d=n("cc6f");class c extends d["a"]{constructor(e){super(e,57),Object(l["a"])(this,"patientID",void 0),Object(l["a"])(this,"testTypeID",void 0),Object(l["a"])(this,"resultDate",void 0),Object(l["a"])(this,"testID",void 0),this.patientID=e,this.testTypeID=-1,this.resultDate="",this.testID=-1}createLabResult(e){return d["a"].postJson(`lab/tests/${this.testID}/results`,{encounter_id:this.encounterID,date:this.resultDate,measures:e})}getTestID(){return this.testID}getTestTypeID(){return this.testTypeID}setTestTypeID(e){this.testTypeID=e}setResultDate(e){this.resultDate=e}setTestID(e){this.testID=e}getTestsWithoutResults(){return u["a"].getOrders(this.patientID,{status:"drawn"})}getTestIndicators(){return u["a"].getJson("lab/test_result_indicators",{test_type_id:this.testTypeID})}}var p=n("2706"),m=n("b5e4"),h=n("2ef0"),f=n("9283"),b=n("1c74"),v=n("8e8b"),y=Object(a["defineComponent"])({components:{HisStandardForm:o["a"]},data:()=>({fieldComponent:"",labResult:{},hisFormKey:0,patient:{},fields:[],selectedTest:{},testOptions:[],testIndicators:[]}),watch:{$route:{async handler({params:e}){e&&e.patient_id&&(this.patient=e.patient_id,this.labResult=new c(this.patient),await this.initData(),this.fields=this.getFields())},deep:!0,immediate:!0}},methods:{async onFinish(e,t){try{const e=Object.values(t).filter(e=>"result_indicator"===e.tag&&e.measures).map(e=>e.measures);this.labResult.setTestID(this.selectedTest.value),this.labResult.setResultDate(t.result_date),await this.labResult.createEncounter(),await this.labResult.createLabResult(e),v["a"].invalidate("PATIENT_LAB_ORDERS"),this.testOptions=[],this.selectedTest={},this.testIndicators=[],await this.initData(),this.hisFormKey=Math.floor(5e3*Math.random()),Object(m["d"])("Lab result saved!")}catch(n){Object(m["c"])(""+n),console.error(n)}},generateTestIndicatorsFields(){return this.testIndicators.reduce((e,t)=>e.concat(this.buildTestIndicatorFields(t.indicatorId,t.indicatorName,t.specimen,t.testId)),[])},async validateVLresults(e,t,n){if("HIV viral load"!==e)return!0;const a=n.substring(0,1),i=n.substring(1,n.length);if(u["a"].isValidVLResult(t,a,i))return!0;const o=await Object(m["a"])(`Invalid results for ${t} HIV viral load`,{cancelBtnLabel:"Process result",confirmBtnLabel:"Re-enter result"});return!o},alphaValueIsValid(e){try{return!!e.match(/^(>|<|=)(.*)/)}catch(t){return!1}},numericValueIsValid(e){try{return!!e.match(/^(=|<|>)([0-9]*)$/m)}catch(t){return!1}},isMalariaResult(e){return!!e.match(/mrdt|malaria/i)},buildTestIndicatorFields(e,t,n,a){const i=e*a,o=e=>[this.selectedTest.value===a,!!Object(h["find"])(e.result_indicators,{label:t})].every(Boolean),s=e=>this.validateVLresults(t,n,e.value.toString()),l=(n,a)=>{if("Other"===n.value&&t.match(/HIV viral load/i))return{};const o=this.isMalariaResult(t)?"text":a["type_"+i].value,r=this.isMalariaResult(t)?"="+n.value:n.value.toString(),s=r.charAt(0),l="numeric"===o?parseInt(r.substring(1)):r.substring(1),u=a["result_indicators"].filter(t=>t.value===e)[0];return{tag:"result_indicator",measures:{indicator:{concept_id:u.value},value:l,value_modifier:s,value_type:o},result:l,modifier:s,test:u.label}};return[{id:"type_"+i,helpText:`Result type (${t})`,type:r["b"].TT_SELECT,group:"test_indicator",condition:e=>o(e)&&!this.isMalariaResult(t),appearInSummary:()=>!1,validation:e=>p["a"].required(e),options:()=>[{label:"Numeric (numbers only)",value:"numeric"},{label:"Alphanumeric(text and numbers)",value:"text"}]},{id:"num_"+i,helpText:`Test Result (${t})`,type:r["b"].TT_TEXT,group:"test_indicator",computedValue:l,beforeNext:s,onValue:e=>!(e&&e.value&&!this.numericValueIsValid(e.value.toString()))||(Object(m["e"])("You must enter a modifer and numbers only. i.e =90 / >19 / < 750"),!1),validation:e=>p["a"].required(e),condition:e=>o(e)&&"numeric"===e["type_"+i].value,config:{customKeyboard:[[["1","2","3"],["4","5","6","=","<",">"],["7","8","9","."],["","0",""]],[["Delete"]]]}},{id:"alpha_"+i,helpText:`Test Result (${t})`,type:r["b"].TT_TEXT,group:"test_indicator",onValue:e=>!(e&&e.value&&!this.alphaValueIsValid(e.value.toString()))||(Object(m["e"])("You must enter a modifier plus result (for example =LDL)"),!1),computedValue:l,validation:e=>p["a"].required(e),condition:e=>o(e)&&"text"===e["type_"+i].value&&!t.match(/HIV viral load/i)},{id:"VL_alpha_"+i,helpText:`Select Test Result (${t})`,type:r["b"].TT_SELECT,group:"test_indicator",computedValue:l,validation:e=>p["a"].required(e),condition:e=>o(e)&&"text"===e["type_"+i].value&&t.match(/HIV viral load/i),options:()=>[{label:"Collect Another Sample",value:"=Collect Another Sample"},{label:"<LDL",value:"<LDL"},{label:"=LDL",value:"=LDL"},{value:"Other",label:"Other"}]},{id:"other_VL_alpha_"+i,helpText:`Test Result (${t})`,type:r["b"].TT_TEXT,group:"test_indicator",onValue:e=>!(e&&e.value&&!this.alphaValueIsValid(e.value.toString()))||(Object(m["e"])("You must enter a modifier plus result (for example =LDL)"),!1),computedValue:l,validation:e=>p["a"].required(e),condition:e=>o(e)&&"text"===e["type_"+i].value&&t.match(/HIV viral load/i)&&"Other"===e["VL_alpha_"+i].value},{id:"malaria_result_"+i,helpText:`Select Test Result (${t})`,type:r["b"].TT_SELECT,group:"test_indicator",computedValue:l,validation:e=>p["a"].required(e),condition:e=>o(e)&&this.isMalariaResult(t),options:()=>t.match(/mrdt/i)?[{label:"Positive",value:"positive"},{label:"Negative",value:"negative"}]:[{label:"Parasites seen",value:"parasites seen"},{label:"No parasites seen",value:"no parasites seen"}]}]},async initData(){const e=await this.labResult.getTestsWithoutResults();for(const t in e){const n=e[t];for(const e in n.tests){const t=n.tests[e];if(!Object(h["isEmpty"])(t.result))continue;this.labResult.setTestTypeID(t.concept_id);const a=await this.labResult.getTestIndicators(),i=a.map(e=>({testId:t.id,indicatorName:e.name,indicatorId:e.concept_id,specimen:n.specimen.name}));this.testIndicators=[...this.testIndicators,...i],this.testOptions.push({label:t.name,value:t.id,other:{accession:n.accession_number,specimen:n.specimen.name,test:t.name,orderDate:n.order_date,testIndicators:i}})}}},getFields(){return[{id:"test_type",helpText:"Tests without results",type:r["b"].TT_TABLE_VIEWER,options:()=>{const e=this.testOptions.map(e=>[e.other.accession,e.other.specimen,e.other.test,f["b"].toStandardHisDisplayFormat(e.other.orderDate),{type:"button",name:"Select",action:()=>{this.selectedTest=e,this.$nextTick(()=>this.fieldComponent="year_result_date")}}]);return[{label:"",value:"",other:{rows:e,columns:["Acession#","Specimen","Test","Order date"]}}]},validation:e=>p["a"].required(e),config:{overrideDefaultFooterBtns:{nextBtn:{name:"Finish",onClick:()=>this.$router.back()}},hiddenFooterBtns:["Clear","Cancel"]}},...Object(s["b"])({id:"result_date",helpText:"Result",required:!0,estimation:{allowUnknown:!1},minDate:()=>f["b"].toStandardHisFormat(this.selectedTest.other.orderDate),maxDate:()=>b["e"].getSessionDate(),computeValue:e=>e}),{id:"result_indicators",helpText:"Select test result indicators",type:r["b"].TT_MULTIPLE_SELECT,validation:e=>p["a"].required(e),options:()=>this.selectedTest.other.testIndicators.map(e=>({label:e.indicatorName,value:e.indicatorId}))},...this.generateTestIndicatorsFields(),{id:"entry_confirmation",helpText:"Confirm entry",type:r["b"].TT_TABLE_VIEWER,options:(e,t)=>{const n=Object.values(t).filter(e=>"object"===typeof e&&null!=e&&"result_indicator"===e.tag).map(e=>[e.test,e.modifier,e.result]);return[{label:"",value:"",other:{rows:n,columns:["Test","Modifier","Result"]}}]}}]}}}),T=n("d959"),D=n.n(T);const I=D()(y,[["render",i]]);t["default"]=I},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"j",(function(){return i})),n.d(t,"m",(function(){return o})),n.d(t,"e",(function(){return r})),n.d(t,"b",(function(){return s})),n.d(t,"l",(function(){return l})),n.d(t,"i",(function(){return u})),n.d(t,"g",(function(){return d})),n.d(t,"a",(function(){return c})),n.d(t,"k",(function(){return p})),n.d(t,"c",(function(){return m})),n.d(t,"h",(function(){return h})),n.d(t,"f",(function(){return f}));const a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],s=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],c=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],m=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],h=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"g",(function(){return r})),n.d(t,"f",(function(){return s})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"h",(function(){return p})),n.d(t,"a",(function(){return m}));var a=n("3800");const i=[a["l"],[["","Delete"]]],o=[a["i"],[["Delete"]]],r=[a["i"],[["Delete","Unknown"]]],s=[a["i"],[["N/A"],["Delete","Unknown"]]],l=[a["i"],[["Delete"]]],u=[a["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],d=[a["g"],[["Unknown"]]],c=[a["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],p=[a["k"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],m=[{btn:"0-9",keyboard:u},{btn:"?123",keyboard:i},{btn:"A-Z",keyboard:c},{btn:"Qwerty",keyboard:p}]},7920:function(e,t,n){"use strict";var a=n("7a23");function i(e,t,n,i,o,r){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=n("d959"),l=n.n(s);const u=l()(r,[["render",i]]);t["a"]=u},b446:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return _}));n("14d9"),n("13d5");var a,i=n("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],r=n("9283"),s=n("2706"),l=n("3800"),u=n("6be2"),d=n("5a0c"),c=n.n(d),p=n("1c74");function m(e,t,n=!0){const a=[];return n&&a.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:i["b"].TT_TEXT,config:{customKeyboard:[l["i"],[a,["DELETE"]]]}}}function h(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:i["b"].TT_SELECT,options:()=>o}}function f(e,t){return{id:e,helpText:t+" Day",type:i["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function b(e,t){return{id:e,helpText:t+" Estimated period",type:i["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function v(e,t){return{id:e,helpText:t+" Age Estimate",type:i["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:u["e"]}}}function y(e){return parseInt(e)<10?"0"+e:e}async function T(e,t,n){if(t.defaultValue){const a=await t.defaultValue(e);if(a){const[e,t,i]=a.split("-");switch(n){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(i)||""}}}return""}function D(e){return r["b"].toStandardHisDisplayFormat(e)}function I(e,t,n,a){if(t.minDate){const i=t.minDate(n,a);if(new Date(e)<new Date(i))return[`${D(e)} is less than minimum date of ${D(i)}`]}if(t.maxDate){const i=t.maxDate(n,a);if(i&&new Date(e)>new Date(i))return[`${D(e)} is greater than max date of  ${D(i)}`]}}function _(e,t=""){let n="",i="",l="",u="",d=!1;const _="year_"+e.id,g="month_"+e.id,x="day_"+e.id,w="age_estimate_"+e.id,V="duration_estimate_"+e.id,k=m(_,e.helpText,e.estimation.allowUnknown),S=h(g,e.helpText),O=f(x,e.helpText),E=v(w,e.helpText),F=b(V,e.helpText),L="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,$=t=>!(t[_]&&t[_].value&&["Unknown"].includes(t[_].value))&&(!e.condition||e.condition(t)),R=(e,t)=>{const n=[{type:"year",value:i,default:"YYYY"},{type:"month",value:l,default:"MM"},{type:"day",value:u,default:"DD"}];return n.reduce((n,a)=>{const i=[null,void 0,"Unknown",""];return t===a.type?i.includes(e)?n.push(a.default):n.push(e):i.includes(a.value)?n.push(a.default):n.push(a.value),n},[]).join("-")};"function"===typeof e.init&&(k.init=e.init),k.updateHelpTextOnValue=e=>`${k.helpText} (${R(null===e||void 0===e?void 0:e.label,"year")})`,k.proxyID=e.id,k.unload=e=>i=e.value.toString(),k.config={...k.config,...e.config},k.defaultValue=t=>T(t,e,"Year"),k.condition=t=>!e.condition||e.condition(t),k.validation=(t,n,a)=>{if(e.required&&s["a"].required(t))return["Year cannot be empty"];const i=t?t.value:"";if(!e.estimation.allowUnknown&&i.toString().match(/unknown/i))return["Value unknown is not permitted"];if(i&&!["Unknown"].includes(i)&&isNaN(i)||i<1900)return["Invalid Year"];if(i&&"function"===typeof e.minDate){const t=r["b"].getYear(e.minDate(n,a));if(parseInt(i)<t)return[`Year of ${i} is less than Minimum year of ${t}`]}if(i&&"function"===typeof e.maxDate){const t=e.maxDate(n,a);if(t&&i>r["b"].getYear(t))return[`Year of ${i} exceeds Maximum year of ${r["b"].getYear(t)}`]}return null},k.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:n?D(n):"Unknown"}),k.appearInSummary=(t,n)=>n===e.id,k.computedValue=t=>{if(n){const[a,i,o]=n.split("-");return n=`${t.value}-${i}-${o}`,e.computeValue(n,!1)}if(t&&"Unknown"===t.value)return n="",e.computeValue("Unknown",!1)},S.updateHelpTextOnValue=e=>`${S.helpText} (${R(null===e||void 0===e?void 0:e.label,"month")})`,S.proxyID=e.id,S.unload=e=>l=y(e.value.toString()),S.condition=e=>$(e),S.validation=e=>s["a"].required(e),S.defaultValue=t=>T(t,e,"Month"),L&&(S.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),S.computedValue=(t,a)=>{if((""+t.value).match(/unknown/i))return n=a[_].value+"-07-15",e.computeValue(n,!0);if(n){const[a,i,o]=n.split("-"),r=y(""+t.value);return n=`${a}-${r}-${o}`,e.computeValue(n,!1)}},O.proxyID=e.id,O.updateHelpTextOnValue=e=>`${O.helpText} (${R(null===e||void 0===e?void 0:e.label,"day")})`,O.condition=e=>!(""+e[g].value).match(/unknown/i)&&$(e),O.validation=(t,a,o)=>s["a"].required(t)?["Day is required for date"]:(d=!!(""+t.value).match(/unknown/i),u=d?"15":y(""+t.value),n=`${i}-${l}-${u}`,I(n,e,a,o)),O.defaultValue=t=>T(t,e,"Day"),O.computedValue=()=>e.computeValue(n,d),O.unload=(t,n,a,i)=>{e.unload&&e.unload(t,n,a,i)},O.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),O.config={year:e=>e[_].value,month:e=>e[g].value},L||(O.config.keyboardActions=[]);const j=(t,n)=>{const a=["Unknown"===t[_].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===n];return a.every(Boolean)};return E.proxyID=e.id,E.validation=(t,a,i)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const r=c()(p["e"].getSessionDate()).subtract(t.value,"years").year();return n=r+"-07-15",I(n,e,a,i)},E.condition=e=>j(e,a.AGE_ESTIMATE_FIELD),E.computedValue=()=>e.computeValue(n,!0),E.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),F.proxyID=e.id,F.validation=(t,a,i)=>s["a"].required(t)?["Please select an estimate"]:(n=c()(p["e"].getSessionDate()).subtract(t.value,"day").format(r["a"]),I(n,e,a,i)),F.condition=e=>j(e,a.MONTH_ESTIMATE_FIELD),F.computedValue=()=>e.computeValue(n,!0),F.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),[k,S,O,E,F]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(a||(a={}))}}]);
//# sourceMappingURL=chunk-021b8aa8.46dc5c4e.js.map