(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement17","TouchFormElement5","TouchFormElement8"],{"10be":function(e,t,n){"use strict";var o=n("7a23");const l={class:"keypad"};function a(e,t,n,a,c,r){const i=Object(o["resolveComponent"])("ion-input"),s=Object(o["resolveComponent"])("ion-chip"),u=Object(o["resolveComponent"])("center"),d=Object(o["resolveComponent"])("base-keyboard"),b=Object(o["resolveComponent"])("ion-content");return Object(o["openBlock"])(),Object(o["createBlock"])(b,null,{default:Object(o["withCtx"])(()=>[Object(o["createElementVNode"])("div",l,[Object(o["createVNode"])(i,{value:e.value,disabled:!0,class:"keypad-input"},null,8,["value"]),Object(o["createVNode"])(u,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.title||"keypad"),1)]),_:1})]),_:1}),Object(o["createVNode"])(d,{btnSize:"96px",layout:e.keypad,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])])]),_:1})}var c=n("c924"),r=n("3800"),i=n("2345"),s=n("fe70"),u=Object(o["defineComponent"])({components:{BaseKeyboard:c["a"]},props:{title:{type:String},preset:{type:String},onKeyPress:{type:Function,required:!0},strictNumbers:{type:Boolean,default:!1}},data:()=>({value:"0",keypad:r["d"]}),watch:{preset:{handler(e){e&&(this.value=e.toString())},immediate:!0}},methods:{async keypress(e){if(e.match(/done/i))await s["j"].dismiss(this.value);else if(this.strictNumbers){if(e.includes(".")&&this.value.includes("."))return;e.includes(".")||"0"!==this.value||(this.value=""),this.value=Object(i["a"])(e,this.value),this.value||(this.value="0"),""+parseInt(this.value)===this.value?this.onKeyPress(parseInt(this.value)):this.onKeyPress(this.value)}else this.value=Object(i["a"])(e,this.value),this.onKeyPress(this.value)}}}),d=(n("27f1"),n("d959")),b=n.n(d);const p=b()(u,[["render",a],["__scopeId","data-v-7454247c"]]);t["a"]=p},2345:function(e,t,n){"use strict";function o(e,t,n){let o=t;if(e.match(/enter/i))return o+"\r\n";if(e.match(/clear/i))return"";if(o=e.match(/delete|del/i)?o.match(/unknown/i)||o.match(/n\/a/i)?"":o.substring(0,o.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":o.match(/unknown/i)||o.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof o&&o)switch(n){case"lowercase":o=o.toLowerCase();break;case"uppercase":o=o.toUpperCase();break;default:o=o.charAt(0).toUpperCase()+o.slice(1);break}return o}n.d(t,"a",(function(){return o}))},"27f1":function(e,t,n){"use strict";n("3f97")},"36ad":function(e,t,n){"use strict";n.r(t);var o=n("7a23");function l(e,t,n,l,a,c){const r=Object(o["resolveComponent"])("ion-input");return Object(o["openBlock"])(),Object(o["createBlock"])(r,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[0]||(t[0]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences",placeholder:e.placeholder},null,8,["modelValue","type","disabled","readonly","placeholder"])}var a=n("d867"),c=n("2ed9"),r=Object(o["defineComponent"])({name:"HisInput",components:{IonInput:a["v"]},setup(){const{activePlatformProfile:e}=Object(c["e"])(),t=Object(o["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1},placeholder:{type:String,default:()=>""}}}),i=(n("86f4"),n("d959")),s=n.n(i);const u=s()(r,[["render",l],["__scopeId","data-v-04472bbc"]]);t["default"]=u},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"k",(function(){return l})),n.d(t,"f",(function(){return a})),n.d(t,"n",(function(){return c})),n.d(t,"e",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"m",(function(){return s})),n.d(t,"j",(function(){return u})),n.d(t,"h",(function(){return d})),n.d(t,"a",(function(){return b})),n.d(t,"l",(function(){return p})),n.d(t,"c",(function(){return h})),n.d(t,"i",(function(){return j})),n.d(t,"g",(function(){return O}));const o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],i=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],b=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],j=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],O=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"3f97":function(e,t,n){},5148:function(e,t,n){"use strict";n.r(t);var o=n("7a23");function l(e,t,n,l,a,c){const r=Object(o["resolveComponent"])("his-text-input"),i=Object(o["resolveComponent"])("ion-item"),s=Object(o["resolveComponent"])("ion-list"),u=Object(o["resolveComponent"])("ion-col"),d=Object(o["resolveComponent"])("ion-label"),b=Object(o["resolveComponent"])("ion-input"),p=Object(o["resolveComponent"])("ion-row"),h=Object(o["resolveComponent"])("ion-grid"),j=Object(o["resolveComponent"])("view-port");return Object(o["openBlock"])(),Object(o["createBlock"])(j,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(r,{readonly:"",value:e.fullSelectedDrugName},null,8,["value"]),Object(o["createVNode"])(h,{style:{background:"white"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(p,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(u,{size:"4",class:"border-right scroll-list"},{default:Object(o["withCtx"])(()=>[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.drugs,(t,n)=>(Object(o["openBlock"])(),Object(o["createBlock"])(s,{key:n},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(i,{detail:"",color:n===e.selectedDrug?"secondary":"",onClick:t=>e.selectDrug(n)},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(t.label),1)]),_:2},1032,["color","onClick"])]),_:2},1024))),128))]),_:1}),Object(o["createVNode"])(u,null,{default:Object(o["withCtx"])(()=>[null!==e.selectedDrug?(Object(o["openBlock"])(),Object(o["createBlock"])(h,{key:0,class:"scroll-list"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(p,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(u,{size:"12",class:"ion-margin-bottom"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])(()=>{var t;return[Object(o["createVNode"])(d,{position:"floating"},{default:Object(o["withCtx"])(()=>{var t;return[Object(o["createTextVNode"])("Available Tins/Pallets (pack size: "+Object(o["toDisplayString"])(null===(t=e.drugs[e.selectedDrug].other)||void 0===t?void 0:t.pack_size)+"):",1)]}),_:1}),Object(o["createVNode"])(b,{readonly:"",disabled:"",value:e.fmtNumber(null===(t=e.drugs[e.selectedDrug].other)||void 0===t?void 0:t.quantity)},null,8,["value"])]}),_:1})]),_:1}),Object(o["createVNode"])(u,{size:"12"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])(()=>{var t;return[Object(o["createVNode"])(d,{position:"floating"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])("Total Tins Relocated/Disposed")]),_:1}),Object(o["createVNode"])(b,{readonly:"",color:"primary",value:e.fmtNumber((null===(t=e.drugs[e.selectedDrug].other)||void 0===t?void 0:t.tins)||0),onClick:e.enterTins},null,8,["value","onClick"])]}),_:1})]),_:1}),Object(o["createVNode"])(u,{size:"12"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])(()=>{var t;return[Object(o["createVNode"])(d,{position:"floating"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])("Reason for Relocating/Disposing")]),_:1}),Object(o["createVNode"])(b,{readonly:"",color:"primary",placeholder:"select reason",value:(null===(t=e.drugs[e.selectedDrug].other)||void 0===t?void 0:t.reason)||"",onClick:e.selectReason},null,8,["value","onClick"])]}),_:1})]),_:1})]),_:1})]),_:1})):Object(o["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})]),_:1})}var a=n("0a79"),c=n("51c8"),r=n("d867"),i=n("d95e"),s=n("2706"),u=n("36ad"),d=n("0011"),b=n("c731"),p=Object(o["defineComponent"])({components:{ViewPort:a["a"],IonGrid:r["p"],IonList:r["y"],IonCol:r["m"],IonRow:r["H"],IonItem:r["w"],IonLabel:r["x"],IonInput:r["v"],HisTextInput:u["default"]},mixins:[c["default"]],data:()=>({drugs:[],selectedDrug:null}),async activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this),this.drugs=await this.options(),this.drugs.length>=1&&this.selectDrug(0)},fmtNumber(e){return Object(d["i"])(e)},getModalTitle(e){return`${e} (${this.drugs[this.selectedDrug].label})`},getDrugValue(e){return this.drugs[this.selectedDrug].other[e]},setDrugValue(e,t){this.drugs[this.selectedDrug].other[e]=t?t.value:""},enterTins(){Object(b["b"])({id:"tins",helpText:this.getModalTitle("Enter number of tins"),type:i["b"].TT_NUMBER,defaultValue:()=>this.getDrugValue("tins"),validation:e=>!e||e&&!e.value?null:s["a"].validateSeries([()=>s["a"].isNumber(e),()=>e.value<=0?["Number of tins must be greater than 1"]:null,()=>e.value>this.getDrugValue("quantity")?["You cannot dispose/relocate more than available tins"]:null])},e=>this.setDrugValue("tins",e))},async selectReason(){const e=this.getDrugValue("batch_number");Object(b["b"])({id:"reason",helpText:this.getModalTitle("Select reason for disposing/relocating Batch "+e),type:i["b"].TT_SELECT,defaultValue:()=>this.getDrugValue("reason"),validation:e=>s["a"].required(e),options:()=>{var e;return(null===(e=this.config)||void 0===e?void 0:e.getReasons(this.drugs[this.selectedDrug],this.fdata))||[]}},e=>{this.setDrugValue("reason",e)})},selectDrug(e){this.selectedDrug=e}},computed:{fullSelectedDrugName(){try{var e,t,n;const[o,l,,a]=null!==(e=null===(t=this.drugs[this.selectedDrug])||void 0===t||null===(n=t.description)||void 0===n?void 0:n.text.split("-"))&&void 0!==e?e:"",c=this.drugs[this.selectedDrug].label;return`${c} (${o}-${l}-${a})`}catch(o){return"N/A"}},updatedDrugs(){return this.drugs.filter(e=>{var t,n;return!(null===(t=e.other)||void 0===t||!t.tins)&&!(null===(n=e.other)||void 0===n||!n.reason)})}},watch:{clear(){this.drugs=this.drugs.map(e=>(e.other={...e.other,tins:null,quantity:e.current_quantity/e.pack_size||1,reason:""},e))},drugs:{async handler(){this.$emit("onValue",this.updatedDrugs)},immediate:!0,deep:!0}}}),h=(n("d5e3"),n("d959")),j=n.n(h);const O=j()(p,[["render",l],["__scopeId","data-v-2e37db58"]]);t["default"]=O},"51c8":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),l=Object(o["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const a=l;t["default"]=a},"86f4":function(e,t,n){"use strict";n("89a0")},"89a0":function(e,t,n){},b01e:function(e,t,n){},c731:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return s}));var o=n("d867"),l=n("e6e9"),a=n("9441"),c=n("10be");async function r(e,t,n=null){(await o["Z"].create({component:a["a"],backdropDismiss:!1,cssClass:"full-modal",componentProps:{onFinish:t,fields:e,skipSummary:!0,disableAutoModalDismiss:!0,cancelAction:()=>{"function"===typeof n&&n(),o["Z"].dismiss()}}})).present()}async function i(e,t={}){const n="boolean"!==typeof(null===t||void 0===t?void 0:t.strictNumbers)||(null===t||void 0===t?void 0:t.strictNumbers),l=await o["Z"].create({component:c["a"],backdropDismiss:!1,cssClass:"keypad-modal custom-modal-backdrop",componentProps:{title:(null===t||void 0===t?void 0:t.title)||"",preset:(null===t||void 0===t?void 0:t.preset)||"",toggleButton:null===t||void 0===t?void 0:t.toggleButton,strictNumbers:n,customKeyboard:null===t||void 0===t?void 0:t.customKeyboard,noFloat:"boolean"===typeof(null===t||void 0===t?void 0:t.noFloat)&&t.noFloat,onKeyPress(t,o){e(n?parseInt(t):t,o)}}});l.present()}async function s(e,t){(await o["Z"].create({component:l["a"],backdropDismiss:!1,cssClass:"full-modal",componentProps:{dismissType:"modal",currentField:e,onFinish:t}})).present()}},c924:function(e,t,n){"use strict";var o=n("7a23");function l(e,t,n,l,a,c){const r=Object(o["resolveComponent"])("ion-button");return Object(o["openBlock"])(),Object(o["createElementBlock"])("table",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.layout,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:n},[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(t,(n,l)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+l},[n?(Object(o["openBlock"])(),Object(o["createBlock"])(r,{key:0,style:Object(o["normalizeStyle"])({width:e.btnSize}),class:Object(o["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(o["createCommentVNode"])("",!0)]))),128))]))),128))])}var a=n("d867"),c=Object(o["defineComponent"])({components:{IonButton:a["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),r=n("d959"),i=n.n(r);const s=i()(c,[["render",l]]);t["a"]=s},d5e3:function(e,t,n){"use strict";n("b01e")},e6e9:function(e,t,n){"use strict";var o=n("7a23");function l(e,t,n,l,a,c){const r=Object(o["resolveComponent"])("ion-title"),i=Object(o["resolveComponent"])("ion-toolbar"),s=Object(o["resolveComponent"])("ion-header"),u=Object(o["resolveComponent"])("ion-content"),d=Object(o["resolveComponent"])("ion-button"),b=Object(o["resolveComponent"])("ion-footer"),p=Object(o["resolveComponent"])("ion-page");return Object(o["openBlock"])(),Object(o["createBlock"])(p,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(i,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(r,{class:"his-lg-text ion-text-center"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.currentField.helpText),1)]),_:1})]),_:1})]),_:1}),Object(o["createVNode"])(u,null,{default:Object(o["withCtx"])(()=>[(Object(o["openBlock"])(),Object(o["createBlock"])(o["KeepAlive"],null,[(Object(o["openBlock"])(),Object(o["createBlock"])(Object(o["resolveDynamicComponent"])(e.currentField.type),{key:e.currentField.id,currentFieldig:e.currentField.currentFieldig,options:e.currentField.options,preset:e.currentField.preset,clear:e.valueClearIndex,fdata:e.formData,config:e.currentField.config,cdata:e.computedFormData,activationState:e.state,onValue:e.currentField.onValue,defaultValue:e.currentField.defaultValue,onValueUpdate:e.currentField.onValueUpdate,onOnValue:e.onFieldValue},null,40,["currentFieldig","options","preset","clear","fdata","config","cdata","activationState","onValue","defaultValue","onValueUpdate","onOnValue"]))],1024))]),_:1}),Object(o["createVNode"])(b,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(i,{color:"light"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(d,{disabled:e.disableBtn,onClick:e.onClose,slot:"start",color:"danger",size:"large"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Close ")]),_:1},8,["disabled","onClick"]),Object(o["createVNode"])(d,{disabled:e.disableBtn,onClick:e.onClear,slot:"end",color:"warning",size:"large"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Clear ")]),_:1},8,["disabled","onClick"]),Object(o["createVNode"])(d,{disabled:e.disableBtn,onClick:e.onDone,slot:"end",color:"success",size:"large"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Done ")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1})]),_:1})}var a=n("b5e4"),c=n("d95e"),r=n("d867");function i(){const e={};return c["a"].forEach(t=>{e[t]=Object(o["defineAsyncComponent"])(()=>n("f159")(`./${t}.vue`))}),e}var s=Object(o["defineComponent"])({name:"SingleFieldTouchForm",components:{IonPage:r["D"],IonContent:r["n"],IonFooter:r["o"],IonToolbar:r["S"],IonButton:r["d"],IonHeader:r["q"],IonTitle:r["R"],...i()},props:{dismissType:{type:String},onFinish:{type:Function,required:!0},currentField:{type:Object,required:!0}},data:()=>({valueClearIndex:0,formData:{},computedFormData:{},state:"",value:null,disableBtn:!1}),methods:{onClose(){"modal"===this.dismissType?r["Z"].dismiss():this.$router.back()},onClear(){this.valueClearIndex+=1,this.value=null},onFieldValue(e){this.value=e},onDone(){if(this.disableBtn=!0,this.currentField.validation){const e=this.currentField.validation(this.value);if(this.disableBtn=!1,e)return Object(a["e"])(e.join(", "),6e4)}try{this.onFinish(this.value)}catch(e){Object(a["c"])(""+e),console.error(e)}this.onClose(),this.disableBtn=!1}}}),u=n("d959"),d=n.n(u);const b=d()(s,[["render",l]]);t["a"]=b}}]);
//# sourceMappingURL=TouchFormElement17.b3cad301.js.map