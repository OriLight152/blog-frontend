import{_ as h}from"./PostPreview.vue_vue_type_script_setup_true_lang-cb657253.js";import{N as c}from"./nprogress-131c7954.js";import{g as v}from"./post-57a402b9.js";import{_ as k}from"./Pagination.vue_vue_type_script_setup_true_lang-96c8d095.js";import{d as x,u as y,a as b,b as C,r as a,o as L,c as p,e as i,w,F as m,f as N,g as R,h as q,i as s,j as z,k as B,p as P}from"./index-2045cc68.js";import"./index-b25eac40.js";import"./IconView-cba66970.js";import"./IconLikeS-f8700d07.js";const G=x({__name:"home",setup(F){const n=y(),r=b(),f=C(),o=a([]),t=a(1),u=a(0);L(()=>{r.query.page&&(t.value=Number(r.query.page)),l()});function l(){c.start(),n.pageLoading=!0,o.value=[],v(t.value).then(e=>{o.value=e.posts,u.value=e.count}).finally(()=>{c.done(),n.pageLoading=!1})}function g(e){t.value=e,f.push({query:{page:e}}),l()}return(e,S)=>{const d=q("RouterLink");return s(),p(m,null,[i(d,{class:"w-full text-center text-2xl font-bold block py-4 my-2 bg-white hover:bg-gray-200 transition-colors rounded-md shadow-sm",to:"/post/35"},{default:w(()=>[z(" 点击前往作业报告 ")]),_:1}),(s(!0),p(m,null,N(o.value,_=>(s(),B(h,{"post-data":_},null,8,["post-data"]))),256)),i(k,{"current-page":t.value,"total-count":u.value,"page-size":R(P),onChange:g},null,8,["current-page","total-count","page-size"])],64)}}});export{G as default};
