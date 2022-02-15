(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d237731"],{fabb:function(e,t,n){"use strict";n.r(t);var i=n("7a23");function r(e,t,n,r,a,u){var o=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(o,{fields:e.fields,onFinishAction:e.onSubmit},null,8,["fields","onFinishAction"])}n("99af"),n("d81d"),n("b0c0"),n("96cf");var a=n("1da1"),u=n("d95e"),o=n("7365"),c=n("e86e"),s=n("2706"),l=n("9c73"),p=n("9b7c"),d=n("8158"),f=n("80b5"),m=n("2ef0"),v=Object(i["defineComponent"])({mixins:[o["a"]],data:function(){return{patientID:-1,service:{},fields:[],activityType:""}},watch:{$route:{handler:function(e){var t=e.query,n=e.params;t&&n&&(this.patientID=n.patient_id,this.activityType=t.type,this.service=new l["a"](this.patientID),this.fields=[this.getClinianGivenNameField(),this.getClinianFamilyNameField(),this.getFacililityLocationField(),this.getReasonForTestField(),this.getTestSpecimensField(),this.getTestSelectionField(),this.getTestCombinationField()])},immediate:!0,deep:!0}},methods:{onSubmit:function(e,t){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.service.placeOrder(t);case 2:if(i=e.sent,!i){e.next=7;break}return e.next=6,n.service.printSpecimenLabel(i[0].order_id);case 6:n.$router.push("/patient/dashboard/".concat(n.patientID));case 7:case"end":return e.stop()}}),e)})))()},getFacililityLocationField:function(){return{id:"target_lab",helpText:"Requesting location",type:u["b"].TT_SELECT,defaultValue:function(){return l["a"].getLocationName()},validation:function(e){return s["a"].required(e)},options:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object(c["b"])(t)},computedValue:function(e){return e.label},config:{showKeyboard:!0,isFilterDataViaApi:!0}}},getClinianGivenNameField:function(){var e=this,t=f["a"].getGivenNameField();return t.helpText="Requesting clinician - First name",t.proxyID="requesting_clinician",t.condition=function(){return"DRAW_SAMPLES"===e.activityType},t.appearInSummary=function(){return!1},t},getClinianFamilyNameField:function(){var e=this,t=f["a"].getFamilyNameField();return t.helpText="Requesting clinician - Last name",t.proxyID="requesting_clinician",t.condition=function(){return"DRAW_SAMPLES"===e.activityType},t.summaryMapValue=function(e,t){return{label:"Clinician name",value:"".concat(t.given_name.value," ").concat(e.value)}},t.computedValue=function(e,t){return"".concat(t.given_name.value," ").concat(e.value)},t},getReasonForTestField:function(){return{id:"reason_for_test_id",helpText:"Reason for test",type:u["b"].TT_SELECT,validation:function(e){return s["a"].required(e)},computedValue:function(e){return d["a"].getCachedConceptID(e.value,!0)},options:function(){return[{label:"Routine",value:"Routine"},{label:"Targeted",value:"Targeted"},{label:"Confirmatory",value:"Confirmatory"},{label:"Repeat / Missing",value:"Repeat / Missing"},{label:"Stat",value:"Stat"}]}}},getTestSpecimensField:function(){var e=this;return{id:"specimen",helpText:"Select specimen",type:u["b"].TT_SELECT,condition:function(){return"DRAW_SAMPLES"===e.activityType},validation:function(e){return s["a"].required(e)},computedValue:function(e){return{concept_id:e.value}},options:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p["a"].getSpecimens("");case 2:return t=e.sent,e.abrupt("return",t.map((function(e){return{label:e.name,value:e.concept_id}})));case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),config:{showKeyboard:!0}}},getTestSelectionField:function(){var e={};return{id:"tests",helpText:"Select tests",type:u["b"].TT_MULTIPLE_SELECT,onload:function(t){return e=t},validation:function(e){return s["a"].required(e)},computedValue:function(e){return e.map((function(e){return{concept_id:e.value}}))},options:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(n){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(i={},!n.specimen){t.next=7;break}return t.next=4,p["a"].getTestTypesBySpecimen(n.specimen.label);case 4:i=t.sent,t.next=12;break;case 7:if(Object(m["isEmpty"])(e.listData)){t.next=9;break}return t.abrupt("return",e.listData);case 9:return t.next=11,p["a"].getTestTypes();case 11:i=t.sent;case 12:return t.abrupt("return",i.map((function(e){return{label:e.name,value:e.concept_id,other:e}})));case 13:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}()}},getTestCombinationField:function(){var e=this;return{id:"combine_tests",helpText:"Combine test(s) in one order",type:u["b"].TT_SELECT,computedValue:function(e){return"Yes"===e.value},condition:function(e){return e.tests.length>1},validation:function(e){return s["a"].required(e)},options:function(){return e.yesNoOptions()}}}}}),b=n("d959"),h=n.n(b);const g=h()(v,[["render",r]]);t["default"]=g}}]);
//# sourceMappingURL=chunk-2d237731.e7d11d45.js.map