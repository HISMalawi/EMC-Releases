(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-963f12e0","TouchFormElement5","TouchFormElement8"],{"03c6":function(e,t,n){"use strict";n("ec2d")},"083a":function(e,t,n){"use strict";var o=n("0d51"),a=TypeError;e.exports=function(e,t){if(!delete e[t])throw a("Cannot delete property "+o(t)+" of "+o(e))}},"10f1":function(e,t,n){},"13c2":function(e,t,n){"use strict";n.r(t);var o=n("7a23");const a=e=>(Object(o["pushScopeId"])("data-v-04e3ad84"),e=e(),Object(o["popScopeId"])(),e),r={style:{width:"97.8%",margin:"auto"}},i={id:"cummulative",class:"cummulative_hight",style:{border:"1px solid #999","border-bottom":"none","background-color":"#f6f2ca",height:"25vh",overflow:"auto",padding:"5px"}},s={style:{width:"100%"}},c=a(()=>Object(o["createElementVNode"])("thead",null,[Object(o["createElementVNode"])("tr",null,[Object(o["createElementVNode"])("th",null,"Drug"),Object(o["createElementVNode"])("th",null,"Frequency"),Object(o["createElementVNode"])("th",null,"Dosage"),Object(o["createElementVNode"])("th",null,"Duration"),Object(o["createElementVNode"])("th")])],-1)),l={class:"dosage-input"},d={class:"dosage-input"},u={class:"dosage-input"},b={class:"dosage-input"},p=["onClick"],h={key:2,class:"content"};function m(e,t,n,a,m,O){const f=Object(o["resolveComponent"])("ion-input"),y=Object(o["resolveComponent"])("ion-icon"),j=Object(o["resolveComponent"])("ion-button"),g=Object(o["resolveComponent"])("his-text-input"),v=Object(o["resolveComponent"])("ion-text"),k=Object(o["resolveComponent"])("ion-label"),C=Object(o["resolveComponent"])("ion-checkbox"),D=Object(o["resolveComponent"])("ion-item"),N=Object(o["resolveComponent"])("ion-list"),_=Object(o["resolveComponent"])("ion-infinite-scroll-content"),w=Object(o["resolveComponent"])("ion-infinite-scroll"),I=Object(o["resolveComponent"])("ion-content"),E=Object(o["resolveComponent"])("view-port"),S=Object(o["resolveComponent"])("his-keyboard"),V=Object(o["resolveComponent"])("prescription-frequency"),x=Object(o["resolveComponent"])("prescription-keypad"),T=Object(o["resolveComponent"])("ion-toolbar"),B=Object(o["resolveComponent"])("ion-footer");return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createElementVNode"])("div",null,[Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("div",i,[Object(o["createElementVNode"])("table",s,[c,Object(o["createElementVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.checkedItems,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:n},[Object(o["createElementVNode"])("td",l,[Object(o["createElementVNode"])("b",null,Object(o["toDisplayString"])(t.label),1)]),Object(o["createElementVNode"])("td",d,[Object(o["createVNode"])(f,{readonly:"",placeholder:"Add frequency..",value:t.other.frequency},null,8,["value"])]),Object(o["createElementVNode"])("td",u,[Object(o["createVNode"])(f,{readonly:"",placeholder:"Add dosage..",value:t.other.dosage},null,8,["value"])]),Object(o["createElementVNode"])("td",b,[Object(o["createVNode"])(f,{readonly:"",placeholder:"Add duration..",value:t.other.duration},null,8,["value"])]),Object(o["createElementVNode"])("td",{class:"dosage-input",onClick:n=>e.unCheck(t)},[Object(o["createVNode"])(j,{color:"danger"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(y,{icon:e.trash},null,8,["icon"])]),_:1})],8,p)]))),128))])])])]),e.switchKeyboard?(Object(o["openBlock"])(),Object(o["createBlock"])(E,{key:0,style:{"margin-top":"0px",height:"37vh"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(g,{value:e.selected,onOnValue:e.onKBValue},null,8,["value","onOnValue"]),Object(o["createVNode"])(I,{style:{width:"100%"},class:"ion-padding-bottom"},{default:Object(o["withCtx"])(()=>[Object(o["createElementVNode"])("div",{class:Object(o["normalizeClass"])(["ion-content-scroll-host",{"ion-margin-bottom ion-padding-bottom":e.disableScroll}])},[Object(o["createVNode"])(N,{class:Object(o["normalizeClass"])(["view-port-content",{"ion-margin-bottom":e.disableScroll}])},{default:Object(o["withCtx"])(()=>[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.listData,(t,n)=>(Object(o["openBlock"])(),Object(o["createBlock"])(D,{key:n,color:t.isChecked?"lightblue":"",lines:t.isChecked?"none":""},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(k,null,{default:Object(o["withCtx"])(()=>{var e;return[Object(o["createVNode"])(v,{class:"his-md-text"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(t.label),1)]),_:2},1024),t.description&&t.isChecked?(Object(o["openBlock"])(),Object(o["createBlock"])(v,{key:0,color:null===(e=t.description)||void 0===e?void 0:e.color},{default:Object(o["withCtx"])(()=>[Object(o["createElementVNode"])("p",null,[Object(o["createElementVNode"])("i",null,Object(o["toDisplayString"])(t.description.text),1)])]),_:2},1032,["color"])):Object(o["createCommentVNode"])("",!0)]}),_:2},1024),Object(o["createVNode"])(C,{slot:"start",modelValue:t.isChecked,"onUpdate:modelValue":e=>t.isChecked=e,onIonChange:n=>e.onSelect(t,n),disabled:t.disabled},null,8,["modelValue","onUpdate:modelValue","onIonChange","disabled"])]),_:2},1032,["color","lines"]))),128))]),_:1},8,["class"]),Object(o["createVNode"])(w,{onIonInfinite:t[0]||(t[0]=t=>e.pushData(t)),threshold:"100px",disabled:e.disableScroll},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(_,{"loading-spinner":"crescent","loading-text":"Loading more data..."})]),_:1},8,["disabled"])],2)]),_:1})]),_:1})):Object(o["createCommentVNode"])("",!0),e.switchKeyboard?(Object(o["openBlock"])(),Object(o["createBlock"])(S,{key:1,kbConfig:e.keyboard,onKeyPress:e.keypress},null,8,["kbConfig","onKeyPress"])):Object(o["createCommentVNode"])("",!0),e.switchKeyboard?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",h,[Object(o["createVNode"])(V,{list:e.list,onFrequencyKeypress:t[1]||(t[1]=t=>e.label=t),onClick:t[2]||(t[2]=t=>e.frequencyKeypress())},null,8,["list"]),Object(o["createVNode"])(x,{onKeyPress:e.dosageKeypress,title:"Dosage",onClick:e.isComplete},null,8,["onKeyPress","onClick"]),Object(o["createVNode"])(x,{onKeyPress:e.durationKeypress,title:"Duration",onClick:e.isComplete},null,8,["onKeyPress","onClick"])]))]),Object(o["createVNode"])(B,{style:{position:"absolute",bottom:"0"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(T,{color:"dark"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(j,{"router-link":e.cancelDestination,slot:"start",size:"large",color:"danger"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Cancel ")]),_:1},8,["router-link"]),e.switchKeyboard?(Object(o["openBlock"])(),Object(o["createBlock"])(j,{key:0,onClick:e.predefinedMalariaDrug,slot:"end",size:"large",color:"primary"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Predefined Malaria Drugs ")]),_:1},8,["onClick"])):Object(o["createCommentVNode"])("",!0),Object(o["createVNode"])(j,{onClick:e.clearPrescription,slot:"end",size:"large",color:"warning"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Clear ")]),_:1},8,["onClick"]),Object(o["createVNode"])(j,{disabled:e.disableNextBtn,onClick:e.savePrescription,slot:"end",size:"large",color:"success"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Finish ")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1})],64)}n("14d9"),n("3c65");var O=n("6be2"),f=n("0a79"),y=n("2345"),j=n("36ad");function g(e,t,n,a,r,i){const s=Object(o["resolveComponent"])("ion-title"),c=Object(o["resolveComponent"])("ion-toolbar"),l=Object(o["resolveComponent"])("ion-header"),d=Object(o["resolveComponent"])("ion-label"),u=Object(o["resolveComponent"])("ion-item"),b=Object(o["resolveComponent"])("ion-list"),p=Object(o["resolveComponent"])("ion-content"),h=Object(o["resolveComponent"])("ion-button"),m=Object(o["resolveComponent"])("ion-footer");return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createVNode"])(l,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(c,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])("Select Malaria Drugs")]),_:1})]),_:1})]),_:1}),Object(o["createVNode"])(p,{style:{overflowY:"hidden",background:"grey"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(b,{class:"view-port-content"},{default:Object(o["withCtx"])(()=>[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.items,(n,a)=>(Object(o["openBlock"])(),Object(o["createBlock"])(u,{key:a,class:"items"},{default:Object(o["withCtx"])(()=>{var a;return[Object(o["createVNode"])(d,{class:Object(o["normalizeClass"])(null!==n&&void 0!==n&&null!==(a=n.other)&&void 0!==a&&a.wrapTxt?"ion-text-wrap":""),innerHTML:n.label,onClick:[e.submitData,t[0]||(t[0]=t=>e.closeModal("later"))],value:n.value},null,8,["class","innerHTML","onClick","value"])]}),_:2},1024))),128))]),_:1})]),_:1}),Object(o["createVNode"])(m,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(c,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(h,{slot:"start",color:"danger",size:"large",onClick:t[1]||(t[1]=t=>e.closeModal("later"))},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Cancel ")]),_:1})]),_:1})]),_:1})],64)}var v=n("d867"),k=Object(o["defineComponent"])({name:"Modal",props:{items:{type:Object,required:!0},submitData:{type:Function}},async created(){console.log("created modal")},methods:{async closeModal(e){await v["Z"].dismiss(e)}},data(){return{content:"Content",artStartDate:"",monthsOnART:"",lastOrder:"",currentRegimen:"",regimenStartDate:""}},components:{IonHeader:v["q"],IonToolbar:v["S"],IonTitle:v["R"],IonContent:v["n"],IonFooter:v["o"],IonButton:v["d"]}}),C=(n("742b"),n("d959")),D=n.n(C);const N=D()(k,[["render",g],["__scopeId","data-v-53d5f4c0"]]);var _=N,w=n("51c8"),I=n("db10"),E=n("ff79");const S={class:"freq-content"};function V(e,t,n,a,r,i){const s=Object(o["resolveComponent"])("snap"),c=Object(o["resolveComponent"])("center"),l=Object(o["resolveComponent"])("ion-radio"),d=Object(o["resolveComponent"])("ion-label"),u=Object(o["resolveComponent"])("ion-item"),b=Object(o["resolveComponent"])("ion-radio-group"),p=Object(o["resolveComponent"])("ion-list");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",S,[Object(o["createVNode"])(c,{style:{"padding-top":"12px"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Frequency ")]),_:1})]),_:1}),Object(o["createVNode"])(p,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(b,{value:e.activeLabel},{default:Object(o["withCtx"])(()=>[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.list,(t,n)=>(Object(o["openBlock"])(),Object(o["createBlock"])(u,{class:"his-md-text",key:n,onClick:n=>e.frequencyKeypress(t)},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(l,{slot:"start",value:t},null,8,["value"]),Object(o["createVNode"])(d,null,{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(t),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1},8,["value"])]),_:1})])}var x=Object(o["defineComponent"])({components:{IonList:v["y"],IonItem:v["w"],IonRadio:v["E"],IonRadioGroup:v["F"]},data:()=>({activeLabel:""}),props:{list:{type:Object,required:!0},label:String},methods:{async frequencyKeypress(e){this.$emit("frequencyKeypress",e)}}});n("9722");const T=D()(x,[["render",V],["__scopeId","data-v-28602c3d"]]);var B=T;const A={class:"keypad"};function P(e,t,n,a,r,i){const s=Object(o["resolveComponent"])("snap"),c=Object(o["resolveComponent"])("center"),l=Object(o["resolveComponent"])("ion-input"),d=Object(o["resolveComponent"])("base-keyboard");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",A,[Object(o["createVNode"])(c,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.title),1)]),_:1})]),_:1}),Object(o["createVNode"])(l,{value:e.value,style:{"text-align":"center",border:"solid 1px #b7b7b7","margin-top":"12px","margin-bottom":"12px"}},null,8,["value"]),"Dosage"==e.title?(Object(o["openBlock"])(),Object(o["createBlock"])(d,{key:0,btnSize:"8.3vw",layout:e.dosageKeypad,onKeyPress:e.dosageKeypress},null,8,["layout","onKeyPress"])):Object(o["createCommentVNode"])("",!0),"Duration"==e.title?(Object(o["openBlock"])(),Object(o["createBlock"])(d,{key:1,btnSize:"8.3vw",layout:e.durationKeypad,onKeyPress:e.durationKeypress},null,8,["layout","onKeyPress"])):Object(o["createCommentVNode"])("",!0)])}var K=n("c924"),F=n("3800"),q=Object(o["defineComponent"])({components:{BaseKeyboard:K["a"]},props:{title:{type:String},preset:{type:String},onKeyPress:{type:Function,required:!0},strictNumbers:{type:Boolean,default:!1}},data:()=>({value:"",dosageKeypad:F["e"],durationKeypad:F["g"]}),watch:{preset:{handler(e){e&&(this.value=e.toString())},immediate:!0}},methods:{async dosageKeypress(e){this.keypress(e)},async durationKeypress(e){e.match(/Confirm/i)?this.onKeyPress("Confirm"):this.keypress(e)},async keypress(e){if(this.strictNumbers){if(e.includes(".")&&this.value.includes("."))return;e.includes(".")||"0"!==this.value||(this.value=""),this.value=Object(y["a"])(e,this.value),this.value||(this.value=""),""+parseInt(this.value)===this.value?this.onKeyPress(parseInt(this.value)):this.onKeyPress(this.value)}else this.value=Object(y["a"])(e,this.value),this.onKeyPress(this.value)}}});n("e94d");const M=D()(q,[["render",P],["__scopeId","data-v-457af390"]]);var H=M,U=n("996c"),$=n("7365"),L=n("0fa1"),R=n("b5e4"),Q=n("9283"),z=n("4db7"),G=Object(o["defineComponent"])({name:"HisInfiniteScrollMultipleSelect",mixins:[w["default"],$["a"]],components:{PrescriptionKeypad:H,IonCheckbox:v["k"],IonText:v["O"],IonButton:v["d"],ViewPort:f["a"],HisTextInput:j["default"],IonContent:v["n"],IonList:v["y"],IonItem:v["w"],IonLabel:v["x"],HisKeyboard:I["a"],IonInfiniteScroll:v["t"],IonInfiniteScrollContent:v["u"],IonFooter:v["o"],IonToolbar:v["S"],PrescriptionFrequency:B},data:()=>({switchKeyboard:!0,keyboard:O["h"],listData:[],checkedItems:[],disableScroll:!1,filter2:"",selected:"",selectedItems:[],malariaDrug:[],prescriptionService:{},label:String,page:1,limit:10,trash:E["R"],list:U["b"].map(e=>e.label),showMalariaDrugs:!1,hasMalaria:!1,disableNextBtn:!0,confirmBtn:!1}),watch:{checkedItems:{handler(e){this.listData.forEach(t=>{e.find(e=>e.value===t.value)?t.isChecked=!0:t.isChecked=!1}),this.$emit("onValue",e)},deep:!0,immediate:!0},filter2:{async handler(){this.page=1,this.disableScroll=!1;const e=await this.getListData();[...this.checkedItems].forEach(t=>{const n=e.findIndex(e=>e.value===t.value);-1===n?e.push(t):e[n].isChecked=!0}),this.listData=e}}},mounted(){this.init()},activated(){this.init()},methods:{async init(){this.listData=await this.getListData()},async getListData(){return this.prescriptionService=new U["c"](this.patientID,this.providerID),await this.prescriptionService.loadDrugs(this.filter2,this.page,this.limit)},async dosageKeypress(e){this.checkedItems[0].other["dosage"]=e},async frequencyKeypress(){this.checkedItems[0].other["frequency"]=this.label},async durationKeypress(e){e.match(/Confirm/i)?(this.confirmBtn=!0,this.inputFieldType()):this.checkedItems[0].other["duration"]=e},async keypress(e){this.filter2||(this.selected=""),this.filter2=Object(y["a"])(e,this.selected),this.selected=this.filter2},async onKBValue(e){this.listData&&this.selected!==e&&(this.filter2=e,this.selected=this.filter2)},async pushData(e){this.page++;const t=await this.getListData();t.length>0?this.listData=[...this.listData,...t.filter(e=>!this.listData.find(t=>t.value===e.value))]:this.disableScroll=!0,e.target.complete()},isComplete(){const e=this.checkedItems[0];return e.other["frequency"]&&e.other["duration"]&&e.other["dosage"]?(this.confirmBtn=!1,this.disableNextBtn=!1,!0):(this.disableNextBtn=!0,this.confirmBtn&&(Object(R["e"])("complete prescription details for "+e.label),this.confirmBtn=!1),!1)},inputFieldType(){return!this.switchKeyboard&&this.isComplete()?(this.switchKeyboard=!0,!0):(this.switchKeyboard=!1,!1)},async predefinedMalariaDrug(){if(this.hasMalaria=await this.prescriptionService.hasMalaria(),!this.hasMalaria&&!await Object(R["a"])("Patient has no malaria. Do you still want to prescribe anti malaria drugs?"))return;const e=await v["Z"].create({component:_,backdropDismiss:!1,cssClass:"lager-modal",componentProps:{items:U["a"].map(e=>({label:`${e.name}, ${e.frequency} time(s) a day, for ${e.duration} days`,value:[e.name,e.frequency,e.duration,e.dose_strength,e.units,e.drug_id],other:e})),submitData:async e=>{const t=e.target.attributes.value.nodeValue.split(","),n=U["b"].find(e=>e.value==t[1]),o={isChecked:!0,label:t[0],other:{frequency:n.label,units:t[4],drug_id:t[5],duration:t[2],dosage:t[3]},value:t[0]},a=U["a"].map(e=>e.name);console.log(this.checkedItems),this.checkedItems=this.checkedItems.filter(e=>!a.includes(e.value)),console.log(this.checkedItems),this.checkedItems.unshift(o),this.isComplete()&&(this.disableNextBtn=!1)}}});e.present()},onSelect(e,t){this.$nextTick(async()=>{e.isChecked?-1===this.checkedItems.findIndex(t=>t.value===e.value)&&(this.checkedItems.unshift(e),this.selected="",this.inputFieldType(),this.isComplete()):this.unCheck(e)})},unCheck(e){1==this.checkedItems.length&&(this.disableNextBtn=!0,this.switchKeyboard=!0),this.checkedItems=this.checkedItems.filter(t=>t.value!==e.value)},clearPrescription(){this.selected=""},async savePrescription(){const e=this.mapToOrders(),t=await this.prescriptionService.createEncounter();if(!t)return Object(R["e"])("Unable to create treatment encounter");const n=await this.prescriptionService.createDrugOrder(e);if(!n)return Object(R["e"])("Unable to create drug orders!");Object(R["d"])("Drug order has been created"),this.printVisitSummary(),Object(L["b"])(this.patientID,this.$router)},mapToOrders(){return this.checkedItems.map(e=>{const t=U["c"].getSessionDate(),n=U["b"].find(t=>t.label===e.other.frequency);return{drug_inventory_id:e.other.drug_id,equivalent_daily_dose:"Unknown"==e.other.dosage?0:e.other.dosage*n.value,start_date:t,auto_expire_date:this.calculateExpireDate(t,e.other.duration),units:e.other.units,instructions:`${e.label}: ${e.other.dosage} ${e.other.units} ${n.code} for ${e.other.duration} days`,dose:e.other.dosage,frequency:n.code}})},calculateExpireDate(e,t){const n=new Date(e);return n.setDate(n.getDate()+parseInt(t)),Q["b"].toStandardHisFormat(n)},printVisitSummary(){const e=new z["a"](this.patientID);return e.printVisitSummaryLbl(U["c"].getSessionDate())}},created(){this.keyboard=O["h"],this.page=1,this.limit=10}});n("03c6");const Y=D()(G,[["render",m],["__scopeId","data-v-04e3ad84"]]);t["default"]=Y},2345:function(e,t,n){"use strict";function o(e,t,n){let o=t;if(e.match(/enter/i))return o+"\r\n";if(e.match(/clear/i))return"";if(o=e.match(/delete|del/i)?o.match(/unknown/i)||o.match(/n\/a/i)?"":o.substring(0,o.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":o.match(/unknown/i)||o.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof o&&o)switch(n){case"lowercase":o=o.toLowerCase();break;case"uppercase":o=o.toUpperCase();break;default:o=o.charAt(0).toUpperCase()+o.slice(1);break}return o}n.d(t,"a",(function(){return o}))},"36ad":function(e,t,n){"use strict";n.r(t);var o=n("7a23");function a(e,t,n,a,r,i){const s=Object(o["resolveComponent"])("ion-input");return Object(o["openBlock"])(),Object(o["createBlock"])(s,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[0]||(t[0]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences",placeholder:e.placeholder},null,8,["modelValue","type","disabled","readonly","placeholder"])}var r=n("d867"),i=n("2ed9"),s=Object(o["defineComponent"])({name:"HisInput",components:{IonInput:r["v"]},setup(){const{activePlatformProfile:e}=Object(i["e"])(),t=Object(o["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1},placeholder:{type:String,default:()=>""}}}),c=(n("86f4"),n("d959")),l=n.n(c);const d=l()(s,[["render",a],["__scopeId","data-v-04472bbc"]]);t["default"]=d},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"e",(function(){return a})),n.d(t,"g",(function(){return r})),n.d(t,"n",(function(){return i})),n.d(t,"f",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"m",(function(){return l})),n.d(t,"k",(function(){return d})),n.d(t,"i",(function(){return u})),n.d(t,"a",(function(){return b})),n.d(t,"l",(function(){return p})),n.d(t,"c",(function(){return h})),n.d(t,"j",(function(){return m})),n.d(t,"h",(function(){return O}));const o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","","Confirm"]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],c=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],d=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],u=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],b=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],m=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],O=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"3c65":function(e,t,n){"use strict";var o=n("23e7"),a=n("7b0b"),r=n("07fa"),i=n("3a34"),s=n("083a"),c=n("3511"),l=1!==[].unshift(0),d=function(){try{Object.defineProperty([],"length",{writable:!1}).unshift()}catch(e){return e instanceof TypeError}},u=l||!d();o({target:"Array",proto:!0,arity:1,forced:u},{unshift:function(e){var t=a(this),n=r(t),o=arguments.length;if(o){c(n+o);var l=n;while(l--){var d=l+o;l in t?t[d]=t[l]:s(t,d)}for(var u=0;u<o;u++)t[u]=arguments[u]}return i(t,n+o)}})},"51c8":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),a=Object(o["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const r=a;t["default"]=r},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"g",(function(){return i})),n.d(t,"f",(function(){return s})),n.d(t,"e",(function(){return c})),n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return d})),n.d(t,"h",(function(){return b})),n.d(t,"a",(function(){return p}));var o=n("3800");const a=[o["m"],[["","Delete"]]],r=[o["k"],[["Delete"]]],i=[o["k"],[["Delete","Unknown"]]],s=[o["k"],[["N/A"],["Delete","Unknown"]]],c=[o["k"],[["Delete"]]],l=[o["k"],[["Unknown","Delete"],["Qwerty","A-Z"]]],d=[o["i"],[["Unknown"]]],u=[o["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],b=[o["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:l},{btn:"?123",keyboard:a},{btn:"A-Z",keyboard:u},{btn:"Qwerty",keyboard:b}]},"71c3":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n("1c74");class a extends o["e"]{constructor(){super()}static create(e){return this.postJson("drug_orders",e)}static updateDispensationOrders(e){return this.postJson("dispensations",{program_id:this.getProgramID(),dispensations:e.map(e=>({date:this.getSessionDate(),drug_order_id:e["order_id"],quantity:e["quantity"]}))})}static getDrugOrderHistory(e){return this.getJson("drug_orders",{patient_id:e})}static getDrugOrders(e){return this.getJson("drug_orders",{patient_id:e,date:this.getSessionDate(),program_id:this.getProgramID()})}static getAllDrugOrders(e,t=1e3){return this.getJson("drug_orders",{patient_id:e,program_id:o["e"].getProgramID(),page_size:t})}static getLastDrugsReceived(e){return this.getJson(`patients/${e}/last_drugs_received`,{date:this.getSessionDate(),program_id:this.getProgramID()})}static getDrugDosages(e,t,n=this.getSessionDate()){const o={drug_id:t,date:n};return this.getJson(`programs/${this.getProgramID()}/patients/${e}/drug_doses`,o)}static getOrderByPatient(e,t){return this.getJson("/drug_orders",{patient_id:e,program_id:this.getProgramID(),...t})}}},7365:function(e,t,n){"use strict";n("14d9"),n("13d5");var o,a=n("7a23"),r=n("ad60"),i=n("2ef0"),s=n("0fa1"),c=n("7f35"),l=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(o||(o={}));const d=e=>l["b"].toStandardHisDisplayFormat(e),u={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+d(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?o.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?o.CHANGE_PATIENT_OUTCOME:o.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${d(t)} is less than birth date of ${d(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?o.CHANGE_SESSION_DATE:o.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:n,apiDate:a})=>{const r=await Object(c["c"])("Please select a provider for "+t,`BDE: ${d(n)} | Current: ${d(a)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===r.action?{value:-1,flowState:o.GO_TO_PATIENT_DASHBOARD}:{value:r.selection,flowState:o.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var b=n("c21d"),p=n("7920"),h=n("b5e4"),m=n("8e8b"),O=Object(a["defineComponent"])({components:{HisStandardForm:p["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[o.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(i["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),o.CONTINUE},n[o.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),o.EXIT),n[o.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),o.EXIT),n[o.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),o.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(b["a"])(this.facts,u);for(const i in e){var t,n;const s=e[i];if(null!==s&&void 0!==s&&null!==(t=s.actions)&&void 0!==t&&t.alert){var a;const e=this.runflowState(await(null===s||void 0===s||null===(a=s.actions)||void 0===a?void 0:a.alert(this.facts)));if(e===o.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var r;const e=await(null===s||void 0===s||null===(r=s.actions)||void 0===r?void 0:r.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(h["c"])(""+e)}this.facts.sessionDate=r["a"].getSessionDate(),this.facts.apiDate=r["a"].getCachedApiDate(),this.facts.isBdeMode=r["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",r["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),o=t.username.toUpperCase();return n<o?-1:n>o?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(i["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var o;const[t]=(null===(o=e.person)||void 0===o?void 0:o.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const f=O;t["a"]=f},"742b":function(e,t,n){"use strict";n("10f1")},"76f1":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n("1c74");class a extends o["e"]{constructor(){super()}static getDrugs(e={}){return super.getJson("/drugs",e)}}},7920:function(e,t,n){"use strict";var o=n("7a23");function a(e,t,n,a,r,i){return Object(o["openBlock"])(),Object(o["createBlock"])(Object(o["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=n("9441"),i=Object(o["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=n("d959"),c=n.n(s);const l=c()(i,[["render",a]]);t["a"]=l},"86f4":function(e,t,n){"use strict";n("89a0")},"89a0":function(e,t,n){},9722:function(e,t,n){"use strict";n("e72d")},"996c":function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return l}));var o=n("cc6f"),a=n("71c3"),r=n("9b7c"),i=n("76f1");const s=[{label:"ONCE A DAY (OD)",code:"OD",value:1},{label:"TWICE A DAY (BD)",code:"BD",value:2},{label:"THREE TIMES A DAY (TDS)",code:"TDS",value:3},{label:"FOUR TIMES A DAY (QID)",code:"QID",value:4},{label:"FIVE TIMES A DAY (5X/D)",code:"5X/D",value:5},{label:"SIX TIMES A DAY (Q4HRS)",code:"Q4HRS",value:6},{label:"IN THE MORNING (QAM)",code:"QAM",value:1},{label:"ONCE A DAY AT NOON (QNOON)",code:"QNOON",value:1},{label:"IN THE EVENING (QPM)",code:"QPM",value:1},{label:"ONCE A DAY AT NIGHT (QHS)",code:"QHS",value:1},{label:"EVERY OTHER DAY (QOD)",code:"QOD",value:.5},{label:"ONCE A WEEK (QWK)",code:"QWK",value:.14},{label:"ONCE A MONTH",code:"ONCE A MONTH",value:.03},{label:"TWICE A MONTH",code:"TWICE A MONTH",value:.071},{label:"Unknown",code:"Unknown",value:0}],c=[{drug_id:236,duration:3,tabs:6,name:"Lumefantrine + Arthemether 1 x 6",dose_strength:1,units:"tabs",frequency:2},{drug_id:237,duration:3,tabs:12,name:"Lumefantrine + Arthemether 2 x 6",dose_strength:2,units:"tabs",frequency:2},{drug_id:238,duration:3,tabs:18,name:"Lumefantrine + Arthemether 3 x 6",dose_strength:3,units:"tabs",frequency:2},{drug_id:239,duration:3,tabs:24,name:"Lumefantrine + Arthemether 4 x 6",dose_strength:4,units:"tabs",frequency:2},{drug_id:311,duration:1,tabs:1,name:"SP (525mg tablet)",dose_strength:1,units:"tabs",frequency:.03},{drug_id:6952,duration:1,tabs:1,name:"Artesunate injenction",dose_strength:1,units:"ml",frequency:1},{drug_id:1219,duration:3,tabs:3,name:"ASAQ 25mg/67.5mg (3 tablets)",dose_strength:1,units:"mg",frequency:1},{drug_id:1220,duration:3,tabs:3,name:"ASAQ 50mg/135mg (3 tablets)",dose_strength:1,units:"mg",frequency:1},{drug_id:1221,duration:3,tabs:3,name:"ASAQ 100mg/270mg (3 tablets)",dose_strength:1,units:"mg",frequency:1},{drug_id:1222,duration:3,tabs:6,name:"ASAQ 100mg/270mg (6 tablets)",dose_strength:2,units:"mg",frequency:1}];class l extends o["a"]{constructor(e,t){super(e,25,t)}async loadDrugs(e="",t=1,n=10){const o=await i["a"].getDrugs({name:e,page:t,page_size:n,concept_set:"OPD Medication"});return o.map(e=>({label:e.name,value:e.name,other:e}))}async hasMalaria(){const e=await r["a"].getLatestMalariaTestResult(this.patientID);if("No"===e){const e=await o["a"].getAllValueCoded(this.patientID,"Primary diagnosis");if(e.includes("Malaria"))return!0;const t=await o["a"].getAllValueCoded(this.patientID,"Secondary diagnosis");return!!t.includes("Malaria")}return"Positive"===e}createDrugOrder(e){return a["a"].create({encounter_id:this.encounterID,drug_orders:e})}}},ad33:function(e,t,n){},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("14d9");function o(e,t){const n=[],o=[-1,"",null,void 0];for(const a in t){if(!(a in e))continue;const r=e[a];o.includes(r)?n.push(!1):n.push(t[a](r,e))}return n.every(Boolean)}function a(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function r(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function i(e,t,n="",i="",s="priority"){const c=[];for(const a in t){const r=t[a],s=[r.target&&n&&r.target!=n,r.targetEvent&&i&&r.targetEvent!=i];s.some(Boolean)||o(e,r.conditions)&&(r.title=a,r.description&&(r.description.text=r.description.info(e)),c.push(r))}return"priority"===s?a(c):r(c)}},c924:function(e,t,n){"use strict";var o=n("7a23");function a(e,t,n,a,r,i){const s=Object(o["resolveComponent"])("ion-button");return Object(o["openBlock"])(),Object(o["createElementBlock"])("table",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.layout,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:n},[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(t,(n,a)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+a},[n?(Object(o["openBlock"])(),Object(o["createBlock"])(s,{key:0,style:Object(o["normalizeStyle"])({width:e.btnSize}),class:Object(o["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(o["createCommentVNode"])("",!0)]))),128))]))),128))])}var r=n("d867"),i=Object(o["defineComponent"])({components:{IonButton:r["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),s=n("d959"),c=n.n(s);const l=c()(i,[["render",a]]);t["a"]=l},db10:function(e,t,n){"use strict";var o=n("7a23");const a={class:"his-floating-keyboard"},r={class:"his-floating-keyboard-content"};function i(e,t,n,i,s,c){const l=Object(o["resolveComponent"])("base-keyboard");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",a,[Object(o["createElementVNode"])("div",r,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.activeLayout,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:n},[Object(o["createVNode"])(l,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var s=n("6be2"),c=n("c924"),l=Object(o["defineComponent"])({components:{BaseKeyboard:c["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=s["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=s["a"][t].keyboard,!0)}}}),d=n("d959"),u=n.n(d);const b=u()(l,[["render",i]]);t["a"]=b},e72d:function(e,t,n){},e94d:function(e,t,n){"use strict";n("ad33")},ec2d:function(e,t,n){}}]);
//# sourceMappingURL=chunk-963f12e0.f7b54f1f.js.map