(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-428a91f2"],{7920:function(e,t,n){"use strict";var r=n("7a23");function i(e,t,n,i,a,u){return Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=n("9441"),u=Object(r["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),o=n("6b0d"),c=n.n(o);const s=c()(u,[["render",i]]);t["a"]=s},"8a4e":function(e,t,n){"use strict";n.r(t);var r=n("7a23");function i(e,t,n,i,a,u){var o=Object(r["resolveComponent"])("his-standard-form");return Object(r["openBlock"])(),Object(r["createBlock"])(o,{fields:e.fields,activeField:e.activeField,onFinishAction:e.onFinish,skipSummary:!0,onOnIndex:t[1]||(t[1]=function(t){return e.activeField=""}),cancelDestinationPath:e.cancelDestination},null,8,["fields","activeField","onFinishAction","cancelDestinationPath"])}var a=n("1da1"),u=(n("a15b"),n("d81d"),n("4de4"),n("d3b7"),n("ddb0"),n("159b"),n("96cf"),n("d95e")),o=n("7920"),c=n("2706"),s=n("9283"),l=n("e86e"),d=n("3d6c"),p=n("b5e4"),f=n("2ef0"),h=Object(r["defineComponent"])({components:{HisStandardForm:o["a"]},data:function(){return{activeField:"",fields:[],drugs:[],selectedDrugs:[],barcode:"",stockService:{}}},methods:{onFinish:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.prepDrugs(e),n.next=3,t.stockService.postItems(r);case 3:i=n.sent,i?(Object(p["d"])("Stock succesfully added"),t.$router.push("/")):Object(p["c"])("Could not save stock");case 5:case"end":return n.stop()}}),n)})))()},getFields:function(){var e=this;return[{id:"transfer_origination",helpText:"Select where stock came from",type:u["b"].TT_SELECT,validation:function(e){return c["a"].required(e)},options:function(){return[{label:"DHA",value:"DHA"},{label:"Other location",value:"Other location"}]}},{id:"transfer_location",helpText:"Location",type:u["b"].TT_SELECT,validation:function(e){return c["a"].required(e)},condition:function(e){return"Other location"===e.transfer_origination.value},options:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object(l["b"])(t)},computedValue:function(e){return e.label},config:{showKeyboard:!0,isFilterDataViaApi:!0}},{id:"barcode",helpText:"Scan barcode",type:u["b"].TT_BARCODE,config:{hiddenFooterBtns:["Clear","Next"]},onValue:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.barcode=n,e.activeField="select drugs";case 2:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}(),condition:function(e){return"DHA"===e.transfer_origination.value}},{id:"select drugs",helpText:"Select drugs",type:u["b"].TT_MULTIPLE_SELECT,requireNext:!0,validation:function(e){return c["a"].required(e)},options:function(){return e.drugs},unload:function(t){return e.selectedDrugs=t},config:{showKeyboard:!0,footerBtns:[{name:"Select all",slot:"end",onClick:function(){e.selectAll(e.drugs)}}]}},{id:"date",helpText:"Delivery Date",type:u["b"].TT_FULL_DATE,validation:function(e){return c["a"].required(e)}},{id:"enter_batches",helpText:"Batch entry",type:u["b"].TT_BATCH_ENTRY,options:function(){return e.selectedDrugs},beforeNext:function(e,t,n,r){var i=r.currentFieldContext,a=function(e){return e.map((function(e,t){return"".concat(e.label)})).join(" & ")},u=i.drugs.filter((function(e){return e.entries.map((function(e){return!e.tins&&!e.expiry&&!e.batchNumber})).every(Boolean)})),o=i.drugs.filter((function(e){return e.entries.map((function(e){var t=0;return e.tins&&(t+=1),e.expiry&&(t+=1),e.batchNumber&&(t+=1),t>=1&&t<=2})).some(Boolean)}));if(!Object(f["isEmpty"])(o)){var c=a(o);return Object(p["e"])("Please fix partial batch entries for drugs: ".concat(c)),!1}if(!Object(f["isEmpty"])(u)){var s=a(u);return Object(p["e"])("The following drug batches are empty: ".concat(s)),!1}return!0},validation:function(e){return c["a"].required(e)}},{id:"adherence_report",helpText:"Summary",type:u["b"].TT_TABLE_VIEWER,options:function(t){return e.buildResults(t.enter_batches)},config:{hiddenFooterBtns:["Clear"]}}]},buildResults:function(e){var t=["Drug","Amount per unit","Total units","Expiry date","Batch number"],n=e.map((function(e){var t=e.value;return[t.shortName,t.tabs,t.tins,s["b"].toStandardHisDisplayFormat(t.expiry),t.batchNumber]}));return[{label:"Confirm entry",value:"Table",other:{columns:t,rows:n}}]},prepDrugs:function(e){var t=[],n=this.barcode,r="DHA"===e.transfer_origination.value?null:e.transfer_location.value;return e.enter_batches.forEach((function(i){var a=i.value;t.push({batch_number:a.batchNumber,location_id:r,items:[{barcode:n,drug_id:a.drugID,expiry_date:a.expiry,quantity:parseInt(a.tabs)*parseInt(a.tins),delivery_date:e.date.value}]})})),t},selectAll:function(e){return e.map((function(e){return e.isChecked=!0,e}))},formatDrugs:function(){return this.stockService.drugList().map((function(e){return{label:e.shortName,value:e}}))}},created:function(){this.stockService=new d["a"],this.fields=this.getFields(),this.drugs=this.formatDrugs()}}),m=n("6b0d"),b=n.n(m);const v=b()(h,[["render",i]]);t["default"]=v},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return l})),n.d(t,"f",(function(){return p})),n.d(t,"e",(function(){return h})),n.d(t,"a",(function(){return b})),n.d(t,"g",(function(){return g})),n.d(t,"h",(function(){return x}));var r=n("1da1"),i=(n("96cf"),n("d81d"),n("4de4"),n("d3b7"),n("b0c0"),n("5713")),a=n("2ef0");function u(){return o.apply(this,arguments)}function o(){return o=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",e.next=3,i["a"].getFacilities({name:t});case 3:return n=e.sent,e.abrupt("return",n.filter((function(e){return!Object(a["isEmpty"])(e)})).map((function(e){return{label:e.name,value:e.location_id,other:e}})));case 5:case"end":return e.stop()}}),e)}))),o.apply(this,arguments)}function c(){return s.apply(this,arguments)}function s(){return s=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",e.next=3,i["a"].getLabs({search_name:t});case 3:return n=e.sent,e.abrupt("return",n.map((function(e){return{label:e,value:e}})));case 5:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}function l(){return d.apply(this,arguments)}function d(){return d=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",e.next=3,i["a"].getFacilities({name:t,tag:"Facility adult sections"});case 3:return n=e.sent,e.abrupt("return",n.map((function(e){return{label:e.name,value:e.name,other:e}})));case 5:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}function p(){return f.apply(this,arguments)}function f(){return f=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["a"].getSpecialistClinics();case 2:return t=e.sent,e.abrupt("return",t.map((function(e){return{label:e.name,value:e.name,other:e}})));case 4:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}function h(){return m.apply(this,arguments)}function m(){return m=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["a"].getRegions();case 2:return t=e.sent,e.abrupt("return",t.map((function(e){return{label:e.name,value:e.region_id,other:e}})));case 4:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}function b(e){return v.apply(this,arguments)}function v(){return v=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["a"].getDistricts(t);case 2:return n=e.sent,e.abrupt("return",n.map((function(e){return{label:e.name,value:e.district_id,other:e}})));case 4:case"end":return e.stop()}}),e)}))),v.apply(this,arguments)}function g(e){return y.apply(this,arguments)}function y(){return y=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:"",e.next=3,i["a"].getTraditionalAuthorities(t,n);case 3:return r=e.sent,e.abrupt("return",r.map((function(e){return{label:e.name,value:e.traditional_authority_id,other:e}})));case 5:case"end":return e.stop()}}),e)}))),y.apply(this,arguments)}function x(e){return w.apply(this,arguments)}function w(){return w=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:"",e.next=3,i["a"].getVillages(t,n);case 3:return r=e.sent,e.abrupt("return",r.map((function(e){return{label:e.name,value:e.village_id,other:e}})));case 5:case"end":return e.stop()}}),e)}))),w.apply(this,arguments)}}}]);
//# sourceMappingURL=chunk-428a91f2.81e3223d.js.map