(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb723350"],{"054e":function(e,t,o){"use strict";o("6547")},"10be":function(e,t,o){"use strict";var n=o("7a23");const r={class:"keypad"};function a(e,t,o,a,c,l){const i=Object(n["resolveComponent"])("ion-input"),s=Object(n["resolveComponent"])("ion-chip"),u=Object(n["resolveComponent"])("center"),d=Object(n["resolveComponent"])("base-keyboard"),b=Object(n["resolveComponent"])("ion-content");return Object(n["openBlock"])(),Object(n["createBlock"])(b,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",r,[Object(n["createVNode"])(i,{value:e.value,disabled:!0,class:"keypad-input"},null,8,["value"]),Object(n["createVNode"])(u,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title||"keypad"),1)]),_:1})]),_:1}),Object(n["createVNode"])(d,{btnSize:"96px",layout:e.keypad,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])])]),_:1})}var c=o("c924"),l=o("3800"),i=o("2345"),s=o("fe70"),u=Object(n["defineComponent"])({components:{BaseKeyboard:c["a"]},props:{title:{type:String},preset:{type:String},onKeyPress:{type:Function,required:!0},strictNumbers:{type:Boolean,default:!1}},data:()=>({value:"0",keypad:l["d"]}),watch:{preset:{handler(e){e&&(this.value=e.toString())},immediate:!0}},methods:{async keypress(e){if(e.match(/done/i))await s["b"].dismiss(this.value);else if(this.strictNumbers){if(e.includes(".")&&this.value.includes("."))return;e.includes(".")||"0"!==this.value||(this.value=""),this.value=Object(i["a"])(e,this.value),this.value||(this.value="0"),""+parseInt(this.value)===this.value?this.onKeyPress(parseInt(this.value)):this.onKeyPress(this.value)}else this.value=Object(i["a"])(e,this.value),this.onKeyPress(this.value)}}}),d=(o("27f1"),o("6b0d")),b=o.n(d);const p=b()(u,[["render",a],["__scopeId","data-v-7454247c"]]);t["a"]=p},"1b7d":function(e,t,o){"use strict";o.r(t);var n=o("7a23");function r(e,t,o,r,a,c){const l=Object(n["resolveComponent"])("ion-loading"),i=Object(n["resolveComponent"])("v2Datatable"),s=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,{"is-open":e.isLoading,message:"Please wait.."},null,8,["is-open"]),Object(n["createVNode"])(i,{"icon-url":e.Img("login-logos/Malawi-Coat_of_arms_of_arms.png"),title:"Disaggregated report","report-prefix":"MoH",subtitle:e.period,columns:e.columns,columnData:e.reportData,rowsPerPage:100,onRefresh:e.onRegenerate,headerBadge:e.headerBadge},null,8,["icon-url","subtitle","columns","columnData","onRefresh","headerBadge"])]),_:1})}o("13d5"),o("14d9");var a=o("d867"),c=o("b5e4"),l=o("2ef6"),i=o("99ae"),s=o("7e0d"),u=o("87e7"),d=o("ad8d"),b=o("ff79"),p=o("1718"),g=o("2ef0"),O=o("6605"),j=o("0011"),h=o("b31c"),m=o("ff8f"),f=Object(n["defineComponent"])({components:{IonPage:a["D"],IonLoading:a["z"],v2Datatable:i["a"]},setup(){const e=Object(n["ref"])(!1),t=Object(n["ref"])([]),o=Object(n["ref"])(""),r=Object(n["ref"])(""),i=Object(n["ref"])(!1),f=new l["a"],v=new h["a"],C=Object(n["ref"])([]),y=Object(O["h"])(),k=async e=>{(await a["X"].create({component:s["a"],backdropDismiss:!1,cssClass:"large-modal",componentProps:{...e,subtitle:o.value,onFinish:()=>a["X"].getTop().then(e=>e&&a["X"].dismiss())}})).present()},P=(e,t)=>({ref:t,label:e,defaultValue:"0",toValue:e=>e.length,tdClick:async e=>{e.refData.length&&k({patientIdentifiers:e.refData,title:`${e.data.age_group} ${e.data.gender} ${e.column.label}`})}}),w=[[{label:"#",ref:"index"},{label:"Age group",ref:"age_group"},{label:"Gender",ref:"gender"},P("TX curr (receiving ART)","tx_curr"),...u["b"].reduce((e,t)=>[...e,P(t,t)],[]),P("Unknown","N/A"),P("Total (regimen)","regimen_total")]],x=[...u["b"],"N/A"].reduce((e,t)=>({...e,[t]:[]}),{}),_=async()=>D(await Object(c["a"])("Do you want to rebuild report?")),V=function(e){const t=C.value.findIndex(t=>t.id===e.id);-1!==t?C.value[t]=e:C.value.push(e)},N=async function(e){const t="validationErrors";(await a["X"].create({id:t,component:m["a"],backdropDismiss:!1,cssClass:"large-modal",componentProps:{errors:e}})).present(),V({id:t,text:`<b>${e.length}</b> validation errors detected`,icon:b["H"],color:"danger",action:()=>N(e)})},B=async e=>{const t={total_alive_and_on_art:{param:e.length,check:(e,t)=>e!=t,error:(e,t)=>`\n                        Total alive of <b>${t}</b>\n                        Does not match total alive of <b>${e}</b> on MOH report\n                    `}},o=v.validateIndicators(t,e=>{e.length?N(e):V({id:"reportOk",text:"<b>Report is consistent</b>",icon:b["I"],color:"success"})});-1===o&&N(["Report not validated. Run the MoH cohort report for similar reporting period and then run this report"])},D=async(o=!1)=>{if(!e.value)return Object(c["c"])("Unable to generate report, return to cohort report");i.value=!0;const n=["Pregnant","Breastfeeding"],a={F:{label:"Female",rows:[],aggregate:{},excludedAgeGroups:n},M:{label:"Male",rows:[],aggregate:{},excludedAgeGroups:n},FP:{label:"Pregnant",rows:[],aggregate:{},gender:"F",ageGroup:"All",genderDisplay:"FP",excludedAgeGroups:[...d["a"],"Breastfeeding"]},FBF:{label:"Breastfeeding",rows:[],aggregate:{},gender:"F",ageGroup:"All",genderDisplay:"FBF",excludedAgeGroups:[...d["a"],"Pregnant"]}},l=(e=!1)=>{const o=Object.keys(a.FP.aggregate).reduce((e,t)=>({...e,[t]:[...a.FP.aggregate[t]||[],...a.FBF.aggregate[t]||[]]}),{}),n=Object.keys(a.F.aggregate).reduce((e,t)=>({...e,[t]:e[t].filter(e=>!Array.isArray(o[t])||!o[t].includes(e))}),a.F.aggregate);t.value=[...a.F.rows,...a.M.rows,{age_group:"All",gender:"Male",...a.M.aggregate},...a.FP.rows,{age_group:"All",gender:"FNP",...n},...a.FBF.rows];const c=Object(g["uniq"])([...a.M.aggregate.tx_curr||[],...a.F.aggregate.tx_curr||[]]),l={text:`Total alive and on ART: <b>${c.length}</b>`,icon:b["h"],color:"primary",action:()=>k({patientIdentifiers:c,title:"Total alive and on ART: "+c.length})};e?(C.value=[l],B(c)):C.value=[l,{text:r.value,icon:b["u"],color:"dark"}]};try{if(f.setRebuildOutcome(o),!await f.init())return Object(c["e"])("Unable to initialise report");for(const e of[...d["a"],...n]){r.value=`Processing <b>${e}</b>`,f.setAgeGroup(e);const t=await f.getCohort();f.setRebuildOutcome(!1);for(const o of Object.keys(a)){var s,u,p;if((a[o].excludedAgeGroups||[]).includes(e))continue;f.setGender(o),a[o].ageGroup&&f.setAgeGroup(a[o].ageGroup);const n=await f.getRegimenDistribution(),r={age_group:(null===(s=a[o])||void 0===s?void 0:s.ageGroup)||e,gender:(null===(u=a[o])||void 0===u?void 0:u.genderDisplay)||a[o].label,...t[e]?t[e][(null===(p=a[o])||void 0===p?void 0:p.gender)||o]:{},...x,...n,regimen_total:Object.values(n).flat(1)};a[o].rows.push(r),a[o].aggregate=Object.keys(r).reduce((e,t)=>Array.isArray(r[t])?{...e,[t]:[...e[t]||[],...r[t]]}:e,a[o].aggregate),l(!1)}}l(!0),t.value=t.value.map((e,t)=>({index:t+1,...e}))}catch(O){const e="Unable to generate report!";Object(c["c"])(e),C.value=[{text:e,color:"danger",icon:b["i"],action:function(){C.value=[{text:`Exception occured: <b>${O}</b>`,color:"danger",icon:b["i"]}]}}]}i.value=!1,r.value=""};return Object(n["onMounted"])(()=>{e.value=!!(y.query.start_date&&y.query.end_date&&y.query.quarter),e.value&&(f.setStartDate(""+y.query.start_date),f.setEndDate(""+y.query.end_date),f.setOccupation(""+y.query.occupation),v.setOccupation(f.occupation),v.setStartDate(f.startDate),v.setEndDate(f.endDate),o.value=`${Object(j["h"])(f.startDate)} to ${Object(j["h"])(f.endDate)}`,y.query.quarter&&(f.setQuarter(""+y.query.quarter),v.setQuarter(f.quarter),o.value=""+("Custom"===f.quarter?o.value:f.quarter)),D())}),{Img:p["a"],onRegenerate:_,headerBadge:C,reportData:t,isLoading:i,generate:D,columns:w,period:o}}}),v=o("6b0d"),C=o.n(v);const y=C()(f,[["render",r]]);t["default"]=y},"27f1":function(e,t,o){"use strict";o("a3fb")},"2ef6":function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));var n=o("ade3"),r=o("5969"),a=o("ad8d");class c extends r["a"]{constructor(){super(),Object(n["a"])(this,"gender",void 0),Object(n["a"])(this,"ageGroup",void 0),Object(n["a"])(this,"initialize",void 0),Object(n["a"])(this,"rebuildOutcome",void 0),this.gender="",this.ageGroup=a["a"][0],this.initialize=!0,this.rebuildOutcome=!0}async init(){this.initialize=!0;const e=await this.getCohort();return!(!e||"created"!==e.temp_disaggregated)&&(this.initialize=!1,!0)}setAgeGroup(e){this.ageGroup=e}setInitialization(e){this.initialize=e}setRebuildOutcome(e){this.rebuildOutcome=e}setGender(e){this.gender=e}getGender(){return this.gender}getCohort(){return this.getReport("cohort_disaggregated",{age_group:""+this.ageGroup,rebuild_outcome:""+this.rebuildOutcome,initialize:""+this.initialize})}getTxIpt(){return this.getReport("clients_given_ipt",{gender:this.gender,age_group:""+this.ageGroup})}getTxCurrTB(){return this.getReport("screened_for_tb",{gender:this.gender,age_group:""+this.ageGroup})}getRegimenDistribution(){return this.getReport("disaggregated_regimen_distribution",{gender:""+this.gender,age_group:""+this.ageGroup})}}},"4b85":function(e,t,o){},6547:function(e,t,o){},"7e0d":function(e,t,o){"use strict";var n=o("7a23");function r(e,t,o,r,a,c){const l=Object(n["resolveComponent"])("v2Datatable"),i=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(i,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,{title:e.title,subtitle:e.subtitle,columnData:e.reportData,columns:e.columns,"on-finish":e.runFinishAction,rowsPerPage:e.ITEMS_PER_PAGE},null,8,["title","subtitle","columnData","columns","on-finish","rowsPerPage"])]),_:1})}o("14d9");var a=o("d867"),c=o("99ae"),l=o("6605"),i=o("2ef0"),s=o("8734"),u=o("0011"),d=o("d10e");const b=25;var p=Object(n["defineComponent"])({props:{title:{type:String,default:"Drilldown"},patientIdentifiers:{type:Object},onFinish:{type:Function}},components:{IonPage:a["D"],v2Datatable:c["a"]},setup(e){const t=Object(n["ref"])(!0),o=Object(n["ref"])("-"),r=Object(n["ref"])([]),a=Object(l["i"])(),c=[[{label:"ARV Number",ref:"identifier"},{label:"Gender",ref:"gender"},{label:"Birthdate",ref:"birthdate"},{label:"Action",ref:"patient_id",exportable:!1,tdClick:({data:e})=>a.push({path:"/patient/dashboard/"+e.person_id}),value:()=>"View client"}]];function p(){t.value=!1,"function"===typeof e.onFinish&&e.onFinish()}return Object(n["watch"])(()=>e.patientIdentifiers,async e=>{if(r.value=[],o.value="Total: 0",!e||!e.length)return;const n=Object(i["chunk"])(e,1e3);for(const c of n){try{if(!t.value)break;const e=(await d["a"].getPersons(c)).map(e=>({...e,birthdate:Object(u["h"])(e.birthdate),gender:Object(u["b"])(e.gender)}));r.value=[...r.value,...e]}catch(a){console.error(a)}o.value=`Total: ${r.value.length} of ${(e||[]).length}`,await Object(s["a"])(100)}},{immediate:!0}),{columns:c,subtitle:o,reportData:r,canLoadData:t,ITEMS_PER_PAGE:b,runFinishAction:p}}}),g=o("6b0d"),O=o.n(g);const j=O()(p,[["render",r]]);t["a"]=j},"87e7":function(e,t,o){"use strict";o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return c})),o.d(t,"e",(function(){return l})),o.d(t,"a",(function(){return i})),o.d(t,"d",(function(){return s}));var n=o("ade3"),r=o("5969");const a=["0A","2A","4A","5A","6A","7A","8A","9A","10A","11A","12A","13A","14A","15A","16A","17A","0P","2P","4PP","4PA","9PP","9PA","11PP","11PA","12PP","12PA","14PP","14PA","15PP","15PA","16P","17PP","17PA"],c=["0A","2A","4A","5A","6A","7A","8A","9A","10A","11A","12A","13A","14A","15A","16A","17A","0P","2P","4P","4PP","4PA","9P","9PP","9PA","11P","11PP","11PA","12PP","12PA","14P","14PP","14PA","15P","15PP","15PA","16P","17P","17PP","17PA"],l=["10 - 13.9 Kg","14 - 19.9 Kg","20 - 24.9 Kg","25 - 29.9 Kg","3 - 3.9 Kg","30 - 34.9 Kg","35 - 39.9 Kg","4 - 4.9 Kg","40 Kg +","40 - 49.9 Kg","50 Kg +","6 - 9.9 Kg","Unknown"],i=["pellets","tablets","granules"];class s extends r["a"]{constructor(){super(),Object(n["a"])(this,"type",void 0),this.type="pepfar"}setReportType(e){this.type=e}getTptNewInitiations(){return this.getReport(`programs/${this.programID}/reports/tpt_newly_initiated`)}getRegimenFormulationReport(e,t){return this.getReport(`programs/${this.programID}/reports/regimens_and_formulations`,{regimen:e,formulation:t})}getRegimenReport(){return this.getReport("regimen_report",{type:this.type})}getRegimenSwitchReport(e=!1){return this.getReport("regimen_switch",{pepfar:e})}getRegimensByWeight(){return this.getReport(`programs/${this.programID}/reports/regimens_by_weight_and_gender`)}getSCReport(e=!1){return this.getReport("sc_arvdisp",{pepfar:e})}}},"99ae":function(e,t,o){"use strict";var n=o("7a23");const r={key:0},a={class:"his-sm-text"},c={class:"art-report-theme"},l={class:"stick-report-header"},i=["colspan","rowspan","onClick"],s=["onClick"],u={class:"his-sm-text"};function d(e,t,o,d,b,p){const g=Object(n["resolveComponent"])("ion-img"),O=Object(n["resolveComponent"])("ion-thumbnail"),j=Object(n["resolveComponent"])("ion-title"),h=Object(n["resolveComponent"])("ion-icon"),m=Object(n["resolveComponent"])("ion-button"),f=Object(n["resolveComponent"])("ion-label"),v=Object(n["resolveComponent"])("ion-chip"),C=Object(n["resolveComponent"])("ion-buttons"),y=Object(n["resolveComponent"])("ion-toolbar"),k=Object(n["resolveComponent"])("ion-header"),P=Object(n["resolveComponent"])("ion-item"),w=Object(n["resolveComponent"])("ion-content"),x=Object(n["resolveComponent"])("his-keyboard"),_=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(k,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(y,null,{default:Object(n["withCtx"])(()=>[e.iconUrl?(Object(n["openBlock"])(),Object(n["createBlock"])(O,{key:0,slot:"start"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,{src:e.iconUrl},null,8,["src"])]),_:1})):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(j,{slot:"start",class:"his-md-text"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title)+" ",1),e.subtitle?(Object(n["openBlock"])(),Object(n["createElementBlock"])("br",r)):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("span",a,Object(n["toDisplayString"])(e.subtitle),1)]),_:1}),Object(n["createVNode"])(C,{slot:"end"},{default:Object(n["withCtx"])(()=>["function"===typeof e.onConfigure?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:0,onClick:t[0]||(t[0]=()=>e.onConfigure?e.onConfigure():null)},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,{size:"large",icon:e.funnelOutline},null,8,["icon"])]),_:1})):Object(n["createCommentVNode"])("",!0),e.searchTerm?(Object(n["openBlock"])(),Object(n["createBlock"])(v,{key:1,onClick:t[1]||(t[1]=()=>{e.searchTerm="",e.showSearchKeyboard=!1}),class:"his-md-text",color:"primary"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.searchTerm?"Search: "+e.searchTerm:""),1)]),_:1}),Object(n["createVNode"])(h,{icon:e.close},null,8,["icon"])]),_:1})):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(m,{color:e.showSearchKeyboard?"primary":"dark",onClick:t[2]||(t[2]=()=>e.showSearchKeyboard=!e.showSearchKeyboard),size:"large"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,{size:"large",icon:e.search},null,8,["icon"])]),_:1},8,["color"]),"function"===typeof e.onRefresh?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:2,onClick:t[3]||(t[3]=()=>e.onRefresh?e.onRefresh():null),color:"success",size:"large"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,{size:"large",icon:e.sync},null,8,["icon"])]),_:1})):Object(n["createCommentVNode"])("",!0)]),_:1})]),_:1}),(e.headerBadge||[]).length?(Object(n["openBlock"])(),Object(n["createBlock"])(y,{key:0,color:"light"},{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.headerBadge,(t,o)=>(Object(n["openBlock"])(),Object(n["createBlock"])(v,{onClick:e=>"function"===typeof t.action?t.action():null,key:o,color:(null===t||void 0===t?void 0:t.color)||"dark"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,{icon:(null===t||void 0===t?void 0:t.icon)||e.search},null,8,["icon"]),Object(n["createVNode"])(f,{innerHTML:null===t||void 0===t?void 0:t.text},null,8,["innerHTML"])]),_:2},1032,["onClick","color"]))),128))]),_:1})):Object(n["createCommentVNode"])("",!0)]),_:1}),Object(n["createVNode"])(w,{"scroll-y":"","scroll-x":""},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("table",c,[Object(n["createElementVNode"])("thead",l,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.columns,(t,o)=>(Object(n["openBlock"])(),Object(n["createElementBlock"])("tr",{key:o},[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(t,(t,o)=>{var r,a;return Object(n["openBlock"])(),Object(n["createElementBlock"])("th",{key:o,colspan:(null===t||void 0===t||null===(r=t.span)||void 0===r?void 0:r.thColspan)||1,rowspan:(null===t||void 0===t||null===(a=t.span)||void 0===a?void 0:a.thRowspan)||1,onClick:o=>e.sortColumn(t.ref)},[Object(n["createVNode"])(P,{lines:"none"},{default:Object(n["withCtx"])(()=>[e.columnSorted&&e.columnSorted===t.ref?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:0,icon:"asc"===e.sortOrder?e.arrowUp:e.arrowDown},null,8,["icon"])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(f,{class:"ion-text-center"},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("b",null,Object(n["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1024)],8,i)}),128))]))),128))]),Object(n["createElementVNode"])("tbody",null,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.page,(t,o)=>(Object(n["openBlock"])(),Object(n["createElementBlock"])("tr",{key:o},[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(t.row,(t,o)=>{var r;return Object(n["openBlock"])(),Object(n["createElementBlock"])("td",{key:o,onClick:()=>e.onClickTablecell(t),class:Object(n["normalizeClass"])({"clickable-cell":null===t||void 0===t||null===(r=t.column)||void 0===r?void 0:r.tdClick})},[Object(n["createElementVNode"])("span",u,Object(n["toDisplayString"])(t.value),1)],10,s)}),128))]))),128))])])]),_:1}),Object(n["createVNode"])(_,null,{default:Object(n["withCtx"])(()=>[e.showSearchKeyboard?(Object(n["openBlock"])(),Object(n["createBlock"])(x,{key:0,kbConfig:e.QWERTY,onKeyPress:e.filterTable},null,8,["kbConfig","onKeyPress"])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(y,{color:"dark"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(m,{onClick:t[4]||(t[4]=t=>e.toCSV()),size:"large"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" CSV ")]),_:1}),Object(n["createVNode"])(m,{onClick:t[5]||(t[5]=t=>e.toPDF()),size:"large"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" PDF ")]),_:1}),e.totalPages>1?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:0,onClick:e.first,disabled:0===e.currentPage||e.totalPages<=2,size:"large",slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" First ")]),_:1},8,["onClick","disabled"])):Object(n["createCommentVNode"])("",!0),e.totalPages>1?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:1,onClick:e.prev,disabled:!e.canPrev,color:"light",size:"large",slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Prev ")]),_:1},8,["onClick","disabled"])):Object(n["createCommentVNode"])("",!0),e.totalPages>1?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:2,onClick:e.selectPage,size:"large",slot:"end",color:"light"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.currentPage)+" / "+Object(n["toDisplayString"])(e.totalPages-1),1)]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),e.totalPages>1?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:3,onClick:e.next,disabled:!e.canNext,color:"light",size:"large",slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Next ")]),_:1},8,["onClick","disabled"])):Object(n["createCommentVNode"])("",!0),e.totalPages>1?(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:4,onClick:e.last,disabled:e.currentPage+1>=e.totalPages||e.totalPages<=2,size:"large",slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Last ")]),_:1},8,["onClick","disabled"])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(m,{onClick:e.finish,color:"success",size:"large",slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Finish ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}o("14d9"),o("13d5");var b=o("d867"),p=o("ff79"),g=o("2ef0"),O=o("017e"),j=o("c731"),h=o("6062"),m=o("ba82"),f=o("1c74"),v=o("6605"),C=o("5a0c"),y=o.n(C),k=o("0011"),P=o("db10"),w=o("6be2"),x=o("2345"),_=Object(n["defineComponent"])({components:{IonToolbar:b["S"],IonItem:b["w"],IonIcon:b["r"],IonLabel:b["x"],IonTitle:b["R"],IonHeader:b["q"],IonButton:b["d"],IonFooter:b["o"],IonContent:b["n"],IonButtons:b["e"],IonChip:b["l"],HisKeyboard:P["a"],IonThumbnail:b["Q"],IonImg:b["s"]},props:{title:{type:String,default:"Report"},headerBadge:{type:Object},iconUrl:{type:String},subtitle:{type:String},columns:{type:Object,required:!0},columnData:{type:Array,default:()=>[]},enablePagination:{type:Boolean,default:!0},rowsPerPage:{type:Number,default:10},onFinish:{type:Function},onRefresh:{type:Function},onConfigure:{type:Function},csvQuarter:{type:String},reportPrefix:{type:String,default:""}},setup(e){const t=Object(v["i"])(),o=Object(n["ref"])([]),r=Object(n["ref"])(0),a=Object(n["ref"])(""),c=Object(n["ref"])(""),l=Object(n["ref"])("desc"),i=Object(n["ref"])(!1),s=Object(n["computed"])(()=>{let t=o.value;if(l.value&&c.value&&(t=Object(O["a"])(o.value)[l.value](e=>e.data[c.value])),a.value){const o=new h["a"](t,{threshold:.3,keys:["searchIndex"],useExtendedSearch:!0});return o.search(a.value,{limit:e.rowsPerPage}).map(e=>e.item)}return t}),u=Object(n["computed"])(()=>Object(g["chunk"])(s.value,e.rowsPerPage).length),d=Object(n["computed"])(()=>r.value+2<=u.value),b=Object(n["computed"])(()=>r.value>0),C=Object(n["computed"])(()=>{const t=Object(g["chunk"])(s.value,e.rowsPerPage);return t[r.value]}),P=e=>{c.value=e,l.value="asc"===l.value?"desc":"asc"},_=()=>Object(j["c"])(e=>{const t=parseInt(e);parseInt(e)<=u.value&&(r.value=t)},{title:"Select page"}),V=()=>r.value=0,N=()=>r.value=u.value-1||0,B=()=>r.value+=1,D=()=>r.value-=1,A=()=>{"function"===typeof e.onFinish?e.onFinish():t.push("/")},F=e=>{try{var t,o;if("function"===typeof(null===(t=e.column)||void 0===t?void 0:t.tdClick))null===(o=e.column)||void 0===o||o.tdClick(e);return}catch(n){console.error(n)}},I=()=>e.columns.reduce((e,t)=>e.concat(t),[]).filter(e=>e.value||e.ref),T=t=>{var n,r,a;const c=I().filter(e=>[!e.canExport||(null===e||void 0===e?void 0:e.canExport[t]),"boolean"!==typeof e.exportable||e.exportable].every(Boolean)),l=c.map(e=>e.exportedValue&&e.exportedValue.column?e.exportedValue.column(e):e.secondaryLabel||e.label),i=c.map(e=>e.ref),s=o.value.reduce((e,t)=>{const o=t.row.filter(({column:e})=>i.includes(e.ref)).map(e=>e.column.exportedValue&&e.column.exportedValue.dataValue?e.column.exportedValue.dataValue(e):e.value);return[...e,o]},[]),u=`${e.reportPrefix} ${null!==(n=f["e"].getLocationName())&&void 0!==n?n:""} ${Object(k["g"])(e.title).replace(e.reportPrefix,"")} ${Object(k["f"])(null!==(r=null!==(a=e.csvQuarter)&&void 0!==a?a:e.subtitle)&&void 0!==r?r:"")}`;return{headers:l,rows:s,filename:u}},S=()=>{const{headers:e,rows:t,filename:o}=T("pdf");Object(m["c"])([e],t,o,!0)},R=()=>{const{headers:t,rows:o,filename:n}=T("csv");Object(m["a"])([t],[...o,["Date Created: "+y()().format("DD/MMM/YYYY HH:MM:ss")],["Quarter: "+(e.csvQuarter||e.subtitle)],["HIS-Core Version: "+f["e"].getCoreVersion()],["API Version: "+f["e"].getApiVersion()],["Site UUID: "+f["e"].getSiteUUID()],["Generated by: "+f["e"].getUserName()]],n)},E=e=>{a.value=Object(x["a"])(e,a.value),r.value=0},q=e=>{e.forEach(e=>{const t=I().map(t=>{let o="";const n=e[t.ref];try{o=Object(g["isEmpty"])(e)?"...":"function"===typeof t.toValue?""+t.toValue(n):"function"===typeof t.value?t.value(e):e[t.ref]||""}catch(r){o=(null===t||void 0===t?void 0:t.defaultValue)||"_ERROR_",console.error(r)}return{column:t,refData:n,value:o,data:e}});o.value.push({row:t,data:e,searchIndex:[...t,t.map(e=>e.value).join(" ")]})})};return Object(n["watch"])(()=>e.columnData,t=>{if(o.value=[],!Array.isArray(t)||!t.length)return r.value=0,a.value="",c.value="",void q(Array.from({length:e.rowsPerPage}).map(()=>({})));q(t)},{immediate:!0,deep:!0}),{first:V,last:N,next:B,prev:D,selectPage:_,sortColumn:P,onClickTablecell:F,toPDF:S,toCSV:R,finish:A,filterTable:E,sync:p["G"],search:p["D"],close:p["p"],arrowUp:p["g"],arrowDown:p["f"],funnelOutline:p["t"],page:C,canNext:d,searchTerm:a,totalPages:u,sortOrder:l,canPrev:b,currentPage:r,columnSorted:c,QWERTY:w["h"],showSearchKeyboard:i}}}),V=(o("e7d8"),o("6b0d")),N=o.n(V);const B=N()(_,[["render",d],["__scopeId","data-v-613ab08c"]]);t["a"]=B},a3fb:function(e,t,o){},b31c:function(e,t,o){"use strict";o.d(t,"a",(function(){return l}));var n,r=o("ade3"),a=(o("13d5"),o("14d9"),o("2ef0")),c=o("5969");(function(e){e["MOH_CACHE"]="mohCache"})(n||(n={}));class l extends c["a"]{constructor(){super(),Object(r["a"])(this,"regenerate",void 0),this.regenerate=!1}cohortUrl(){return`programs/${this.programID}/reports/cohort`}setRegenerate(e){this.regenerate=e}getCohortDrillDown(e){return c["a"].getJson("cohort_report_drill_down",{id:e,date:this.date,program_id:this.programID})}requestCohort(e){return c["a"].ajxGet(this.cohortUrl(),e)}qaurterRequestParams(){const e={name:this.quarter,regenerate:this.regenerate};return this.occupation&&(e["occupation"]=this.occupation),e}datePeriodRequestParams(){const e={name:`Cohort-${this.startDate}-${this.endDate}`,start_date:this.startDate,end_date:this.endDate,regenerate:this.regenerate};return this.occupation&&(e["occupation"]=this.occupation),e}getCachedCohortValues(){const e=sessionStorage.getItem(n.MOH_CACHE);if(e){const t=JSON.parse(e);if(t.start_date===this.startDate&&t.end_date===this.endDate||t.quarter===this.quarter)return t.data}}cacheCohort(e){sessionStorage.setItem(n.MOH_CACHE,JSON.stringify({start_date:this.startDate,end_date:this.endDate,quarter:this.quarter,data:e}))}validateIndicators(e,t){const o=this.getCachedCohortValues();if(o){const n=Object.keys(e).reduce((t,n)=>{const r=Object(a["find"])(o,{name:n}),c=e[n],l=r?r.contents:null,i=c.param,s=c.check(parseInt(l),i);return s&&t.push(c.error(l,i)),t},[]);return t(n)}return-1}}},c731:function(e,t,o){"use strict";o.d(t,"a",(function(){return l})),o.d(t,"c",(function(){return i})),o.d(t,"b",(function(){return s}));var n=o("d867"),r=o("e6e9"),a=o("9441"),c=o("10be");async function l(e,t,o=null){(await n["X"].create({component:a["a"],backdropDismiss:!1,cssClass:"full-modal",componentProps:{onFinish:t,fields:e,skipSummary:!0,disableAutoModalDismiss:!0,cancelAction:()=>{"function"===typeof o&&o(),n["X"].dismiss()}}})).present()}async function i(e,t={}){const o="boolean"!==typeof(null===t||void 0===t?void 0:t.strictNumbers)||(null===t||void 0===t?void 0:t.strictNumbers),r=await n["X"].create({component:c["a"],backdropDismiss:!1,cssClass:"keypad-modal custom-modal-backdrop",componentProps:{title:(null===t||void 0===t?void 0:t.title)||"",preset:(null===t||void 0===t?void 0:t.preset)||"",toggleButton:null===t||void 0===t?void 0:t.toggleButton,strictNumbers:o,customKeyboard:null===t||void 0===t?void 0:t.customKeyboard,noFloat:"boolean"===typeof(null===t||void 0===t?void 0:t.noFloat)&&t.noFloat,onKeyPress(t,n){e(o?parseInt(t):t,n)}}});r.present()}async function s(e,t){(await n["X"].create({component:r["a"],backdropDismiss:!1,cssClass:"full-modal",componentProps:{dismissType:"modal",currentField:e,onFinish:t}})).present()}},d10e:function(e,t,o){"use strict";o.d(t,"a",(function(){return a}));var n=o("ade3"),r=o("1c74");class a extends r["e"]{constructor(e){super(),Object(n["a"])(this,"person",void 0),this.person=e}create(){return r["e"].postJson("/people",this.person)}update(e){return r["e"].putJson("people/"+e,{...this.person,program_id:r["e"].getProgramID()})}static getPersons(e){return super.getJson("clients",{person_ids:e.join(",")})}static searchFamilyName(e){return super.getJson("/search/family_name",{search_string:e})}static searchGivenName(e){return super.getJson("/search/given_name",{search_string:e})}static async getPersonFullName(e){const t=await super.getJson(`/people/${e}/names`);return t&&t.length?t[0].given_name+" "+t[0].family_name:""}}},e6e9:function(e,t,o){"use strict";var n=o("7a23");function r(e,t,o,r,a,c){const l=Object(n["resolveComponent"])("ion-title"),i=Object(n["resolveComponent"])("ion-toolbar"),s=Object(n["resolveComponent"])("ion-header"),u=Object(n["resolveComponent"])("ion-content"),d=Object(n["resolveComponent"])("ion-button"),b=Object(n["resolveComponent"])("ion-footer"),p=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(p,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,{class:"his-lg-text ion-text-center"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.currentField.helpText),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(u,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(),Object(n["createBlock"])(n["KeepAlive"],null,[(Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.currentField.type),{key:e.currentField.id,options:e.currentField.options,preset:e.currentField.preset,clear:e.valueClearIndex,fdata:e.formData,config:e.currentField.config,cdata:e.computedFormData,activationState:e.state,onValue:e.currentField.onValue,defaultValue:e.currentField.defaultValue,onValueUpdate:e.currentField.onValueUpdate,onOnValue:e.onFieldValue},null,40,["options","preset","clear","fdata","config","cdata","activationState","onValue","defaultValue","onValueUpdate","onOnValue"]))],1024))]),_:1}),Object(n["createVNode"])(b,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(i,{color:"light"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(d,{disabled:e.disableBtn,onClick:e.onClose,slot:"start",color:"danger",size:"large"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["disabled","onClick"]),Object(n["createVNode"])(d,{disabled:e.disableBtn,onClick:e.onClear,slot:"end",color:"warning",size:"large"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Clear ")]),_:1},8,["disabled","onClick"]),Object(n["createVNode"])(d,{disabled:e.disableBtn,onClick:e.onDone,slot:"end",color:"success",size:"large"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Done ")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1})]),_:1})}var a=o("b5e4"),c=o("d95e"),l=o("d867");function i(){const e={};return c["a"].forEach(t=>{e[t]=Object(n["defineAsyncComponent"])(()=>o("f159")(`./${t}.vue`))}),e}var s=Object(n["defineComponent"])({name:"SingleFieldTouchForm",components:{IonPage:l["D"],IonContent:l["n"],IonFooter:l["o"],IonToolbar:l["S"],IonButton:l["d"],IonHeader:l["q"],IonTitle:l["R"],...i()},props:{dismissType:{type:String},onFinish:{type:Function,required:!0},currentField:{type:Object,required:!0}},data:()=>({valueClearIndex:0,formData:{},computedFormData:{},state:"",value:null,disableBtn:!1}),methods:{onClose(){"modal"===this.dismissType?l["X"].dismiss():this.$router.back()},onClear(){this.valueClearIndex+=1,this.value=null},onFieldValue(e){this.value=e},onDone(){if(this.disableBtn=!0,this.currentField.validation){const e=this.currentField.validation(this.value);if(this.disableBtn=!1,e)return Object(a["e"])(e.join(", "),6e4)}try{this.onFinish(this.value)}catch(e){Object(a["c"])(""+e),console.error(e)}this.onClose(),this.disableBtn=!1}}}),u=o("6b0d"),d=o.n(u);const b=d()(s,[["render",r]]);t["a"]=b},e7d8:function(e,t,o){"use strict";o("4b85")},ff8f:function(e,t,o){"use strict";var n=o("7a23");const r=["innerHTML"];function a(e,t,o,a,c,l){const i=Object(n["resolveComponent"])("ion-title"),s=Object(n["resolveComponent"])("ion-toolbar"),u=Object(n["resolveComponent"])("ion-header"),d=Object(n["resolveComponent"])("ion-item"),b=Object(n["resolveComponent"])("ion-list"),p=Object(n["resolveComponent"])("ion-grid"),g=Object(n["resolveComponent"])("ion-button"),O=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(u,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(p,{class:"selector"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(b,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.errors,(e,t)=>(Object(n["openBlock"])(),Object(n["createBlock"])(d,{class:"his-md-text ion-padding",key:t},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",{innerHTML:`(${t+1}) ${e}`},null,8,r)]),_:2},1024))),128))]),_:1})]),_:1}),Object(n["createVNode"])(O,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,{class:"close-btn",color:"danger",size:"large",onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var c=o("d867"),l=Object(n["defineComponent"])({components:{IonGrid:c["p"],IonList:c["y"],IonItem:c["w"],IonFooter:c["o"],IonButton:c["d"],IonToolbar:c["S"],IonHeader:c["q"],IonTitle:c["R"]},props:{title:{type:String,default:"Report Errors"},errors:{type:Array,required:!0}},methods:{async closeModal(){await c["X"].dismiss({})}}}),i=(o("054e"),o("6b0d")),s=o.n(i);const u=s()(l,[["render",a],["__scopeId","data-v-0ed0c7a2"]]);t["a"]=u}}]);
//# sourceMappingURL=chunk-cb723350.fdd6ca07.js.map