import{s as p}from"./arrays-7f14d286.js";import{R as m}from"./report_service-1011140c.js";import{A as u}from"./age_groups-8203d13f.js";import{i as T}from"./common-94ac9539.js";const h={"3HP_new":"3H (Started New on ART)","6H_new":"6H (Started New on ART)","3HP_prev":"3H (Started Previously on ART)","6H_prev":"6H (Started Previously on ART)"},g={started_tpt_new:"Started TPT (New on ART)",started_tpt_prev:"Started TPT (Previous on ART)",completed_tpt_new:"Completed TPT(New on ART)",completed_tpt_prev:"Completed TPT(Previous on ART)",not_completed_tpt:"Not completed TPT",died:"Died",defaulted:"Defaulted",stopped:"Stopped ART",transfer_out:"Transfered Out",confirmed_tb:"Confirmed TB",pregnant:"Pregnant",breast_feeding:"Breastfeeding",skin_rash:"Skin rash",peripheral_neuropathy:"Peripheral neuropathy",yellow_eyes:"Yellow eyes",nausea:"Nausea",dizziness:"Dizziness"};class P extends m{constructor(){super()}async getTtpOutcomes(){var o;const e=(o=await this.getReport("programs/".concat(this.programId,"/reports/tpt_outcome")))!=null?o:[],t=this.aggregateTptOutcomes(e),s=this.getTotalTptOutcomeFemales(t.females);return[...p(this.tptOutcomesBuilder(e),"tpt_type"),{age_group:"All",tpt_type:"M",...t.males},...s]}async getCohort(){const e=await this.getReport("moh_tpt");return p(e!=null?e:[],"gender")}async getTptNewInitiations(){return this.tptInitiationBuilder(await this.getReport("programs/".concat(this.programId,"/reports/tpt_newly_initiated")))}tptOutcomesBuilder(e){return e.map(t=>Object.entries(t).reduce((s,[r,o])=>(s[r]=typeof o=="string"?o:o.map(({patient_id:n})=>n),s),{}))}getTotalTptOutcomeFemales(e){return["FP","FNP","FBf"].map(t=>{const s={age_group:"All",tpt_type:t};for(const r in g)s[r]=e[r].filter(o=>t==="FP"?e.pregnant.includes(o):t==="FBf"?e.breast_feeding.includes(o):![...e.pregnant,e.breast_feeding].includes(o));return s})}aggregateTptOutcomes(e){return e.reduce((t,s)=>{for(const r in g)r in t.males||(t.males[r]=[]),r in t.females||(t.females[r]=[]),!T(s[r])&&s[r].forEach(o=>{o.gender==="F"?t.females[r].push(o.patient_id):t.males[r].push(o.patient_id)});return t},{males:{},females:{}})}aggregateTptInitiationData(e,t,s,r){var o;r[e].aggregate[t]=[...(o=r[e].aggregate[t])!=null?o:[],...s]}tptInitiationBuilder(e={}){const t={M:{rows:[],aggregate:{}},F:{rows:[],aggregate:{}}};return u.reduce((s,r)=>{const o=Object.entries(e[r]).reduce((n,[a,i])=>(this.aggregateTptInitiationData("M",a,i.M,s),this.aggregateTptInitiationData("F",a,i.F,s),n.M[a]=i.M,n.F[a]=i.F,n),{M:{gender:"M",location:e.Location,ageGroup:r},F:{gender:"F",location:e.Location,ageGroup:r}});return s.F.rows.push(o.F),s.M.rows.push(o.M),s},t)}}export{P as T,h as a,g as b};
