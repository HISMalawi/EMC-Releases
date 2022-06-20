(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0deeb6"],{8866:function(e,t,n){"use strict";n.r(t);var r=n("7a23");function i(e,t,n,i,a,o){var u=Object(r["resolveComponent"])("his-standard-form");return Object(r["openBlock"])(),Object(r["createBlock"])(u,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!0,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])}var a=n("3835"),o=n("1da1"),u=(n("d81d"),n("4de4"),n("d3b7"),n("159b"),n("99af"),n("ac1f"),n("1276"),n("96cf"),n("d95e")),l=n("7920"),c=n("b515"),s=n("7365"),d=n("ad60"),h=n("2ef0"),f=Object(r["defineComponent"])({mixins:[s["a"]],components:{HisStandardForm:l["a"]},data:function(){return{age:null,gender:null,recentHeight:null,vitals:{},weightForHeight:{},medianWeightandHeight:{}}},watch:{ready:{handler:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=3;break}return n.next=3,t.init(t.patient);case 3:case"end":return n.stop()}}),n)})))()},immediate:!0}},methods:{init:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.vitals=new c["a"](e.getID(),t.providerID),t.age=e.getAge(),t.gender=e.getGender(),n.next=5,e.getRecentHeight();case 5:if(r=n.sent,t.recentHeight=-1==r?null:r,!(t.age<=14)){n.next=14;break}return n.next=10,e.getMedianWeightHeight();case 10:return t.medianWeightandHeight=n.sent,n.next=13,d["a"].getWeightForHeightValues();case 13:t.weightForHeight=n.sent;case 14:t.fields=t.getFields();case 15:case"end":return n.stop()}}),n)})))()},onFinish:function(e,t){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.vitals.createEncounter();case 2:return e.t0=n.vitals,e.next=5,n.resolveObs(t);case 5:return e.t1=e.sent,e.next=8,e.t0.saveObservationList.call(e.t0,e.t1);case 8:n.nextTask();case 9:case"end":return e.stop()}}),e)})))()},validateVitals:function(e){var t=this.checkRequiredVitals(e);if(t.length>0)return t.map((function(e){return["".concat(e.label," can not be empty")]}));var n=this.sanitizeVitals(e);return this.vitals.validateAll(n)},sanitizeVitals:function(e){return e.filter((function(e){return("Height"!==e.label||0!=e.other.required)&&(""!==e.value&&"Age"!==e.label)}))},checkRequiredVitals:function(e){return e.filter((function(e){return""===e.value&&!0===e.other.required}))},getFields:function(){var e=this;return[{id:"vitals",helpText:"Vitals entry",type:u["b"].TT_VITALS_ENTRY,validation:function(t){return e.validateVitals(t)},computedValue:function(t){var n=[],r=t.filter((function(e){return!e.other.doNotSave}));return r.forEach((function(t){var r;t.value&&("function"===typeof(null===(r=t.other)||void 0===r?void 0:r.computed)?n=n.concat(t.other.computed(t.value)):n.push(e.vitals.buildValueNumber(t.label,t.value)))})),n},config:{hiddenFooterBtns:["Clear"],onUpdateAlertStatus:function(e){var t=Object(h["find"])(e,{label:"BP"});if(t&&""!=t.value){var n="".concat(t.value).split("/").map((function(e){return parseInt(e)})),r=Object(a["a"])(n,2),i=r[0],o=r[1];if(i>=140&&o>=90)return{status:"Client is at risk of pre-eclampsia, refer for urine protein test.",color:"brown"};if(i<120||i>140)return{status:"Systolic reading is out of normal range",color:"brown"};if(o<80||o>90)return{status:"Diastolic reading is out of normal range",color:"brown"};if(i>=130&&i<=139&&o>=80&&o<=89)return{status:"Prehypertension",color:"brown"}}return{status:"",color:""}},onChangeOption:function(t){if(!t.value&&t.other.required)throw"Value for ".concat(t.label," is required");if(t.value){var n=e.vitals.validator(t);if(n&&n.length)throw n}}},options:function(){var t=e.recentHeight&&e.age>18?e.recentHeight:"",n=!(t&&e.age>18);return[{label:"Weight",value:"",other:{modifier:"KG",icon:"weight",required:!0}},{label:"Height",value:"".concat(t),other:{modifier:"CM",icon:"height",recentHeight:e.recentHeight,visible:n}},{label:"BP",value:"",other:{computed:function(t){var n=t.split("/"),r=Object(a["a"])(n,2),i=r[0],o=r[1];return[e.vitals.buildValueNumber("Systolic",i),e.vitals.buildValueNumber("Diastolic",o)]},modifier:"mmHG",icon:"bp"}},{label:"Age",value:e.age,other:{doNotSave:!0,modifier:"Years old",icon:"",visible:!1}}]}}]}}}),v=n("6b0d"),g=n.n(v);const b=g()(f,[["render",i]]);t["default"]=b}}]);
//# sourceMappingURL=chunk-2d0deeb6.67501e08.js.map