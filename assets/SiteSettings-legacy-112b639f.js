System.register(["./index-legacy-c6316dba.js","./TextInput-legacy-f3cba34a.js","./SelectInput-legacy-adc09c6f.js","./form-legacy-ce5781c6.js","./toasts-legacy-74d888f1.js","./location_options-legacy-f4b8f0b2.js","./_plugin-vue_export-helper-legacy-762b7923.js","./common-legacy-42ce034b.js","./Strs-legacy-09248991.js","./his_date-legacy-d6a21612.js","./Date-legacy-d50d8544.js","./loader-legacy-c09b1ae3.js"],(function(e,l){"use strict";var a,t,i,u,n,s,c,o,r,d,f,m,y,p,g,_,S,v,b,j,x;return{setters:[e=>{a=e.d,t=e.ae,i=e.a2,u=e.h,n=e.w,s=e.u,c=e.F,o=e.o,r=e.a,d=e.k,f=e.f,m=e.j,y=e.I,p=e.b,g=e.i},e=>{_=e.T},e=>{S=e.S},e=>{v=e.s},e=>{b=e.a,j=e.t},e=>{x=e.g},null,null,null,null,null,null],execute:function(){const l={class:"his-card"},h=f("h2",null,"Site Settings",-1),U=f("br",null,null,-1),V=f("br",null,null,-1),z=f("br",null,null,-1);e("default",a({__name:"SiteSettings",setup(e){const{facility:a,loadCurrentFacility:w,updateFacilityCode:C,updateFacilityUuid:F,updateFacilityName:I}=c(),k=t({name:{value:a.name,label:"Site Name",required:!0}}),q=t({prefix:{value:a.code,label:"Site Prefix",required:!0}}),D=t({uuid:{value:a.uuid,label:"Site UUID",required:!0}});i((()=>{w(!0).then((()=>{k.name.value=a.name,q.prefix.value=a.code,D.uuid.value=a.uuid}))}));const P=()=>v(k,(async({name:e})=>{try{await I(e.value),b("Site name updated successfully")}catch(l){j("Unable to update facility name"),console.error(l)}})),N=async()=>v(q,(async({prefix:e})=>{try{await C(e),b("Site Prefix updated successfully")}catch(l){console.error(l),j("Unable to update site prefix")}})),O=async()=>v(D,(async({uuid:e})=>{try{await F(e),await b("Site Prefix updated successfully")}catch(l){j("Unable to update site UUID"),console.error(l)}}));return(e,a)=>(o(),u(s(g),null,{default:n((()=>[r(s(m),null,{default:n((()=>[r(s(d),{size:"10",offset:"1",class:"ion-padding"},{default:n((()=>[f("div",l,[h,r(s(m),null,{default:n((()=>[r(s(d),{size:"11",class:"ion-margin-vertical"},{default:n((()=>[r(S,{modelValue:k.name,"onUpdate:modelValue":a[0]||(a[0]=e=>k.name=e),asyncOptions:s(x)},null,8,["modelValue","asyncOptions"])])),_:1}),r(s(d),{size:"1",class:"ion-margin-vertical"},{default:n((()=>[U,r(s(y),{class:"ion-margin-top ion-float-right",onClick:P},{default:n((()=>[p("Submit")])),_:1})])),_:1}),r(s(d),{size:"11",class:"ion-margin-vertical"},{default:n((()=>[r(_,{modelValue:q.prefix,"onUpdate:modelValue":a[1]||(a[1]=e=>q.prefix=e)},null,8,["modelValue"])])),_:1}),r(s(d),{size:"1",class:"ion-margin-vertical"},{default:n((()=>[V,r(s(y),{class:"ion-margin-top ion-float-right",onClick:N},{default:n((()=>[p("Submit")])),_:1})])),_:1}),r(s(d),{size:"11",class:"ion-margin-vertical"},{default:n((()=>[r(_,{modelValue:D.uuid,"onUpdate:modelValue":a[2]||(a[2]=e=>D.uuid=e)},null,8,["modelValue"])])),_:1}),r(s(d),{size:"1",class:"ion-margin-vertical"},{default:n((()=>[z,r(s(y),{class:"ion-margin-top ion-float-right",onClick:O},{default:n((()=>[p("Submit")])),_:1})])),_:1})])),_:1})])])),_:1})])),_:1})])),_:1}))}}))}}}));
