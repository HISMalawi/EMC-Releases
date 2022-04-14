(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40c1ffa5"],{"46ff":function(e,t,n){},b512:function(e,t,n){"use strict";n("46ff")},fea93:function(e,t,n){"use strict";n.r(t);var r=n("7a23");function a(e,t,n,a,i,o){var s=Object(r["resolveComponent"])("his-standard-form"),c=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(c,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{cancelDestinationPath:e.cancelDestination,fields:e.fields,onFinishAction:e.onSubmit,skipSummary:!0},null,8,["cancelDestinationPath","fields","onFinishAction"])]})),_:1})}var i=n("5530"),o=n("1da1"),s=(n("d3b7"),n("3ca3"),n("ddb0"),n("4de4"),n("b0c0"),n("d81d"),n("99af"),n("96cf"),n("9441")),c=n("7365"),u=n("331e"),l=n("c4e4"),p=n("2706"),m=n("d95e"),d=n("8a30"),f=n("7957"),g=n("ec2a"),b=n("9283"),h=Object(r["defineComponent"])({components:{HisStandardForm:s["a"],IonPage:d["B"]},mixins:[c["a"]],data:function(){return{complaintsService:{},todaysDate:f["a"].getSessionDate(),presentingComplaints:""}},watch:{ready:{handler:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e&&(t.complaintsService=new u["a"](t.patientID,t.providerID),t.fields=t.getFields());case 1:case"end":return n.stop()}}),n)})))()},immediate:!0,deep:!0}},methods:{onSubmit:function(e,t){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.complaints);case 2:return r=e.sent,e.next=5,n.complaintsService.createEncounter();case 5:return e.next=7,n.complaintsService.saveObservationList(r);case 7:n.nextTask();case 8:case"end":return e.stop()}}),e)})))()},launchOrderSelection:function(){return Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["U"].create({component:l["a"],backdropDismiss:!1,cssClass:"large-modal"});case 2:return t=e.sent,t.present(),e.next=6,t.onDidDismiss();case 6:case"end":return e.stop()}}),e)})))()},getTriagePresentingComplaints:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.complaintsService.fetchLatestTriageEncounter();case 2:if(n=t.sent,n.length>0){t.next=5;break}return t.abrupt("return",!1);case 5:return t.next=7,g["a"].getEncounters(e.patientID,e.todaysDate);case 7:if(r=t.sent,a=r.filter((function(e){return"TRIAGE PRESENTING COMPLAINTS"==e.type.name&&b["a"].toStandardHisFormat(e.encounter_datetime)==f["a"].getSessionDate()})),a.length>0){t.next=11;break}return t.abrupt("return",!1);case 11:return e.presentingComplaints=a[0].observations,t.abrupt("return",!0);case 13:case"end":return t.stop()}}),t)})))()},buildResults:function(){var e=["Group","Presenting complaints"],t="",n=this.presentingComplaints.map((function(e){if(null!=e.obs_group_id)return[t,e.value_text];t=e.value_text}));return n=n.filter((function(e){return void 0!=e})),this.presentingComplaints=n,[{label:"",value:"",other:{columns:e,rows:n}}]},getFields:function(){var e=this;return[{id:"triage_complaints",helpText:"Triaging Complaints",condition:function(){return e.getTriagePresentingComplaints()},type:m["b"].TT_TABLE_VIEWER,options:function(t){return e.buildResults()},config:{hiddenFooterBtns:["Clear"]}},{id:"complaints",helpText:"Presenting Complaints",type:m["b"].TT_COMPLAINTS_PICKER,validation:function(e){return p["a"].required(e)},computedValue:function(t){return t.map(function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.t0=i["a"],t.t1=i["a"],t.t2={},t.next=5,e.complaintsService.buildValueCoded("Presenting complaint",n.other.parent);case 5:return t.t3=t.sent,t.t4=(0,t.t1)(t.t2,t.t3),t.t5={},t.next=10,e.complaintsService.buildValueCodedFromConceptId(n.other.parent,n.other.concept_id);case 10:return t.t6=t.sent,t.t7={child:t.t6},t.abrupt("return",(0,t.t0)(t.t4,t.t5,t.t7));case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},config:{footerBtns:[{name:"Lab Order",size:"large",slot:"end",color:"primary",visible:!0,onClick:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.launchOrderSelection();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));function n(){return t.apply(this,arguments)}return n}(),visibleOnStateChange:function(e){return 1===e.index}}]}},{id:"all_presenting_complaints",helpText:"Summary",condition:function(){return e.presentingComplaints.length>0},type:m["b"].TT_SUMMARY,options:function(t,n){return e.buildSummaryResults(t)},config:{hiddenFooterBtns:["Clear"]}}]},buildSummaryResults:function(e){var t=e.complaints.map((function(e){return{label:"OPD Complaints",value:e.label}})),n=this.presentingComplaints.map((function(e){return{label:"Triaging Complaints",value:e[1]}}));return t.concat(n)}}}),v=(n("b512"),n("d959")),w=n.n(v);const x=w()(h,[["render",a]]);t["default"]=x}}]);
//# sourceMappingURL=chunk-40c1ffa5.683b8269.js.map