(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13f7161e"],{"12f0":function(e,t,a){"use strict";a.r(t);var n=a("7a23");function i(e,t,a,i,o,l){const r=Object(n["resolveComponent"])("information-header"),s=Object(n["resolveComponent"])("report-table"),c=Object(n["resolveComponent"])("preloader"),u=Object(n["resolveComponent"])("pagination"),d=Object(n["resolveComponent"])("ion-content"),b=Object(n["resolveComponent"])("his-footer"),p=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(p,{style:{background:"#fff"}},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(r,{items:e.patientCardInfo,numberOfColumns:4,onAddGuardian:e.addGuardian,onUpdate:e.updateDemographics,onUpdateARVNumber:e.updateARVNumber},null,8,["items","onAddGuardian","onUpdate","onUpdateARVNumber"]),Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,{paginated:!0,rows:e.rows,columns:e.columns,rowsPerPage:e.itemsPerPage,newPage:e.currentPage,asyncRowParser:e.onNewRow,onOnPagination:t[1]||(t[1]=t=>e.totalPages=t.length)},null,8,["rows","columns","rowsPerPage","newPage","asyncRowParser"]),e.visitDatesInitialised?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(c,{key:0,itemCount:5})),Object(n["createVNode"])(u,{perPage:e.itemsPerPage,maxVisibleButtons:20,totalPages:e.totalPages,onOnChangePage:t[2]||(t[2]=t=>e.currentPage=t)},null,8,["perPage","totalPages"])]),_:1}),Object(n["createVNode"])(b,{btns:e.btns},null,8,["btns"])]),_:1})}var o=a("9283"),l=a("23e6"),r=a("7957");const s=Object(n["withScopeId"])("data-v-94355f20");Object(n["pushScopeId"])("data-v-94355f20");const c={style:{padding:".1rem"}},u={style:{width:"100%",display:"flex",justifyContent:"space-between",fontSize:"12px",margin:0,padding:0}};Object(n["popScopeId"])();const d=s((function(e,t,a,i,o,l){const r=Object(n["resolveComponent"])("ion-item"),d=Object(n["resolveComponent"])("ion-list"),b=Object(n["resolveComponent"])("multi-column-view");return Object(n["openBlock"])(),Object(n["createBlock"])("div",c,[Object(n["createVNode"])(b,{items:e.items,numberOfColumns:e.numberOfColumns},{default:s(({entries:t})=>[Object(n["createVNode"])(d,null,{default:s(()=>[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(t,t=>(Object(n["openBlock"])(),Object(n["createBlock"])(r,{key:t.label,style:{padding:"0 !important",margin:"0 !important"}},{default:s(()=>[Object(n["createVNode"])("div",u,[Object(n["createVNode"])("span",null,Object(n["toDisplayString"])(t.label)+": ",1),t.other&&t.other.editable?(Object(n["openBlock"])(),Object(n["createBlock"])("span",{key:0,onClick:a=>e.onClick(t)},[Object(n["createVNode"])("a",null,[Object(n["createVNode"])("b",null,Object(n["toDisplayString"])(t.value),1)])],8,["onClick"])):(Object(n["openBlock"])(),Object(n["createBlock"])("b",{key:1,innerHTML:t.value||"N/A"},null,8,["innerHTML"]))])]),_:2},1024))),128))]),_:2},1024)]),_:1},8,["items","numberOfColumns"])])}));var b=a("92c1"),p=Object(n["defineComponent"])({name:"InformationHeader",components:{MultiColumnView:b["a"]},props:{icon:{required:!1},items:{type:Object,required:!0},numberOfColumns:{type:Number,default:2}},emits:["update","updateARVNumber","addGuardian"],setup(e,{emit:t}){const a=e=>"demographics"===e.other.category?t("update",e.other.attribute):"arv_number"===e.other.category?t("updateARVNumber"):t("addGuardian");return{onClick:a}}}),m=(a("8945"),a("6b0d")),g=a.n(m);const h=g()(p,[["render",d],["__scopeId","data-v-94355f20"]]);var O=h,v=a("0f25"),j=a("2ef0"),f=a("8a30"),V=a("7def"),y=a("b5e4"),C=a("ad60"),I=a("4db7"),P=a("8e8b"),w=a("80e3"),N=a("9ceb"),k=a("1799"),T=a("ded6");const B=Object(n["createTextVNode"])(" Close ");function _(e,t,a,i,o,l){const r=Object(n["resolveComponent"])("ion-title"),s=Object(n["resolveComponent"])("ion-toolbar"),c=Object(n["resolveComponent"])("ion-header"),u=Object(n["resolveComponent"])("information-header"),d=Object(n["resolveComponent"])("ion-content"),b=Object(n["resolveComponent"])("ion-button"),p=Object(n["resolveComponent"])("ion-footer");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(r,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,{items:e.visitData},null,8,["items"])]),_:1}),Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(s,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(b,{onClick:e.closeModal,slot:"end"},{default:Object(n["withCtx"])(()=>[B]),_:1},8,["onClick"])]),_:1})]),_:1})],64)}var D=Object(n["defineComponent"])({components:{InformationHeader:O},props:{title:{type:String,required:!0},visitData:{type:Object,required:!0}},methods:{async closeModal(){await f["X"].dismiss({})}}});const x=g()(D,[["render",_]]);var S=x,A=Object(n["defineComponent"])({components:{Preloader:T["a"],Pagination:k["a"],IonPage:f["D"],ReportTable:w["a"],IonContent:f["n"],HisFooter:v["a"],InformationHeader:O},data:()=>({patientId:0,patient:{},patientCardInfo:[],btns:[],itemsPerPage:10,currentPage:0,totalPages:0,pages:[],visitDates:[],tbStats:[],visitDatesInitialised:!1,columns:[[N["a"].thTxt("VISIT DATE"),N["a"].thTxt("WEIGHT (Kg)"),N["a"].thTxt("REG"),N["a"].thTxt("VIRAL LOAD"),N["a"].thTxt("TB STATUS"),N["a"].thTxt("OUTCOME"),N["a"].thTxt("PILLS DISPENSED"),N["a"].thTxt("ACTIONS")]],rows:[]}),created(){this.setPatientCards(),this.patientId=parseInt(""+this.$route.params.patient_id),l["a"].getPatientVisits(this.patientId,!0).then(e=>{this.visitDatesInitialised=!0,this.visitDates=e,this.rows=e.map(e=>[N["a"].tdBtn(o["b"].toStandardHisDisplayFormat(e),()=>new I["a"](this.patientId).printVisitSummaryLbl(e)),N["a"].td("..."),N["a"].td("..."),N["a"].td("..."),N["a"].td("..."),N["a"].td("..."),N["a"].td("..."),N["a"].td("...")])}).catch(e=>{this.visitDatesInitialised=!0,Object(y["c"])(""+e),console.error(e)}),this.btns.push({name:"Finish",color:"success",size:"large",slot:"end",visible:!0,onClick:()=>{Object(y["a"])("Are you sure you want to exit?").then(e=>{if(e)return this.$router.push("/patient/dashboard/"+this.patientId)})}})},async mounted(){if(this.patientId)for(const e of this.patientCardInfo)"function"===typeof e.init&&await e.init(),"function"===typeof e.asyncValue?e.asyncValue(e).then(t=>e.value=t||""):"function"===typeof e.staticValue&&(e.value=e.staticValue())},methods:{setPatientCards(){this.patientCardInfo=[{label:"ARV Number",value:"...",staticValue:()=>this.patient.getArvNumber(),init:async()=>{this.patient=await P["a"].get("ACTIVE_PATIENT",{patientID:this.patientId})},other:{editable:!0,category:"arv_number"}},{label:"National Patient ID",value:"...",staticValue:()=>this.patient.getNationalID()},{label:"Given Name",value:"...",staticValue:()=>this.patient.getGivenName(),other:{editable:!0,attribute:"given_name",category:"demographics"}},{label:"Family Name",value:"...",staticValue:()=>this.patient.getFamilyName(),other:{editable:!0,attribute:"family_name",category:"demographics"}},{label:"Age",value:"...",staticValue:()=>this.patient.getAge(),other:{editable:!0,attribute:"year_birth_date",category:"demographics"}},{label:"Sex",value:"...",staticValue:()=>this.patient.getGender(),other:{editable:!0,attribute:"gender",category:"demographics"}},{label:"Location",value:"...",staticValue:()=>this.patient.getCurrentVillage(),other:{editable:!0,attribute:"home_region",category:"demographics"}},{label:"Landmark",value:"...",staticValue:()=>this.patient.getAttribute(19)},{label:"Guardian",value:"...",asyncValue:async e=>{const t=await V["a"].getGuardianDetails(this.patientId);return Object(j["isEmpty"])(t)?(e.other.editable=!0,"add"):t.map(e=>` ${e.name} (${e.relationshipType})`).join(" ")},other:{editable:!1,attribute:"",category:"guardian"}},{label:"Init W(KG)",value:"...",asyncValue:()=>this.patient.getInitialWeight()},{label:"Init H(CM)",value:"...",asyncValue:()=>this.patient.getInitialHeight()},{label:"BMI(CM)",value:"...",asyncValue:()=>this.patient.getInitialBMI()},{label:"TI",value:"...",asyncValue:()=>r["a"].getFirstValueCoded(this.patientId,"Ever received ART")},{label:"Agrees to follow up",value:"...",asyncValue:()=>r["a"].getFirstValueCoded(this.patientId,"Agrees to followup")},{label:"Reason for starting ART",value:"...",asyncValue:()=>r["a"].getFirstValueCoded(this.patientId,"Reason for ART eligibility")},{label:"HIV test date",value:"...",asyncValue:async()=>{const e=await r["a"].getFirstValueDatetime(this.patientId,"Confirmatory HIV test date");return e?o["b"].toStandardHisDisplayFormat(e):""}},{label:"HIV test place",value:"...",asyncValue:()=>r["a"].getFirstValueText(this.patientId,"Confirmatory HIV test location")},{label:"Date of starting first line ART",value:"...",asyncValue:async()=>{const e=await r["a"].getFirstValueDatetime(this.patientId,"Date ART started");return e?o["b"].toStandardHisDisplayFormat(e):""}},{label:"Pulmonary TB within the last 2 years",value:"...",init:async()=>{this.tbStats=await r["a"].getAllValueCoded(this.patientId,"Who stages criteria present")||[]},staticValue:()=>this.hasTbStat("Tuberculosis (PTB or EPTB) within the last 2 years")},{label:"Extra pulmonary TB (EPTB)",value:"...",staticValue:()=>this.hasTbStat("Extrapulmonary tuberculosis (EPTB)")},{label:"Pulmonary TB (current)",value:"...",staticValue:()=>this.hasTbStat("Pulmonary tuberculosis (current)")},{label:"Kaposis sarcoma",value:"...",staticValue:()=>this.hasTbStat("Kaposis sarcoma")}]},buildDetails(e){const t=e=>e.map(([e,t])=>`${e} (${t})`).join("/");return[{label:"Outcome",value:e.outcome},{label:"Outcome Date",value:e.outcome_date},{label:"Side effects",value:e.side_effects},{label:"Viral load",value:e.viral_load},{label:"Pills Brought",value:t(e.pills_brought)},{label:"Pills dispensed",value:t(e.pills_dispensed)},{label:"Visit by",value:e.visit_by},{label:"Regimen",value:e.regimen},{label:"Adherence",value:t(e.adherence)},{label:"TB Status",value:e.tb_status},{label:"Height (cm)",value:e.height},{label:"Weight (Kg)",value:e.weight},{label:"BMI",value:e.bmi}]},async onNewRow(e){const t=[...e];if(t[1]&&"..."!=t[1].td)return t;const a=t[0].td,n=await C["a"].getCurrentProgramInformation(this.patientId,a),i=await C["a"].getMastercardDrugInformation(this.patientId,a),o=((null===i||void 0===i?void 0:i.pills_given)||[]).map(e=>`${e["short_name"]||e["name"]} <b>(${e.quantity||"?"})</b>`).join("<br/>");return t[1]=N["a"].td(n.weight),t[2]=N["a"].td(n.regimen),t[3]=N["a"].td(n.viral_load),t[4]=N["a"].td(n.tb_status),t[5]=N["a"].td(n.outcome.match(/Unk/i)?"Unknown":n.outcome),t[6]=N["a"].td(o),t[7]=N["a"].tdBtn("More",async()=>{(await f["X"].create({component:S,backdropDismiss:!1,cssClass:"large-modal",componentProps:{title:a,visitData:this.buildDetails(n)}})).present()}),t},hasTbStat(e){return this.tbStats.includes(e)?"Yes":"No"},updateDemographics(e){this.$router.push({path:"/patient/registration",query:{edit_person:this.patientId,person_attribute:e}})},addGuardian(){var e;this.$router.push({path:"/guardian/registration/"+this.patientId,query:{source:null===(e=this.$route.name)||void 0===e?void 0:e.toString()}})},updateARVNumber(){this.$router.push({name:"Edit ARV Number"})}}});const F=g()(A,[["render",i]]);t["default"]=F},1799:function(e,t,a){"use strict";var n=a("7a23");const i=Object(n["withScopeId"])("data-v-04a5a269");Object(n["pushScopeId"])("data-v-04a5a269");const o={class:"pagination"},l={class:"btn-group"},r=Object(n["createTextVNode"])(" First "),s=Object(n["createTextVNode"])(" Last ");Object(n["popScopeId"])();const c=i((function(e,t,a,c,u,d){const b=Object(n["resolveComponent"])("ion-button"),p=Object(n["resolveComponent"])("ion-icon");return Object(n["openBlock"])(),Object(n["createBlock"])("div",o,[Object(n["createVNode"])("div",l,[Object(n["createVNode"])(b,{color:"light",onClick:e.setFirstPage,disabled:e.isInFirstPage},{default:i(()=>[r]),_:1},8,["onClick","disabled"]),Object(n["createVNode"])(b,{color:"light",onClick:e.prevPage},{default:i(()=>[Object(n["createVNode"])(p,{icon:e.caretBack},null,8,["icon"])]),_:1},8,["onClick"]),(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.pages,e=>(Object(n["openBlock"])(),Object(n["createBlock"])(b,{onClick:t=>e.show(),color:e.isActive?"primary":"light",key:e.index},{default:i(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.name),1)]),_:2},1032,["onClick","color"]))),128)),Object(n["createVNode"])(b,{color:"light",onClick:e.nextPage},{default:i(()=>[Object(n["createVNode"])(p,{icon:e.caretForward},null,8,["icon"])]),_:1},8,["onClick"]),Object(n["createVNode"])(b,{color:"light",onClick:e.setLastPage,disabled:e.isInLastPage},{default:i(()=>[s]),_:1},8,["onClick","disabled"])]),Object(n["createVNode"])("h6",null,"Page "+Object(n["toDisplayString"])(e.currentPage+1)+" of "+Object(n["toDisplayString"])(e.totalPages),1)])}));var u=a("ff79"),d=a("8a30"),b=Object(n["defineComponent"])({components:{IonIcon:d["r"],IonButton:d["d"]},props:{maxVisibleButtons:{type:Number,required:!1,default:3},totalPages:{type:Number,required:!0}},emits:["onChangePage"],setup(e,{emit:t}){const a=Object(n["ref"])(0),i=Object(n["computed"])(()=>0===a.value),o=Object(n["computed"])(()=>a.value===e.totalPages),l=Object(n["computed"])(()=>0===a.value?0:a.value===e.totalPages?e.totalPages-e.maxVisibleButtons:a.value-1),r=e=>t("onChangePage",e),s=Object(n["computed"])(()=>{const t=[];for(let n=l.value;n<=Math.min(l.value+e.maxVisibleButtons-1,e.totalPages-1);n++)t.push({index:n,name:n+1,show:()=>a.value=n,isActive:n===a.value});return t});Object(n["watch"])(e,({totalPages:e})=>{"number"===typeof e&&(a.value=0)},{immediate:!0,deep:!0}),Object(n["watch"])(a,e=>r(e));const c=()=>a.value=0,d=()=>a.value=e.totalPages-1,b=()=>{a.value>0&&(a.value-=1)},p=()=>{a.value+1<e.totalPages&&(a.value+=1)};return{currentPage:a,caretBack:u["k"],caretForward:u["m"],startPage:l,pages:s,isInFirstPage:i,isInLastPage:o,nextPage:p,prevPage:b,setPage:r,setFirstPage:c,setLastPage:d}}}),p=(a("f099"),a("6b0d")),m=a.n(p);const g=m()(b,[["render",c],["__scopeId","data-v-04a5a269"]]);t["a"]=g},"3aa1":function(e,t,a){},"5a7d":function(e,t,a){},8945:function(e,t,a){"use strict";a("5a7d")},f099:function(e,t,a){"use strict";a("3aa1")}}]);
//# sourceMappingURL=chunk-13f7161e.205ef757.js.map