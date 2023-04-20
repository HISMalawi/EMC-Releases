(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14b47a57"],{"68f7":function(e,t,i){"use strict";i.r(t);var n=i("7a23");function a(e,t,i,a,o,s){const r=Object(n["resolveComponent"])("report-template");return Object(n["openBlock"])(),Object(n["createBlock"])(r,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,canExportCsv:!1,canExportPDf:!1,onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])}var o=i("4ba2"),s=i("d95e"),r=i("9ceb"),d=i("fb25"),c=i("2706"),l=i("7f12"),p=i("d867"),f=i("9283"),u=i("b5e4"),m=i("76df"),h=Object(n["defineComponent"])({components:{ReportTemplate:o["a"]},data:()=>({service:{},dde:{},title:"Multiple Identifiers",fields:[],rows:[],columns:[[r["a"].thTxt("First Name"),r["a"].thTxt("Last Name"),r["a"].thTxt("Gender"),r["a"].thTxt("Number of identifiers"),r["a"].thTxt("View")]]}),async created(){this.fields=this.getFormFields()},methods:{async onPeriod({identifier:e}){const t=parseInt(e.value.toString());this.title=e.label+" Multiple Identifiers",this.service=new d["a"],this.service.setIdentifierType(t),this.rows=await this.getRows()},getFormFields(){return[{id:"identifier",helpText:"Select Identifier type",type:s["b"].TT_SELECT,validation:e=>c["a"].required(e),options:async()=>(await d["a"].getIdentifierTypes()).map(e=>({label:e.name,value:e.patient_identifier_type_id}))}]},toDate(e){return f["b"].toStandardHisDisplayFormat(e)},async drillDuplicates(e,t){const i=await p["Z"].create({component:l["a"],cssClass:"custom-modal",componentProps:{title:"Identifiers belonging to client",columns:["identifier","date created","void"],onRows:async()=>e.map((i,n)=>{try{return[i.identifier,this.toDate(i.date_created),{type:"button",name:"Void",color:"danger",action:async()=>{await this.voidActiveItem(i.patient_identifier_id,e,n,t)},disabled:!(e.length>1)}]}catch(a){return Object(u["c"])("Unable to load patient details"),["N/A","N/A","N/A","N/A","N/A"]}})}});i.present()},voidActiveItem(e,t,i,n){Object(m["a"])(async a=>{try{p["Z"].dismiss().then(async()=>{await this.service.voidMultipleIdentifiers([e],a,t[0].identifier_type);const o=t.splice(i,1);o.length>1?await this.drillDuplicates(o,n):this.rows.splice(n,1)})}catch(o){Object(u["c"])(""+o)}},"void-modal custom-modal-backdrop")},async getRows(){return(await this.service.getMultipleIdentifiers()).map((e,t)=>[r["a"].td(e.given_name),r["a"].td(e.family_name),r["a"].td(e.gender),r["a"].td(e.identifiers.length),r["a"].tdBtn("Select",()=>this.drillDuplicates(e.identifiers,t))])}}}),w=i("d959"),y=i.n(w);const b=y()(h,[["render",a]]);t["default"]=b},"76df":function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i("7f35");async function a(e,t="action-sheet-modal"){const i=await Object(n["c"])("Are you sure you want to void record?","Please specify reason for voiding this record",["Mistake/ Wrong Entry","Duplicate","System Error"],[{name:"Cancel",slot:"start"},{name:"Void",color:"danger",slot:"end",role:"action"}],"",t);i.selection&&"Void"===i.action&&await e(i.selection)}}}]);
//# sourceMappingURL=chunk-14b47a57.f2b3bfa9.js.map