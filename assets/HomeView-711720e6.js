import{m as D,V,a as b,b as _}from"./VWindowItem-27d6d79b.js";import{p as P,K as L,g as k,D as R,N as T,x as I,z as f,A as U,u as p,c as a,a7 as x,r as S,J as N,G as u,ah as A,v as W,ai as $,V as y,a2 as g,a4 as C,a5 as F,a3 as z,a8 as M}from"./index-a033bc4d.js";import"./ssrBoot-79000be3.js";const q=P({color:String,cycle:Boolean,delimiterIcon:{type:L,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...D({continuous:!0,mandatory:"force",showArrows:!0})},"VCarousel"),E=k()({name:"VCarousel",props:q(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:t}=o;const r=R(e,"modelValue"),{t:i}=T(),l=I();let c=-1;f(r,m),f(()=>e.interval,m),f(()=>e.cycle,d=>{d?m():window.clearTimeout(c)}),U(h);function h(){!e.cycle||!l.value||(c=window.setTimeout(l.value.group.next,+e.interval>0?+e.interval:6e3))}function m(){window.clearTimeout(c),window.requestAnimationFrame(h)}return p(()=>{const d=V.filterProps(e);return a(V,u({ref:l},d,{modelValue:r.value,"onUpdate:modelValue":v=>r.value=v,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:W(e.height)},e.style]}),{default:t.default,additional:v=>{let{group:s}=v;return a(x,null,[!e.hideDelimiters&&a("div",{class:"v-carousel__controls",style:{left:e.verticalDelimiters==="left"&&e.verticalDelimiters?0:"auto",right:e.verticalDelimiters==="right"?0:"auto"}},[s.items.value.length>0&&a(S,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[s.items.value.map((n,B)=>{const w={id:`carousel-item-${n.id}`,"aria-label":i("$vuetify.carousel.ariaLabel.delimiter",B+1,s.items.value.length),class:["v-carousel__controls__item",s.isSelected(n.id)&&"v-btn--active"],onClick:()=>s.select(n.id,!0)};return t.item?t.item({props:w,item:n}):a(N,u(n,w),null)})]})]),e.progress&&a(A,{class:"v-carousel__progress",color:typeof e.progress=="string"?e.progress:void 0,modelValue:(s.getItemIndex(r.value)+1)/s.items.value.length*100},null)])},prev:t.prev,next:t.next})}),{}}}),G=P({...$(),...b()},"VCarouselItem"),H=k()({name:"VCarouselItem",inheritAttrs:!1,props:G(),setup(e,o){let{slots:t,attrs:r}=o;p(()=>{const i=y.filterProps(e),l=_.filterProps(e);return a(_,u({class:"v-carousel-item"},l),{default:()=>[a(y,u(r,i),t)]})})}}),O={__name:"HomeView",setup(e){const o=I([{src:new URL(""+new URL("Carousel-5-a95ab3c1.png",import.meta.url).href,self.location).href},{src:new URL(""+new URL("Carousel-6-8772141f.png",import.meta.url).href,self.location).href},{src:new URL("@/assets/Carousel-7.png",self.location).href}]);return(t,r)=>(g(),C(E,{cycle:"","hide-delimiter-background":"","show-arrows":"hover",height:"calc(100vh - 64px)"},{default:F(()=>[(g(!0),z(x,null,M(o.value,(i,l)=>(g(),C(H,{key:l,src:i.src,cover:""},null,8,["src"]))),128))]),_:1}))}};export{O as default};
