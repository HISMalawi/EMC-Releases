(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229b3d"],{df27:function(t,e,r){"use strict";r.r(e);var o=r("7a23");function a(t,e,r,a,n,i){const s=Object(o["resolveComponent"])("report-template"),d=Object(o["resolveComponent"])("ion-page");return Object(o["openBlock"])(),Object(o["createBlock"])(d,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,{title:t.title,period:t.period,rows:t.rows,fields:t.fields,columns:t.columns,reportPrefix:"PEPFAR",onReportConfiguration:t.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])]),_:1})}var n=r("87e7"),i=r("44e3"),s=r("4ba2"),d=r("9ceb"),c=r("8a30"),p=Object(o["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:s["a"],IonPage:c["D"]},data:()=>({title:"PEPFAR Regimen Switch Report",rows:[],columns:[[d["a"].thTxt("ARV#"),d["a"].thTxt("Gender"),d["a"].thTxt("DOB"),d["a"].thTxt("Prev.Reg"),d["a"].thTxt("Curr.Reg"),d["a"].thTxt("ARVs"),d["a"].thTxt("Curr.reg dispensed date")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async onPeriod(t,e){this.rows=[],this.report=new n["d"],this.report.setStartDate(e.start_date),this.report.setEndDate(e.end_date),this.period=this.report.getDateIntervalPeriod(),this.setRows(await this.report.getRegimenSwitchReport(!0))},setRows(t){this.sortByArvNumber(Object.values(t)).forEach(t=>{let e="";const r=t.medication.map(t=>(e=t.start_date,`${t.medication} (${t.quantity})`));this.rows.push([d["a"].td(t.arv_number),d["a"].td(this.formatGender(t.gender)),d["a"].tdDate(t.birthdate),d["a"].td(t.previous_regimen),d["a"].td(t.current_regimen),d["a"].td(r.join(", ")),d["a"].tdDate(e)])})}}}),h=r("6b0d"),l=r.n(h);const u=l()(p,[["render",a]]);e["default"]=u}}]);
//# sourceMappingURL=chunk-2d229b3d.34f9199a.js.map