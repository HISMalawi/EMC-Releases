(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12b976ee","TouchFormElement38"],{"04a0":function(e,t,n){},"0a79":function(e,t,n){"use strict";var c=n("7a23");function i(e,t,n,i,o,a){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{id:"view-port",class:Object(c["normalizeClass"])(e.showFull?"":"half")},[Object(c["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var o=Object(c["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),a=(n("a4d3"),n("d959")),r=n.n(a);const l=r()(o,[["render",i],["__scopeId","data-v-7c293cad"]]);t["a"]=l},2345:function(e,t,n){"use strict";function c(e,t,n){let c=t;if(e.match(/enter/i))return c+"\r\n";if(e.match(/clear/i))return"";if(c=e.match(/delete|del/i)?c.match(/unknown/i)||c.match(/n\/a/i)?"":c.substring(0,c.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":c.match(/unknown/i)||c.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof c&&c)switch(n){case"lowercase":c=c.toLowerCase();break;case"uppercase":c=c.toUpperCase();break;default:c=c.charAt(0).toUpperCase()+c.slice(1);break}return c}n.d(t,"a",(function(){return c}))},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"g",(function(){return o})),n.d(t,"n",(function(){return a})),n.d(t,"f",(function(){return r})),n.d(t,"b",(function(){return l})),n.d(t,"m",(function(){return s})),n.d(t,"k",(function(){return u})),n.d(t,"i",(function(){return d})),n.d(t,"a",(function(){return b})),n.d(t,"l",(function(){return p})),n.d(t,"c",(function(){return j})),n.d(t,"j",(function(){return h})),n.d(t,"h",(function(){return O}));const c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","","Confirm"]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],l=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],b=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],j=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],h=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],O=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},6472:function(e,t,n){},6967:function(e,t,n){"use strict";n("6472")},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"g",(function(){return a})),n.d(t,"f",(function(){return r})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return u})),n.d(t,"h",(function(){return b})),n.d(t,"a",(function(){return p}));var c=n("3800");const i=[c["m"],[["","Delete"]]],o=[c["k"],[["Delete"]]],a=[c["k"],[["Delete","Unknown"]]],r=[c["k"],[["N/A"],["Delete","Unknown"]]],l=[c["k"],[["Delete"]]],s=[c["k"],[["Unknown","Delete"],["Qwerty","A-Z"]]],u=[c["i"],[["Unknown"]]],d=[c["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],b=[c["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:i},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:b}]},"7fcd":function(e,t,n){"use strict";n.r(t);var c=n("7a23");const i={class:"result-section"},o={class:"result-section"};function a(e,t,n,a,r,l){const s=Object(c["resolveComponent"])("ion-title"),u=Object(c["resolveComponent"])("ion-toolbar"),d=Object(c["resolveComponent"])("ion-header"),b=Object(c["resolveComponent"])("ion-input"),p=Object(c["resolveComponent"])("ion-col"),j=Object(c["resolveComponent"])("ion-row"),h=Object(c["resolveComponent"])("patient-card"),O=Object(c["resolveComponent"])("view-port"),m=Object(c["resolveComponent"])("his-keyboard"),k=Object(c["resolveComponent"])("ion-content"),y=Object(c["resolveComponent"])("ion-button"),f=Object(c["resolveComponent"])("ion-footer"),C=Object(c["resolveComponent"])("ion-page");return Object(c["openBlock"])(),Object(c["createBlock"])(C,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(d,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(u,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(s,{class:"his-lg-text"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])("Merge Clients")]),_:1})]),_:1})]),_:1}),Object(c["createVNode"])(k,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(O,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(j,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(p,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(b,{onClick:t[0]||(t[0]=t=>e.inputFocus="inputA"),placeholder:"Primary patient",class:Object(c["normalizeClass"])(["input_display",{"input-focused":"inputA"===e.inputFocus}]),modelValue:e.inputA,"onUpdate:modelValue":t[1]||(t[1]=t=>e.inputA=t)},null,8,["modelValue","class"])]),_:1}),Object(c["createVNode"])(p,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(b,{onClick:t[2]||(t[2]=t=>e.inputFocus="inputB"),class:Object(c["normalizeClass"])(["input_display",{"input-focused":"inputB"===e.inputFocus}]),placeholder:"Secondary patient",modelValue:e.inputB,"onUpdate:modelValue":t[3]||(t[3]=t=>e.inputB=t)},null,8,["modelValue","class"])]),_:1})]),_:1}),Object(c["createVNode"])(j,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(p,null,{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",i,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.inputASearchResults,(t,n)=>(Object(c["openBlock"])(),Object(c["createBlock"])(h,{onClick:n=>e.onPrimaryPatient(t),key:n,patient:t,isActive:e.activeInputACard.index===n},null,8,["onClick","patient","isActive"]))),128))])]),_:1}),Object(c["createVNode"])(p,null,{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",o,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.inputBSearchResults,(t,n)=>(Object(c["openBlock"])(),Object(c["createBlock"])(h,{onClick:n=>e.onSecondaryPatient(t),key:n,patient:t,isActive:t.isChecked},null,8,["onClick","patient","isActive"]))),128))])]),_:1})]),_:1})]),_:1}),e.inputFocus?(Object(c["openBlock"])(),Object(c["createBlock"])(m,{key:0,kbConfig:e.keyboard,onKeyPress:e.keypress},null,8,["kbConfig","onKeyPress"])):Object(c["createCommentVNode"])("",!0)]),_:1}),Object(c["createVNode"])(f,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(u,{color:"dark"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(y,{color:"danger",size:"large","router-link":"/"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(" Cancel ")]),_:1}),e.canMerge?(Object(c["openBlock"])(),Object(c["createBlock"])(y,{key:0,disabled:e.isSubmitting,color:"success",size:"large",slot:"end",onClick:e.onMerge},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(" Merge ")]),_:1},8,["disabled","onClick"])):Object(c["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})}n("14d9");var r=n("0a79"),l=n("db10"),s=n("3800"),u=n("2345"),d=n("23e6");function b(e,t,n,i,o,a){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:Object(c["normalizeClass"])(["his-card clickable",e.stateClass])},[Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" NPID : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.npid),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Arv# : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.arvNum),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Name : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.name),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Birth date : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.birthdate),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Gender : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.gender),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Home District : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.homeDistrict),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Home Village : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.homeVillage),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Current District : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.currentDistrict),1)]),Object(c["createElementVNode"])("ul",null,[Object(c["createTextVNode"])(" Current Village : "),Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(e.patient.currentVillage),1)])])],2)}var p=Object(c["defineComponent"])({props:{patient:{type:Object,required:!0},isActive:{type:Boolean}},computed:{stateClass(){return{"active-card-color":this.isActive,"inactive-card-color":!this.isActive}}}}),j=(n("6967"),n("d959")),h=n.n(j);const O=h()(p,[["render",b],["__scopeId","data-v-154d9c56"]]);var m=O,k=n("4db7"),y=n("b5e4"),f=n("50e7"),C=n("d867"),g=n("2ef0"),v=Object(c["defineComponent"])({components:{PatientCard:m,IonPage:C["D"],IonInput:C["v"],IonButton:C["d"],IonContent:C["n"],IonRow:C["H"],IonCol:C["m"],IonFooter:C["o"],IonHeader:C["q"],ViewPort:r["a"],HisKeyboard:l["a"],IonTitle:C["R"]},data:()=>({inputA:"",inputB:"",isSubmitting:!1,inputFocus:"inputA",inputASearchResults:[],inputBSearchResults:[],activeInputACard:{},keyboard:[s["c"],[["","Hide"],["Space","Delete"],["inputA","inputB"],["Search","Clear"]]]}),computed:{canMerge(){return!Object(g["isEmpty"])(this.activeInputACard)&&!Object(g["isEmpty"])(this.inputBSearchResults.filter(e=>e.isChecked))}},methods:{async onMerge(){if(await Object(y["a"])("Are you sure you want to merge selected Persons?")){try{this.isSubmitting=!0;const e=await d["a"].mergePatients({primary:{patient_id:this.activeInputACard.id,doc_id:this.activeInputACard.docID},secondary:this.inputBSearchResults.filter(e=>e.isChecked).map(e=>({patient_id:e.id,doc_id:e.docID}))});await new k["a"](e["patient_id"]).printNidLbl(),this.inputBSearchResults=this.inputBSearchResults.filter(e=>!e.isChecked);const t=await f["a"].getNextTaskParams(e["patient_id"]);this.$router.push(t.name?t:"/patient/dashboard/"+e["patient_id"])}catch(e){Object(y["c"])(""+e)}this.isSubmitting=!1}},onPrimaryPatient(e){this.inputBSearchResults.forEach(t=>{t.id===e.id&&(this.inputBSearchResults[t.index].isChecked=!1)}),this.activeInputACard=e},onSecondaryPatient(e){if(e.isChecked)return this.inputBSearchResults[e.index].isChecked=!1;Object(g["isEmpty"])(this.activeInputACard)||e.id==this.activeInputACard.id||(this.inputBSearchResults[e.index].isChecked=!0)},async searchPatient(e){const[t,n]=e.split(" "),c=await d["a"].search({given_name:t,family_name:n});return c.map((e,t)=>{const n=new d["a"](e);return{index:t,id:n.getID(),name:n.getFullName(),docID:n.getDocID(),birthdate:n.getBirthdate(),arvNum:n.getArvNumber(),npid:n.getNationalID(),gender:n.getGender(),homeDistrict:n.getHomeDistrict(),homeVillage:n.getHomeVillage(),currentDistrict:n.getCurrentDistrict(),currentVillage:n.getCurrentVillage(),isChecked:!1}})},async keypress(e){if(!this.inputFocus)return;let t=Object(u["a"])(e,this[this.inputFocus]);t.match(/hide/i)?this.inputFocus="":t.match(/search/i)?(t=t.replace("Search",""),"inputA"===this.inputFocus?(this.inputASearchResults=await this.searchPatient(t),this.activeInputACard={}):this.inputBSearchResults=await this.searchPatient(t),this.inputFocus=""):t.match(/inputA/i)?this.inputFocus="inputA":t.match(/inputB/i)?this.inputFocus="inputB":t.match(/clear/i)?(this[this.inputFocus]="","inputA"===this.inputFocus?this.inputASearchResults=[]:this.inputBSearchResults=[]):this[this.inputFocus]=t}}});n("aabe");const w=h()(v,[["render",a],["__scopeId","data-v-ef36ea1c"]]);t["default"]=w},"9c0e":function(e,t,n){},a4d3:function(e,t,n){"use strict";n("04a0")},aabe:function(e,t,n){"use strict";n("9c0e")},c924:function(e,t,n){"use strict";var c=n("7a23");function i(e,t,n,i,o,a){const r=Object(c["resolveComponent"])("ion-button");return Object(c["openBlock"])(),Object(c["createElementBlock"])("table",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.layout,(t,n)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:n},[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(t,(n,i)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+i},[n?(Object(c["openBlock"])(),Object(c["createBlock"])(r,{key:0,style:Object(c["normalizeStyle"])({width:e.btnSize}),class:Object(c["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(c["createCommentVNode"])("",!0)]))),128))]))),128))])}var o=n("d867"),a=Object(c["defineComponent"])({components:{IonButton:o["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),r=n("d959"),l=n.n(r);const s=l()(a,[["render",i]]);t["a"]=s},db10:function(e,t,n){"use strict";var c=n("7a23");const i={class:"his-floating-keyboard"},o={class:"his-floating-keyboard-content"};function a(e,t,n,a,r,l){const s=Object(c["resolveComponent"])("base-keyboard");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",i,[Object(c["createElementVNode"])("div",o,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.activeLayout,(t,n)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:n},[Object(c["createVNode"])(s,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var r=n("6be2"),l=n("c924"),s=Object(c["defineComponent"])({components:{BaseKeyboard:l["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=r["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=r["a"][t].keyboard,!0)}}}),u=n("d959"),d=n.n(u);const b=d()(s,[["render",a]]);t["a"]=b}}]);
//# sourceMappingURL=chunk-12b976ee.be052686.js.map