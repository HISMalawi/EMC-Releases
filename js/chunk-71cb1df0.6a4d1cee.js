(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71cb1df0"],{"0437":function(t,e,a){"use strict";a.r(e);var n=a("7a23");function r(t,e,a,r,o,c){var i=Object(n["resolveComponent"])("report-template"),s=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(s,null,{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{title:t.title,rows:t.rows,fields:t.fields,columns:t.columns,period:t.period,onReportConfiguration:t.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]})),_:1})}var o=a("1da1"),c=(a("d81d"),a("96cf"),a("552a")),i=a("9ceb"),s=a("44e3"),u=a("8a30"),d=a("ad9e"),p=Object(n["defineComponent"])({components:{ReportTemplate:c["a"],IonPage:u["D"]},mixins:[s["a"]],data:function(){return{title:"CC Type of Treatment",rows:[],reportService:{},columns:[[i["a"].thTxt("Fine Age"),i["a"].thTxt("CXCA_TX_Cryotherapy"),i["a"].thTxt("CXCA_TX_Thermocoagulation"),i["a"].thTxt("CXCA_TX_LEEP")]]}},created:function(){this.fields=this.getDateDurationFields()},methods:{init:function(t,e){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a.reportService=new d["a"],a.reportService.setStartDate(e.start_date),a.reportService.setEndDate(e.end_date),t.next=5,a.reportService.getPepfarReport("CC Type of Treatment");case 5:n=t.sent,a.rows=a.buildRows(n);case 7:case"end":return t.stop()}}),t)})))()},buildRows:function(t){return t.map((function(t){return[i["a"].td(t.age_group),i["a"].td(t["cryotherapy"].length),i["a"].td(t["thermocoagulation"].length),i["a"].td(t["leep"].length)]}))}}}),l=a("6b0d"),h=a.n(l);const f=h()(p,[["render",r]]);e["default"]=f},ad9e:function(t,e,a){"use strict";a.d(e,"a",(function(){return d}));var n=a("5530"),r=a("d4ec"),o=a("bee2"),c=a("262e"),i=a("2caf"),s=(a("99af"),a("1c74")),u=a("9283"),d=function(t){Object(c["a"])(a,t);var e=Object(i["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.call(this),t.endDate="",t.startDate="",t.date=s["e"].getSessionDate(),t.programID=s["e"].getProgramID(),t}return Object(o["a"])(a,[{key:"getPepfarReport",value:function(t){return this.getReport("pepfar_cxca",{report_name:t})}},{key:"getClinicReport",value:function(t){return this.getReport("screened_for_cxca",{report_name:t})}},{key:"getDateIntervalPeriod",value:function(){return"".concat(u["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(u["b"].toStandardHisDisplayFormat(this.endDate))}},{key:"setStartDate",value:function(t){this.startDate=t}},{key:"setEndDate",value:function(t){this.endDate=t}},{key:"getReportPeriod",value:function(){return this.startDate&&this.endDate?"".concat(u["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(u["b"].toStandardHisDisplayFormat(this.endDate)):"-"}},{key:"getReport",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return s["e"].getJson(t,this.buildRequest(e))}},{key:"buildRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),Object(n["a"])(Object(n["a"])({},e),t)}}],[{key:"getReportQuarters",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4,e=[],a=u["b"].getCurrentYear(),n=0;n<t;++n)e.push({name:"Q4 ".concat(a),start:"".concat(a,"-10-01"),end:"".concat(a,"-12-31")}),e.push({name:"Q3 ".concat(a),start:"".concat(a,"-07-01"),end:"".concat(a,"-09-30")}),e.push({name:"Q2 ".concat(a),start:"".concat(a,"-04-01"),end:"".concat(a,"-06-30")}),e.push({name:"Q1 ".concat(a),start:"".concat(a,"-01-01"),end:"".concat(a,"-03-31")}),--a;return e}}]),a}(s["e"])}}]);
//# sourceMappingURL=chunk-71cb1df0.6a4d1cee.js.map