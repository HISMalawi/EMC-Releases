(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-497f820a"],{"0ce8":function(e,t,o){"use strict";o("54e2")},"0db2":function(e,t,o){"use strict";var a=o("7a23");const l={key:0,class:"ion-float-right ion-margin-end checkbox-label"},n={key:0,style:{background:"#f2f2f2",height:"100%",padding:".5rem","flex-grow":"1"}},c={style:{background:"#ffffff",height:"100%",padding:".5rem","flex-grow":"8"}},i={key:1,style:{background:"#f2f2f2",height:"100%",padding:".5rem","flex-grow":"1"}};function r(e,t,o,r,u,d){const s=Object(a["resolveComponent"])("ion-checkbox"),b=Object(a["resolveComponent"])("ion-label"),m=Object(a["resolveComponent"])("ion-input"),p=Object(a["resolveComponent"])("ion-note");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[e.model.label?(Object(a["openBlock"])(),Object(a["createBlock"])(b,{key:0,class:"ion-padding-bottom bold"},{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("span",null,Object(a["toDisplayString"])(e.model.label),1),e.allowUnknown?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",l,[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.model.label)+" Unknown? ",1),Object(a["createVNode"])(s,{modelValue:e.isUnknown,"onUpdate:modelValue":t[0]||(t[0]=t=>e.isUnknown=t)},null,8,["modelValue"])])):Object(a["createCommentVNode"])("",!0)]),_:1})):Object(a["createCommentVNode"])("",!0),Object(a["createElementVNode"])("div",{class:Object(a["normalizeClass"])(["ion-margin-top",e.model.error?"box-input-error":"box-input"]),style:{width:"100%",height:"2.5rem",display:"flex","justify-content":"space-between"}},[e.prefix?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",n,[Object(a["createVNode"])(b,{class:"checkbox-label bold"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.prefix),1)]),_:1})])):Object(a["createCommentVNode"])("",!0),Object(a["createElementVNode"])("div",c,[Object(a["createVNode"])(m,{class:"ion-no-margin ion-no-padding",modelValue:e.model.value,"onUpdate:modelValue":t[1]||(t[1]=t=>e.model.value=t),type:e.password?"password":"text",placeholder:e.model.placeholder,disabled:e.model.disabled||e.isUnknown,onIonFocus:t[2]||(t[2]=t=>e.model.error=""),onIonBlur:e.validate},null,8,["modelValue","type","placeholder","disabled","onIonBlur"])]),e.suffix?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",i,[Object(a["createVNode"])(b,{class:"checkbox-label bold ion-float-right"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.suffix),1)]),_:1})])):Object(a["createCommentVNode"])("",!0)],2),e.model.error?(Object(a["openBlock"])(),Object(a["createBlock"])(p,{key:1,color:"danger"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.model.error),1)]),_:1})):Object(a["createCommentVNode"])("",!0)],64)}var u=o("d867"),d=Object(a["defineComponent"])({name:"TextInput",props:{modelValue:{type:Object,default:()=>({})},allowUnknown:{type:Boolean,default:!1},form:{type:Object,default:()=>({})},prefix:{type:String,default:""},suffix:{type:String,default:""},password:{type:Boolean,default:!1}},components:{IonLabel:u["IonLabel"],IonInput:u["IonInput"],IonNote:u["IonNote"],IonCheckbox:u["IonCheckbox"]},emits:["update:modelValue"],setup(e,{emit:t}){const o=Object(a["ref"])(!1),l=Object(a["computed"])({get:()=>e.modelValue,set:e=>t("update:modelValue",e)}),n=async()=>{if(l.value.required&&!l.value.value)return l.value.error="This field is required";if(!e.allowUnknown&&"Unknown"===l.value.value||"N/A"===l.value.value)return l.value.error="Unknown is not allowed";if(l.value.validation){const t=await l.value.validation({label:l.value.value,value:l.value.value},e.form);if(t&&t.length)return l.value.error+=t.toString()}return l.value.error=""};return Object(a["watch"])(o,e=>{e?(l.value.value="Unknown",l.value.error="",l.value.disabled=!0):(l.value.value="",l.value.disabled=!1)}),Object(a["watch"])(e.modelValue,e=>{"Unknown"===e.value?o.value||(o.value=!0):o.value=!1}),Object(a["onMounted"])(()=>{"Unknown"!==l.value.value||o.value||(o.value=!0)}),{validate:n,model:l,isUnknown:o}}}),s=o("d959"),b=o.n(s);const m=b()(d,[["render",r]]);t["a"]=m},"27dd":function(e,t,o){"use strict";o.r(t);var a=o("7a23");function l(e,t,o,l,n,c){const i=Object(a["resolveComponent"])("ion-title"),r=Object(a["resolveComponent"])("SelectInput"),u=Object(a["resolveComponent"])("ion-col"),d=Object(a["resolveComponent"])("yes-no-input"),s=Object(a["resolveComponent"])("DateInput"),b=Object(a["resolveComponent"])("text-input"),m=Object(a["resolveComponent"])("ion-button"),p=Object(a["resolveComponent"])("ion-row");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createVNode"])(i,{class:"ion-text-center ion-margin-vertical ion-padding-bottom bold"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(" Staging ")]),_:1}),Object(a["createVNode"])(p,{class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(r,{modelValue:e.form.reasonsForEligibity,"onUpdate:modelValue":t[0]||(t[0]=t=>e.form.reasonsForEligibity=t),options:e.reasonsForArt},null,8,["modelValue","options"])]),_:1}),Object(a["createVNode"])(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(r,{modelValue:e.form.whoStage,"onUpdate:modelValue":t[1]||(t[1]=t=>e.form.whoStage=t),options:e.whoStages},null,8,["modelValue","options"])]),_:1}),Object(a["createVNode"])(u,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(d,{modelValue:e.form.cd4countAvailable,"onUpdate:modelValue":t[2]||(t[2]=t=>e.form.cd4countAvailable=t),inline:""},null,8,["modelValue"])]),_:1}),"Yes"===e.form.cd4countAvailable.value?(Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],{key:0},[Object(a["createVNode"])(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{modelValue:e.form.cd4CountDate,"onUpdate:modelValue":t[3]||(t[3]=t=>e.form.cd4CountDate=t),"min-date":e.patientDob,"max-date":e.today},null,8,["modelValue","min-date","max-date"])]),_:1}),Object(a["createVNode"])(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(b,{modelValue:e.form.cd4Count,"onUpdate:modelValue":t[4]||(t[4]=t=>e.form.cd4Count=t)},null,8,["modelValue"])]),_:1}),Object(a["createVNode"])(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(r,{modelValue:e.form.cd4CountLocation,"onUpdate:modelValue":t[5]||(t[5]=t=>e.form.cd4CountLocation=t),asyncOptions:e.getFacilities,allowCustom:""},null,8,["modelValue","asyncOptions"])]),_:1})],64)):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(r,{modelValue:e.form.whoConditions,"onUpdate:modelValue":t[6]||(t[6]=t=>e.form.whoConditions=t),options:e.stagingCoditions,multiple:""},null,8,["modelValue","options"])]),_:1}),Object(a["createVNode"])(u,{size:"12",class:"ion-margin-top"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(m,{class:"ion-margin-top ion-float-right",size:"large",onClick:e.onSubmit,color:"success"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("Finish")]),_:1},8,["onClick"]),Object(a["createVNode"])(m,{class:"ion-margin-top ion-float-right",size:"large",color:"warning",onClick:e.onClear},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("Clear")]),_:1},8,["onClick"]),Object(a["createVNode"])(m,{class:"ion-margin-top ion-float-right",size:"large",onClick:t[7]||(t[7]=t=>e.$emit("onPrevious")),color:"primary"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])("Previous")]),_:1})]),_:1})]),_:1})],64)}var n=o("d867"),c=o("b5e4"),i=o("9283"),r=o("0db2"),u=o("5ab5"),d=o("6b6c"),s=o("be95"),b=o("e86e"),m=o("5a0c"),p=o.n(m),v=o("2706"),O=o("5e76"),j=o("85d6"),f=o("0ba8"),h=o("b5b2"),g=Object(a["defineComponent"])({components:{IonRow:n["IonRow"],IonCol:n["IonCol"],IonButton:n["IonButton"],IonTitle:n["IonTitle"],TextInput:r["a"],DateInput:u["a"],YesNoInput:d["a"],SelectInput:s["a"]},props:{patient:{type:Object,required:!0},isNewPatient:{type:Boolean,default:!0},observations:{type:Object,default:()=>({})},initialVisitDate:{type:String,default:""}},emits:["onValue","onPrevious","onFinish"],setup(e,{emit:t}){const o=Object(a["ref"])([]),l=Object(a["ref"])([]),n=p()().format(i["b"]),r=Object(a["computed"])(()=>{const t=e.patient.getBirthdate();return t?p()(t).format(i["b"]):""}),u=new j["a"](e.patient.getID(),e.patient.getAge(),-1),d=Object(a["computed"])(()=>u.getAllReasonsForART(e.initialVisitDate).map(e=>({label:e.name,value:e.name}))),s=u.getAllWhoStages().map(e=>({label:e.name,value:e.name})),m=Object(a["reactive"])({reasonsForEligibity:{value:e.observations["Reason for ART eligibility"]||"",label:"Reason for Starting",placeholder:"Select Reason for Starting",required:!0,computedValue:e=>({obs:u.buildReasonForArtObs("string"===typeof e?e:e.label)})},whoStage:{value:e.observations["Who stage"]||"",label:"Select Stage",placeholder:"Select Stage",required:!0,computedValue:e=>({obs:u.buildWhoStageObs("string"===typeof e?e:e.label)})},cd4countAvailable:{value:e.observations["CD4 count"]?"Yes":"No",label:"Recent CD4 Count results available?",required:!0},cd4CountDate:{value:e.observations["Cd4 count datetime"]||"",label:"CD4 Count date",placeholder:"CD4 Count date",computedValue:e=>({obs:j["a"].buildValueDate("Cd4 count datetime",e)}),validation:async(e,t)=>{var o;return"Yes"===(null===(o=t.cd4countAvailable)||void 0===o?void 0:o.value)&&v["a"].required(e)}},cd4Count:{value:e.observations["CD4 count"]||"",label:"CD4 Count",placeholder:"CD4 Count e.g. <100 or >500",computedValue:e=>{const t=parseInt(e.substring(1)),o=e.substring(0,1);return{modifier:o,count:t,obs:j["a"].buildValueNumber("CD4 count",t,o)}},validation:async(e,t)=>{var o;return"Yes"===(null===(o=t.cd4countAvailable)||void 0===o?void 0:o.value)&&v["a"].validateSeries([()=>v["a"].required(e),()=>u.cd4CountIsValid(e.value.toString())?null:["Please start with a modifier. e.g. >, <, or ="]])}},cd4CountLocation:{value:e.observations["Cd4 count location"]||"",label:"CD4 Count location",computedValue:e=>({obs:j["a"].buildValueText("Cd4 count location","string"===typeof e?e:e.label)}),validation:async(e,t)=>{var o;return"Yes"===(null===(o=t.cd4countAvailable)||void 0===o?void 0:o.value)&&v["a"].required(e)}},whoConditions:{value:e.observations["Who stages criteria present"]?[{label:e.observations["Who stages criteria present"],value:e.observations["Who stages criteria present"]}]:"",required:!0,label:"Select Staging Conditions",computedValue:e=>({obs:"string"===typeof e?u.buildWhoCriteriaObs(e):e.map(e=>u.buildWhoCriteriaObs(e.label))})}}),g=async()=>{if(await Object(c["a"])("Are you sure you want to clear all fields?")){for(const e in m)m[e].value=void 0,m[e].error="";m.whoConditions.value=[],f["b"].emit(h["a"].ON_CLEAR)}},C=async()=>{await Object(O["e"])(m,async(e,o)=>{t("onValue",{type:"staging",data:{formData:e,computedData:o}}),t("onFinish")})},V=e=>{let t=1;e&&(m.whoConditions.value=[]),null!==e&&void 0!==e&&e.match(/2|stage ii/i)&&(t=2),null!==e&&void 0!==e&&e.match(/3|stage iii/i)&&(t=3),null!==e&&void 0!==e&&e.match(/4|stage iv/i)&&(t=4),o.value=u.getStagingConditions(t).map(e=>({label:e.name,value:e.name,other:e})).sort((e,t)=>e.label.localeCompare(t.label))};return Object(a["watch"])(()=>m.whoStage.value,e=>V(null===e||void 0===e?void 0:e.label)),Object(a["onMounted"])(()=>V()),{today:n,patientDob:r,form:m,whoStages:s,stagingCoditions:o,selectedConditions:l,reasonsForArt:d,getFacilities:b["b"],onClear:g,onSubmit:C}}}),C=(o("0ce8"),o("d959")),V=o.n(C);const y=V()(g,[["render",l],["__scopeId","data-v-40327912"]]);t["default"]=y},"4cb7":function(e,t,o){},"54e2":function(e,t,o){},"5ab5":function(e,t,o){"use strict";var a=o("7a23");const l={key:0},n={key:1},c={key:2,class:"ion-float-right ion-margin-end checkbox-label"},i={key:2,style:{display:"flex","justify-content":"flex-start"}},r={class:"ion-margin-top ion-padding-end"},u=["disabled"],d=Object(a["createElementVNode"])("option",{value:0,disabled:"",selected:"",hidden:""},"MM",-1),s=["value"];function b(e,t,o,b,m,p){const v=Object(a["resolveComponent"])("ion-checkbox"),O=Object(a["resolveComponent"])("ion-label"),j=Object(a["resolveComponent"])("ion-input"),f=Object(a["resolveComponent"])("ion-icon"),h=Object(a["resolveComponent"])("ion-button"),g=Object(a["resolveComponent"])("DatePicker"),C=Object(a["resolveComponent"])("ion-note");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[e.model.label?(Object(a["openBlock"])(),Object(a["createBlock"])(O,{key:0,class:"ion-padding-bottom bold"},{default:Object(a["withCtx"])(()=>[e.isEstimated?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",l,Object(a["toDisplayString"])(e.estimationLabel),1)):(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",n,Object(a["toDisplayString"])(e.model.label),1)),e.allowEstimation?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",c,[Object(a["createTextVNode"])(" Estimate "+Object(a["toDisplayString"])(e.model.label)+" ",1),Object(a["createVNode"])(v,{modelValue:e.isEstimated,"onUpdate:modelValue":t[0]||(t[0]=t=>e.isEstimated=t)},null,8,["modelValue"])])):Object(a["createCommentVNode"])("",!0)]),_:1})):Object(a["createCommentVNode"])("",!0),e.isEstimated?(Object(a["openBlock"])(),Object(a["createBlock"])(j,{key:1,type:"number",class:Object(a["normalizeClass"])(["ion-margin-top",e.model.error?"box-input-error":"box-input"]),modelValue:e.age,"onUpdate:modelValue":t[1]||(t[1]=t=>e.age=t),placeholder:e.estimationLabel,disabled:e.model.disabled,min:1,onIonInput:e.onEstimate,onIonFocus:t[2]||(t[2]=()=>e.model.error=""),onIonBlur:e.validate},null,8,["class","modelValue","placeholder","disabled","onIonInput","onIonBlur"])):(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",i,[Object(a["createElementVNode"])("div",r,[Object(a["createVNode"])(g,{mode:"date",modelValue:e.pickerDate,"onUpdate:modelValue":t[3]||(t[3]=t=>e.pickerDate=t),"min-date":e.minDate,"max-date":e.maxDate,masks:{input:"YYYY-MM-DD"}},{default:Object(a["withCtx"])(({showPopover:t})=>[Object(a["createVNode"])(h,{onClick:t},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(f,{icon:e.calendar},null,8,["icon"])]),_:2},1032,["onClick"])]),_:1},8,["modelValue","min-date","max-date"])]),Object(a["createVNode"])(j,{modelValue:e.day,"onUpdate:modelValue":t[4]||(t[4]=t=>e.day=t),min:1,max:31,class:Object(a["normalizeClass"])(["ion-margin-top",e.model.error?"box-input-error":"box-input"]),style:{width:"30%"},type:"number",placeholder:"DD",disabled:e.model.disabled,onIonFocus:t[5]||(t[5]=()=>e.model.error=""),onIonBlur:e.validate},null,8,["modelValue","class","disabled","onIonBlur"]),Object(a["withDirectives"])(Object(a["createElementVNode"])("select",{"onUpdate:modelValue":t[6]||(t[6]=t=>e.month=t),class:Object(a["normalizeClass"])(["ion-margin-top ion-margin-horizontal",e.model.error?"box-input-error":"box-input"]),style:Object(a["normalizeStyle"])([{"background-color":"#fff",width:"30%"},e.month?{color:"#000"}:{color:"#a0a0a0"}]),disabled:e.model.disabled,onFocus:t[7]||(t[7]=()=>e.model.error=""),onBlur:t[8]||(t[8]=(...t)=>e.validate&&e.validate(...t))},[d,(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.months,(e,t)=>(Object(a["openBlock"])(),Object(a["createElementBlock"])("option",{value:t+1,key:t},Object(a["toDisplayString"])(e),9,s))),128))],46,u),[[a["vModelSelect"],e.month]]),Object(a["createVNode"])(j,{modelValue:e.year,"onUpdate:modelValue":t[9]||(t[9]=t=>e.year=t),min:1900,class:Object(a["normalizeClass"])(["ion-margin-top",e.model.error?"box-input-error":"box-input"]),type:"number",placeholder:"YYYY",disabled:e.model.disabled,onIonFocus:t[10]||(t[10]=()=>e.model.error=""),onIonBlur:e.validate},null,8,["modelValue","class","disabled","onIonBlur"])])),e.model.error?(Object(a["openBlock"])(),Object(a["createBlock"])(C,{key:3,color:"danger"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.model.error),1)]),_:1})):Object(a["createCommentVNode"])("",!0)],64)}var m=o("d867"),p=o("9283"),v=o("5a0c"),O=o.n(v),j=o("2706"),f=o("0ba8"),h=o("b5b2"),g=o("ff79"),C=o("0261"),V=Object(a["defineComponent"])({name:"DateInput",props:{modelValue:{type:Object,default:()=>({})},form:{type:Object,default:()=>({})},minDate:{type:String,default:""},maxDate:{type:String,default:""},allowEstimation:{type:Boolean,default:!1},estimationLabel:{type:String,default:"Estimate"}},components:{IonLabel:m["IonLabel"],IonInput:m["IonInput"],IonNote:m["IonNote"],IonCheckbox:m["IonCheckbox"],DatePicker:C["b"]},emits:["update:modelValue","isEstimated"],setup(e,{emit:t}){const o=Object(a["ref"])(!1),l=Object(a["ref"])(),n=Object(a["ref"])(e.modelValue.value?O()(e.modelValue.value).date():void 0),c=Object(a["ref"])(e.modelValue.value?O()(e.modelValue.value).month()+1:0),i=Object(a["ref"])(e.modelValue.value?O()(e.modelValue.value).year():void 0),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],u=Object(a["ref"])(e.modelValue.value),d=Object(a["computed"])({get:()=>e.modelValue,set:e=>t("update:modelValue",e)}),s=e=>{var t;d.value.error=null===(t=j["a"].isNumber({value:e.target.value}))||void 0===t?void 0:t.join(),d.value.error||(l.value=parseInt(e.target.value))},b=async()=>{let t="";if(o.value&&l.value)t=p["c"].toStandardHisFormat(p["c"].estimateDateFromAge(l.value));else if(n.value||c.value||i.value){const e=`${i.value}-${c.value}-${n.value}`;if(!e.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/))return d.value.error="Invalid date";t=p["c"].toStandardHisFormat(e)}if(d.value.required&&!t)return d.value.error="This field is required";if(e.minDate&&new Date(t)<new Date(e.minDate))return d.value.error=o.value?`Estimated period must be less than or equal to ${O()(t).diff(e.minDate,"years")} years`:"Date must be after "+e.minDate;if(e.maxDate&&new Date(t)>new Date(e.maxDate))return d.value.error=o.value?`Estimated period must be more than or equal to ${O()(t).diff(e.maxDate,"years")} years`:"Date must be before "+e.maxDate;if(d.value.validation){const o=await d.value.validation({label:t,value:t},e.form);if(o&&o.length)return d.value.error+=o.toString()}d.value.error="",d.value.value=t};Object(a["watch"])(u,e=>{n.value=O()(e).date(),c.value=O()(e).month()+1,i.value=O()(e).year(),b()});const m=()=>{l.value=void 0,n.value=void 0,c.value=0,i.value=void 0,d.value.error="",u.value=""};return Object(a["watch"])(()=>e.modelValue.value,e=>{n.value=e?O()(e).date():void 0,c.value=e?O()(e).month()+1:0,i.value=e?O()(e).year():void 0,u.value=e}),Object(a["watch"])([()=>e.minDate,()=>e.maxDate],()=>b()),Object(a["watch"])(o,e=>{m(),t("isEstimated",e)}),Object(a["onMounted"])(()=>f["b"].on(h["a"].ON_CLEAR,m)),{validate:b,onEstimate:s,pickerDate:u,isEstimated:o,model:d,age:l,day:n,month:c,year:i,months:r,calendar:g["calendar"]}}}),y=(o("a69e"),o("d959")),k=o.n(y);const w=k()(V,[["render",b]]);t["a"]=w},6664:function(e,t,o){},"6b6c":function(e,t,o){"use strict";var a=o("7a23");const l={key:0},n={key:1},c=Object(a["createElementVNode"])("span",{class:"ion-margin-start"},"Yes",-1),i=Object(a["createElementVNode"])("span",{class:"ion-margin-start"},"No",-1),r=Object(a["createElementVNode"])("br",null,null,-1);function u(e,t,o,u,d,s){const b=Object(a["resolveComponent"])("ion-label"),m=Object(a["resolveComponent"])("ion-radio"),p=Object(a["resolveComponent"])("ion-radio-group"),v=Object(a["resolveComponent"])("ion-note"),O=Object(a["resolveComponent"])("ion-col"),j=Object(a["resolveComponent"])("ion-row"),f=Object(a["resolveComponent"])("ion-grid");return Object(a["openBlock"])(),Object(a["createBlock"])(f,{class:"ion-no-margin ion-no-padding"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(j,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(O,{size:12},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(b,{class:"ion-margin-end"},{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("b",null,Object(a["toDisplayString"])(e.model.label)+":",1)]),_:1}),e.inline?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createElementBlock"])("br",l)),e.inline?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createElementBlock"])("br",n)),Object(a["createVNode"])(p,{modelValue:e.model.value,"onUpdate:modelValue":t[0]||(t[0]=t=>e.model.value=t),onIonChange:t[1]||(t[1]=()=>e.model.error="")},{default:Object(a["withCtx"])(()=>[c,Object(a["createVNode"])(m,{class:"ion-margin-start",slot:"start",color:"primary",value:"Yes",disabled:e.disabled},null,8,["disabled"]),i,Object(a["createVNode"])(m,{class:"ion-margin-start",slot:"start",color:"primary",value:"No",disabled:e.disabled},null,8,["disabled"])]),_:1},8,["modelValue"]),r,e.model.error?(Object(a["openBlock"])(),Object(a["createBlock"])(v,{key:2,color:"danger"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.model.error),1)]),_:1})):Object(a["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})}var d=o("d867"),s=Object(a["defineComponent"])({name:"YesNoInput",props:{modelValue:{type:Object,default:()=>({})},inline:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},components:{IonRadioGroup:d["IonRadioGroup"],IonRadio:d["IonRadio"],IonGrid:d["IonGrid"],IonRow:d["IonRow"],IonCol:d["IonCol"],IonLabel:d["IonLabel"]},emits:["update:modelValue"],setup(e,{emit:t}){const o=Object(a["computed"])({get:()=>e.modelValue,set:e=>t("update:modelValue",e)});return{model:o}}}),b=o("d959"),m=o.n(b);const p=m()(s,[["render",u]]);t["a"]=p},"93c6":function(e,t,o){"use strict";o("6664")},a69e:function(e,t,o){"use strict";o("4cb7")},be95:function(e,t,o){"use strict";var a=o("7a23");const l={key:0,class:"ion-float-right ion-margin-end checkbox-label"},n={class:"inner-input-box"},c={key:0,class:"input-options"},i={class:"input-icon"};function r(e,t,o,r,u,d){const s=Object(a["resolveComponent"])("ion-checkbox"),b=Object(a["resolveComponent"])("ion-label"),m=Object(a["resolveComponent"])("ion-input"),p=Object(a["resolveComponent"])("ion-icon"),v=Object(a["resolveComponent"])("ion-chip"),O=Object(a["resolveComponent"])("ion-item"),j=Object(a["resolveComponent"])("ion-list"),f=Object(a["resolveComponent"])("ion-note");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[e.model.label?(Object(a["openBlock"])(),Object(a["createBlock"])(b,{key:0,class:"ion-padding-bottom bold"},{default:Object(a["withCtx"])(()=>[Object(a["createElementVNode"])("span",null,Object(a["toDisplayString"])(e.model.label),1),e.allowCustom?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",l,[Object(a["createTextVNode"])(" Add Custom "+Object(a["toDisplayString"])(e.model.label)+"? ",1),Object(a["createVNode"])(s,{modelValue:e.isCustom,"onUpdate:modelValue":t[0]||(t[0]=t=>e.isCustom=t),onIonChange:t[1]||(t[1]=t=>e.model.value="")},null,8,["modelValue"])])):Object(a["createCommentVNode"])("",!0)]),_:1})):Object(a["createCommentVNode"])("",!0),e.isCustom?(Object(a["openBlock"])(),Object(a["createBlock"])(m,{key:1,class:Object(a["normalizeClass"])(["box-input",{"box-input-error":e.model.error,"ion-margin-top":e.model.label}]),modelValue:e.customOption,"onUpdate:modelValue":t[2]||(t[2]=t=>e.customOption=t),placeholder:e.model.placeholder||e.model.label,disabled:e.model.disabled,onIonFocus:t[3]||(t[3]=()=>e.model.error=""),onIonBlur:e.validate,onIonInput:e.onCustomValue},null,8,["class","modelValue","placeholder","disabled","onIonBlur","onIonInput"])):(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{key:2,class:Object(a["normalizeClass"])(["outer-input-box box-input",{"box-input-error":e.model.error,"ion-margin-top":e.model.label}])},[Object(a["createElementVNode"])("div",n,[Object(a["createElementVNode"])("div",{style:{display:"flex","flex-wrap":"wrap",width:"100%"},onClick:t[6]||(t[6]=(...t)=>e.onShowOptions&&e.onShowOptions(...t))},[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.tags,(t,o)=>(Object(a["openBlock"])(),Object(a["createBlock"])(v,{key:o},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(b,null,{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(t.label),1)]),_:2},1024),Object(a["createVNode"])(p,{icon:e.closeCircle,color:"danger",onClick:o=>e.diselect(t),style:{"z-index":"20"}},null,8,["icon","onClick"])]),_:2},1024))),128)),Object(a["createVNode"])(m,{disabled:e.model.disabled,placeholder:e.showPlaceholder?e.model.placeholder||"select option":"",modelValue:e.filter,"onUpdate:modelValue":t[4]||(t[4]=t=>e.filter=t),class:"search-input",ref:"searchInput",onKeydown:t[5]||(t[5]=t=>e.handleKeyDown(t))},null,8,["disabled","placeholder","modelValue"])]),e.showOptions?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",c,[Object(a["createVNode"])(j,null,{default:Object(a["withCtx"])(()=>[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.filteredOptions,(t,o)=>{var l;return Object(a["openBlock"])(),Object(a["createBlock"])(O,{key:o,lines:o+1===e.filteredOptions.length?"none":"",color:t.value===(null===(l=e.focusedOption)||void 0===l?void 0:l.value)?"light":"",onClick:o=>e.onSelect(t)},{default:Object(a["withCtx"])(()=>[e.multiple?(Object(a["openBlock"])(),Object(a["createBlock"])(s,{key:0,class:"input-option-checkbox",slot:"start",modelValue:t.isChecked,"onUpdate:modelValue":e=>t.isChecked=e},null,8,["modelValue","onUpdate:modelValue"])):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])(b,null,{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1032,["lines","color","onClick"])}),128))]),_:1})])):Object(a["createCommentVNode"])("",!0),Object(a["createElementVNode"])("div",i,[e.filter||e.tags.length>0?(Object(a["openBlock"])(),Object(a["createBlock"])(p,{key:0,icon:e.close,onClick:e.onReset},null,8,["icon","onClick"])):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])(p,{icon:e.showOptions?e.chevronUp:e.chevronDown,onClick:t[7]||(t[7]=t=>e.showOptions?e.onCloseOptions():e.onShowOptions())},null,8,["icon"])])])],2)),e.model.error?(Object(a["openBlock"])(),Object(a["createBlock"])(f,{key:3,color:"danger"},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.model.error),1)]),_:1})):Object(a["createCommentVNode"])("",!0)],64)}o("14d9");var u=o("d867"),d=o("ff79"),s=o("2ef0"),b=Object(a["defineComponent"])({name:"SelectInput",props:{modelValue:{type:Object,default:()=>({})},form:{type:Object,default:()=>({})},options:{type:Array,default:()=>[]},asyncOptions:{type:Function,required:!1},allowCustom:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},infiniteScrolling:{type:Boolean,default:!1}},components:{IonLabel:u["IonLabel"],IonInput:u["IonInput"],IonNote:u["IonNote"],IonIcon:u["IonIcon"],IonCheckbox:u["IonCheckbox"],IonList:u["IonList"],IonChip:u["IonChip"],IonItem:u["IonItem"]},emits:["update:modelValue"],setup(e,{emit:t}){const o=Object(a["ref"])(!1),l=Object(a["ref"])(""),n=Object(a["ref"])(),c=Object(a["ref"])(!1),i=Object(a["ref"])(),r=Object(a["ref"])(""),u=Object(a["ref"])([]),b=Object(a["ref"])(1),m=Object(a["computed"])(()=>e.multiple?u.value.filter(({isChecked:e})=>e):n.value?[n.value]:[]),p=Object(a["computed"])(()=>!r.value&&Object(s["isEmpty"])(m.value)&&!c.value),v=Object(a["computed"])({get:()=>e.modelValue,set:e=>t("update:modelValue",e)}),O=()=>{r.value="",n.value=void 0,u.value.forEach(e=>e.isChecked=!1)},j=()=>{if(n.value=void 0,Object(s["isEmpty"])(v.value.value))return O();if(Array.isArray(v.value.value)&&e.multiple)return v.value.value.forEach(e=>{const t=u.value.findIndex(({value:t})=>t===e.value);-1===t?u.value.push({...e,isChecked:!0}):u.value[t].isChecked=!0});const t=u.value.find(e=>e.value===v.value.value);n.value=t||{label:v.value.value,value:v.value.value}},f=async()=>{const t="function"===typeof e.asyncOptions?await e.asyncOptions(r.value):e.options.filter(({label:e})=>e.toLowerCase().includes(r.value.toLowerCase()));m.value.forEach(e=>{const o=t.findIndex(t=>t.value===e.value);-1===o?t.push(e):t[o].isChecked=!0}),u.value=t},h=async()=>{if(v.value.required&&Object(s["isEmpty"])(v.value.value))return v.value.error="This field is required";if(v.value.validation){const t=await v.value.validation({label:v.value.value,value:v.value.value},e.form);if(t&&t.length)return v.value.error+=t.toString()}return v.value.error=""},g=()=>{c.value=!1,v.value.value=e.multiple?m.value:Object(s["isEmpty"])(m.value)?void 0:m.value[0],r.value="",h()},C=()=>{v.value.disabled||(c.value=!0,v.value.error="")},V=()=>{v.value.value={label:l.value,value:l.value}},y=t=>{e.multiple||(n.value=t,g()),v.value.value=e.multiple?m.value:Object(s["isEmpty"])(m.value)?void 0:m.value[0],r.value=""},k=t=>e.multiple?t.isChecked=!1:n.value=void 0,w=e=>{e.preventDefault();const t=u.value.indexOf(i.value)+1;i.value=u.value[t]||u.value[0]},x=e=>{e.preventDefault();const t=u.value.indexOf(i.value)-1;i.value=u.value[t]||u.value[u.value.length-1]},N=e=>{switch(c.value||(c.value=!0),e.key){case"ArrowDown":w(e);break;case"ArrowUp":x(e);break;case" ":case"Enter":y(i.value);break;case"Escape":g();break}};return Object(a["watch"])(r,async()=>{b.value++,await f()}),Object(a["watch"])([()=>e.options,()=>e.asyncOptions],async()=>f()),Object(a["watch"])(()=>e.modelValue.value,e=>Object(s["isEmpty"])(e)&&j(),{deep:!0,immediate:!0}),Object(a["watch"])(c,e=>e&&(i.value=n.value||u.value[0])),Object(a["onMounted"])(async()=>{await f(),j(),addEventListener("click",e=>{const t=e.target.closest(".inner-input-box");!t&&c.value&&g()})}),Object(a["onBeforeUnmount"])(()=>removeEventListener("click",e=>console.log(e))),{validate:h,onSelect:y,onReset:O,onShowOptions:C,onCloseOptions:g,diselect:k,onCustomValue:V,handleKeyDown:N,model:v,customOption:l,isCustom:o,chevronDown:d["chevronDown"],chevronUp:d["chevronUp"],close:d["close"],closeCircle:d["closeCircle"],selectedOption:n,showOptions:c,focusedOption:i,showPlaceholder:p,filteredOptions:u,filter:r,tags:m}}}),m=(o("93c6"),o("d959")),p=o.n(m);const v=p()(b,[["render",r],["__scopeId","data-v-6a10da64"]]);t["a"]=v},e86e:function(e,t,o){"use strict";o.d(t,"b",(function(){return n})),o.d(t,"d",(function(){return c})),o.d(t,"c",(function(){return i})),o.d(t,"g",(function(){return r})),o.d(t,"f",(function(){return u})),o.d(t,"a",(function(){return d})),o.d(t,"h",(function(){return s})),o.d(t,"i",(function(){return b})),o.d(t,"j",(function(){return m})),o.d(t,"e",(function(){return p}));var a=o("5713"),l=o("2ef0");async function n(e=""){const t=await a["a"].getFacilities({name:e});return t.filter(e=>!Object(l["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function c(e=""){const t=await a["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function i(e=""){const t=await a["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function r(){const e=await a["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function u(){const e=await a["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function d(e){const t=await a["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function s(e,t=""){const o=await a["a"].getTraditionalAuthorities(e,t);return o.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function b(e,t=""){const o=await a["a"].getVillages(e,t);return o.map(e=>({label:e.name,value:e.village_id,other:e}))}async function m(e="a",t=1){const o=await a["a"].getVillagesByName(e,t);return o.map(e=>({label:e.name,value:e.village_id,other:e}))}function p(){const e=["Catholic Church","CCAP","Seventh Day","Mosque","Primary School","Borehole","Secondary School","College","Market","Football Ground","Other"];return e.map(e=>({label:e,value:e,other:{code:e}}))}}}]);
//# sourceMappingURL=chunk-497f820a.1fe468b0.js.map