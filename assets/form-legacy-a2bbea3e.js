System.register(["./Strs-legacy-09248991.js","./common-legacy-0d7df615.js","./toasts-legacy-58d3d1ee.js","./loader-legacy-02e92a6d.js"],(function(e,t){"use strict";var r,o,a,n;return{setters:[e=>{r=e.a},e=>{o=e.i},e=>{a=e.t},e=>{n=e.l}],execute:function(){async function t(e){for(const t in e){const{required:r,value:a,validation:n}=e[t];if(r&&o(a))e[t].error="This field is required";else if("function"==typeof n){const r="object"==typeof a?a:{label:a,value:a},c=await n(r,e);e[t].error=o(c)?"":c.join()}else e[t].error=""}return Object.values(e).every((({error:e})=>!e))}function c(e,t=!1){const o={},a={};for(const n in e){const{value:c,computedValue:s}=e[n];if(c){const i=t?r(n):n;o[i]=c,"function"==typeof s&&(a[i]=s(e[n].value,e))}}return{formData:o,computedFormData:a}}e({a:function(e,t=""){const r=Object.values(e).filter((e=>e&&(e.tag===t||""===t))).reduce(((e,t)=>{const r=t.obs?t.obs:t;return Array.isArray(r)?e=e.concat(r):e.push(r),e}),[]);return Promise.all(r)},i:t,r:c,s:async function(e,r,o){if(!(await t(e)))return;const s=(null==o?void 0:o.showloader)||!1;try{s&&await n.show();const{formData:t,computedFormData:a}=c(e,null==o?void 0:o.underscoreKeys);await r(t,a)}catch(i){a(`${i}`),console.error("WELL HERE IS THE FAILURE",i)}finally{s&&await n.hide()}},t:function(e){return e.map((e=>({value:e,label:e})))}})}}}));
