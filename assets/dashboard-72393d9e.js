import{N as o}from"./nprogress-131c7954.js";import{g as m}from"./admin-062d84a4.js";import{d,u as i,j as p,r as f,o as _,c as r,k as a,l as t,e as v,x as h,g as n}from"./index-86777f2e.js";import{f as g}from"./index-b25eac40.js";const k=a("p",{class:"mb-4 text-2xl font-bold"},"仪表盘",-1),b={key:0},B=d({__name:"dashboard",setup(x){const l=i(),u=p(),e=f();_(()=>{c()});function c(){o.start(),m(l.token).then(s=>{e.value=s}).catch(s=>{u.error(s.message)}).finally(()=>{o.done()})}return(s,C)=>(n(),r("div",null,[k,e.value?(n(),r("div",b,[a("p",null,"用户总数："+t(e.value.userCount),1),a("p",null,"文章总数："+t(e.value.postCount),1),a("p",null,"评论总数："+t(e.value.commentCount),1),a("p",null,"最新注册用户："+t(e.value.latestUser.nickname)+"("+t(e.value.latestUser.name)+")，uid: "+t(e.value.latestUser.uid)+"，注册时间："+t(v(g)(e.value.latestUser.createdAt)),1)])):h("",!0)]))}});export{B as default};