import{d0 as a}from"./index-1c16650e.js";async function s(t,e,n){return(await a.create({message:t,position:"top",animated:!0,duration:n,color:e,cssClass:"his-md-text",keyboardClose:!0,buttons:[{side:"end",text:"x",role:"cancel"}]})).present()}function c(t,e=3e3){return s(t,"warning",e)}function i(t,e=2e3){return s(t,"success",e)}function u(t,e=3e3){return s(t,"danger",e)}export{i as a,u as b,c as t};
