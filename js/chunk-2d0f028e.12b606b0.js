(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f028e"],{"9ad4":function(e,t,o){"use strict";o.r(t);var n=o("7a23");const r={id:"report-content"},a=Object(n["createElementVNode"])("div",{id:"print"},null,-1);function i(e,t,o,i,s,l){const c=Object(n["resolveComponent"])("ion-loading"),d=Object(n["resolveComponent"])("his-standard-form"),p=Object(n["resolveComponent"])("idsr-h"),m=Object(n["resolveComponent"])("monthly"),h=Object(n["resolveComponent"])("ion-content"),b=Object(n["resolveComponent"])("his-footer"),g=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(c,{"is-open":e.isLoading,message:"Please wait..."},null,8,["is-open"]),e.reportReady?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(d,{key:0,onOnFinish:e.onPeriod,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"])),e.reportReady?(Object(n["openBlock"])(),Object(n["createBlock"])(g,{key:1},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("div",r,[(Object(n["openBlock"])(),Object(n["createBlock"])(p,{key:e.componentKey,reportName:e.reportName,rangeLabel:e.rangeLabel,range:e.range,ref:"header",periodLabel:e.periodLabel,periodDates:e.periodDates,clinicName:e.clinicName,totalOPDVisits:e.TotalOPDVisits},null,8,["reportName","rangeLabel","range","periodLabel","periodDates","clinicName","totalOPDVisits"])),(Object(n["openBlock"])(),Object(n["createBlock"])(m,{key:e.componentKey,onDrillDown:e.onDrillDown,params:e.idsr,month:e.range,ref:"rep"},null,8,["onDrillDown","params","month"]))])]),_:1}),Object(n["createVNode"])(b,{btns:e.btns},null,8,["btns"])]),_:1})):Object(n["createCommentVNode"])("",!0),a],64)}o("14d9");var s=o("0f25"),l=o("d867"),c=o("7920"),d=o("c2b0"),p=o("6d14"),m=o("cb01"),h=o("05e1"),b=o("9283"),g=Object(n["defineComponent"])({mixins:[d["a"]],components:{IonLoading:l["z"],IdsrH:m["a"],Monthly:h["a"],HisStandardForm:c["a"],HisFooter:s["a"],IonPage:l["D"],IonContent:l["n"]},data:()=>({formData:{},componentKey:0,computedFormData:{},idsr:{},btns:[],isLoading:!1,fields:[],reportID:-1,periodLabel:"Month Dates",periodDates:"",reportName:"MONTHLY DISEASE SURVEILLANCE REPORT",rangeLabel:"Month",range:"",TotalOPDVisits:0,clinicName:p["a"].getLocationName(),reportReady:!1}),created(){this.btns=this.getBtns(),this.fields=this.getMonthlyFields()},methods:{async onPeriod(e,t,o=!1){this.componentKey+=1,this.formData=e,this.computedFormData=t,this.reportReady=!0,this.isLoading=!0,this.report=new p["a"],this.report.setRegenerate(o),this.report.setEpiWeek(e.idsrmonth.label),this.report.setStartDate(b["b"].toStandardHisFormat(e.idsrmonth.other.start)),this.report.setEndDate(b["b"].toStandardHisFormat(e.idsrmonth.other.end)),this.periodDates=this.report.getReportPeriod(),this.range=e.idsrmonth.label.split(" ")[0];try{const e=await this.report.requestIDSRMonthly(),t=await this.report.getAttendance();e&&t&&(this.reportID="data",this.TotalOPDVisits=t.length,this.idsr=e)}catch(n){console.log(n)}finally{this.isLoading=!1}},getBtns(){return[{name:"CSV",size:"large",slot:"start",color:"primary",visible:!0,onClick:async()=>{const e=this.$refs.rep;e.onDownload()}},{name:"PDF",size:"large",slot:"start",color:"primary",visible:!0,onClick:()=>this.exportToCustomPDF("Print IDSR Monthly Report")},{name:"Back",size:"large",slot:"end",color:"warning",visible:!0,onClick:()=>this.reportReady=!1},{name:"Refresh",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>await this.onPeriod(this.formData,this.computedFormData,!0)},{name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>this.$router.push({path:"/"})}]}}}),O=o("6b0d"),D=o.n(O);const j=D()(g,[["render",i]]);t["default"]=j}}]);
//# sourceMappingURL=chunk-2d0f028e.12b606b0.js.map