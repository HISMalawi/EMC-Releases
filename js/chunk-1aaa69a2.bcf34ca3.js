(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1aaa69a2"],{7920:function(e,n,t){"use strict";var a=t("7a23");function i(e,n,t,i,o,r){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=t("9441"),r=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,n){this.$emit("onFinish",e,n)},onIndex(e){this.$emit("onIndex",e)}}}),c=t("6b0d"),s=t.n(c);const l=s()(r,[["render",i]]);n["a"]=l},9178:function(e,n,t){"use strict";t.r(n);var a=t("7a23");function i(e,n,t,i,o,r){const c=Object(a["resolveComponent"])("his-standard-form"),s=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(s,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(c,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!0},null,8,["fields","onFinishAction"])]),_:1})}var o=t("d95e"),r=t("f149"),c=t("7920"),s=t("2706"),l=t("ad49"),u=t("b5e4"),d=t("8a30"),f=t("e86e"),m=Object(a["defineComponent"])({components:{HisStandardForm:c["a"],IonPage:d["D"]},data:()=>({preference:"",fields:[]}),created(){this.preference=this.$route.params.name,this.fields=[...this.defaultReferralLocation()]},methods:{async onFinish(e,n){for(const t in n)await l["a"].set(t,n[t]),Object(u["d"])("Property has been updated",2e3);this.$router.back()},isPreference(e){return!this.preference||e===this.preference},defaultReferralLocation(){return[{id:r["a"].DEFAULT_REFERRAL_LOCATION,helpText:"Default external referral location",type:o["b"].TT_SELECT,computedValue:e=>e.label,defaultValue:()=>r["b"].defaultReferralLocation(),validation:e=>s["a"].required(e),condition:()=>this.isPreference("default_referral_location"),options:(e,n="")=>Object(f["b"])(n),config:{showKeyboard:!0,isFilterDataViaApi:!0}}]}}}),p=t("6b0d"),h=t.n(p);const b=h()(m,[["render",i]]);n["default"]=b},e86e:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"d",(function(){return r})),t.d(n,"c",(function(){return c})),t.d(n,"f",(function(){return s})),t.d(n,"e",(function(){return l})),t.d(n,"a",(function(){return u})),t.d(n,"g",(function(){return d})),t.d(n,"h",(function(){return f}));var a=t("5713"),i=t("2ef0");async function o(e=""){const n=await a["a"].getFacilities({name:e});return n.filter(e=>!Object(i["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function r(e=""){const n=await a["a"].getLabs({search_name:e});return n.map(e=>({label:e,value:e}))}async function c(e=""){const n=await a["a"].getFacilities({name:e,tag:"Facility adult sections"});return n.map(e=>({label:e.name,value:e.name,other:e}))}async function s(){const e=await a["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function l(){const e=await a["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function u(e){const n=await a["a"].getDistricts(e);return n.map(e=>({label:e.name,value:e.district_id,other:e}))}async function d(e,n=""){const t=await a["a"].getTraditionalAuthorities(e,n);return t.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function f(e,n=""){const t=await a["a"].getVillages(e,n);return t.map(e=>({label:e.name,value:e.village_id,other:e}))}},f149:function(e,n,t){"use strict";t.d(n,"a",(function(){return a}));var a,i=t("ad49");(function(e){e["DEFAULT_REFERRAL_LOCATION"]="default.referral.location"})(a||(a={})),n["b"]={defaultReferralLocation:()=>i["a"].get(a.DEFAULT_REFERRAL_LOCATION)}}}]);
//# sourceMappingURL=chunk-1aaa69a2.bcf34ca3.js.map