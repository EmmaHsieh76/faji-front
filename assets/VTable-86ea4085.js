import{p as m,m as h,aH as b,a as d,f as v,g as c,l as f,aI as u,u as g,c as t,v as T}from"./index-d150e2c1.js";const x=m({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...h(),...b(),...d(),...v()},"VTable"),k=c()({name:"VTable",props:x(),setup(a,r){let{slots:e,emit:y}=r;const{themeClasses:n}=f(a),{densityClasses:i}=u(a);return g(()=>t(a.tag,{class:["v-table",{"v-table--fixed-height":!!a.height,"v-table--fixed-header":a.fixedHeader,"v-table--fixed-footer":a.fixedFooter,"v-table--has-top":!!e.top,"v-table--has-bottom":!!e.bottom,"v-table--hover":a.hover},n.value,i.value,a.class],style:a.style},{default:()=>{var o,l,s;return[(o=e.top)==null?void 0:o.call(e),e.default?t("div",{class:"v-table__wrapper",style:{height:T(a.height)}},[t("table",null,[e.default()])]):(l=e.wrapper)==null?void 0:l.call(e),(s=e.bottom)==null?void 0:s.call(e)]}})),{}}});export{k as V,x as m};