(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d9f6"],{d1a4:function(t,e,o){"use strict";o.r(e);var s=o("7a23");function r(t,e,o,r,n,a){const i=Object(s["resolveComponent"])("report-template"),d=Object(s["resolveComponent"])("ion-page");return Object(s["openBlock"])(),Object(s["createBlock"])(d,null,{default:Object(s["withCtx"])(()=>[Object(s["createVNode"])(i,{title:t.title,period:t.period,rows:t.rows,fields:t.fields,columns:t.columns,config:{showIndex:!0},reportPrefix:"PEPFAR",onReportConfiguration:t.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])]),_:1})}o("13d5"),o("14d9");var n=o("44e3"),a=o("9a5e"),i=o("4ba2"),d=o("9ceb"),h=o("ad8d"),l=o("2ef0"),c=Object(s["defineComponent"])({mixins:[n["a"]],components:{ReportTemplate:i["a"]},data:()=>({title:"TX RTT Report",cohort:{},rows:[],columns:[[d["a"].thTxt("Age group"),d["a"].thTxt("Gender"),d["a"].thTxt("Returned <3 mo"),d["a"].thTxt("Returned 3-5 mo"),d["a"].thTxt("Returned 6+ mo")]],aggregations:[]}),created(){this.fields=this.getDateDurationFields()},methods:{async onPeriod(t,e){this.rows=[],this.aggregations=[],this.report=new a["a"],this.report.setOccupation(e.occupation),this.report.setStartDate(e.start_date),this.report.setEndDate(e.end_date),this.period=this.report.getDateIntervalPeriod(),this.cohort=await this.report.getTxRttReport(),this.setRows("F"),this.setRows("M"),this.setTotalMaleRow(),this.setMaternalRows()},aggregate(t,e){return this.aggregations.reduce((o,s)=>s.gender===t&&s[e]?[...o,...s[e]]:o,[])},setTotalMaleRow(){const t=t=>this.drill(this.aggregate("M",t),"All male "+t);this.rows.push([d["a"].td("All"),d["a"].td("Male"),t("<3 months"),t("3-5 months"),t("6+ months")])},async setMaternalRows(){const t=["<3 months","3-5 months","6+ months"].reduce((t,e)=>[...t,{indicator:e,data:this.aggregate("F",e)}],[]),e=await this.report.getMaternalStatus(Object(l["uniq"])(t.reduce((t,e)=>[...t,...e.data],[]).map(t=>t))),o=e=>t.reduce((t,o)=>o.indicator===e?[...t,...o.data]:t,[]),s=(t,s)=>this.drill(o(s).filter(o=>e[t].includes(o)),`All returned ${s} (${t})`),r=e.FBf.concat(e.FP),n=t=>this.drill(o(t).filter(t=>!r.includes(t)),`All returned ${t} FNP`);this.rows.push([d["a"].td("All"),d["a"].td("FP"),s("FP","<3 months"),s("FP","3-5 months"),s("FP","6+ months")]),this.rows.push([d["a"].td("All"),d["a"].td("FNP"),n("<3 months"),n("3-5 months"),n("6+ months")]),this.rows.push([d["a"].td("All"),d["a"].td("FBF"),s("FBf","<3 months"),s("FBf","3-5 months"),s("FBf","6+ months")])},setRows(t){const e=(t,e)=>t.filter(t=>e(t.months)).map(t=>t.patient_id);for(const o in h["a"]){const s=h["a"][o],r=this.formatGender(t);if(s in this.cohort){const o=this.cohort[s][t],n=t=>e(o,t),a=n(t=>t<3),i=n(t=>t>=3&&t<=5),h=n(t=>t>=6);this.rows.push([d["a"].td(s),d["a"].td(r),this.drill(a,`${s} (${r}s) Returned <3 mo`),this.drill(i,`${s} (${r}s) Returned 3-5 mo`),this.drill(h,`${s} (${r}s) Returned 6+ mo`)]),this.aggregations.push({gender:t,"<3 months":a,"3-5 months":i,"6+ months":h})}else this.rows.push([d["a"].td(s),d["a"].td(r),d["a"].td(0),d["a"].td(0),d["a"].td(0)])}}}}),p=o("6b0d"),u=o.n(p);const m=u()(c,[["render",r]]);e["default"]=m}}]);
//# sourceMappingURL=chunk-2d21d9f6.d1b7c34e.js.map