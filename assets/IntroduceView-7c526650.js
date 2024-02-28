import{g as i}from"./index-7d9a9c74.js";import{_ as m,x,A as p,a2 as l,a4 as s,a5 as t,a3 as u,a8 as g,a7 as d,c as a,V as h,ac as r,ad as o}from"./index-9ca0f2af.js";import{V as _}from"./VContainer-49c7b0a3.js";import{V as w,a as n}from"./VRow-74010b8e.js";import{V as L}from"./VDivider-8b474880.js";const R={__name:"IntroduceView",setup(U){const c=x([{image:new URL(""+new URL("ice-1-b3447d3f.jpg",import.meta.url).href,self.location).href,text1:"鳳梨冰",text2:"以新鮮的鳳梨，經由手工削皮切片，保留了每一絲果肉的飽滿香氣。每一片鳳梨都是經過精心挑選，確保口感豐腴，為您帶來最天然、新鮮的水果風味。",text3:"採用古法熬煮的紅糖水，將濃郁的甘甜與鳳梨的清新完美結合。透過時間的淬煉，每一滴糖水都帶有濃郁的風味，為鳳梨冰增添了一抹深邃的韻味。",text4:"讓您在炎炎夏日中，感受來自大自然的天然甜蜜，盡情享受一份鳳梨冰的清新美好。"},{image:new URL(""+new URL("ice-2-80e21c77.jpg",import.meta.url).href,self.location).href,text1:"米苔目冰",text2:"挑選上等在來米粉，經過精心煮製，經過流水冷卻，使口感Q彈不軟爛",text3:" 米苔目的質地柔軟，容易被消化吸收，適合作為容易消化的食物，特別是對於一些消化不良的人群。",text4:"更讓人在炎炎夏日中感受到一陣清新，是味蕾和心靈的雙重享受。"},{image:new URL(""+new URL("ice-3-e1d05690.jpg",import.meta.url).href,self.location).href,text1:"粉粿冰",text2:"精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。",text3:"運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。",text4:"這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。"},{image:new URL(""+new URL("ice-4-795fd0ff.jpg",import.meta.url).href,self.location).href,text1:"綜合冰",text2:"由人氣Q彈粉粿：爽口米苔目與清涼解渴的愛玉，交織出豐富口感饗宴。",text3:"搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。",text4:"多層口感融合，讓您沉浸在味蕾的饗宴中，和心靈的雙重享受。"},{image:new URL(""+new URL("ice-5-e50497f0.jpg",import.meta.url).href,self.location).href,text1:"仙草冰",text2:"精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。",text3:"運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。",text4:"這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。"},{image:new URL(""+new URL("ice-6-aaa01340.jpg",import.meta.url).href,self.location).href,text1:"愛玉冰",text2:"精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。",text3:"運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。",text4:"這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。"},{image:new URL(""+new URL("ice-7-c6002a1d.jpg",import.meta.url).href,self.location).href,text1:"綠豆冰",text2:"精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。",text3:"運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。",text4:"這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。"},{image:new URL(""+new URL("ice-8-92e1bf80.jpg",import.meta.url).href,self.location).href,text1:"杏仁冰",text2:"精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。",text3:"運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。",text4:"這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。"},{image:new URL(""+new URL("ice-9-06063a9c.jpg",import.meta.url).href,self.location).href,text1:"粉條冰",text2:"精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。",text3:"運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。",text4:"這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。"}]);return p(()=>{i.from(".left",{opacity:0,duration:1,ease:"ease-in",stagger:.5}),i.from(".right",{opacity:0,duration:1,ease:"ease-in",stagger:.5})}),(V,j)=>(l(),s(_,null,{default:t(()=>[(l(!0),u(d,null,g(c.value,(e,f)=>(l(),s(w,{key:f,class:"mb-5 mx-auto"},{default:t(()=>[a(n,{cols:"12",md:"4"},{default:t(()=>[a(h,{class:"left",width:"auto",height:"225","aspect-ratio":"1/1",cover:"",src:e.image,rounded:"lg"},null,8,["src"])]),_:2},1024),a(n,{class:"right",cols:"12",md:"8"},{default:t(()=>[r("h2",null,o(e.text1),1),a(L,{class:"mb-6"}),r("p",null,o(e.text2),1),r("p",null,o(e.text3),1),r("p",null,o(e.text4),1)]),_:2},1024)]),_:2},1024))),128))]),_:1}))}},B=m(R,[["__scopeId","data-v-27d58f3c"]]);export{B as default};