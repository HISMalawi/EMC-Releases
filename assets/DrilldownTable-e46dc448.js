import{aH as u,d as c,h as d,w as a,u as t,o as m,a as n,q as f,Z as w,I as y,v as _,aK as b,$ as p,b as I,t as D,S as g,C as B,D as T}from"./index-67d679d3.js";import{D as h}from"./index-2380d2dc.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";const A={async show(o,s,e="custom-summary-modal",l=!0){const r=await u.create({component:o,cssClass:e,backdropDismiss:l,componentProps:s});r.present();const{data:i}=await r.onWillDismiss();if(i)return i},async hide(o){await u.dismiss(o)}},C=c({__name:"DrilldownTable",props:{title:{type:String,default:"Drill down table"},rows:{type:Array,required:!0},columns:{type:Array,required:!1},actionButtons:{type:Array},rowActionButtons:{type:Array},config:{type:Object,default:()=>({showSubmitButton:!1})}},setup(o){return(s,e)=>(m(),d(t(T),null,{default:a(()=>[n(t(g),null,{default:a(()=>[n(t(f),null,{default:a(()=>[n(t(w),{slot:"end"},{default:a(()=>[n(t(y),{slot:"end",onClick:e[0]||(e[0]=l=>t(A).hide()),"icon-only":""},{default:a(()=>[n(t(_),{icon:t(b)},null,8,["icon"])]),_:1})]),_:1}),n(t(p),null,{default:a(()=>[I(D(o.title),1)]),_:1})]),_:1})]),_:1}),n(t(B),null,{default:a(()=>[n(t(h),{rows:o.rows,columns:o.columns,config:o.config,"row-actions-buttons":o.rowActionButtons,"actions-buttons":o.actionButtons,color:"light"},null,8,["rows","columns","config","row-actions-buttons","actions-buttons"])]),_:1})]),_:1}))}});const q=x(C,[["__scopeId","data-v-dd3e8006"]]);export{q as D,A as m};
