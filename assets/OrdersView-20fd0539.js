import{Z as k,x as y,A as V,a2 as i,a4 as h,a5 as t,ag as g,c as o,aa as n,ad as c,ac as m,a3 as d,a8 as w,a7 as x}from"./index-548a40d7.js";import{V as A,a as u}from"./VRow-ac47f656.js";import{V as D}from"./VDivider-4a06bcd9.js";import{V as b}from"./VDataTable-68c3c3d2.js";import"./VList-713811fd.js";import"./ssrBoot-5791f43f.js";import"./VChip-5a1bce46.js";import"./VSlideGroup-3f145f42.js";import"./VTable-717e54f3.js";const B=m("h2",{class:"text-center"},"訂單查詢",-1),O={__name:"OrdersView",setup(v){const{apiAuth:p}=g(),_=k(),l=y([]),f=[{title:"訂單編號",key:"_id"},{title:"訂購日期",key:"createdAt"},{title:"取貨日",key:"date"},{title:"取貨時間",key:"time"},{title:"商品",key:"cart",sortable:!1},{title:"訂購金額",key:"price",value:a=>a.cart.reduce((r,e)=>r+e.quantity*e.product.price,0)}];return V(async()=>{var a,r;try{const{data:e}=await p.get("/orders");l.value.push(...e.result)}catch(e){const s=((r=(a=e==null?void 0:e.response)==null?void 0:a.data)==null?void 0:r.message)||"發生錯誤，請稍後再試";_({text:s,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),(a,r)=>(i(),h(A,null,{default:t(()=>[o(u,{cols:"12"},{default:t(()=>[B]),_:1}),o(D),o(u,{cols:"12"},{default:t(()=>[o(b,{items:l.value,headers:f},{"item.createdAt":t(({item:e})=>[n(c(new Date(e.createdAt).toLocaleString()),1)]),"item.date":t(({item:e})=>[n(c(new Date(e.createdAt).toLocaleDateString()),1)]),"item.cart":t(({item:e})=>[m("ul",null,[(i(!0),d(x,null,w(e.cart,s=>(i(),d("li",{key:s._id},c(s.product.name)+" * "+c(s.quantity),1))),128))])]),_:2},1032,["items"])]),_:1})]),_:1}))}};export{O as default};