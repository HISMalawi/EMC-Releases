(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0de126"],{"83a6":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function r(e,t,n,r,o,a){var c=Object(i["resolveComponent"])("his-standard-form"),s=Object(i["resolveComponent"])("ion-page");return Object(i["openBlock"])(),Object(i["createBlock"])(s,null,{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(c,{fields:e.fields,skipSummary:!0,onFinishAction:e.onFinish,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]})),_:1})}var o=n("1da1"),a=(n("d3b7"),n("d81d"),n("4de4"),n("96cf"),n("7365")),c=n("d4ec"),s=n("bee2"),u=n("262e"),l=n("2caf"),p=(n("99af"),n("cc6f")),d=n("b89f"),h=function(e){Object(u["a"])(n,e);var t=Object(l["a"])(n);function n(e,i){return Object(c["a"])(this,n),t.call(this,e,84,i)}return Object(s["a"])(n,[{key:"printSocialHistory",value:function(){return(new d["a"]).printLbl("/programs/".concat(this.programID,"/patients/").concat(this.patientID,"/labels/history"))}}]),n}(p["a"]),f=n("8a30"),v=n("d95e"),b=Object(i["defineComponent"])({components:{IonPage:f["D"]},mixins:[a["a"]],data:function(){return{service:{}}},watch:{ready:{handler:function(e){e&&(this.service=new h(this.patientID,this.providerID),this.fields=this.getFields())}}},methods:{onFinish:function(e,t){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.resolveObs(t);case 2:return i=e.sent,e.next=5,n.service.createEncounter();case 5:return e.next=7,n.service.saveObservationList(i);case 7:return e.next=9,n.service.printSocialHistory();case 9:n.nextTask();case 10:case"end":return e.stop()}}),e)})))()},getFields:function(){var e=this;return[{id:"history",helpText:"Social history",type:v["b"].TT_MULTI_SELECT_GRID,validation:function(e){return e.map((function(e){return""===e.value})).some(Boolean)?["Please complete selection!!"]:null},computedValue:function(t){return t.filter((function(e){return""!=e.value})).map((function(t){return e.service.buildValueCoded(t.other.concept,t.value)}))},options:function(){return[{label:"Currently Smoking",value:"",other:{concept:"patient smokes",options:e.yesNoOptions()}},{label:"Currently taking alcohol",value:"",other:{concept:"Currently taking alcohol",options:e.yesNoOptions()}},{label:"Marital status",value:"",other:{concept:"Marital status",options:[e.toOption("Never Married"),e.toOption("Married"),e.toOption("Seperated"),e.toOption("Divorced")]}}]}}]}}}),m=n("6b0d"),O=n.n(m);const y=O()(b,[["render",r]]);t["default"]=y}}]);
//# sourceMappingURL=chunk-2d0de126.92ffa6b9.js.map