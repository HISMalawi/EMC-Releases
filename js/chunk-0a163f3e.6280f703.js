(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a163f3e"],{"13c2":function(e,t,n){"use strict";n.r(t);var r=n("7a23");function a(e,t,n,a,c,o){var i=Object(r["resolveComponent"])("his-standard-form");return Object(r["openBlock"])(),Object(r["createBlock"])(i,{cancelDestinationPath:e.cancelDestination,fields:e.fields,activeField:e.activeField,onFinishAction:e.onSubmit},null,8,["cancelDestinationPath","fields","activeField","onFinishAction"])}n("99af"),n("4de4"),n("d81d"),n("b0c0"),n("07ac"),n("96cf");var c=n("1da1"),o=n("9441"),i=n("7365"),u=n("2706"),s=n("d95e"),l=n("2ef0"),d=n("d4ec"),f=n("bee2"),b=n("262e"),p=n("2caf"),v=n("cc6f"),m=n("71c3"),O={1:"OD",2:"BD",3:"TDS",4:"QID"},j=[{drug_id:236,duration:3,tabs:6,name:"Lumefantrine + Arthemether 1 x 6",dose_strength:1,units:"tabs",frequency:2},{drug_id:237,duration:3,tabs:12,name:"Lumefantrine + Arthemether 2 x 6",dose_strength:2,units:"tabs",frequency:2},{drug_id:238,duration:3,tabs:18,name:"Lumefantrine + Arthemether 3 x 6",dose_strength:3,units:"tabs",frequency:2},{drug_id:239,duration:3,tabs:24,name:"Lumefantrine + Arthemether 4 x 6",dose_strength:4,units:"tabs",frequency:2}],g=function(e){Object(b["a"])(n,e);var t=Object(p["a"])(n);function n(e,r){var a;return Object(d["a"])(this,n),a=t.call(this,e,25,r),a.drugs=[],a}return Object(f["a"])(n,[{key:"loadDrugs",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",e.next=3,n.getJson("drugs",{page_size:1e6,name:t});case 3:this.drugs=e.sent;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getDrugOptions",value:function(){return Object(l["isEmpty"])(this.drugs)?[]:this.drugs.map((function(e){return{label:e.name,value:e.name,other:e}}))}},{key:"hasMalaria",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getMalariaTestResult();case 2:if(t=e.sent,!t){e.next=5;break}return e.abrupt("return",!0);case 5:return e.next=7,this.getMalariaDiagnosis();case 7:if(n=e.sent,!n){e.next=10;break}return e.abrupt("return",!0);case 10:return e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getMalariaTestResult",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v["a"].getFirstValueCoded(this.patientID,"Malaria Test Result");case 2:if(t=e.sent,!t){e.next=5;break}return e.abrupt("return",t);case 5:return e.next=7,v["a"].getFirstValueText(this.patientID,"Malaria Test Result");case 7:if(t=e.sent,!t){e.next=10;break}return e.abrupt("return",t);case 10:return e.abrupt("return",null);case 11:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getMalariaDiagnosis",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",v["a"].getFirstValueCoded(this.patientID,"Malaria"));case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"createDrugOrder",value:function(e){return m["a"].create({encounter_id:this.encounterID,drug_orders:e})}}]),n}(v["a"]),h=n("fe70"),y=(n("b64b"),Object(r["withScopeId"])("data-v-586626f5"));Object(r["pushScopeId"])("data-v-586626f5");var k=Object(r["createTextVNode"])("Complete prescription details"),_={class:"side-title"},C=Object(r["createTextVNode"])(" Close "),x=Object(r["createTextVNode"])("Save ");Object(r["popScopeId"])();var w=y((function(e,t,n,a,c,o){var i=Object(r["resolveComponent"])("ion-title"),u=Object(r["resolveComponent"])("ion-toolbar"),s=Object(r["resolveComponent"])("ion-header"),l=Object(r["resolveComponent"])("ion-label"),d=Object(r["resolveComponent"])("ion-item"),f=Object(r["resolveComponent"])("ion-list"),b=Object(r["resolveComponent"])("ion-col"),p=Object(r["resolveComponent"])("frequency-card"),v=Object(r["resolveComponent"])("ion-row"),m=Object(r["resolveComponent"])("interval-keyboard"),O=Object(r["resolveComponent"])("ion-grid"),j=Object(r["resolveComponent"])("ion-content"),g=Object(r["resolveComponent"])("ion-button"),h=Object(r["resolveComponent"])("ion-footer");return Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],null,[Object(r["createVNode"])(s,null,{default:y((function(){return[Object(r["createVNode"])(u,null,{default:y((function(){return[Object(r["createVNode"])(i,null,{default:y((function(){return[k]})),_:1})]})),_:1})]})),_:1}),Object(r["createVNode"])(j,{style:{overflowY:"hidden",background:"grey"}},{default:y((function(){return[Object(r["createVNode"])(O,null,{default:y((function(){return[Object(r["createVNode"])(v,null,{default:y((function(){return[Object(r["createVNode"])(b,{size:"4"},{default:y((function(){return[Object(r["createVNode"])(f,{style:{overflowY:"auto",height:"78vh",borderRight:"solid 1px #ccc"}},{default:y((function(){return[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(e.drugs,(function(t,n){return Object(r["openBlock"])(),Object(r["createBlock"])(d,{key:t,detail:!0,onClick:function(){return e.activeIndex=n},color:e.activeIndex===n?"light":""},{default:y((function(){return[Object(r["createVNode"])(l,null,{default:y((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.name),1)]})),_:2},1024)]})),_:2},1032,["onClick","color"])})),128))]})),_:1})]})),_:1}),Object(r["createVNode"])(b,{style:{overflowY:"auto",height:"78vh"}},{default:y((function(){return[e.activeIndex>=0?(Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],{key:0},[Object(r["createVNode"])("div",_,Object(r["toDisplayString"])(e.instructions),1),Object(r["createVNode"])(v,{class:"frequencies"},{default:y((function(){return[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(Object.keys(e.frequencies),(function(t){return Object(r["openBlock"])(),Object(r["createBlock"])(b,{key:t},{default:y((function(){return[Object(r["createVNode"])(p,{title:t,status:e.frequencies[t],onClick:function(n){return e.setFrequency(t)}},null,8,["title","status","onClick"])]})),_:2},1024)})),128))]})),_:1}),Object(r["createVNode"])(m,{unit:"days",title:"Select Duration",onOnValue:e.setDuration},null,8,["onOnValue"])],64)):Object(r["createCommentVNode"])("",!0)]})),_:1})]})),_:1})]})),_:1})]})),_:1}),Object(r["createVNode"])(h,null,{default:y((function(){return[Object(r["createVNode"])(u,null,{default:y((function(){return[Object(r["createVNode"])(g,{onClick:e.closeModal,slot:"start",color:"danger",style:{"margin-left":"1rem"}},{default:y((function(){return[C]})),_:1},8,["onClick"]),Object(r["createVNode"])(g,{onClick:e.savePrescriptions,slot:"end",style:{"margin-right":"1rem"}},{default:y((function(){return[x]})),_:1},8,["onClick"])]})),_:1})]})),_:1})],64)})),D=n("b85c"),V=n("8a30"),I=Object(r["withScopeId"])("data-v-0dd8dfe4"),N=I((function(e,t,n,a,c,o){var i=Object(r["resolveComponent"])("ion-card-subtitle"),u=Object(r["resolveComponent"])("ion-card-content"),s=Object(r["resolveComponent"])("ion-card");return Object(r["openBlock"])(),Object(r["createBlock"])(s,{class:["his-card clickable",{active:e.status}]},{default:I((function(){return[Object(r["createVNode"])("img",{src:e.icon,alt:e.title,height:"65"},null,8,["src","alt"]),Object(r["createVNode"])(u,null,{default:I((function(){return[Object(r["createVNode"])(i,{color:e.status?"primary":""},{default:I((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.cardTitle),1)]})),_:1},8,["color"])]})),_:1})]})),_:1},8,["class"])})),S=n("ecc5"),q=Object(r["defineComponent"])({props:{title:{type:String,required:!0},status:{type:Boolean,default:!1}},components:{IonCard:V["f"],IonCardContent:V["g"],IonCardSubtitle:V["i"]},setup:function(e){var t=Object(r["computed"])((function(){return S["a"].capitalizeFirstLetter(e.title)})),n=Object(r["computed"])((function(){return"/assets/images/prescription/".concat(e.title,".png")}));return{cardTitle:t,icon:n}}}),F=(n("3b8e"),n("d959")),T=n.n(F);const B=T()(q,[["render",N],["__scopeId","data-v-0dd8dfe4"]]);var R=B,M=Object(r["withScopeId"])("data-v-5bd3374e"),L=M((function(e,t,n,a,c,o){var i=Object(r["resolveComponent"])("ion-label"),u=Object(r["resolveComponent"])("ion-item"),s=Object(r["resolveComponent"])("ion-list"),l=Object(r["resolveComponent"])("ion-col"),d=Object(r["resolveComponent"])("his-keyboard"),f=Object(r["resolveComponent"])("ion-row");return Object(r["openBlock"])(),Object(r["createBlock"])(f,{class:"ion-margin-vertical border"},{default:M((function(){return[Object(r["createVNode"])(l,{size:"4"},{default:M((function(){return[Object(r["createVNode"])(s,null,{default:M((function(){return[Object(r["createVNode"])(u,null,{default:M((function(){return[Object(r["createVNode"])(i,null,{default:M((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.title),1)]})),_:1})]})),_:1}),(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(e.ranges,(function(t,n){return Object(r["openBlock"])(),Object(r["createBlock"])(u,{key:t,color:e.activeIndex===n?"light":"",detail:!0,onClick:function(n){return e.generateKeypad(t)}},{default:M((function(){return[Object(r["createVNode"])(i,null,{default:M((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.start+" - "+t.end+" "+e.unit),1)]})),_:2},1024)]})),_:2},1032,["color","onClick"])})),128))]})),_:1})]})),_:1}),e.keyboard?(Object(r["openBlock"])(),Object(r["createBlock"])(l,{key:0},{default:M((function(){return[Object(r["createVNode"])(d,{kbConfig:e.keyboard,onKeyPress:e.onKeyPress,disabled:!1,style:{border:"0"}},null,8,["kbConfig","onKeyPress"])]})),_:1})):Object(r["createCommentVNode"])("",!0)]})),_:1})})),P=(n("c740"),n("db10")),E=Object(r["defineComponent"])({props:{unit:{type:String,default:""},title:{type:String,default:"Select Numbers"}},components:{HisKeyboard:P["a"],IonRow:V["F"],IonCol:V["m"],IonList:V["w"],IonItem:V["u"],IonLabel:V["v"]},emits:["onValue"],setup:function(e,t){var n=t.emit,a=Object(r["ref"])([{start:1,end:20},{start:21,end:40},{start:41,end:60},{start:61,end:80}]),c=Object(r["ref"])(0),o=Object(r["ref"])(),i=function(e){return n("onValue",e)},u=function(e){for(var t=[[]],n=0,r=0,i=e.start;i<=e.end;i++)r>4&&(++n,t[n]=[],r=0),t[n].push("".concat(i)),++r;o.value=[t,[]],c.value=a.value.findIndex((function(t){return t.start===e.start}))};return Object(r["onMounted"])((function(){return u(a.value[0])})),{keyboard:o,onKeyPress:i,generateKeypad:u,ranges:a,activeIndex:c}}});n("8bc1");const K=T()(E,[["render",L],["__scopeId","data-v-5bd3374e"]]);var A=K,z=n("b5e4"),H=Object(r["defineComponent"])({name:"PrescriptionModal",props:{prescribedDrugs:{type:Object,required:!0}},setup:function(e){var t=Object(r["ref"])(-1),n=Object(r["computed"])((function(){return e.prescribedDrugs.map((function(e){var t=e.other;return t.duration=0,t.frequency={morning:!1,noon:!1,evening:!1,night:!1},t}))})),a=function(e){return Object.values(e).filter((function(e){return e})).length},c=Object(r["computed"])((function(){if(t.value<0)return"";var e=n.value[t.value].name,r=a(n.value[t.value].frequency),c=n.value[t.value].duration;return"".concat(e,", ").concat(r," time(s) a day, for ").concat(c," day(s)")})),o=Object(r["computed"])((function(){return t.value<0?{}:n.value[t.value].frequency})),i=function(e){n.value[t.value].frequency[e]=!n.value[t.value].frequency[e]},u=function(e){n.value[t.value].duration=parseInt(e)},s=function(){var e,t=Object(D["a"])(n.value);try{for(t.s();!(e=t.n()).done;){var r=e.value,c=a(r.frequency),o=r.duration;if(!c||!o)return Object(z["e"])("complete prescription details for ".concat(r.name)),!1}}catch(i){t.e(i)}finally{t.f()}return!0},l=function(){s()&&V["V"].dismiss(n.value)},d=function(){return V["V"].dismiss()};return{drugs:n,activeIndex:t,instructions:c,frequencies:o,closeModal:d,setFrequency:i,setDuration:u,savePrescriptions:l}},components:{IonContent:V["n"],IonButton:V["d"],IonHeader:V["q"],IonTitle:V["M"],IonToolbar:V["N"],IonLabel:V["v"],IonList:V["w"],IonItem:V["u"],IonRow:V["F"],FrequencyCard:R,IntervalKeyboard:A}});n("e987");const J=T()(H,[["render",w],["__scopeId","data-v-586626f5"]]);var U=J,Y=n("9283"),Q=Object(r["defineComponent"])({components:{HisStandardForm:o["a"]},mixins:[i["a"]],data:function(){return{activeField:"",prescriptionService:{},hasMalaria:!1,drugOrders:[]}},watch:{ready:{handler:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=8;break}return t.prescriptionService=new g(t.patientID,t.providerID),n.next=4,t.prescriptionService.loadDrugs();case 4:return n.next=6,t.prescriptionService.hasMalaria();case 6:t.hasMalaria=n.sent,t.fields=t.getFields();case 8:case"end":return n.stop()}}),n)})))()},immediate:!0,deep:!0}},methods:{onSubmit:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.prescriptionService.createEncounter();case 2:if(n=t.sent,n){t.next=5;break}return t.abrupt("return",Object(z["e"])("Unable to create treatment encounter"));case 5:return t.next=7,e.prescriptionService.createDrugOrder(e.drugOrders);case 7:if(r=t.sent,r){t.next=10;break}return t.abrupt("return",Object(z["e"])("Unable to create drug orders!"));case 10:Object(z["d"])("Drug order has been created"),e.nextTask();case 12:case"end":return t.stop()}}),t)})))()},getPrescriptionDetails:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h["g"].create({component:U,backdropDismiss:!1,cssClass:"large-modal",componentProps:{prescribedDrugs:e}});case 2:return n=t.sent,n.present(),t.next=6,n.onDidDismiss();case 6:return r=t.sent,a=r.data,t.abrupt("return",a);case 9:case"end":return t.stop()}}),t)})))()},getFrequencyCount:function(e){return Object.values(e).filter((function(e){return e})).length},calculateExpireDate:function(e,t){var n=new Date(e);return n.setDate(n.getDate()+t),Y["a"].toStandardHisFormat(n)},mapToOrders:function(e){var t=this;return e.map((function(e){var n=g.getSessionDate(),r="number"===typeof e.frequency?e.frequency:t.getFrequencyCount(e.frequency),a=O[r];return{drug_inventory_id:e.drug_id,equivalent_daily_dose:e.dose_strength*r,start_date:n,auto_expire_date:t.calculateExpireDate(n,e.duration),units:e.units,instructions:"".concat(e.name,": ").concat(r," ").concat(a," for ").concat(e.duration),dose:e.dose_strength,frequency:a}}))},getFields:function(){var e=this;return[{id:"drugs",helpText:"Select drugs",type:s["b"].TT_MULTIPLE_SELECT,validation:function(e){return u["a"].required(e)},options:function(){return e.prescriptionService.getDrugOptions()},onload:function(){return e.activeField=""},beforeNext:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getPrescriptionDetails(n);case 2:if(r=t.sent,!Object(l["isEmpty"])(r)){t.next=5;break}return t.abrupt("return",!1);case 5:return e.drugOrders=e.mapToOrders(r),t.abrupt("return",!0);case 7:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}(),config:{showKeyboard:!0,footerBtns:[{name:"Predefined Malaria Drugs",color:"primary",size:"large",visible:!1,slot:"end",onClick:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.hasMalaria&&(e.activeField="malaria_drugs"),t.next=3,Object(z["a"])("Patient has no malaria. Do you still want to prescribe anti malaria drugs?");case 3:n=t.sent,n&&(e.activeField="malaria_drugs");case 5:case"end":return t.stop()}}),t)})));function n(){return t.apply(this,arguments)}return n}()}]}},{id:"malaria_drugs",helpText:"select Malaria Drugs",validation:function(e){return u["a"].required(e)},type:s["b"].TT_SELECT,condition:function(){return"malaria_drugs"===e.activeField},onValue:function(t){return!Object(l["isEmpty"])(t)&&(e.drugOrders=e.mapToOrders([t.other]),!0)},options:function(){return j.map((function(e){return{label:"".concat(e.name,", ").concat(e.frequency," time(s) a day, for ").concat(e.duration," days"),value:e.name,other:e}}))}}]}}});const G=T()(Q,[["render",a]]);t["default"]=G},"3b8e":function(e,t,n){"use strict";n("76ba")},"60f9":function(e,t,n){},"76ba":function(e,t,n){},"8bc1":function(e,t,n){"use strict";n("60f9")},9157:function(e,t,n){},e987:function(e,t,n){"use strict";n("9157")}}]);
//# sourceMappingURL=chunk-0a163f3e.6280f703.js.map