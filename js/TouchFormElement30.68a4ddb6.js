(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement30","TouchFormElement38","TouchFormElement8"],{"04a0":function(e,t,n){},"0a79":function(e,t,n){"use strict";var c=n("7a23");function o(e,t,n,o,a,l){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{id:"view-port",class:Object(c["normalizeClass"])(e.showFull?"":"half")},[Object(c["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var a=Object(c["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),l=(n("a4d3"),n("d959")),s=n.n(l);const r=s()(a,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=r},"51c8":function(e,t,n){"use strict";n.r(t);var c=n("7a23"),o=Object(c["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const a=o;t["default"]=a},"7b89":function(e,t,n){},a4d3:function(e,t,n){"use strict";n("04a0")},bc14:function(e,t,n){"use strict";n("d717")},c4e4:function(e,t,n){"use strict";var c=n("7a23");const o=e=>(Object(c["pushScopeId"])("data-v-bd0a6c2e"),e=e(),Object(c["popScopeId"])(),e),a={class:"ion-margin-bottom"},l=o(()=>Object(c["createElementVNode"])("div",{class:"his-md-text side-title"}," Select specimen ",-1)),s=o(()=>Object(c["createElementVNode"])("div",{class:"his-md-text side-title"}," Main test(s) reason ",-1)),r={style:{background:"lightyellow",height:"34vh"}},i={class:"his-sm-text"},d=o(()=>Object(c["createElementVNode"])("thead",null,[Object(c["createElementVNode"])("tr",null,[Object(c["createElementVNode"])("th",null,"Test"),Object(c["createElementVNode"])("th",null,"Specimen"),Object(c["createElementVNode"])("th",null,"Reason"),Object(c["createElementVNode"])("th",null,"Action")])],-1));function b(e,t,n,o,b,O){const u=Object(c["resolveComponent"])("ion-title"),p=Object(c["resolveComponent"])("ion-toolbar"),m=Object(c["resolveComponent"])("ion-header"),j=Object(c["resolveComponent"])("ion-label"),h=Object(c["resolveComponent"])("ion-checkbox"),v=Object(c["resolveComponent"])("ion-item"),f=Object(c["resolveComponent"])("ion-list"),y=Object(c["resolveComponent"])("ion-col"),V=Object(c["resolveComponent"])("ion-radio"),C=Object(c["resolveComponent"])("ion-radio-group"),w=Object(c["resolveComponent"])("ion-button"),x=Object(c["resolveComponent"])("ion-row"),N=Object(c["resolveComponent"])("ion-grid"),k=Object(c["resolveComponent"])("ion-content"),E=Object(c["resolveComponent"])("ion-footer");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createVNode"])(m,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(p,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(u,{class:"his-lg-text"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])("Lab orders")]),_:1})]),_:1})]),_:1}),Object(c["createVNode"])(k,{style:{overflow:"hidden",background:"grey",height:"70vh"}},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(N,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(x,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(y,{size:"6"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(f,{style:{overflowY:"auto",height:"75vh"}},{default:Object(c["withCtx"])(()=>[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.testTypes,(t,n)=>(Object(c["openBlock"])(),Object(c["createBlock"])(v,{class:"his-sm-text",key:t,disabled:null!==e.activeIndex&&e.activeIndex!==n&&!e.isOrderComplete,detail:""},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(j,{"text-wrap":""},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.name),1)]),_:2},1024),Object(c["createVNode"])(h,{modelValue:t.isChecked,"onUpdate:modelValue":e=>t.isChecked=e,slot:"start",onIonChange:c=>e.onSelectTest(t.name,n,c)},null,8,["modelValue","onUpdate:modelValue","onIonChange"])]),_:2},1032,["disabled"]))),128))]),_:1})]),_:1}),null!=e.activeIndex&&e.selectedOrders.length>0?(Object(c["openBlock"])(),Object(c["createBlock"])(y,{key:0,style:{overflowY:"auto",height:"79vh"}},{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",a,[e.extendedLabsEnabled?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])(f,{key:0},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(C,{modelValue:e.testTypes[e.activeIndex]["specimen"],"onUpdate:modelValue":t[0]||(t[0]=t=>e.testTypes[e.activeIndex]["specimen"]=t)},{default:Object(c["withCtx"])(()=>[l,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.specimens,t=>(Object(c["openBlock"])(),Object(c["createBlock"])(v,{key:t},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(j,null,{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.name),1)]),_:2},1024),Object(c["createVNode"])(V,{slot:"start",value:t.name,onClick:n=>e.addSpecimen(t)},null,8,["value","onClick"])]),_:2},1024))),128))]),_:1},8,["modelValue"])]),_:1})),Object(c["createVNode"])(C,{modelValue:e.testTypes[e.activeIndex]["reason"],"onUpdate:modelValue":t[1]||(t[1]=t=>e.testTypes[e.activeIndex]["reason"]=t)},{default:Object(c["withCtx"])(()=>[s,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.testReasons,e=>(Object(c["openBlock"])(),Object(c["createBlock"])(v,{class:"his-sm-text",key:e},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(j,null,{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e),1)]),_:2},1024),Object(c["createVNode"])(V,{slot:"start",value:e},null,8,["value"])]),_:2},1024))),128))]),_:1},8,["modelValue"])]),Object(c["createElementVNode"])("div",r,[Object(c["createElementVNode"])("table",i,[d,Object(c["createElementVNode"])("tbody",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.finalOrders,(t,n)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:n},[Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(t.name),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(t.specimen||"N/A"),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(t.reason),1),Object(c["createElementVNode"])("td",null,[Object(c["createVNode"])(w,{onClick:n=>e.removeOrder(t.currentIndex),slot:"end",color:"danger"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])("X")]),_:2},1032,["onClick"])])]))),128))])])])]),_:1})):Object(c["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1}),Object(c["createVNode"])(E,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(p,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(w,{onClick:e.postActivities,size:"large",slot:"end",disabled:0===e.finalOrders.length},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(" Place orders ")]),_:1},8,["onClick","disabled"]),Object(c["createVNode"])(w,{onClick:t[2]||(t[2]=t=>e.closeModal([])),size:"large",slot:"start",color:"danger"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(" Close ")]),_:1})]),_:1})]),_:1})],64)}var O=n("d867"),u=n("b5e4"),p=n("9b7c"),m=n("cc6f");class j extends m["a"]{constructor(e,t){super(e,57,t)}}var h=n("b89f"),v=n("d1ca"),f=n("8e8b"),y=n("2ef0"),V=Object(c["defineComponent"])({name:"Modal",props:{activities:{type:Object,required:!0},testFilters:{type:Array},title:{type:String,default:""}},watch:{activities:{handler(e){e&&(this.appActivities=[...e],this.getActivities())},immediate:!0}},async created(){this.extendedLabsEnabled=await v["b"].extendedLabEnabled()},methods:{async onSelectTest(e,t,n){this.$nextTick(async()=>{this.testTypes[t]["isChecked"]=n.target.checked,this.testTypes[t]["isChecked"]?(this.specimens=await p["a"].getSpecimens(e),this.testTypes[t]["currentIndex"]=t,this.activeIndex=t):this.removeOrder(t)})},async getActivities(){const e=await p["a"].getTestTypes(),t=Object(y["findIndex"])(e,{name:"HIV viral load"}),n=-1!==t?e.splice(t,1):null,c=e.sort((e,t)=>(""+e.name).toUpperCase()>(""+t.name).toUpperCase()?1:-1).filter(e=>!Array.isArray(this.testFilters)||this.testFilters.includes(e.name));this.testTypes=n?[...n,...c]:c},removeOrder(e){this.testTypes[e]["isChecked"]=!1,this.testTypes[e]["reason"]=null,this.testTypes[e]["specimen"]=null,this.testTypes[e]["specimenConcept"]=null,this.activeIndex=null,this.specimens=[]},addSpecimen(e){this.testTypes[this.activeIndex]["specimenConcept"]=e.concept_id},async postActivities(){const e=""+this.$route.params.patient_id,t=new j(parseInt(e),-1),n=await t.createEncounter();if(n){const e=await p["a"].buildLabOrders(n,this.finalOrders),t=await p["a"].saveOrdersArray(n.encounter_id,e);if(!t)return Object(u["e"])("Unable to save lab orders");f["a"].invalidate("PATIENT_LAB_ORDERS");const c=await Object(u["a"])("Lab orders and encounter created!, print out your last orders?",{confirmBtnLabel:"Yes",cancelBtnLabel:"No"});c?await this.printOrders(t):await this.closeModal(t)}},async closeModal(e){await O["Z"].dismiss(e)},async printOrders(e){const t=new h["a"];await e.forEach(async e=>{const n="lab/labels/order?order_id="+e.order_id;await t.printLbl(n)}),await O["Z"].dismiss(e)}},computed:{isOrderComplete(){return this.extendedLabsEnabled?!!this.testTypes[this.activeIndex]["reason"]:(this.testTypes[this.activeIndex]["specimenConcept"]||this.testTypes[this.activeIndex]["specimen"])&&this.testTypes[this.activeIndex]["reason"]},selectedOrders(){return this.testTypes.filter(e=>!0===e.isChecked)},finalOrders(){return this.selectedOrders.filter(e=>e.reason&&(e.specimen&&!this.extendedLabsEnabled||this.extendedLabsEnabled))},testReasons(){return this.testTypes[this.activeIndex].name.match(/Viral load/i)?this.reasons.concat(["Follow up after Low Level Viremia","Follow up after High Viral Load"]):this.reasons}},mounted(){this.getActivities()},data(){return{content:"Content",extendedLabsEnabled:!1,appActivities:[],testTypes:[],specimens:[],reasons:["Routine","Targeted","Confirmatory","Stat","Repeat / Missing"],activeIndex:null}},components:{IonButton:O["d"],IonContent:O["n"],IonHeader:O["q"],IonTitle:O["R"],IonToolbar:O["S"],IonLabel:O["x"],IonList:O["y"],IonItem:O["w"],IonCheckbox:O["k"],IonRadioGroup:O["F"],IonRow:O["H"]}}),C=(n("ffb3"),n("d959")),w=n.n(C);const x=w()(V,[["render",b],["__scopeId","data-v-bd0a6c2e"]]);t["a"]=x},d717:function(e,t,n){},e614:function(e,t,n){"use strict";n.r(t);var c=n("7a23");const o=e=>(Object(c["pushScopeId"])("data-v-356b70ce"),e=e(),Object(c["popScopeId"])(),e),a={class:"view-port-content"},l={class:"his-sm-text"},s=o(()=>Object(c["createElementVNode"])("tr",null,[Object(c["createElementVNode"])("th",null,"Accession #"),Object(c["createElementVNode"])("th",null,"Test Name"),Object(c["createElementVNode"])("th",null,"Specimen"),Object(c["createElementVNode"])("th",null,"Ordered"),Object(c["createElementVNode"])("th",null,"Result"),Object(c["createElementVNode"])("th",null,"Released"),Object(c["createElementVNode"])("th",null,"Given")],-1)),r=o(()=>Object(c["createElementVNode"])("br",null,null,-1));function i(e,t,n,o,i,d){const b=Object(c["resolveComponent"])("ion-button"),O=Object(c["resolveComponent"])("view-port");return Object(c["openBlock"])(),Object(c["createBlock"])(O,null,{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",a,[Object(c["createElementVNode"])("table",l,[s,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.rows,(t,n)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:n},[Object(c["createElementVNode"])("td",null,[Object(c["createVNode"])(b,{color:"light",fill:"none",onClick:n=>e.printOrder(t)},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.accession_number),1)]),_:2},1032,["onClick"])]),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(t.test_name),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(t.specimen),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(t.ordered),1),Object(c["createElementVNode"])("td",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(t.result,(e,t)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",{key:t},[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e)+" ",1),r]))),128))]),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(t.released),1),Object(c["createElementVNode"])("td",null,[Object(c["createElementVNode"])("span",{style:Object(c["normalizeStyle"])("color: "+("Yes"===t.result_given?"green;":"black;"))},Object(c["toDisplayString"])(t.result_given),5)])]))),128))])])]),_:1})}var d=n("0a79"),b=n("d867"),O=n("c4e4"),u=n("2ef0"),p=n("51c8"),m=n("9283"),j=n("b5e4"),h=Object(c["defineComponent"])({components:{ViewPort:d["a"],IonButton:b["d"]},mixins:[p["default"]],data:()=>({HisDate:m["b"],rows:[]}),methods:{async init(){this.$emit("onFieldActivated",this);const e=await this.options(this.fdata),t=e[0].other.values;this.rows=t.map(e=>(e.id=e.order_id,e.ordered&&(e.ordered=m["b"].toStandardHisDisplayFormat(e.ordered)),e.released&&(e.released=m["b"].toStandardHisDisplayFormat(e.released)),e))},async printOrder(e){var t;if("function"===typeof(null===(t=this.config)||void 0===t?void 0:t.printOrder)){const t=await Object(j["a"])(`Do you want to print order with accession number ${e.accession_number}?`);t&&this.config.printOrder(e.id)}},formatOrders(e){return e.map(e=>({id:e.order_id,encounter_id:e.encounter_id,result_given:e.result_given,accession_number:e.accession_number,test_name:e.tests[0].name,specimen:e.specimen.name,ordered:m["b"].toStandardHisDisplayFormat(e.order_date),result:[],release:""}))},async launchOrderSelection(e=null){const t=await b["Z"].create({component:O["a"],backdropDismiss:!1,cssClass:"large-modal",componentProps:{testFilters:e}});t.present();const{data:n}=await t.onDidDismiss();Object(u["isEmpty"])(n)||(this.rows=[...this.formatOrders(n),...this.rows])}},mounted(){this.init()},activated(){this.init()}}),v=(n("bc14"),n("d959")),f=n.n(v);const y=f()(h,[["render",i],["__scopeId","data-v-356b70ce"]]);t["default"]=y},ffb3:function(e,t,n){"use strict";n("7b89")}}]);
//# sourceMappingURL=TouchFormElement30.68a4ddb6.js.map