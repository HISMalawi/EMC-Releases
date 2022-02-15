(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0de711"],{8652:function(e,t,n){"use strict";n.r(t);var i=n("7a23");function a(e,t,n,a,r,o){var u=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(u,{cancelDestinationPath:e.cancelDestination,fields:e.fields,onFinishAction:e.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}n("99af"),n("ac1f"),n("466d");var r=n("2909"),o=n("5530"),u=(n("96cf"),n("1da1")),c=n("9441"),s=n("7365"),l=n("2706"),v=n("d95e"),d=n("e86e"),b=n("b446"),h=n("b5e4"),f=n("d4ec"),p=n("262e"),m=n("2caf"),w=n("cc6f"),O=function(e){Object(p["a"])(n,e);var t=Object(m["a"])(n);function n(e,i){return Object(f["a"])(this,n),t.call(this,e,39,i)}return n}(w["a"]),T=Object(i["defineComponent"])({components:{HisStandardForm:c["a"]},mixins:[s["a"]],data:function(){return{hivService:{}}},watch:{ready:{handler:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e&&(t.hivService=new O(t.patient.getID(),t.providerID),t.fields=t.getFields());case 1:case"end":return n.stop()}}),n)})))()},immediate:!0,deep:!0}},methods:{onSubmit:function(e,t){var n=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){var i,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.hivService.createEncounter();case 2:if(i=e.sent,i){e.next=5;break}return e.abrupt("return",Object(h["e"])("Unable to create encounter"));case 5:return e.next=7,n.resolveObs(Object(o["a"])({},t));case 7:return a=e.sent,e.next=10,n.hivService.saveObservationList(a);case 10:if(r=e.sent,r){e.next=13;break}return e.abrupt("return",Object(h["e"])("Unable to save observations"));case 13:n.nextTask();case 14:case"end":return e.stop()}}),e)})))()},buildDateObs:function(e,t,n){var i={};return i=t.match(/unknown/i)?this.hivService.buildValueText(e,"Unknown"):n?this.hivService.buildValueDateEstimated(e,t):this.hivService.buildValueDate(e,t),i},getFields:function(){var e=this;return[{id:"hiv_status",helpText:"HIV status",type:v["b"].TT_SELECT,validation:function(e){return l["a"].required(e)},computedValue:function(t){var n=t.value;return{obs:e.hivService.buildValueText("HIV status",n)}},options:function(){return[{label:"Positive not ART",value:"Positive not ART"},{label:"Posititve on ART",value:"Positive on ART"},{label:"Previous negative",value:"Previous negative"},{label:"New positive",value:"New positive"},{label:"New negative",value:"New negative"},{label:"Never tested",value:"Never tested"}]}}].concat(Object(r["a"])(Object(b["b"])({id:"hiv_test_date",helpText:"HIV Test",required:!0,minDate:function(){return e.patient.getBirthdate()},condition:function(e){return"Never tested"!==e.hiv_status.value},summaryLabel:"HIV test date",estimation:{allowUnknown:!0},computeValue:function(t,n){return e.buildDateObs("HIV test date",t,n)}},this.hivService.getDate())),[{id:"test_location",helpText:"HIV test location",type:v["b"].TT_SELECT,validation:function(e){return l["a"].required(e)},computedValue:function(t){var n=t.label;return{obs:e.hivService.buildValueText("HIV test location",n)}},condition:function(e){return"Never tested"!==e.hiv_status.value},options:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object(d["b"])(t)},config:{showKeyboard:!0}}])}}}),g=n("d959"),j=n.n(g);const x=j()(T,[["render",a]]);t["default"]=x}}]);
//# sourceMappingURL=chunk-2d0de711.f1af6e04.js.map