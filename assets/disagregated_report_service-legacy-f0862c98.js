!function(){function e(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}System.register(["./age_groups-legacy-5143fd58.js","./program_report_service-legacy-e20bc985.js"],(function(t,r){"use strict";var i,o;return{setters:[e=>{i=e.A},e=>{o=e.P}],execute:function(){t("D",class extends o{constructor(){super(),e(this,"gender",void 0),e(this,"ageGroup",void 0),e(this,"rebuildOutcome",void 0),e(this,"quarter",void 0),this.gender="",this.quarter="",this.ageGroup=i[0],this.rebuildOutcome=!0}setQuarter(e){this.quarter=e}setAgeGroup(e){this.ageGroup=e}setRebuildOutcome(e){this.rebuildOutcome=e}setGender(e){this.gender=e}getGender(){return this.gender}async isInitialized(){const e=await this.getCohort(!0);return"created"===(null==e?void 0:e.temp_disaggregated)}getCohort(e=!1){return this.getReport("cohort_disaggregated",{age_group:`${this.ageGroup}`,rebuild_outcome:`${this.rebuildOutcome}`,initialize:`${e}`,quarter:this.quarter})}getTxIpt(){return this.getReport("clients_given_ipt",{gender:this.gender,age_group:this.ageGroup})}getTxCurrTB(){return this.getReport("screened_for_tb",{gender:this.gender,age_group:this.ageGroup})}getRegimenDistribution(){return this.getReport("disaggregated_regimen_distribution",{gender:this.gender,age_group:this.ageGroup})}async getDisaggReport(e=!1,t="moh"){const r=await this.generate("cohort_disaggregated",{rebuild:e,definition:t});return this.buildDisagRowData(r)}buildDisagRowData(e){const t=e.reduce(((e,t)=>(/unknown/i.test(t.age_group)||e[t.gender].push(t),e)),{M:[],F:[],FP:[],FBf:[],FNP:[]});return[...t.F,...t.M,...t.FP,...t.FNP,...t.FBf]}})}}}))}();
