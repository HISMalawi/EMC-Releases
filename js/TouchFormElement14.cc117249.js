(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement14"],{"83af":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("cc6f");class r extends a["a"]{constructor(e,t){super(e,7,t)}async getNextAppointment(){const e=a["a"].getProgramID();return a["a"].getJson(`/programs/${e}/patients/${this.patientID}/next_appointment_date`,{date:this.date})}static async getDailiyAppointments(e){const t=a["a"].getProgramID();return a["a"].getJson(`/programs/${t}/booked_appointments`,{date:e,paginate:!1})}}},b2eb:function(e,t,n){"use strict";n.r(t);var a=n("7a23"),r={class:"view-port-content"},i={key:0,class:"appointments"},c=Object(a["createVNode"])("b",null,"Medication Run out Date",-1),o=Object(a["createVNode"])("p",null,null,-1),s=Object(a["createVNode"])("b",null,"User set appointment date",-1),u=Object(a["createVNode"])("p",null,null,-1),l=Object(a["createVNode"])("b",null,"Appointment(s)",-1),d=Object(a["createVNode"])("p",null,null,-1),p=Object(a["createVNode"])("b",null,"Appointment limit (per/day)",-1),b=Object(a["createVNode"])("p",null,null,-1);function m(e,t,n,m,f,h){var O=Object(a["resolveComponent"])("Calendar"),j=Object(a["resolveComponent"])("ion-col"),D=Object(a["resolveComponent"])("ion-label"),w=Object(a["resolveComponent"])("ion-item"),x=Object(a["resolveComponent"])("ion-list"),g=Object(a["resolveComponent"])("ion-row"),v=Object(a["resolveComponent"])("ion-grid"),y=Object(a["resolveComponent"])("view-port");return Object(a["openBlock"])(),Object(a["createBlock"])(y,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])("div",r,[Object(a["createVNode"])(v,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(g,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(j,{size:"8"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(O,{color:"blue",ref:"calendar","is-expanded":"",class:"custom-calendar","min-date":e.sessionDate,"max-date":e.runOutDate,attributes:e.attributes,masks:e.masks,"disable-page-swipe":""},{"day-content":Object(a["withCtx"])((function(t){var n=t.day;return[Object(a["createVNode"])("div",{class:{selected:n.id===e.cDate,isDisabled:n.isDisabled}},[Object(a["createVNode"])("span",{onClick:function(t){return e.dayClicked(n)}},Object(a["toDisplayString"])(n.day),9,["onClick"]),n.id===e.cDate?(Object(a["openBlock"])(),Object(a["createBlock"])("sup",i,Object(a["toDisplayString"])(e.appointments.length),1)):Object(a["createCommentVNode"])("",!0)],2)]})),_:1},8,["min-date","max-date","attributes","masks"])]})),_:1}),Object(a["createVNode"])(j,{size:"4",class:"his-card"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(x,null,{default:Object(a["withCtx"])((function(){return[e.showMedicationRunoutDate&&e.rDate?(Object(a["openBlock"])(),Object(a["createBlock"])(w,{key:0,class:"his-sm-text"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(D,{class:"ion-text-wrap"},{default:Object(a["withCtx"])((function(){return[c,o,Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(e.rDate),1)]})),_:1})]})),_:1})):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])(w,{class:"his-sm-text"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(D,{class:"ion-text-wrap"},{default:Object(a["withCtx"])((function(){return[s,u,Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(e.aDate),1)]})),_:1})]})),_:1}),Object(a["createVNode"])(w,{class:"his-sm-text"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(D,{class:"ion-text-wrap"},{default:Object(a["withCtx"])((function(){return[l,d,Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(e.appointments.length),1)]})),_:1})]})),_:1}),Object(a["createVNode"])(w,{class:"his-sm-text"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(D,{class:"ion-text-wrap"},{default:Object(a["withCtx"])((function(){return[p,b,Object(a["createVNode"])("span",null,Object(a["toDisplayString"])(e.appointmentLimit),1)]})),_:1})]})),_:1})]})),_:1})]})),_:1})]})),_:1})]})),_:1})])]})),_:1})}var f=n("1da1"),h=(n("ac1f"),n("1276"),n("caad"),n("2532"),n("96cf"),n("0a79")),O=n("8a30"),j=n("7b37"),D=n("9283"),w=n("83af"),x=n("51c8"),g=n("d1ca"),v=n("b5e4"),y=n("5a0c"),C=n.n(y),k=Object(a["defineComponent"])({components:{ViewPort:h["a"],Calendar:j["a"],IonGrid:O["p"],IonCol:O["m"],IonRow:O["H"]},mixins:[x["default"]],watch:{startDate:{handler:function(e){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=e||D["b"].toStandardHisDisplayFormat(t.sessionDate),t.$emit("onValue",{label:"",value:a});case 2:case"end":return n.stop()}}),n)})))()},immediate:!0}},data:function(){return{rows:[],startDate:null,runOutDate:null,appointments:[],clinicHolidays:[],clinicDays:[],patientAge:0,appointmentLimit:0,sessionDate:null,masks:{weekdays:"WWW"}}},mounted:function(){this.$emit("onFieldActivated",this)},activated:function(){this.$emit("onFieldActivated",this)},created:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.patientAge=e.config.patientAge||0,t.next=3,e.getAppointmentLimit();case 3:return t.next=5,e.getClinicHolidays();case 5:return t.next=7,e.getClinicDays();case 7:return t.next=9,e.options(e.fdata);case 9:return n=t.sent,e.sessionDate=w["a"].getSessionDate(),a=n[0].other.appointmentDate,t.next=14,e.getAppointments(a);case 14:e.appointments=t.sent,e.setDate(a),e.runOutDate=n[0].other.runOutDate?new Date(n[0].other.runOutDate):null;case 17:case"end":return t.stop()}}),t)})))()},methods:{getAppointments:function(e){return w["a"].getDailiyAppointments(D["b"].toStandardHisFormat(e))},getAppointmentLimit:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,g["b"].appointmentLimit();case 2:n=t.sent,n&&(e.appointmentLimit=n);case 4:case"end":return t.stop()}}),t)})))()},getClinicHolidays:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,g["b"].clinicHolidays();case 2:n=t.sent,n&&(e.clinicHolidays=n.split(","));case 4:case"end":return t.stop()}}),t)})))()},getClinicDays:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n="",!(e.patientAge>=18)){t.next=7;break}return t.next=4,g["b"].adultClinicDays();case 4:n=t.sent,t.next=10;break;case 7:return t.next=9,g["b"].peadsClinicDays();case 9:n=t.sent;case 10:n&&(e.clinicDays=n.split(","));case 11:case"end":return t.stop()}}),t)})))()},isDateAvalaible:function(e){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){var a,r,i,c,o,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.getAppointments(e);case 2:if(a=n.sent,!(0!==a.length&&a.length>=t.appointmentLimit)){n.next=9;break}return n.next=6,Object(v["a"])("Appointment limit reached for the selected date ".concat(D["b"].toStandardHisDisplayFormat(e)),{header:"APPOINTMENT LIMIT REACHED",cancelBtnLabel:"Proceed with Selected Date",confirmBtnLabel:"Select Another Date"});case 6:if(r=n.sent,!r){n.next=9;break}return n.abrupt("return",!1);case 9:if(!t.clinicHolidays.includes(D["b"].toStandardHisFormat(e))){n.next=15;break}return n.next=12,Object(v["a"])("Selected date is a clinic holiday, do you want to set an appointment?");case 12:if(i=n.sent,i){n.next=15;break}return n.abrupt("return",!1);case 15:if(c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=c[C()(e).day()],t.clinicDays.includes(o)){n.next=23;break}return n.next=20,Object(v["a"])("The selected date ".concat(D["b"].toStandardHisDisplayFormat(e)," is not a clinic day. Do you want to proceed with this date?"));case 20:if(s=n.sent,s){n.next=23;break}return n.abrupt("return",!1);case 23:return t.appointments=a,n.abrupt("return",!0);case 25:case"end":return n.stop()}}),n)})))()},setDate:function(e){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.startDate=new Date(e),a=t.$refs.calendar,n.next=4,a.move(t.startDate);case 4:return n.next=6,a.focusDate(t.startDate);case 6:case"end":return n.stop()}}),n)})))()},dayClicked:function(e){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(n.t0=!e.isDisabled,!n.t0){n.next=5;break}return n.next=4,t.isDateAvalaible(e.id);case 4:n.t0=n.sent;case 5:if(n.t1=n.t0,!n.t1){n.next=8;break}t.setDate(e.id);case 8:case"end":return n.stop()}}),n)})))()}},computed:{showMedicationRunoutDate:function(){var e,t;return"boolean"!==typeof(null===(e=this.config)||void 0===e?void 0:e.hideRunoutDate)||!(null!==(t=this.config)&&void 0!==t&&t.hideRunoutDate)},aDate:function(){return D["b"].toStandardHisDisplayFormat(this.startDate)},rDate:function(){return D["b"].toStandardHisDisplayFormat(this.runOutDate)},cDate:function(){return D["b"].toStandardHisFormat(this.startDate)},attributes:function(){return[{highlight:!0,dates:this.aDate}]}}}),N=(n("dc7e"),n("6b0d")),V=n.n(N);const R=V()(k,[["render",m]]);t["default"]=R},dc7e:function(e,t,n){"use strict";n("f5fd")},f5fd:function(e,t,n){}}]);
//# sourceMappingURL=TouchFormElement14.cc117249.js.map