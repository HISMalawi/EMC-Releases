System.register([],(function(e,t){"use strict";return{execute:function(){e({g:function(e,t,n){return t.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split(".").reduce(((e,t)=>{var r;return null!==(r=null==e?void 0:e[t])&&void 0!==r?r:n}),e)},i:function(e){return null==e||Array.isArray(e)&&!e.length||"object"==typeof e&&!Object.keys(e).length||!e},p:function(e){return parseInt(e.split("-")[2])||1/0},s:function(e){return e.replace(/<(?:.|\n)*?>/gm," ").replace(/(\r\n|\n|\r|\t|\s{2,}|[=,])/g," ").trim()},t:function(e){const t=`${e}`.toUpperCase();return"M"===t||"MALE"===t?"Male":"F"===t||"FEMALE"===t?"Female":/fbf|fnp|fp/i.test(e)?t:e}})}}}));
