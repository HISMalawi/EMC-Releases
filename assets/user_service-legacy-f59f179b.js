System.register(["./index-legacy-f8d71896.js"],(function(e,t){"use strict";var s;return{setters:[e=>{s=e.G}],execute:function(){e("U",class{static getAllUsers(e={}){return s.getJson("users",{page_size:100,...e})}static activateUser(e){return s.postJson(`users/${e}/activate`,{})}static deactivateUser(e){return s.postJson(`users/${e}/deactivate`,{})}static getUserByID(e){return s.getJson(`users/${e}`)}static isAdmin(){return this.getUserRoles().filter((e=>e.role.match(/Program Manager|Superuser|System Developer/i))).length>0}static getUserRoles(){const e=sessionStorage.getItem("userRoles");return e?JSON.parse(e):[]}static getUsers(){return s.getJson("users",{role:"Provider"})}static updateUser(e,t){return s.putJson(`users/${e}`,t)}static async getCurrentUser(){const e=s.getUserID();if(e)return(await this.getUserByID(e)).data}static getAllRoles(){return s.getJson("roles",{page_size:100})}static createUser(e){return s.postJson("users",e)}})}}}));
