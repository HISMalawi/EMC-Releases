import{d9 as n,g as l}from"./index-9d5e84a5.js";function u(t="person_id",r=l()){return{label:"view client",icon:n,color:"light",action:e=>r.push("/emc/patient/".concat(e[t]))}}function i(t,r={}){return Array.isArray(t)?t.map(e=>({label:e,path:e,drillable:!0,sortable:!0,...r})):Object.entries(t).map(([e,a])=>({path:e,label:a,drillable:!0,sortable:!1,...r}))}export{u as g,i as t};
