(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8493"],{"53dc":function(e,t,o){"use strict";o.r(t);var r=o("7a23");const n={id:"report-content"},a=Object(r["createElementVNode"])("div",{id:"print"},null,-1);function i(e,t,o,i,s,l){const c=Object(r["resolveComponent"])("ion-loading"),d=Object(r["resolveComponent"])("his-standard-form"),p=Object(r["resolveComponent"])("idsr-h"),m=Object(r["resolveComponent"])("weekly"),b=Object(r["resolveComponent"])("ion-content"),h=Object(r["resolveComponent"])("his-footer"),k=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["createVNode"])(c,{"is-open":e.isLoading,message:"Please wait..."},null,8,["is-open"]),e.reportReady?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])(d,{key:0,onOnFinish:e.onPeriod,skipSummary:!0,fields:e.fields},null,8,["onOnFinish","fields"])),e.reportReady?(Object(r["openBlock"])(),Object(r["createBlock"])(k,{key:1},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(b,null,{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("div",n,[(Object(r["openBlock"])(),Object(r["createBlock"])(p,{key:e.componentKey,reportName:e.reportName,rangeLabel:e.rangeLabel,range:e.range,ref:"header",periodLabel:e.periodLabel,periodDates:e.periodDates,clinicName:e.clinicName,totalOPDVisits:e.TotalOPDVisits},null,8,["reportName","rangeLabel","range","periodLabel","periodDates","clinicName","totalOPDVisits"])),(Object(r["openBlock"])(),Object(r["createBlock"])(m,{key:e.componentKey,onDrillDown:e.onDrillDown,params:e.idsr,epiweek:e.range,ref:"rep"},null,8,["onDrillDown","params","epiweek"]))])]),_:1}),Object(r["createVNode"])(h,{btns:e.btns},null,8,["btns"])]),_:1})):Object(r["createCommentVNode"])("",!0),a],64)}o("14d9");var s=o("0f25"),l=o("d867"),c=o("7920"),d=o("c2b0"),p=o("6d14"),m=o("cb01"),b=o("05e1"),h=o("9283"),k=Object(r["defineComponent"])({mixins:[d["a"]],components:{IonLoading:l["z"],IdsrH:m["a"],Weekly:b["a"],HisStandardForm:c["a"],HisFooter:s["a"],IonPage:l["D"],IonContent:l["n"]},data:()=>({formData:{},componentKey:0,computedFormData:{},idsr:{},btns:[],isLoading:!1,fields:[],reportID:-1,periodLabel:"Week Dates",periodDates:"",reportName:"WEEKLY DISEASE SURVEILLANCE REPORT",rangeLabel:"Week Number",range:"",TotalOPDVisits:0,clinicName:p["a"].getLocationName(),reportReady:!1,reportUrlParams:"",regenarate:""}),created(){this.btns=this.getBtns(),this.fields=this.getEpiweeksFields()},methods:{async onPeriod(e,t,o=!1){this.componentKey+=1,this.formData=e,this.computedFormData=t,this.reportReady=!0,this.isLoading=!0,this.report=new p["a"],this.report.setRegenerate(o),this.report.setEpiWeek(e.epiweek.label),this.report.setStartDate(h["b"].toStandardHisFormat(e.epiweek.other.start)),this.report.setEndDate(h["b"].toStandardHisFormat(e.epiweek.other.end)),this.periodDates=this.report.getReportPeriod(),this.range=e.epiweek.label.split(" ")[0];try{const e=await this.report.requestIDSRWeekly(),t=await this.report.getAttendance();e&&t&&(this.reportID="data",this.TotalOPDVisits=t.length,this.idsr=e)}catch(r){console.log(r)}finally{this.isLoading=!1}},getBtns(){return[{name:"CSV",size:"large",slot:"start",color:"primary",visible:!0,onClick:async()=>{const e=this.$refs.rep;e.onDownload()}},{name:"PDF",size:"large",slot:"start",color:"primary",visible:!0,onClick:()=>this.exportToCustomPDF("Print IDSR Weelky Report")},{name:"Back",size:"large",slot:"end",color:"warning",visible:!0,onClick:()=>this.reportReady=!1},{name:"Refresh",size:"large",slot:"end",color:"warning",visible:!0,onClick:async()=>await this.onPeriod(this.formData,this.computedFormData,!0)},{name:"Finish",size:"large",slot:"end",color:"success",visible:!0,onClick:()=>this.$router.push({path:"/"})}]}}}),g=o("6b0d"),O=o.n(g);const D=O()(k,[["render",i]]);t["default"]=D}}]);
//# sourceMappingURL=chunk-2d0c8493.359e679b.js.map