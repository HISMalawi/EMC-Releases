import{aq as i,G as r}from"./index-a3998c4f.js";import{i as n}from"./common-94ac9539.js";async function c(o=""){var t;return((t=(await i.getFacilities({name:o})).data)!=null?t:[]).filter(a=>!n(a)&&a.name.trim()!="").map(a=>({label:a.name,value:a.location_id,other:a}))}async function m(o="a",e=1){const t=await r.getJson("/villages",{name:o,page:e});return t==null?void 0:t.data.map(a=>({label:a.name,value:a.village_id,other:a}))}function u(){return["Catholic Church","CCAP","Seventh Day","Mosque","Primary School","Borehole","Secondary School","College","Market","Football Ground","Other"].map(e=>({label:e,value:e,other:{code:e}}))}export{u as a,m as b,c as g};
