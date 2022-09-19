(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement6","TouchFormElement51","TouchFormElement8"],{"05d5":function(e,t,c){"use strict";c.r(t);var n=c("7a23");const a=Object(n["withScopeId"])("data-v-561de733");Object(n["pushScopeId"])("data-v-561de733");const o={class:"view-port-content"},r={key:0,class:"his-card history"},i={class:"his-table"},l=Object(n["createVNode"])("tr",null,[Object(n["createVNode"])("th",null," Medication"),Object(n["createVNode"])("th",null," Date"),Object(n["createVNode"])("th",null," Amount dispensed ")],-1),s={key:1,class:"prescription-tab"},d={class:"prescription-table-section his-card"},u={class:"his-table"},b=Object(n["createVNode"])("tr",null,[Object(n["createVNode"])("th",null," Medication"),Object(n["createVNode"])("th",null," Amount in stock"),Object(n["createVNode"])("th",null," Amount needed"),Object(n["createVNode"])("th",null," Amount dispensed "),Object(n["createVNode"])("th",null," Reset ")],-1),p={class:"barcode-section"};Object(n["popScopeId"])();const O=a((function(e,t,c,O,j,f){const h=Object(n["resolveComponent"])("nav-button"),m=Object(n["resolveComponent"])("ion-col"),v=Object(n["resolveComponent"])("ion-input"),V=Object(n["resolveComponent"])("reset-button"),N=Object(n["resolveComponent"])("barcode"),k=Object(n["resolveComponent"])("ion-row"),y=Object(n["resolveComponent"])("view-port");return Object(n["openBlock"])(),Object(n["createBlock"])(y,null,{default:a(()=>[Object(n["createVNode"])("div",o,[Object(n["createVNode"])(k,null,{default:a(()=>[Object(n["createVNode"])(m,{size:"2"},{default:a(()=>[Object(n["createVNode"])(h,{onClick:t[1]||(t[1]=t=>e.tab="prescribe"),isActive:"prescribe"===e.tab,image:"prescription/rx",label:"Prescribed"},null,8,["isActive"]),Object(n["createVNode"])(h,{onClick:t[2]||(t[2]=t=>e.tab="history"),isActive:"history"===e.tab,image:"prescription/history",label:"History"},null,8,["isActive"])]),_:1}),Object(n["createVNode"])(m,{size:"10"},{default:a(()=>["history"===e.tab?(Object(n["openBlock"])(),Object(n["createBlock"])("div",r,[Object(n["createVNode"])("table",i,[l,(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.medicationHistory,(e,t)=>(Object(n["openBlock"])(),Object(n["createBlock"])("tr",{key:t},[Object(n["createVNode"])("td",null,Object(n["toDisplayString"])(e.medication),1),Object(n["createVNode"])("td",null,Object(n["toDisplayString"])(e.date),1),Object(n["createVNode"])("td",null,Object(n["toDisplayString"])(e.amount),1)]))),128))])])):Object(n["createCommentVNode"])("",!0),"prescribe"===e.tab?(Object(n["openBlock"])(),Object(n["createBlock"])("div",s,[Object(n["createVNode"])("div",d,[Object(n["createVNode"])("table",u,[b,(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.listData,(t,c)=>(Object(n["openBlock"])(),Object(n["createBlock"])("tr",{key:c},[Object(n["createVNode"])("td",null,Object(n["toDisplayString"])(t.label),1),Object(n["createVNode"])("td",null,Object(n["toDisplayString"])(e.isStockManagementEnabled&&t.other.available_stock?t.other.available_stock:"-"),1),Object(n["createVNode"])("td",null,Object(n["toDisplayString"])(t.other.amount_needed),1),Object(n["createVNode"])("td",null,[Object(n["createVNode"])(v,{disabled:t.value>0,value:t.value,onClick:c=>t.value<=0?e.launchDispenser(t):null,class:"dosage-input"},null,8,["disabled","value","onClick"])]),Object(n["createVNode"])("td",null,[Object(n["createVNode"])(V,{disabled:t.value<=0,onClick:c=>t.value>0?e.onReset(t):null},null,8,["disabled","onClick"])])]))),128))])]),Object(n["createVNode"])("div",p,[Object(n["createVNode"])(N,{onOnScan:e.onScan},null,8,["onOnScan"])])])):Object(n["createCommentVNode"])("",!0)]),_:1})]),_:1})])]),_:1})}));c("13d5");var j=c("0a79"),f=c("8a30"),h=c("efaf"),m=c("c850"),v=c("7653"),V=Object(n["withScopeId"])("data-v-7729d4c8");Object(n["pushScopeId"])("data-v-7729d4c8");var N={colspan:"6"},k=Object(n["createVNode"])("tr",null,[Object(n["createVNode"])("th",null,"Total tab(s) needed "),Object(n["createVNode"])("th",{colspan:"2"}," Available stock "),Object(n["createVNode"])("th",{colspan:"2"}," Dispensed "),Object(n["createVNode"])("th")],-1),y=Object(n["createVNode"])("tr",null,[Object(n["createVNode"])("th"),Object(n["createVNode"])("th",null," Pack size "),Object(n["createVNode"])("th",null," Packs "),Object(n["createVNode"])("th",null," Total Tab(s)"),Object(n["createVNode"])("th",null," Packs "),Object(n["createVNode"])("th")],-1),g={class:"btn-list"},w=Object(n["createTextVNode"])(" + "),C=Object(n["createTextVNode"])(" - "),S=Object(n["createTextVNode"])(" Close "),B=Object(n["createTextVNode"])(" Dispense ");Object(n["popScopeId"])();var D=V((function(e,t,c,a,o,r){var i=Object(n["resolveComponent"])("ion-button"),l=Object(n["resolveComponent"])("ion-content"),s=Object(n["resolveComponent"])("ion-toolbar"),d=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l,null,{default:V((function(){return[Object(n["createVNode"])("table",null,[Object(n["createVNode"])("thead",null,[Object(n["createVNode"])("tr",null,[Object(n["createVNode"])("th",N,Object(n["toDisplayString"])(e.drugName),1)]),k,y]),Object(n["createVNode"])("tbody",null,[Object(n["createVNode"])("tr",null,[Object(n["createVNode"])("td",{rowspan:e.amountNeededRowSpan},Object(n["toDisplayString"])(e.tabsNeeded)+" tab(s) ",9,["rowspan"])]),(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.listData,(function(t,c){return Object(n["openBlock"])(),Object(n["createBlock"])("tr",{key:c},[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(t,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])("td",{key:t,class:t>=2?"input-field":"his-md-text"},Object(n["toDisplayString"])(e),3)})),128)),Object(n["createVNode"])("td",null,[Object(n["createVNode"])("ul",g,[Object(n["createVNode"])("li",null,[Object(n["createVNode"])(i,{onClick:function(t){return e.incrementAmount(c)},class:"dispense-btn",size:"large"},{default:V((function(){return[w]})),_:1},8,["onClick"])]),Object(n["createVNode"])("li",null,[Object(n["createVNode"])(i,{onClick:function(t){return e.decrementAmount(c)},class:"dispense-btn",size:"large"},{default:V((function(){return[C]})),_:1},8,["onClick"])])])])])})),128))])])]})),_:1}),Object(n["createVNode"])(d,null,{default:V((function(){return[Object(n["createVNode"])(s,null,{default:V((function(){return[Object(n["createVNode"])(i,{onClick:e.onClose,color:"danger",size:"large",slot:"end"},{default:V((function(){return[S]})),_:1},8,["onClick"]),Object(n["createVNode"])(i,{onClick:t[1]||(t[1]=function(t){return e.onDispense(e.dispensedValues)}),disabled:e.totalTabs<=0,color:"success",size:"large",slot:"end"},{default:V((function(){return[B]})),_:1},8,["disabled"])]})),_:1})]})),_:1})],64)})),I=c("3835"),_=c("1da1"),x=c("2909"),T=(c("96cf"),c("d81d"),c("4de4"),c("d3b7"),Object(n["defineComponent"])({data:function(){return{listData:[],tabsIndex:2,packsIndex:3}},props:{drugName:{type:String,required:!0},tabsNeeded:{type:String,required:!0},items:{type:Array,required:!0},onDispense:{type:Function,required:!0}},computed:{dispensedValues:function(){var e=this;return this.listData.filter((function(t){return t[e.tabsIndex]>0})).map((function(t){return[t[e.tabsIndex],t[e.packsIndex]]}))},amountNeededRowSpan:function(){return this.listData.length+1}},watch:{items:{handler:function(e){e&&(this.listData=Object(x["a"])(e))},deep:!0,immediate:!0}},methods:{onClose:function(){return Object(_["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f["X"].dismiss({});case 2:case"end":return e.stop()}}),e)})))()},incrementAmount:function(e){var t=Object(I["a"])(this.listData[e],4),c=t[0],n=(t[1],t[2]),a=t[3],o=c+n,r=a+1;this.listData[e][2]=o,this.listData[e][3]=r},decrementAmount:function(e){var t=Object(I["a"])(this.listData[e],4),c=t[0],n=(t[1],t[2]),a=t[3],o=a-1;if(o>=0){var r=n-c;this.listData[e][2]=r,this.listData[e][3]=o}}}})),A=(c("1b4f"),c("6b0d")),F=c.n(A);const R=F()(T,[["render",D],["__scopeId","data-v-7729d4c8"]]);var q=R,z=c("51c8"),E=c("2ef0"),$=c("b5e4"),H=Object(n["defineComponent"])({components:{ViewPort:j["a"],Barcode:h["a"],NavButton:m["a"],ResetButton:v["a"],IonRow:f["H"],IonCol:f["m"]},mixins:[z["default"]],data:()=>({tab:"prescribe",listData:[],medicationHistory:[],isStockManagementEnabled:!1}),mounted(){this.init()},activated(){this.init()},watch:{tab:{handler(e){"history"===e&&Object(E["isEmpty"])(this.medicationHistory)&&"function"===typeof this.config.medicationHistory&&this.config.medicationHistory().then(e=>{e&&(this.medicationHistory=e)}).catch(e=>{Object($["c"])(""+e)})}}},methods:{async init(){var e,t;(this.$emit("onFieldActivated",this),"function"===typeof(null===(e=this.config)||void 0===e?void 0:e.isDrugManagementEnabled))&&(this.isStockManagementEnabled=null===(t=this.config)||void 0===t?void 0:t.isDrugManagementEnabled());this.listData=await this.options(this.fdata)},async onScan(e){const[t,c]=e.split("-"),n=this.listData.map(async e=>{if(e.other.drug_id===parseInt(t)){const t=parseInt(e.value.toString()),n=parseInt(c),a=await this.updateOnValue(e,n,[],!0);a&&(e.value=n+t)}return e});this.listData=await Promise.all(n)},async onReset(e){await this.updateOnValue(e,-1)},async updateOnValue(e,t,c=[],n=!1){if(this.onValue){const a=await this.onValue({label:e.label,other:{dispenses:c,...e.other},value:t},n);if(!a)return!1}return e.value=t<0?0:t,this.$emit("onValue",e),this.onValueUpdate&&(this.listData=await this.onValueUpdate(e,this.listData)),!0},async launchDispenser(e){const t=await f["X"].create({component:q,backdropDismiss:!1,cssClass:"custom-modal",componentProps:{drugName:e.label,tabsNeeded:e.other.amount_needed,items:e.other.pack_sizes,onDispense:async t=>{const c=0,n=t.reduce((e,t)=>e+t[c],0),a=await this.updateOnValue(e,n,t);a&&await f["X"].dismiss({})}}});t.present()}}});c("3871");const M=F()(H,[["render",O],["__scopeId","data-v-561de733"]]);t["default"]=M},"0a79":function(e,t,c){"use strict";var n=c("7a23"),a=Object(n["withScopeId"])("data-v-7c293cad"),o=a((function(e,t,c,a,o,r){return Object(n["openBlock"])(),Object(n["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(n["renderSlot"])(e.$slots,"default")],2)})),r=Object(n["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:function(){return!0}}}}),i=(c("a4d3"),c("6b0d")),l=c.n(i);const s=l()(r,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=s},"1b4f":function(e,t,c){"use strict";c("2658")},2345:function(e,t,c){"use strict";function n(e,t,c){let n=t;if(e.match(/enter/i))return n+"\r\n";if(e.match(/clear/i))return"";if(n=e.match(/delete|del/i)?n.match(/unknown/i)||n.match(/n\/a/i)?"":n.substring(0,n.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":n.match(/unknown/i)||n.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof n&&n)switch(c){case"lowercase":n=n.toLowerCase();break;case"uppercase":n=n.toUpperCase();break;default:n=n.charAt(0).toUpperCase()+n.slice(1);break}return n}c.d(t,"a",(function(){return n}))},2658:function(e,t,c){},"2ee9":function(e,t,c){"use strict";c("beb6")},3835:function(e,t,c){"use strict";c.d(t,"a",(function(){return i}));var n=c("0d21");function a(e,t){var c=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=c){var n,a,o=[],r=!0,i=!1;try{for(c=c.call(e);!(r=(n=c.next()).done);r=!0)if(o.push(n.value),t&&o.length===t)break}catch(l){i=!0,a=l}finally{try{r||null==c["return"]||c["return"]()}finally{if(i)throw a}}return o}}var o=c("06c5"),r=c("3d8c");function i(e,t){return Object(n["a"])(e)||a(e,t)||Object(o["a"])(e,t)||Object(r["a"])()}},3871:function(e,t,c){"use strict";c("e880")},"51c8":function(e,t,c){"use strict";c.r(t);var n=c("fe70"),a=c("7a23"),o=Object(a["defineComponent"])({data:()=>({isReadyOnly:!1}),created(){this.isReadyOnly=!Object(n["d"])("desktop")},emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const r=o;t["default"]=r},7653:function(e,t,c){"use strict";var n=c("7a23");const a=Object(n["withScopeId"])("data-v-7970cd10"),o=a((function(e,t,c,o,r,i){const l=Object(n["resolveComponent"])("center");return Object(n["openBlock"])(),Object(n["createBlock"])("div",{class:e.state},[Object(n["createVNode"])(l,null,{default:a(()=>[Object(n["createVNode"])("img",{src:e.icon},null,8,["src"])]),_:1})],2)}));var r=Object(n["defineComponent"])({props:{label:{type:String,required:!0},disabled:{type:Boolean}},computed:{state(){return this.disabled?"disabled-btn":"clickable"},icon(){return"assets/images/reset.png"}}}),i=(c("de49"),c("6b0d")),l=c.n(i);const s=l()(r,[["render",o],["__scopeId","data-v-7970cd10"]]);t["a"]=s},a4d3:function(e,t,c){"use strict";c("a6f7")},a6f7:function(e,t,c){},beb6:function(e,t,c){},c336:function(e,t,c){},c850:function(e,t,c){"use strict";var n=c("7a23"),a=Object(n["withScopeId"])("data-v-321424f0"),o=a((function(e,t,c,o,r,i){var l=Object(n["resolveComponent"])("center");return Object(n["openBlock"])(),Object(n["createBlock"])("div",{class:"his-card ".concat(e.state," clickable")},[Object(n["createVNode"])("img",{src:e.icon},null,8,["src"]),Object(n["createVNode"])(l,null,{default:a((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.label),1)]})),_:1})],2)})),r=Object(n["defineComponent"])({props:{label:{type:String,required:!0},image:{type:String,required:!0},isActive:{type:Boolean,default:!0}},computed:{state:function(){return this.isActive?"active-card-color":"disabled-card-color"},icon:function(){return"assets/images/".concat(this.image,".png")}}}),i=(c("2ee9"),c("6b0d")),l=c.n(i);const s=l()(r,[["render",o],["__scopeId","data-v-321424f0"]]);t["a"]=s},de49:function(e,t,c){"use strict";c("ee38")},e3be:function(e,t,c){"use strict";c("c336")},e880:function(e,t,c){},ee38:function(e,t,c){},efaf:function(e,t,c){"use strict";var n=c("7a23");const a=Object(n["withScopeId"])("data-v-cc9bc756");Object(n["pushScopeId"])("data-v-cc9bc756");const o=Object(n["createVNode"])("img",{id:"barcode-img",src:"/assets/images/barcode.svg"},null,-1);Object(n["popScopeId"])();const r=a((function(e,t,c,r,i,l){const s=Object(n["resolveComponent"])("ion-col"),d=Object(n["resolveComponent"])("ion-row");return Object(n["openBlock"])(),Object(n["createBlock"])(d,null,{default:a(()=>[Object(n["createVNode"])(s,{size:"2"},{default:a(()=>[o]),_:1}),Object(n["createVNode"])(s,{size:"10"},{default:a(()=>[Object(n["withDirectives"])(Object(n["createVNode"])("input",{readonly:e.useVirtualInput,ref:"barcode",id:"barcode-inputbox","onUpdate:modelValue":t[1]||(t[1]=t=>e.barcodeText=t)},null,8,["readonly"]),[[n["vModelText"],e.barcodeText]])]),_:1})]),_:1})}));var i=c("8a30"),l=c("2345"),s=c("2ed9"),d=Object(n["defineComponent"])({name:"BarcodeInput",components:{IonRow:i["H"],IonCol:i["m"]},props:["clearValue","virtualText"],setup(){const e=Object(n["ref"])(null),{useVirtualInput:t,platformType:c}=Object(s["a"])();return"desktop"===c.value&&setInterval(()=>{try{e.value.focus()}catch(t){}},1500),{barcode:e,useVirtualInput:t}},data:()=>({barcodeText:""}),methods:{checkForbarcode(){if(null!=this.barcodeText.match(/.+\$$/i)){const e=this.barcodeText.replace(/\$/gi,"");this.$emit("onScan",e),this.barcodeText=""}}},watch:{clearValue(){this.barcodeText=""},virtualText(e){this.barcodeText=Object(l["a"])(e,this.barcodeText)},barcodeText:function(e){e&&(this.checkForbarcode(),this.$emit("onValue",e))}}}),u=(c("e3be"),c("6b0d")),b=c.n(u);const p=b()(d,[["render",r],["__scopeId","data-v-cc9bc756"]]);t["a"]=p}}]);
//# sourceMappingURL=TouchFormElement6.313fe8aa.js.map