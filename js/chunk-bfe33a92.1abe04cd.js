(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bfe33a92"],{7337:function(e,t,s){"use strict";s.r(t);var o=s("7a23");const a=e=>(Object(o["pushScopeId"])("data-v-146a0e6b"),e=e(),Object(o["popScopeId"])(),e),n=a(()=>Object(o["createElementVNode"])("h1",{class:"ion-text-center"}," High BP Alert ",-1)),c={key:0,class:"vertically-align ion-text-center"},i={style:{"font-weight":"bold"}},r={class:"name"},l={class:"bp"},d=a(()=>Object(o["createElementVNode"])("br",null,null,-1)),h=a(()=>Object(o["createElementVNode"])("span",null,[Object(o["createTextVNode"])(" Retesting BP is "),Object(o["createElementVNode"])("span",{style:{"font-weight":"bold",color:"#000000","text-decoration":"underline"}},"optional"),Object(o["createTextVNode"])(". "),Object(o["createElementVNode"])("br"),Object(o["createTextVNode"])(" Do you want to test BP? ")],-1)),b={key:1,class:"vertically-align ion-text-center"},p=a(()=>Object(o["createElementVNode"])("br",null,null,-1)),u=a(()=>Object(o["createElementVNode"])("h1",null," Do you want to test BP? ",-1));function O(e,t,s,a,O,j){const m=Object(o["resolveComponent"])("ion-content"),g=Object(o["resolveComponent"])("ion-button"),B=Object(o["resolveComponent"])("ion-toolbar"),w=Object(o["resolveComponent"])("ion-footer"),y=Object(o["resolveComponent"])("ion-page");return Object(o["openBlock"])(),Object(o["createBlock"])(y,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(m,null,{default:Object(o["withCtx"])(()=>[n,e.hasPressureReading?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,[Object(o["withDirectives"])(Object(o["createElementVNode"])("h2",i," (Patient already on BP drugs) ",512),[[o["vShow"],e.patientOnBpDrugs]]),Object(o["createElementVNode"])("h2",null,[Object(o["createElementVNode"])("span",r,Object(o["toDisplayString"])(e.patientName),1),Object(o["createTextVNode"])(" has "),Object(o["withDirectives"])(Object(o["createElementVNode"])("span",null," a high ",512),[[o["vShow"],e.highBP]]),Object(o["createTextVNode"])(" blood pressure of "),Object(o["createElementVNode"])("span",l,Object(o["toDisplayString"])(e.sysBp)+" / "+Object(o["toDisplayString"])(e.dsBP),1),d,h])])):Object(o["createCommentVNode"])("",!0),e.hasPressureReading?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",b,[Object(o["createTextVNode"])(" No BP Reading found "),p,u]))]),_:1}),Object(o["createVNode"])(w,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(B,{color:"dark"},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(g,{onClick:t[0]||(t[0]=()=>e.hasPressureReading?e.showRiskFactors():e.nextTask()),size:"large",color:"danger",slot:"start"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" No ")]),_:1}),Object(o["createVNode"])(g,{onClick:e.recaptureBp,size:"large",color:"success",slot:"end"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(" Yes ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})}s("14d9");var j=s("7365"),m=s("d867"),g=s("d1ca"),B=s("32b3"),w=s("8158"),y=s("77fd"),N=s("7957"),P=s("2ef0"),V=Object(o["defineComponent"])({mixins:[j["a"]],components:{IonFooter:m["o"],IonContent:m["n"],IonPage:m["D"],IonButton:m["d"],IonToolbar:m["S"]},data:()=>({sysBp:0,dsBP:0,riskFactors:[],patientOnBpDrugs:!1,isPregnant:!1,systolicThreshold:145,diastolicTheshold:94}),methods:{async showRiskFactors(){const e=await m["Z"].create({component:y["a"],backdropDismiss:!1,cssClass:"large-modal",componentProps:{factors:this.riskFactors}});e.present();const{data:t}=await e.onDidDismiss();Object(P["isEmpty"])(t)||this.nextTask()},async getRiskFactors(){const e=w["a"].getConceptsByCategory("risk factors"),t=e.map(async e=>{const t=await N["a"].getFirstValueCoded(this.patientID,e.name);return{concept:e.name,value:t}});return Promise.all(t)},recaptureBp(){this.$router.push(`/art/encounters/vitals/${this.patientID}?vital_options=BP`)}},watch:{ready:{async handler(e){if(!e)return;const t=await m["X"].create({message:"Verifying Blood Pressure...",backdropDismiss:!1});await t.present();const s=new B["a"](this.patientID,this.providerID);this.riskFactors=await this.getRiskFactors(),this.systolicThreshold=await g["b"].systolicThreshold()||145,this.diastolicTheshold=await g["b"].diastolicThreshold()||94,this.dsBP=await s.getDiastolicBp()||0,this.sysBp=await s.getSystolicBp()||0,this.patientOnBpDrugs=await s.onBpDrugs()||!1,this.isPregnant=this.patient.isChildBearing()&&await this.patient.isPregnant()||!1,m["X"].dismiss()},immediate:!0}},computed:{patientName(){return this.ready?this.patient.getFullName():"Patient"},hasPressureReading(){return this.sysBp>0&&this.dsBP>0},highBP(){return(this.sysBp>=this.systolicThreshold&&this.dsBP>=this.diastolicTheshold||this.dsBP>=this.diastolicTheshold)&&!this.isPregnant}}}),k=(s("8bd6"),s("d959")),f=s.n(k);const C=f()(V,[["render",O],["__scopeId","data-v-146a0e6b"]]);t["default"]=C},"8bd6":function(e,t,s){"use strict";s("c658")},c658:function(e,t,s){}}]);
//# sourceMappingURL=chunk-bfe33a92.1abe04cd.js.map