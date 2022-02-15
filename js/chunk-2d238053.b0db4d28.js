(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d238053"],{fe31:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=Object(r["createTextVNode"])(" Patient visit report "),i={class:"view-port-content"},a=Object(r["createTextVNode"])(" Finish ");function c(e,t,n,c,s,u){var d=Object(r["resolveComponent"])("his-standard-form"),l=Object(r["resolveComponent"])("ion-title"),p=Object(r["resolveComponent"])("ion-toolbar"),h=Object(r["resolveComponent"])("ion-header"),b=Object(r["resolveComponent"])("apexchart"),f=Object(r["resolveComponent"])("view-port"),O=Object(r["resolveComponent"])("ion-content"),j=Object(r["resolveComponent"])("ion-button"),w=Object(r["resolveComponent"])("ion-footer"),m=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],null,[Object(r["withDirectives"])(Object(r["createVNode"])(d,{onOnFinish:e.onPeriod,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"]),[[r["vShow"],!e.canShowReport]]),e.canShowReport?(Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:0},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(h,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(p,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,null,{default:Object(r["withCtx"])((function(){return[o]})),_:1})]})),_:1})]})),_:1}),Object(r["createVNode"])(O,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])("div",i,[Object(r["createVNode"])(b,{width:e.width,height:e.height,type:e.chartType,options:e.chartOptions,series:e.series,onClick:e.pointSelection},null,8,["width","height","type","options","series","onClick"])])]})),_:1})]})),_:1}),Object(r["createVNode"])(w,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(p,{color:"dark"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(j,{slot:"end",size:"large","router-link":"/",color:"success"},{default:Object(r["withCtx"])((function(){return[a]})),_:1})]})),_:1})]})),_:1})]})),_:1})):Object(r["createCommentVNode"])("",!0)],64)}n("99af"),n("4de4"),n("d81d"),n("4fad"),n("b64b");var s=n("2909"),u=n("3835"),d=(n("96cf"),n("1da1")),l=n("8a30"),p=n("0a79"),h=n("ad8d"),b=n("7920"),f=n("44e3"),O=n("2ef0"),j=Object(r["defineComponent"])({components:{IonPage:l["B"],IonHeader:l["q"],IonTitle:l["M"],IonToolbar:l["N"],IonContent:l["n"],IonFooter:l["o"],IonButton:l["d"],ViewPort:p["a"],HisStandardForm:b["a"]},mixins:[f["a"]],data:function(){return{chartType:"area",height:"100%",width:"100%",canShowReport:!1,report:{},series:[],patientPresent:{},guardianPresent:{},bothPresent:{},chartOptions:{title:{text:"HIV Reception encounters"},yaxis:{title:{text:"Number of clients"},plotAreaHeight:800},xaxis:{type:"datetime"}}}},created:function(){this.fields=this.getDateDurationFields()},methods:{onPeriod:function(e,t){var n=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.presentLoading();case 2:return n.canShowReport=!0,n.report=new h["b"],n.report.setStartDate(t.start_date),n.report.setEndDate(t.end_date),e.next=8,n.report.getPatientVisitTypes();case 8:r=e.sent,n.series=n.buildSeries(r),l["T"].dismiss();case 11:case"end":return e.stop()}}),e)})))()},presentLoading:function(){return Object(d["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["T"].create({message:"Please wait...",backdropDismiss:!1});case 2:return t=e.sent,e.next=5,t.present();case 5:case"end":return e.stop()}}),e)})))()},pointSelection:function(e,t,n){try{var r=n.dataPointIndex,o=n.seriesIndex,i=o<=0?0:o;this.runTableDrill(this.series[i].raw[r])}catch(e){}},buildSeries:function(e){var t=Object(O["uniq"])(Object.keys(e)),n=function(t,n,r){t in n||(n[t]=[]);var o=Object.entries(e[t]).filter((function(e){var t=Object(u["a"])(e,2),n=(t[0],t[1]);return r(n.patient_present,n.guardian_present)})).map((function(e){var t=Object(u["a"])(e,1),n=t[0];return n}));return n[t]=[].concat(Object(s["a"])(n[t]),Object(s["a"])(o)),n},r=function(e){return t.map((function(t){return[new Date(t).getTime(),e[t].length]}))},o=function(e){return t.map((function(t){return e[t]}))};for(var i in e)n(i,this.patientPresent,(function(e,t){return e&&!t})),n(i,this.guardianPresent,(function(e,t){return!e&&t})),n(i,this.bothPresent,(function(e,t){return e&&t}));return[{name:"Patient present",raw:o(this.patientPresent),data:r(this.patientPresent)},{name:"Guardian present",raw:o(this.guardianPresent),data:r(this.guardianPresent)},{name:"Both patient and guardian present",raw:o(this.bothPresent),data:r(this.bothPresent)}]}}}),w=n("d959"),m=n.n(w);const v=m()(j,[["render",c]]);t["default"]=v}}]);
//# sourceMappingURL=chunk-2d238053.b0db4d28.js.map