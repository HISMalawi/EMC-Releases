(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement49","TouchFormElement38","TouchFormElement8"],{"0a79":function(e,t,o){"use strict";var c=o("7a23");const a=Object(c["withScopeId"])("data-v-7c293cad"),n=a((function(e,t,o,a,n,l){return Object(c["openBlock"])(),Object(c["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(c["renderSlot"])(e.$slots,"default")],2)}));var l=Object(c["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),r=(o("a4d3"),o("6b0d")),i=o.n(r);const s=i()(l,[["render",n],["__scopeId","data-v-7c293cad"]]);t["a"]=s},"51c8":function(e,t,o){"use strict";o.r(t);var c=o("fe70"),a=o("7a23"),n=Object(a["defineComponent"])({data:()=>({isReadyOnly:!1}),created(){this.isReadyOnly=!Object(c["d"])("desktop")},emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const l=n;t["default"]=l},a4d3:function(e,t,o){"use strict";o("a6f7")},a6f7:function(e,t,o){},c011:function(e,t,o){"use strict";o("e15a")},e15a:function(e,t,o){},e3b4:function(e,t,o){"use strict";o.r(t);var c=o("7a23");const a=Object(c["withScopeId"])("data-v-a1c14410");Object(c["pushScopeId"])("data-v-a1c14410");const n={class:"view-port-content"},l={key:0,style:{textAlign:"center"}},r={key:1,class:"his-sm-text his-table"},i=Object(c["createVNode"])("tr",null,[Object(c["createVNode"])("th",null,"State"),Object(c["createVNode"])("th",null,"State Date"),Object(c["createVNode"])("th",null,"End Date"),Object(c["createVNode"])("th",null,"Actions")],-1);Object(c["popScopeId"])();const s=a((function(e,t,o,s,d,b){const u=Object(c["resolveComponent"])("ion-label"),O=Object(c["resolveComponent"])("ion-item"),j=Object(c["resolveComponent"])("ion-list"),p=Object(c["resolveComponent"])("ion-col"),m=Object(c["resolveComponent"])("ion-button"),f=Object(c["resolveComponent"])("ion-row"),h=Object(c["resolveComponent"])("view-port");return Object(c["openBlock"])(),Object(c["createBlock"])(h,null,{default:a(()=>[Object(c["createVNode"])("div",n,[Object(c["createVNode"])(f,null,{default:a(()=>[Object(c["createVNode"])(p,{size:"4"},{default:a(()=>[Object(c["createVNode"])(j,null,{default:a(()=>[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(e.listData,(t,o)=>(Object(c["openBlock"])(),Object(c["createBlock"])(O,{class:"his-sm-text",color:t.label===e.activeProgram.label?"primary":"",key:o,onClick:o=>e.onselect(t),detail:""},{default:a(()=>[Object(c["createVNode"])(u,null,{default:a(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1032,["color","onClick"]))),128))]),_:1})]),_:1}),Object(c["createVNode"])(p,{size:"8"},{default:a(()=>[e.activeProgram.label&&e.states.length<=0?(Object(c["openBlock"])(),Object(c["createBlock"])("h1",l," Program has no states ")):Object(c["createCommentVNode"])("",!0),e.activeProgram.label&&e.states.length>0?(Object(c["openBlock"])(),Object(c["createBlock"])("table",r,[i,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(e.states,(t,o)=>(Object(c["openBlock"])(),Object(c["createBlock"])("tr",{key:o},[Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(t.name),1),Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(t.startDate),1),Object(c["createVNode"])("td",null,Object(c["toDisplayString"])(t.endDate||"N/A"),1),Object(c["createVNode"])("td",null,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(t.actions,(t,n)=>(Object(c["openBlock"])(),Object(c["createBlock"])(m,{key:n,color:t.color,onClick:c=>t.action(e.activeProgram,o)},{default:a(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.name),1)]),_:2},1032,["color","onClick"]))),128))])]))),128))])):Object(c["createCommentVNode"])("",!0)]),_:1})]),_:1})])]),_:1})}));var d=o("2ef0"),b=o("9283"),u=o("51c8"),O=o("0a79"),j=o("8a30"),p=Object(c["defineComponent"])({name:"HisSelect",components:{ViewPort:O["a"],IonCol:j["m"],IonRow:j["H"],IonLabel:j["x"],IonList:j["y"],IonButton:j["d"],IonItem:j["w"]},mixins:[u["default"]],watch:{clear(e){e&&(this.activeProgram={},this.$emit("onClear"))}},data:()=>({listData:[],activeProgram:{}}),mounted(){this.init()},activated(){this.init()},computed:{states(){return Object(d["isEmpty"])(this.activeProgram)?[]:this.activeProgram.other.programStates}},methods:{async init(){this.$emit("onFieldActivated",this),this.listData=await this.options(this.fdata)},formatDate(e){return e?b["b"].toStandardHisDisplayFormat(e):"N/A"},async onselect(e){if(this.activeProgram=e,this.onValue){const t=await this.onValue(e,this);if(!t)return void(this.activeProgram={})}this.$emit("onValue",e)}}}),m=(o("c011"),o("6b0d")),f=o.n(m);const h=f()(p,[["render",s],["__scopeId","data-v-a1c14410"]]);t["default"]=h}}]);
//# sourceMappingURL=TouchFormElement49.877da12d.js.map