import{p as $,m as q,g as R,u as A,c as t,aT as U,a as M,aU as E,o as D,O,K as W,aH as G,e as H,h as J,t as _,aI as K,k as Y,q as Z,W as N,r as z,a7 as j,G as Q,_ as X,aV as ee,Y as ae,Z as te,$ as se,x,A as re,a1 as le,a2 as ie,a3 as oe,a5 as d,aW as ne,ag as ue,ac as o,V as B,aa as S,ad as w,a9 as V,am as ce,an as de,J as T,ae as me,af as ve}from"./index-ad3c5bc1.js";import{u as fe,a as ge}from"./vee-validate.esm-1a5aa1d3.js";import{c as pe,d as be}from"./index.esm-639fe0e0.js";import{V as he}from"./VContainer-0feafd48.js";import{V as ye,a as I}from"./VRow-31664d1b.js";import{V as _e}from"./VTable-68945ba0.js";import{V as Ve}from"./VDivider-64dcb6c2.js";import{V as Ce}from"./VForm-d772c3e6.js";const ke=$({divider:[Number,String],...q()},"VBreadcrumbsDivider"),Be=R()({name:"VBreadcrumbsDivider",props:ke(),setup(e,b){let{slots:a}=b;return A(()=>{var g;return t("li",{class:["v-breadcrumbs-divider",e.class],style:e.style},[((g=a==null?void 0:a.default)==null?void 0:g.call(a))??e.divider])}),{}}}),Se=$({active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...q(),...U(),...M({tag:"li"})},"VBreadcrumbsItem"),we=R()({name:"VBreadcrumbsItem",props:Se(),setup(e,b){let{slots:a,attrs:g}=b;const p=E(e,g),m=D(()=>{var u;return e.active||((u=p.isActive)==null?void 0:u.value)}),h=D(()=>m.value?e.activeColor:e.color),{textColorClasses:s,textColorStyles:n}=O(h);return A(()=>t(e.tag,{class:["v-breadcrumbs-item",{"v-breadcrumbs-item--active":m.value,"v-breadcrumbs-item--disabled":e.disabled,[`${e.activeClass}`]:m.value&&e.activeClass},s.value,e.class],style:[n.value,e.style],"aria-current":m.value?"page":void 0},{default:()=>{var u,y;return[p.isLink.value?t("a",{class:"v-breadcrumbs-item--link",href:p.href.value,"aria-current":m.value?"page":void 0,onClick:p.navigate},[((y=a.default)==null?void 0:y.call(a))??e.title]):((u=a.default)==null?void 0:u.call(a))??e.title]}})),{}}}),Pe=$({activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:"/"},icon:W,items:{type:Array,default:()=>[]},...q(),...G(),...H(),...M({tag:"ul"})},"VBreadcrumbs"),xe=R()({name:"VBreadcrumbs",props:Pe(),setup(e,b){let{slots:a}=b;const{backgroundColorClasses:g,backgroundColorStyles:p}=J(_(e,"bgColor")),{densityClasses:m}=K(e),{roundedClasses:h}=Y(e);Z({VBreadcrumbsDivider:{divider:_(e,"divider")},VBreadcrumbsItem:{activeClass:_(e,"activeClass"),activeColor:_(e,"activeColor"),color:_(e,"color"),disabled:_(e,"disabled")}});const s=D(()=>e.items.map(n=>typeof n=="string"?{item:{title:n},raw:n}:{item:n,raw:n}));return A(()=>{const n=!!(a.prepend||e.icon);return t(e.tag,{class:["v-breadcrumbs",g.value,m.value,h.value,e.class],style:[p.value,e.style]},{default:()=>{var u;return[n&&t("li",{key:"prepend",class:"v-breadcrumbs__prepend"},[a.prepend?t(z,{key:"prepend-defaults",disabled:!e.icon,defaults:{VIcon:{icon:e.icon,start:!0}}},a.prepend):t(N,{key:"prepend-icon",start:!0,icon:e.icon},null)]),s.value.map((y,v,k)=>{var C;let{item:f,raw:P}=y;return t(j,null,[((C=a.item)==null?void 0:C.call(a,{item:f,index:v}))??t(we,Q({key:v,disabled:v>=k.length-1},typeof f=="string"?{title:f}:f),{default:a.title?()=>{var i;return(i=a.title)==null?void 0:i.call(a,{item:f,index:v})}:void 0}),v<k.length-1&&t(Be,null,{default:a.divider?()=>{var i;return(i=a.divider)==null?void 0:i.call(a,{item:P,index:v})}:void 0})])}),(u=a.default)==null?void 0:u.call(a)]}})}),{}}});const F=e=>(me("data-v-16a3af79"),e=e(),ve(),e),Ie={colspan:"3",class:"d-flex justify-center"},De=F(()=>o("tr",null,[o("br")],-1)),$e={class:"d-flex justify-center"},qe={class:"my-2"},Re={style:{"white-space":"pre"}},Ae=F(()=>o("h1",{class:"text-h1 text-red"},"已下架",-1)),Fe=F(()=>o("br",null,null,-1)),Te={__name:"ProductDetail",setup(e){const b=ee(),a=ae(),{api:g,apiAuth:p}=ue(),m=te(),h=se(),s=x({_id:"",name:"",price:0,description:"",images:[],sell:!0,category:""}),n=x(s.value.images[0]),u=i=>{n.value=i},y=pe({quantity:be().typeError("缺少數量").required("缺少數量").min(1,"數量最小為 1")}),{isSubmitting:v,handleSubmit:k}=fe({validationSchema:y,initialValues:{quantity:1}}),f=ge("quantity"),P=k(async i=>{var l,r;if(!h.isLogin){a.push("/login");return}try{const{data:c}=await p.patch("/users/cart",{product:s.value._id,quantity:i.quantity});h.cart=c.result,m({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(c){const L=((r=(l=c==null?void 0:c.response)==null?void 0:l.data)==null?void 0:r.message)||"發生錯誤，請稍後再試";m({text:L,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),C=x([]);return re(async()=>{var i,l;try{const{data:r}=await g.get("/products/"+b.params.id);s.value._id=r.result._id,s.value.name=r.result.name,s.value.price=r.result.price,s.value.description=r.result.description,s.value.images=r.result.images,s.value.sell=r.result.sell,s.value.category=r.result.category,document.title=`發記冰品 | ${s.value.name}`,C.value=[{title:"首頁",disabled:!1,href:"/"},{title:"快速預訂",disabled:!1,href:"/product#/product"},{title:`${s.value.name}`,disabled:!0,href:"/product#/product/"}]}catch(r){const c=((l=(i=r==null?void 0:r.response)==null?void 0:i.data)==null?void 0:l.message)||"發生錯誤，請稍後再試";m({text:c,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}}),a.push("/")}}),(i,l)=>{const r=le("font");return ie(),oe(j,null,[t(he,null,{default:d(()=>[t(ye,null,{default:d(()=>[t(I,{cols:"12"},{default:d(()=>[t(xe,{items:C.value},{divider:d(()=>[t(N,{icon:"mdi-chevron-right"})]),_:1},8,["items"])]),_:1}),t(I,{cols:"12",md:"6"},{default:d(()=>[t(_e,null,{default:d(()=>[o("tr",null,[o("td",Ie,[t(B,{width:350,height:350,"aspect-ratio":"1/1",cover:"",src:n.value},null,8,["src"])])]),De,o("tr",$e,[o("td",null,[t(B,{width:70,height:70,"aspect-ratio":"1/1",class:"ma-2 pa-2",src:s.value.images[0],onClick:l[0]||(l[0]=c=>u(s.value.images[0]))},null,8,["src"])]),o("td",null,[t(B,{width:70,height:70,"aspect-ratio":"1/1",class:"ma-2 pa-2",src:s.value.images[1],onClick:l[1]||(l[1]=c=>u(s.value.images[1]))},null,8,["src"])]),o("td",null,[t(B,{width:70,height:70,"aspect-ratio":"1/1",class:"ma-2 pa-2",src:s.value.images[2],onClick:l[2]||(l[2]=c=>u(s.value.images[2]))},null,8,["src"])])])]),_:1})]),_:1}),t(I,{cols:"12",md:"6"},{default:d(()=>[o("h2",null,[t(r,{color:"#D92323"},{default:d(()=>[S("【"+w(s.value.category)+"】",1)]),_:1}),S(" "+w(s.value.name),1)]),t(Ve),o("p",qe,"售價"+w(s.value.price),1),o("p",Re,w(s.value.description),1),t(Ce,{disabled:V(v),onSubmit:ce(V(P),["prevent"])},{default:d(()=>[t(de,{type:"number",min:"0",modelValue:V(f).value.value,"onUpdate:modelValue":l[3]||(l[3]=c=>V(f).value.value=c),modelModifiers:{number:!0},"error-messages":V(f).errorMessage.value,density:"confortable",variant:"outlined",placeholder:"數量",style:{width:"570px"}},null,8,["modelValue","error-messages"]),t(T,{type:"submit","prepend-icon":"mdi-cart",loading:V(v),style:{width:"570px"},color:"seventh"},{default:d(()=>[S("加入購物車")]),_:1},8,["loading"])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}),t(ne,{class:"align-center justify-center text-center","model-value":!s.value.sell,persistent:""},{default:d(()=>[Ae,Fe,t(T,{to:"/",color:"third"},{default:d(()=>[S("回首頁")]),_:1})]),_:1},8,["model-value"])],64)}}},Ge=X(Te,[["__scopeId","data-v-16a3af79"]]);export{Ge as default};
