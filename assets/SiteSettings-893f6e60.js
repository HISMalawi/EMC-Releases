import{d as C,ae as m,a2 as w,h as z,w as t,u as a,F as k,o as N,a as e,k as l,f as r,j as S,I as p,b as f,i as B}from"./index-3cd761e9.js";import{T as v}from"./TextInput-0126dccd.js";import{S as P}from"./SelectInput-8dfa5de6.js";import{s as _}from"./form-f915e7d2.js";import{a as y,t as g}from"./toasts-b12b9f38.js";import{g as q}from"./location_options-17bec97b.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./common-abc2f84d.js";import"./Strs-7ee8a435.js";import"./loader-fc807f7f.js";const D={class:"his-card"},T=r("h2",null,"Site Settings",-1),O=r("br",null,null,-1),j=r("br",null,null,-1),G=r("br",null,null,-1),Y=C({__name:"SiteSettings",setup(M){const{facility:o,loadCurrentFacility:x,updateFacilityCode:b,updateFacilityUuid:U,updateFacilityName:V}=k(),u=m({name:{value:o.name,label:"Site Name",required:!0}}),d=m({prefix:{value:o.code,label:"Site Prefix",required:!0}}),c=m({uuid:{value:o.uuid,label:"Site UUID",required:!0}});w(()=>{x(!0).then(()=>{u.name.value=o.name,d.prefix.value=o.code,c.uuid.value=o.uuid})});const h=()=>_(u,async({name:s})=>{try{await V(s.value),y("Site name updated successfully")}catch(i){g("Unable to update facility name"),console.error(i)}}),F=async()=>_(d,async({prefix:s})=>{try{await b(s),y("Site Prefix updated successfully")}catch(i){console.error(i),g("Unable to update site prefix")}}),I=async()=>_(c,async({uuid:s})=>{try{await U(s),await y("Site Prefix updated successfully")}catch(i){g("Unable to update site UUID"),console.error(i)}});return(s,i)=>(N(),z(a(B),null,{default:t(()=>[e(a(S),null,{default:t(()=>[e(a(l),{size:"10",offset:"1",class:"ion-padding"},{default:t(()=>[r("div",D,[T,e(a(S),null,{default:t(()=>[e(a(l),{size:"11",class:"ion-margin-vertical"},{default:t(()=>[e(P,{modelValue:u.name,"onUpdate:modelValue":i[0]||(i[0]=n=>u.name=n),asyncOptions:a(q)},null,8,["modelValue","asyncOptions"])]),_:1}),e(a(l),{size:"1",class:"ion-margin-vertical"},{default:t(()=>[O,e(a(p),{class:"ion-margin-top ion-float-right",onClick:h},{default:t(()=>[f("Submit")]),_:1})]),_:1}),e(a(l),{size:"11",class:"ion-margin-vertical"},{default:t(()=>[e(v,{modelValue:d.prefix,"onUpdate:modelValue":i[1]||(i[1]=n=>d.prefix=n)},null,8,["modelValue"])]),_:1}),e(a(l),{size:"1",class:"ion-margin-vertical"},{default:t(()=>[j,e(a(p),{class:"ion-margin-top ion-float-right",onClick:F},{default:t(()=>[f("Submit")]),_:1})]),_:1}),e(a(l),{size:"11",class:"ion-margin-vertical"},{default:t(()=>[e(v,{modelValue:c.uuid,"onUpdate:modelValue":i[2]||(i[2]=n=>c.uuid=n)},null,8,["modelValue"])]),_:1}),e(a(l),{size:"1",class:"ion-margin-vertical"},{default:t(()=>[G,e(a(p),{class:"ion-margin-top ion-float-right",onClick:I},{default:t(()=>[f("Submit")]),_:1})]),_:1})]),_:1})])]),_:1})]),_:1})]),_:1}))}});export{Y as default};
