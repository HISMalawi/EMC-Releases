(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229093"],{dc75:function(e,t,n){"use strict";n.r(t);var r=n("7a23");function i(e,t,n,i,a,s){var c=Object(r["resolveComponent"])("his-standard-form"),u=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(u,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(c,{fields:e.fields,skipSummary:!0,onFinishAction:e.onFinish,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]})),_:1})}var a=n("1da1"),s=(n("99af"),n("96cf"),n("7365")),c=n("d95e"),u=n("2706"),o=n("8a30"),l=n("d4ec"),m=n("bee2"),p=n("262e"),v=n("2caf"),d=n("cc6f"),f=n("2ef0"),b=function(e){Object(p["a"])(n,e);var t=Object(v["a"])(n);function n(e,r){var i;return Object(l["a"])(this,n),i=t.call(this,e,107,r),i.lastVisitNumber=0,i}return Object(m["a"])(n,[{key:"loadLastVisitNumber",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].getJson("programs/".concat(this.programID,"/patients/").concat(this.patientID,"/anc_visit"));case 2:t=e.sent,!Object(f["isEmpty"])(t)&&t.visit_number.length&&(this.lastVisitNumber=t.visit_number[t.visit_number.length-1]);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"saveVisitNumber",value:function(e){return this.saveValueNumericObs("Type of visit",e)}}]),n}(d["a"]),h=Object(r["defineComponent"])({components:{IonPage:o["D"]},mixins:[s["a"]],data:function(){return{service:{},helpText:"ANC Visit Number"}},watch:{ready:{handler:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=5;break}return t.service=new b(t.patientID,t.providerID),n.next=4,t.service.loadLastVisitNumber();case 4:t.fields=t.getFields();case 5:case"end":return n.stop()}}),n)})))()},immediate:!0}},methods:{onFinish:function(e,t){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=new b(n.patientID,n.providerID),e.next=3,r.createEncounter();case 3:return e.next=5,r.saveVisitNumber(t["visit_number"]);case 5:n.nextTask();case 6:case"end":return e.stop()}}),e)})))()},getFields:function(){var e=this;return[{id:"visit_number",helpText:this.helpText,dynamicHelpText:function(){return e.service.lastVisitNumber?"".concat(e.helpText," (Last visit number: ").concat(e.service.lastVisitNumber,")"):e.helpText},type:c["b"].TT_NUMBER,computedValue:function(e){return e.value},validation:function(t){return e.validateSeries([function(){return u["a"].required(t)},function(){return u["a"].rangeOf(t,e.service.lastVisitNumber+1,40)}])}}]}}}),w=n("6b0d"),x=n.n(w);const O=x()(h,[["render",i]]);t["default"]=O}}]);
//# sourceMappingURL=chunk-2d229093.1195dc30.js.map