(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement21","TouchFormElement38","TouchFormElement5","TouchFormElement52","TouchFormElement8"],{"028c":function(e,t,n){},"0a79":function(e,t,n){"use strict";var i=n("7a23");function o(e,t,n,o,a,c){return Object(i["openBlock"])(),Object(i["createElementBlock"])("div",{id:"view-port",class:Object(i["normalizeClass"])(e.showFull?"":"half")},[Object(i["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var a=Object(i["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),c=(n("a4d3"),n("6b0d")),l=n.n(c);const s=l()(a,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=s},2345:function(e,t,n){"use strict";function i(e,t,n){let i=t;if(e.match(/enter/i))return i+"\r\n";if(e.match(/clear/i))return"";if(i=e.match(/delete|del/i)?i.match(/unknown/i)||i.match(/n\/a/i)?"":i.substring(0,i.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":i.match(/unknown/i)||i.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof i&&i)switch(n){case"lowercase":i=i.toLowerCase();break;case"uppercase":i=i.toUpperCase();break;default:i=i.charAt(0).toUpperCase()+i.slice(1);break}return i}n.d(t,"a",(function(){return i}))},"331e":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n("cc6f"),o=n("8158");class a extends i["a"]{constructor(e,t){super(e,122,t)}static async getComplaintsList(e,t=""){return o["a"].getConceptSet(e,t)}async fetchLatestTriageEncounter(){return await a.getObs({concept_id:o["a"].getConceptID("History of COVID-19 contact"),start_date:this.date,end_date:this.date,person_id:this.patientID})}}},"36ad":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function o(e,t,n,o,a,c){const l=Object(i["resolveComponent"])("ion-input");return Object(i["openBlock"])(),Object(i["createBlock"])(l,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[0]||(t[0]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences",placeholder:e.placeholder},null,8,["modelValue","type","disabled","readonly","placeholder"])}var a=n("d867"),c=n("2ed9"),l=Object(i["defineComponent"])({name:"HisInput",components:{IonInput:a["v"]},setup(){const{activePlatformProfile:e}=Object(c["e"])(),t=Object(i["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1},placeholder:{type:String,default:()=>""}}}),s=(n("86f4"),n("6b0d")),r=n.n(s);const d=r()(l,[["render",o],["__scopeId","data-v-04472bbc"]]);t["default"]=d},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"k",(function(){return o})),n.d(t,"f",(function(){return a})),n.d(t,"n",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return s})),n.d(t,"m",(function(){return r})),n.d(t,"j",(function(){return d})),n.d(t,"h",(function(){return u})),n.d(t,"a",(function(){return h})),n.d(t,"l",(function(){return p})),n.d(t,"c",(function(){return b})),n.d(t,"i",(function(){return f})),n.d(t,"g",(function(){return m}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],s=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],r=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],d=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],u=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],h=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],b=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],f=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],m=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},4910:function(e,t,n){},"51c8":function(e,t,n){"use strict";n.r(t);var i=n("7a23"),o=Object(i["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const a=o;t["default"]=a},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"g",(function(){return c})),n.d(t,"f",(function(){return l})),n.d(t,"e",(function(){return s})),n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return d})),n.d(t,"h",(function(){return h})),n.d(t,"a",(function(){return p}));var i=n("3800");const o=[i["m"],[["","Delete"]]],a=[i["j"],[["Delete"]]],c=[i["j"],[["Delete","Unknown"]]],l=[i["j"],[["N/A"],["Delete","Unknown"]]],s=[i["j"],[["Delete"]]],r=[i["j"],[["Unknown","Delete"],["Qwerty","A-Z"]]],d=[i["h"],[["Unknown"]]],u=[i["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],h=[i["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:r},{btn:"?123",keyboard:o},{btn:"A-Z",keyboard:u},{btn:"Qwerty",keyboard:h}]},"6f40":function(e,t,n){},"7d28":function(e,t,n){"use strict";n("6f40")},"82a9":function(e,t,n){"use strict";n.r(t);n("14d9");var i=n("7a23"),o=n("db10"),a=n("2345"),c=n("36ad"),l=n("6be2"),s=n("0a79"),r=n("51c8"),d=n("d867"),u=n("2ef0"),h=Object(i["defineComponent"])({components:{IonList:d["y"],IonItem:d["w"],IonLabel:d["x"],HisTextInput:c["default"],HisKeyboard:o["a"],ViewPort:s["a"],IonGrid:d["p"],IonRow:d["H"],IonCol:d["m"],IonInfiniteScroll:d["t"],IonInfiniteScrollContent:d["u"],IonContent:d["n"]},mixins:[r["default"]],data:()=>({showKeyboard:!1,selected:"",filter:"",filtered:[],keyboard:l["h"],listData:[],infiniteScroll:{enabled:!1,page:1,limit:10,threshold:"100px",handler:async(e,t,n)=>[]}}),created(){var e,t,n,i,o,a,c,l,s,r,d;this.showKeyboard=!0===(null===(e=this.config)||void 0===e?void 0:e.showKeyboard),this.infiniteScroll.enabled=!0===(null===(t=this.config)||void 0===t||null===(n=t.infiniteScroll)||void 0===n?void 0:n.enabled),this.infiniteScroll.page=(null===(i=this.config)||void 0===i||null===(o=i.infiniteScroll)||void 0===o?void 0:o.page)||1,this.infiniteScroll.limit=(null===(a=this.config)||void 0===a||null===(c=a.infiniteScroll)||void 0===c?void 0:c.limit)||10,this.infiniteScroll.threshold=(null===(l=this.config)||void 0===l||null===(s=l.infiniteScroll)||void 0===s?void 0:s.threshold)||"100px",this.infiniteScroll.handler=null===(r=this.config)||void 0===r||null===(d=r.infiniteScroll)||void 0===d?void 0:d.handler},watch:{footerButtonEvent:{handler(e){if(Object(u["isPlainObject"])(e.onClickComponentEvents)){const t=(null===e||void 0===e?void 0:e.onClickComponentEvents)||{};if(t&&"function"===typeof t.setValue){const n=t.setValue(e);"string"===typeof n&&(this.filter=n,this.selected=n)}}},deep:!0},listData:{handler(e){e&&(this.filtered=e)},deep:!0,immediate:!0},filter:{async handler(e){var t;if(e)if(null!==(t=this.config)&&void 0!==t&&t.isFilterDataViaApi){if(this.filtered=await this.options(this.fdata,e),this.selected===this.filter){const e=Object(u["find"])(this.filtered,{label:this.filter});e&&this.$emit("onValue",e)}}else this.infiniteScroll.enabled&&(this.infiniteScroll.page=1),this.filtered=this.listData.filter(e=>this.isMatch(e.label,this.filter));else this.filtered=this.listData},immediate:!0}},methods:{isMatch(e,t){return e.match(new RegExp(t,"i"))},clearSelection(){this.filter="",this.selected=""},onKbValue(e,t=!0){t&&this.selected!==e&&(this.filter=e,this.selected=this.filter)},keypress(e){this.filter||(this.selected=""),this.filter=Object(a["a"])(e,this.selected),this.selected=this.filter},async pushData(e){if(this.infiniteScroll.enabled&&"function"===typeof this.infiniteScroll.handler){this.infiniteScroll.page++;const e=await this.infiniteScroll.handler(this.filter,this.infiniteScroll.page,this.infiniteScroll.limit);this.listData.push(...e)}e.target.complete()}}}),p=(n("7d28"),n("6b0d")),b=n.n(p);const f=b()(h,[["__scopeId","data-v-7b5e2256"]]);t["default"]=f},"82d1":function(e,t,n){"use strict";n.r(t);var i=n("7a23");const o={style:{}};function a(e,t,n,a,c,l){const s=Object(i["resolveComponent"])("his-text-input"),r=Object(i["resolveComponent"])("ion-text"),d=Object(i["resolveComponent"])("ion-label"),u=Object(i["resolveComponent"])("ion-chip"),h=Object(i["resolveComponent"])("ion-col"),p=Object(i["resolveComponent"])("ion-row"),b=Object(i["resolveComponent"])("ion-item"),f=Object(i["resolveComponent"])("ion-list"),m=Object(i["resolveComponent"])("ion-checkbox"),y=Object(i["resolveComponent"])("his-keyboard"),O=Object(i["resolveComponent"])("ion-grid"),j=Object(i["resolveComponent"])("view-port");return Object(i["openBlock"])(),Object(i["createElementBlock"])("div",null,[Object(i["createVNode"])(j,{showFull:!e.showKeyboard,style:{padding:"0",height:"82vh"}},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(s,{value:e.selected,placeholder:"Search",onOnValue:e.onKBValue,onClick:e.keyboardStatus},null,8,["value","onOnValue","onClick"]),Object(i["createVNode"])(O,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(p,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(h,{size:"12"},{default:Object(i["withCtx"])(()=>[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.checkedItems,(t,n)=>(Object(i["openBlock"])(),Object(i["createElementBlock"])("span",{key:n},[Object(i["createVNode"])(u,{color:"danger",onClick:n=>e.uncheck(t)},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(d,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(r,{class:"his-md-text"},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])]))),128))]),_:1})]),_:1}),Object(i["createVNode"])(p,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(h,{size:"4"},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(f,{style:{overflowY:"auto",height:"80vh",margin:0}},{default:Object(i["withCtx"])(()=>[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.groupNames,(t,n)=>Object(i["withDirectives"])((Object(i["openBlock"])(),Object(i["createBlock"])(b,{key:n,onClick:n=>e.getSpecificComplaints(t.value),detail:!0,color:e.ActiveCategory===t.label?"light":""},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(d,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(r,{class:"his-md-text"},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick","color"])),[[i["vShow"],t.other.display]])),128))]),_:1})]),_:1}),e.ActiveCategory?(Object(i["openBlock"])(),Object(i["createBlock"])(h,{key:0,style:{overflowY:"auto",height:"75vh"}},{default:Object(i["withCtx"])(()=>[Object(i["createElementVNode"])("div",o,[Object(i["createVNode"])(f,{class:"view-port-content"},{default:Object(i["withCtx"])(()=>[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.activeCategoryItems,(t,n)=>Object(i["withDirectives"])((Object(i["openBlock"])(),Object(i["createBlock"])(b,{key:n,color:t.isChecked?"light":""},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(d,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(r,{class:"his-md-text"},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1024),Object(i["createVNode"])(m,{slot:"end",modelValue:t.isChecked,"onUpdate:modelValue":e=>t.isChecked=e,onIonChange:n=>e.onselect(t,n),disabled:null===t||void 0===t?void 0:t.disabled},null,8,["modelValue","onUpdate:modelValue","onIonChange","disabled"])]),_:2},1032,["color"])),[[i["vShow"],t.other.display]])),128))]),_:1})])]),_:1})):Object(i["createCommentVNode"])("",!0),e.showKeyboard?(Object(i["openBlock"])(),Object(i["createBlock"])(y,{key:1,kbConfig:e.keyboard,onKeyPress:e.keypress},null,8,["kbConfig","onKeyPress"])):Object(i["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1},8,["showFull"])])}n("14d9");var c=n("d867"),l=n("82a9"),s=n("331e"),r=n("2ef0"),d=n("db10"),u=Object(i["defineComponent"])({components:{IonCheckbox:c["k"],IonText:c["O"],IonChip:c["l"],HisKeyboard:d["a"]},name:"HisComplaintsPicker",mixins:[l["default"]],data:()=>({complaintsList:{},ActiveCategory:"",allComplainList:{},displayComplainList:{},groupNames:[],showKeyboard:!1,groupData:[]}),methods:{async init(){this.$emit("onFieldActivated",this);const e=await s["a"].getComplaintsList("Presenting complaint group");this.listData=this.mapListToOptions(e),this.groupData=e,this.groupNames=this.listData;for(const t in this.listData){const e=this.listData[t].label,n=await s["a"].getComplaintsList(e);this.allComplainList[e]=this.mapListToOptions(n,e)}this.$emit("onValue",this.getChecked(this.complaintsList))},async onselect(e,t){this.$nextTick(async()=>{const n={...e};if(n.isChecked=t.target.checked,this.onValue&&n.isChecked){const e=await this.onValue(n);if(!e)return t.target.checked=!1}this.onValueUpdate&&(this.complaintsList=await this.onValueUpdate({...this.complaintsList},n)),this.$emit("onValue",this.getChecked(this.complaintsList))})},async onKBValue(e){if(""!=e){for(const e in this.groupNames)this.groupNames[e].other["display"]=!1;for(const t in this.listData){let n="";const i=this.listData[t].label,o=[],a=this.allComplainList[i];for(const t in a){const c=a[t].label;c.toLowerCase().match(e.toLowerCase())&&i?(a[t].other["display"]=!0,o.push(a[t]),n=i,this.ActiveCategory=i):(a[t].other["display"]=!1,o.push(a[t]))}if(""!=n)for(const e in this.groupNames)this.groupNames[e].label==i&&(this.groupNames[e].other["display"]=!0);this.allComplainList[i]=o}this.complaintsList[this.ActiveCategory]=this.allComplainList[this.ActiveCategory]}else{for(const e in this.listData){const t=this.listData[e].label,n=[],i=this.allComplainList[t];for(const e in i)i[e].other["display"]=!0,n.push(i[e]);this.allComplainList[t]=n}this.groupNames=this.mapListToOptions(this.groupData),console.log(this.groupNames),this.ActiveCategory=""}},keyboardStatus(){this.showKeyboard=!this.showKeyboard},async getSpecificComplaints(e){e in this.complaintsList||(this.complaintsList[e]=this.allComplainList[e]),this.ActiveCategory=e},mapListToOptions(e,t=""){if(Object(r["isEmpty"])(e))return[];const n={display:!0};return e.map(e=>{const i={label:e.name,value:e.name,isChecked:!1,other:{...e,...n}};return t&&(i.other.parent=t),i})},uncheck(e){this.complaintsList[e.other.parent].forEach(t=>{t.label===e.label&&(t.isChecked=!1)})},getChecked(e){const t=[];for(const n in e)t.push(...e[n].filter(e=>e.isChecked));return t}},computed:{checkedItems(){return this.getChecked(this.complaintsList)},activeCategoryItems(){return this.complaintsList[this.ActiveCategory]}},watch:{clear(){for(const e in this.complaintsList)this.complaintsList[e]=this.complaintsList[e].map(e=>(e.isChecked=!1,e))}},mounted(){this.init()},activated(){this.init()}}),h=(n("9b18"),n("6b0d")),p=n.n(h);const b=p()(u,[["render",a],["__scopeId","data-v-258aa704"]]);t["default"]=b},"86f4":function(e,t,n){"use strict";n("4910")},"9b18":function(e,t,n){"use strict";n("028c")},a4d3:function(e,t,n){"use strict";n("a6f7")},a6f7:function(e,t,n){},c924:function(e,t,n){"use strict";var i=n("7a23");function o(e,t,n,o,a,c){const l=Object(i["resolveComponent"])("ion-button");return Object(i["openBlock"])(),Object(i["createElementBlock"])("table",null,[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.layout,(t,n)=>(Object(i["openBlock"])(),Object(i["createElementBlock"])("tr",{key:n},[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(t,(n,o)=>(Object(i["openBlock"])(),Object(i["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+o},[n?(Object(i["openBlock"])(),Object(i["createBlock"])(l,{key:0,style:Object(i["normalizeStyle"])({width:e.btnSize}),class:Object(i["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(i["createCommentVNode"])("",!0)]))),128))]))),128))])}var a=n("d867"),c=Object(i["defineComponent"])({components:{IonButton:a["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),l=n("6b0d"),s=n.n(l);const r=s()(c,[["render",o]]);t["a"]=r},db10:function(e,t,n){"use strict";var i=n("7a23");const o={class:"his-floating-keyboard"},a={class:"his-floating-keyboard-content"};function c(e,t,n,c,l,s){const r=Object(i["resolveComponent"])("base-keyboard");return Object(i["openBlock"])(),Object(i["createElementBlock"])("div",o,[Object(i["createElementVNode"])("div",a,[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.activeLayout,(t,n)=>(Object(i["openBlock"])(),Object(i["createElementBlock"])("div",{key:n},[Object(i["createVNode"])(r,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var l=n("6be2"),s=n("c924"),r=Object(i["defineComponent"])({components:{BaseKeyboard:s["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=l["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=l["a"][t].keyboard,!0)}}}),d=n("6b0d"),u=n.n(d);const h=u()(r,[["render",c]]);t["a"]=h}}]);
//# sourceMappingURL=TouchFormElement21.c97c7ddb.js.map