(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement16","TouchFormElement38","TouchFormElement5","TouchFormElement8"],{"0a79":function(e,t,n){"use strict";var l=n("7a23");const o=Object(l["withScopeId"])("data-v-7c293cad"),a=o((function(e,t,n,o,a,c){return Object(l["openBlock"])(),Object(l["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(l["renderSlot"])(e.$slots,"default")],2)}));var c=Object(l["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),r=(n("a4d3"),n("6b0d")),i=n.n(r);const u=i()(c,[["render",a],["__scopeId","data-v-7c293cad"]]);t["a"]=u},"36ad":function(e,t,n){"use strict";n.r(t);var l=n("7a23");const o=Object(l["withScopeId"])("data-v-64dded10"),a=o((function(e,t,n,o,a,c){const r=Object(l["resolveComponent"])("ion-input");return Object(l["openBlock"])(),Object(l["createBlock"])(r,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[1]||(t[1]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences"},null,8,["modelValue","type","disabled","readonly"])}));var c=n("8a30"),r=n("2ed9"),i=Object(l["defineComponent"])({name:"HisInput",components:{IonInput:c["v"]},setup(){const{activePlatformProfile:e}=Object(r["e"])(),t=Object(l["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1}}}),u=(n("ba6e"),n("6b0d")),d=n.n(u);const s=d()(i,[["render",a],["__scopeId","data-v-64dded10"]]);t["default"]=s},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return l})),n.d(t,"l",(function(){return o})),n.d(t,"e",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"k",(function(){return r})),n.d(t,"i",(function(){return i})),n.d(t,"g",(function(){return u})),n.d(t,"a",(function(){return d})),n.d(t,"j",(function(){return s})),n.d(t,"c",(function(){return b})),n.d(t,"h",(function(){return p})),n.d(t,"f",(function(){return f}));const l=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],c=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],r=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],u=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],d=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],s=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],b=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"4f41":function(e,t,n){},"51c8":function(e,t,n){"use strict";n.r(t);var l=n("7a23"),o=Object(l["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const a=o;t["default"]=a},5498:function(e,t,n){"use strict";n("4f41")},"5c0e":function(e,t,n){},a4d3:function(e,t,n){"use strict";n("a6f7")},a6f7:function(e,t,n){},ba6e:function(e,t,n){"use strict";n("5c0e")},e6e9:function(e,t,n){"use strict";var l=n("7a23");const o=Object(l["createTextVNode"])(" Close "),a=Object(l["createTextVNode"])(" Clear "),c=Object(l["createTextVNode"])(" Done ");function r(e,t,n,r,i,u){const d=Object(l["resolveComponent"])("ion-title"),s=Object(l["resolveComponent"])("ion-toolbar"),b=Object(l["resolveComponent"])("ion-header"),p=Object(l["resolveComponent"])("ion-content"),f=Object(l["resolveComponent"])("ion-button"),h=Object(l["resolveComponent"])("ion-footer"),j=Object(l["resolveComponent"])("ion-page");return Object(l["openBlock"])(),Object(l["createBlock"])(j,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(b,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(s,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(d,{class:"his-lg-text ion-text-center"},{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(Object(l["toDisplayString"])(e.currentField.helpText),1)]),_:1})]),_:1})]),_:1}),Object(l["createVNode"])(p,null,{default:Object(l["withCtx"])(()=>[(Object(l["openBlock"])(),Object(l["createBlock"])(l["KeepAlive"],null,[(Object(l["openBlock"])(),Object(l["createBlock"])(Object(l["resolveDynamicComponent"])(e.currentField.type),{key:e.currentField.id,currentFieldig:e.currentField.currentFieldig,options:e.currentField.options,preset:e.currentField.preset,clear:e.valueClearIndex,fdata:e.formData,config:e.currentField.config,cdata:e.computedFormData,activationState:e.state,onValue:e.currentField.onValue,defaultValue:e.currentField.defaultValue,onValueUpdate:e.currentField.onValueUpdate,onOnValue:e.onFieldValue},null,8,["currentFieldig","options","preset","clear","fdata","config","cdata","activationState","onValue","defaultValue","onValueUpdate","onOnValue"]))],1024))]),_:1}),Object(l["createVNode"])(h,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(s,{color:"light"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(f,{disabled:e.disableBtn,onClick:e.onClose,slot:"start",color:"danger",size:"large"},{default:Object(l["withCtx"])(()=>[o]),_:1},8,["disabled","onClick"]),Object(l["createVNode"])(f,{disabled:e.disableBtn,onClick:e.onClear,slot:"end",color:"warning",size:"large"},{default:Object(l["withCtx"])(()=>[a]),_:1},8,["disabled","onClick"]),Object(l["createVNode"])(f,{disabled:e.disableBtn,onClick:e.onDone,slot:"end",color:"success",size:"large"},{default:Object(l["withCtx"])(()=>[c]),_:1},8,["disabled","onClick"])]),_:1})]),_:1})]),_:1})}var i=n("b5e4"),u=n("d95e"),d=n("8a30");function s(){const e={};return u["a"].forEach(t=>{e[t]=Object(l["defineAsyncComponent"])(()=>n("f159")(`./${t}.vue`))}),e}var b=Object(l["defineComponent"])({name:"SingleFieldTouchForm",components:{IonPage:d["D"],IonContent:d["n"],IonFooter:d["o"],IonToolbar:d["S"],IonButton:d["d"],IonHeader:d["q"],IonTitle:d["R"],...s()},props:{dismissType:{type:String},onFinish:{type:Function,required:!0},currentField:{type:Object,required:!0}},data:()=>({valueClearIndex:0,formData:{},computedFormData:{},state:"",value:null,disableBtn:!1}),methods:{onClose(){"modal"===this.dismissType?d["Z"].dismiss():this.$router.back()},onClear(){this.valueClearIndex+=1,this.value=null},onFieldValue(e){this.value=e},onDone(){if(this.disableBtn=!0,this.currentField.validation){const e=this.currentField.validation(this.value);if(this.disableBtn=!1,e)return Object(i["e"])(e.join(", "),6e4)}try{this.onFinish(this.value)}catch(e){Object(i["c"])(e),console.error(e)}this.onClose(),this.disableBtn=!1}}}),p=n("6b0d"),f=n.n(p);const h=f()(b,[["render",r]]);t["a"]=h},f2ab:function(e,t,n){"use strict";n.r(t);var l=n("7a23");const o=Object(l["withScopeId"])("data-v-0ab95172");Object(l["pushScopeId"])("data-v-0ab95172");const a=Object(l["createTextVNode"])("Product Code"),c=Object(l["createTextVNode"])("Total Tins"),r=Object(l["createTextVNode"])("Expiry Date"),i=Object(l["createTextVNode"])("Batch Number"),u=Object(l["createTextVNode"])("Add row");Object(l["popScopeId"])();const d=o((function(e,t,n,d,s,b){const p=Object(l["resolveComponent"])("his-text-input"),f=Object(l["resolveComponent"])("ion-item"),h=Object(l["resolveComponent"])("ion-list"),j=Object(l["resolveComponent"])("ion-col"),O=Object(l["resolveComponent"])("ion-label"),m=Object(l["resolveComponent"])("ion-input"),g=Object(l["resolveComponent"])("ion-row"),v=Object(l["resolveComponent"])("ion-button"),y=Object(l["resolveComponent"])("ion-grid"),C=Object(l["resolveComponent"])("view-port");return Object(l["openBlock"])(),Object(l["createBlock"])(C,null,{default:o(()=>[Object(l["createVNode"])(p,{readonly:"",value:e.fullSelectedDrugName},null,8,["value"]),Object(l["createVNode"])(y,{style:{background:"white"}},{default:o(()=>[Object(l["createVNode"])(g,null,{default:o(()=>[Object(l["createVNode"])(j,{size:"4",class:"border-right scroll-list"},{default:o(()=>[(Object(l["openBlock"])(!0),Object(l["createBlock"])(l["Fragment"],null,Object(l["renderList"])(e.drugs,(t,n)=>(Object(l["openBlock"])(),Object(l["createBlock"])(h,{key:n},{default:o(()=>[Object(l["createVNode"])(f,{detail:"",color:n===e.selectedDrug?"secondary":"",onClick:t=>e.selectDrug(n)},{default:o(()=>[Object(l["createTextVNode"])(Object(l["toDisplayString"])(`${t.shortName} (${t.packSizes[0]})`),1)]),_:2},1032,["color","onClick"])]),_:2},1024))),128))]),_:1}),Object(l["createVNode"])(j,null,{default:o(()=>[null!==e.selectedDrug?(Object(l["openBlock"])(),Object(l["createBlock"])(y,{key:0,class:"scroll-list"},{default:o(()=>[(Object(l["openBlock"])(!0),Object(l["createBlock"])(l["Fragment"],null,Object(l["renderList"])(e.drugs[e.selectedDrug].entries,(t,n)=>(Object(l["openBlock"])(),Object(l["createBlock"])(g,{key:n},{default:o(()=>[Object(l["createVNode"])(j,null,{default:o(()=>[Object(l["createVNode"])(f,null,{default:o(()=>[Object(l["createVNode"])(O,{position:"floating"},{default:o(()=>[a]),_:1}),Object(l["createVNode"])(m,{readonly:"",placeholder:"e.g. ABC123",value:t.productCode,onClick:t=>e.enterProductCode(n)},null,8,["value","onClick"])]),_:2},1024)]),_:2},1024),Object(l["createVNode"])(j,null,{default:o(()=>[Object(l["createVNode"])(f,null,{default:o(()=>[Object(l["createVNode"])(O,{position:"floating"},{default:o(()=>[c]),_:1}),Object(l["createVNode"])(m,{readonly:"",placeholder:"0",value:e.fmtNumber(t.tins),onClick:t=>e.enterTins(n)},null,8,["value","onClick"])]),_:2},1024)]),_:2},1024),Object(l["createVNode"])(j,null,{default:o(()=>[Object(l["createVNode"])(f,null,{default:o(()=>[Object(l["createVNode"])(O,{position:"floating"},{default:o(()=>[r]),_:1}),Object(l["createVNode"])(m,{readonly:"",placeholder:"DD/MM/YYYY",value:e.fmtDate(t.expiry),onClick:t=>e.enterExpiry(n)},null,8,["value","onClick"])]),_:2},1024)]),_:2},1024),Object(l["createVNode"])(j,null,{default:o(()=>[Object(l["createVNode"])(f,null,{default:o(()=>[Object(l["createVNode"])(O,{position:"floating"},{default:o(()=>[i]),_:1}),Object(l["createVNode"])(m,{readonly:"",placeholder:"e.g. 'ABC-123'",value:t.batchNumber,onClick:t=>e.enterBatch(n)},null,8,["value","onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)),Object(l["createVNode"])(g,null,{default:o(()=>[Object(l["createVNode"])(j,null,{default:o(()=>[Object(l["createVNode"])(v,{onClick:e.addRow,siz:"large"},{default:o(()=>[u]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})):Object(l["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})]),_:1})}));var s=n("0a79"),b=n("51c8"),p=n("8a30"),f=n("2ef0"),h=n("e6e9"),j=n("d95e"),O=n("2706"),m=n("1c74"),g=n("36ad"),v=n("3800"),y=n("0011"),C=Object(l["defineComponent"])({components:{HisTextInput:g["default"],ViewPort:s["a"],IonInput:p["v"],IonLabel:p["x"],IonList:p["y"],IonItem:p["w"],IonGrid:p["p"],IonCol:p["m"],IonRow:p["H"],IonButton:p["d"]},mixins:[b["default"]],data:()=>({drugs:[],allDrugsByName:[],selectedDrug:null}),mounted(){this.init()},async activated(){this.init()},methods:{fmtNumber(e){return Object(y["f"])(e)},fmtDate(e){return Object(y["e"])(e)},async init(){this.$emit("onFieldActivated",this),await this.setDefaultValue()},async setDefaultValue(){const e=await this.options();this.drugs=this.drugs.filter(t=>e.map(e=>e.label).includes(t.label)),e.forEach(e=>{const t={tabs:e.value.packSizes[0],tins:null,expiry:null,batchNumber:null,productCode:null},n={label:e.label,entries:[{...t},{...t},{...t}],...e.value},l=Object(f["find"])(this.drugs,{label:e.label});l||this.drugs.push(n)}),this.drugs.length>=1&&this.selectDrug(0)},getModalTitle(e){return`${e} (${this.drugs[this.selectedDrug].shortName})`},getDrugValue(e,t){return this.drugs[this.selectedDrug].entries[e][t]},setDrugValue(e,t,n){this.drugs[this.selectedDrug].entries[e][t]=n?n.value:""},enterTins(e){this.launchKeyPad({id:"tins",helpText:this.getModalTitle("Enter number of tins"),type:j["b"].TT_NUMBER,defaultValue:()=>this.getDrugValue(e,"tins"),validation:e=>!e||e&&!e.value?null:O["a"].validateSeries([()=>O["a"].isNumber(e),()=>e.value<=0?["Number of tins must be greater than 1"]:null])},t=>this.setDrugValue(e,"tins",t))},enterBatch(e){this.launchKeyPad({id:"batch",helpText:this.getModalTitle("Enter batch number"),type:j["b"].TT_TEXT,config:{customKeyboard:[v["c"],[["Delete"]]]},defaultValue:()=>this.getDrugValue(e,"batchNumber")},t=>{const n={...t},l=(""+n.value).toUpperCase();n.label=l,n.value=l,this.setDrugValue(e,"batchNumber",n)})},enterProductCode(e){this.launchKeyPad({id:"code",helpText:this.getModalTitle("Enter Product Code"),type:j["b"].TT_TEXT,config:{customKeyboard:[v["c"],[["Delete"]]]},defaultValue:()=>this.getDrugValue(e,"productCode")},t=>{const n={...t},l=(""+n.value).toUpperCase();n.label=l,n.value=l,this.setDrugValue(e,"productCode",n)})},enterExpiry(e){this.launchKeyPad({id:"expiry",helpText:this.getModalTitle("Enter expiry date"),type:j["b"].TT_FULL_DATE,defaultValue:()=>this.getDrugValue(e,"expiry"),validation:e=>{if(e&&e.value)return new Date(e.value)<new Date(m["e"].getSessionDate())?["You are not allowed to enter expired drugs"]:null}},t=>this.setDrugValue(e,"expiry",t))},async launchKeyPad(e,t){const n=await p["Z"].create({component:h["a"],backdropDismiss:!1,cssClass:"full-modal",componentProps:{dismissType:"modal",currentField:e,onFinish:t}});n.present()},addRow(){this.drugs[this.selectedDrug].entries.push({tabs:this.drugs[this.selectedDrug].packSizes[0],tins:null,expiry:null,batchNumber:null,productCode:null})},selectDrug(e){this.selectedDrug=e},validateEntry(e){return!Object(f["isEmpty"])(e.tins)&&!Object(f["isEmpty"])(e.expiry)&&!Object(f["isEmpty"])(e.batchNumber)&&!Object(f["isEmpty"])(e.productCode)}},computed:{fullSelectedDrugName(){try{return this.drugs[this.selectedDrug].fullName}catch(e){return"N/A"}},enteredDrugs(){const e=[];return this.drugs.forEach(t=>{const n=t.entries.filter(e=>this.validateEntry(e));n.forEach(n=>{e.push({label:t.shortName,value:{...n,...t}})})}),e}},watch:{clear(){this.drugs=this.drugs.map(e=>(e.entries=e.entries.map(e=>(e.tins=null,e.expiry=null,e.batchNumber=null,e.productCode=null,e)),e))},drugs:{handler(){this.$emit("onValue",this.enteredDrugs)},immediate:!0,deep:!0}}}),V=(n("5498"),n("6b0d")),N=n.n(V);const D=N()(C,[["render",d],["__scopeId","data-v-0ab95172"]]);t["default"]=D}}]);
//# sourceMappingURL=TouchFormElement16.43cfbb39.js.map