(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b347d"],{2867:function(e,n,t){"use strict";t.r(n);var r=t("7a23");function i(e,n,t,i,o,a){var s=Object(r["resolveComponent"])("his-standard-form");return Object(r["openBlock"])(),Object(r["createBlock"])(s,{fields:e.fields,onOnSubmit:e.onSubmit,onOnFinish:e.onFinish,skipSummary:!0},null,8,["fields","onOnSubmit","onOnFinish"])}t("96cf");var o=t("1da1"),a=t("d95e"),s=t("7920"),u=t("b5e4"),c=t("cc74"),d=Object(r["defineComponent"])({components:{HisStandardForm:s["a"]},methods:{onFinish:function(e){var n=this,t="".concat(e.site_code.value).toUpperCase();c["b"].setSitePrefix(t).then((function(){return Object(u["d"])("Property set")})).then((function(){return n.$router.push("/")}))},setFields:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,c["b"].sitePrefix();case 2:t=n.sent,e.fields=[{id:"site_code",helpText:"Enter Site Code",defaultValue:function(){return t},type:a["b"].TT_TEXT,validation:function(e){return e?null:["Value is required"]}}];case 4:case"end":return n.stop()}}),n)})))()}},data:function(){return{fields:[]}},watch:{$route:{handler:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.setFields();case 1:case"end":return n.stop()}}),n)})))()},deep:!0,immediate:!0}}}),f=t("d959"),l=t.n(f);const p=l()(d,[["render",i]]);n["default"]=p}}]);
//# sourceMappingURL=chunk-2d0b347d.e876b30f.js.map