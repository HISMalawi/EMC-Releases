System.register(["./index-legacy-f8d71896.js","./common-legacy-0d7df615.js"],(function(e,a){"use strict";var t,n,l;return{setters:[e=>{t=e.as,n=e.G},e=>{l=e.i}],execute:function(){e({a:function(){return["Catholic Church","CCAP","Seventh Day","Mosque","Primary School","Borehole","Secondary School","College","Market","Football Ground","Other"].map((e=>({label:e,value:e,other:{code:e}})))},b:async function(e="a",a=1){const t=await n.getJson("/villages",{name:e,page:a});return null==t?void 0:t.data.map((e=>({label:e.name,value:e.village_id,other:e})))},g:async function(e=""){var a;return(null!==(a=(await t.getFacilities({name:e})).data)&&void 0!==a?a:[]).filter((e=>!l(e)&&""!=e.name.trim())).map((e=>({label:e.name,value:e.location_id,other:e})))}})}}}));
