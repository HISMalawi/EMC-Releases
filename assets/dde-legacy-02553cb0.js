System.register(["./toasts-legacy-f5cd9c9b.js","./index-legacy-f8d71896.js","./index-legacy-aa705205.js"],(function(e,r){"use strict";var t,a,n,i,o,s,c;return{setters:[e=>{t=e.a,a=e.t},e=>{n=e.r,i=e.aE,o=e.aD,s=e.ai},e=>{c=e.P}],execute:function(){e({a:async function(e){var n;if(u.value)return l(await r.findByNpid(e));const i=await o.searchByNpid(e);return i.ok?(t("DDE status updated"),i.data):(a(null!==(n=i.errorMessage)&&void 0!==n?n:`Searching client by NPID returned error: ${i.clientErrorType}`),[])},b:async function(e){var t;if(u.value)return l(await r.findByDemographics(e));const n=await o.searchBy(e);return n.ok?n.data:(a(null!==(t=n.errorMessage)&&void 0!==t?t:`Searching client by Demographics returned error: ${n.clientErrorType}`),[])},i:async function(e){var n;if(!(await s("Are you sure you want to import client?")))return;const i=await r.importPatient(e);if(i.ok)return t("Client imported to local database"),i.data;a(null!==(n=i.errorMessage)&&void 0!==n?n:`Error importing with error: ${i.clientErrorType}`)},r:async function(){u.value=await r.isDDeEnabled()},s:async function(e){const n=await(e?r.enableDDe():r.disableDDe());var i;n.ok?(u.value=e,t("DDE status updated")):a(null!==(i=n.errorMessage)&&void 0!==i?i:`Unable to change status because ${n.clientErrorType}`)}});const r=new i(c),u=e("d",n(!1));function d(e){return e.patient_identifiers.reduce(((e,r)=>({...e,[r.type.name]:r.identifier})),{})["DDE person document ID"]}function l(e){var r;return e.ok&&e.data?Object.keys(e.data).reduce(((r,t)=>[...r,...e.data[t].map((e=>({...e,source:t,docID:d(e),ddeClientRequiresImport:d(e)&&"remotes"===t&&!e.patient_id})))]),[]):(a(null!==(r=e.errorMessage)&&void 0!==r?r:`An error happened with status code: ${e.httpStatusResponse}`),[])}}}}));
