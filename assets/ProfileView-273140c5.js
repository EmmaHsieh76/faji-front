import{_ as g,$ as C,Z as k,x as i,a2 as S,a4 as y,a5 as a,c as e,am as B,aj as P,ak as I,aa as V,ac as r,ad as q,an as v,J as N,ae as T,af as U,ag as A}from"./index-9ca0f2af.js";import{V as D,a as b}from"./VRow-74010b8e.js";import{V as F}from"./VForm-c260eac4.js";import{V as j}from"./VContainer-49c7b0a3.js";import{V as z}from"./VDivider-8b474880.js";const _=n=>(T("data-v-cbea741f"),n=n(),U(),n),J=_(()=>r("h2",{class:"text-center"},"修改個人資料",-1)),M=_(()=>r("h4",null,"帳號",-1)),R={color:"forth",class:"pb-3 mt-2"},Z=_(()=>r("h4",{class:"mt-4"},"名字",-1)),$=_(()=>r("h4",{class:"mt-2"},"電話",-1)),E={__name:"ProfileView",setup(n){const{apiAuth:x}=A(),s=C(),m=k(),p=i(""),c=i(""),u=i("");p.value=s.account,c.value=s.name,u.value=s.phone;const f=i({required:l=>!!l||"必填欄位"}),h=async()=>{var o,t;const l={account:p.value,name:c.value,phone:u.value};try{await x.patch("/users/user/"+s._id,l),s.login(l),m({text:"更新成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(d){console.error(d);const w=((t=(o=d==null?void 0:d.response)==null?void 0:o.data)==null?void 0:t.message)||"發生錯誤，請稍後再試";m({text:w,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}};return(l,o)=>(S(),y(D,null,{default:a(()=>[e(b,{cols:"12"},{default:a(()=>[J]),_:1}),e(b,{cols:"12"},{default:a(()=>[e(F,{onSubmit:B(h,["prevent"])},{default:a(()=>[e(P,{class:"mx-auto","max-width":"344"},{default:a(()=>[e(I,{class:"third font-weight-bold text-center"},{default:a(()=>[V("個人基本資料")]),_:1}),e(j,null,{default:a(()=>[M,r("h4",R,q(p.value),1),e(z),Z,e(v,{modelValue:c.value,"onUpdate:modelValue":o[0]||(o[0]=t=>c.value=t),color:"forth",variant:"underlined",clearable:"",placeholder:"輸入您的名字",rules:[f.value.required]},null,8,["modelValue","rules"]),$,e(v,{modelValue:u.value,"onUpdate:modelValue":o[1]||(o[1]=t=>u.value=t),color:"forth",placeholder:"輸入您的手機號碼",variant:"underlined",clearable:"",rules:[f.value.required]},null,8,["modelValue","rules"])]),_:1}),e(N,{color:"forth",size:"x-large",class:"font-weight-bold d-flex w-100",variant:"tonal",type:"submit",onClick:h},{default:a(()=>[V(" 確認修改個人資料 ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}},Q=g(E,[["__scopeId","data-v-cbea741f"]]);export{Q as default};