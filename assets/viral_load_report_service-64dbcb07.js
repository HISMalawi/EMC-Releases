import{A as _}from"./age_groups-8203d13f.js";import{R as d}from"./regimens-494dea9f.js";import{R as l}from"./report_service-1011140c.js";import{g as u}from"./common-94ac9539.js";const w={tx_curr:"TX_CURR",due_for_vl:"Due for VL",drawn_routine:"Routine (Sample Drawn)",drawn_targeted:"Targeted (Sample Drawn)",high_vl_routine:"Routine (High VL (>=1000 copies))",high_vl_targeted:"Targeted (High VL (>=1000 copies))",low_vl_routine:"Routine (Low VL (<1000 copies))",low_vl_targeted:"Targeted (Low VL (<1000 copies))"};class S extends l{constructor(){super()}getVlCollection(){return this.getReport("programs/".concat(this.programId,"/reports/vl_collection"))}async getTxPVLS(e={}){const r=await this.getReport("programs/".concat(this.programId,"/reports/viral_load_coverage"),{rebuild_outcomes:!0,...e});return this.txPVLSBuilder(r)}async getViralLoad(e={}){const r=await this.getReport("programs/".concat(this.programId,"/reports/vl_disaggregated"),e);return this.vlReportBuilder(r)}flattenTxPVLSData(e){return Object.entries(e).reduce((r,[t,o])=>(Array.isArray(o)?r[t]=o:(r["".concat(t,"_routine")]=o.routine,r["".concat(t,"_targeted")]=o.targeted),r),{})}txPVLSBuilder(e){return Object.entries(e!=null?e:{}).reduce((r,[t,o])=>(t!=="Unknown"&&Object.entries(o).forEach(([c,p])=>{const a=c,g=this.flattenTxPVLSData(p);r[a].rows.push({ageGroup:t,gender:a,...g}),Object.entries(g).forEach(([n,i])=>{var s;r[a].aggregate[n]=[...(s=r[a].aggregate[n])!=null?s:[],...i!=null?i:[]]})}),r),{M:{rows:[],aggregate:{}},F:{rows:[],aggregate:{}}})}vlReportBuilder(e){return _.map(r=>[...d,"N/A"].reduce((t,o)=>(t[o]=u(e,"".concat(r.replace("-"," - "),".").concat(o),0),t),{ageGroup:r}))}}export{w as T,S as V};
