var d=Object.defineProperty;var u=(s,e,t)=>e in s?d(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var i=(s,e,t)=>(u(s,typeof e!="symbol"?e+"":e,t),t);import{P as l}from"./program_service-f20f02af.js";import{P as h}from"./index-95d3a767.js";import{G as a}from"./index-67d679d3.js";class p{constructor(e){i(this,"person");this.person=e}create(){return a.postJson("/people",this.person)}update(e){return a.putJson("people/".concat(e),{...this.person,program_id:h})}static searchFamilyName(e){return a.getJson("/search/family_name",{search_string:e})}static searchGivenName(e){return a.getJson("/search/given_name",{search_string:e})}static async getPersonFullName(e){var r,n,c;const t=await a.getJson("/people/".concat(e,"/names"));return(r=t.data)!=null&&r.names.length?((n=t.data)==null?void 0:n.names[0].given_name)+" "+((c=t.data)==null?void 0:c.names[0].family_name):""}}class m{static create(e){return a.postJson("/person_attributes",e)}}class w{constructor(){i(this,"personId");this.personId=0}getPersonID(){return this.personId}setPersonID(e){this.personId=e}async registerPatient(e,t){return await this.createPerson(e),await this.createPersonAttributes(t),await this.createPatient()}async registerGuardian(e){return this.createPerson(e)}updatePerson(e){return new p(e).update(this.personId)}async createPerson(e){const t=await(await new p(e).create()).data;return this.personId=t.person_id,t}createPatient(){return l.createPatient(this.personId)}async createPersonAttributes(e){for(const t in e)await m.create({...e[t],person_id:this.personId})}}class o{constructor(){}static voidRelation(e,t,r){return a.void("people/".concat(e,"/relationships/").concat(t),{reason:r})}static async amendRelation(e,t,r,n){return await o.voidRelation(e,r,"Updating guardian relationship"),o.createRelation(e,t,n)}static getRelations(){return a.getJson("types/relationships")}static createRelation(e,t,r){return a.postJson("people/".concat(e,"/relationships"),{relationship_type_id:r,relation_id:t})}}export{w as P,o as R};
