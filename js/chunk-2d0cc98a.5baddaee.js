(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cc98a"],{"4f35":function(t,e,r){"use strict";r.r(e);var o=r("7a23");function a(t,e,r,a,i,n){const s=Object(o["resolveComponent"])("report-template");return Object(o["openBlock"])(),Object(o["createBlock"])(s,{title:t.title,period:t.period,rows:t.rows,fields:t.fields,columns:t.columns,onReportConfiguration:t.onPeriod,"report-prefix":"Clinic"},null,8,["title","period","rows","fields","columns","onReportConfiguration"])}r("14d9");var i=r("87e7"),n=r("44e3"),s=r("4ba2"),d=r("9ceb"),c=Object(o["defineComponent"])({mixins:[n["a"]],components:{ReportTemplate:s["a"]},data:()=>({title:"Clinic Regimen Switch Report",rows:[],columns:[[d["a"].thTxt("ARV#"),d["a"].thTxt("Gender"),d["a"].thTxt("DOB"),d["a"].thTxt("ART start date"),d["a"].thTxt("Weight"),d["a"].thTxt("Prev.Reg"),d["a"].thTxt("Curr.Reg"),d["a"].thTxt("ARVs"),d["a"].thTxt("Curr.reg dispensed")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async onPeriod(t,e){this.rows=[],this.report=new i["d"],this.report.setStartDate(e.start_date),this.report.setEndDate(e.end_date),this.report.setOccupation(e.occupation),this.period=this.report.getDateIntervalPeriod(),this.setRows(await this.report.getRegimenSwitchReport(!1))},setRows(t){this.sortByArvNumber(Object.values(t)).forEach(t=>{let e="";const r=t.medication.map(t=>(e=t.start_date,`${t.medication} (${t.quantity})`));this.rows.push([d["a"].td(t.arv_number),d["a"].td(this.formatGender(t.gender)),d["a"].tdDate(t.birthdate),d["a"].tdDate(t.art_start_date),d["a"].td(t.current_weight),d["a"].td(t.previous_regimen),d["a"].td(t.current_regimen),d["a"].td(r.join(", ")),d["a"].tdDate(e)])})}}}),p=r("d959"),h=r.n(p);const u=h()(c,[["render",a]]);e["default"]=u}}]);
//# sourceMappingURL=chunk-2d0cc98a.5baddaee.js.map