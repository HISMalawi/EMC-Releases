System.register([],(function(t,e){"use strict";return{execute:function(){t({p:function(t,e){return e?t+"?"+Object.entries(e).map((([t,e])=>`${t}=${e}`)).join("&"):t},r:function(t,n){return e(t)?t:e(n)?n:"/"+`${n}/${t}`.split("/").filter(Boolean).join("/")}});const e=t=>/^(https?:|mailto:|tel:)/.test(t)}}}));
