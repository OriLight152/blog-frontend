import{d as N,u as B,a as C,q as S,t as $,r as u,o as P,S as r,c as d,f as D,k as E,E as L,l as n,g as m,n as p,e as c,w as f,B as T,i,j as v}from"./index-2c666690.js";import{N as g}from"./nprogress-a817ebd9.js";import{b as U,h as M}from"./post-47625b9a.js";import{_}from"./NormalButton.vue_vue_type_script_setup_true_lang-cd86d602.js";import{_ as R,a as j}from"./NormalEditor.vue_vue_type_script_setup_true_lang-4be83f8f.js";import"./_commonjsHelpers-28e086c5.js";import"./index-74aade08.js";import"./IconView-ccd800f6.js";import"./_plugin-vue_export-helper-c27b6911.js";const q={class:"w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-4"},z=n("h2",null,"编辑文章",-1),A={key:0},F=n("p",{class:"my-2 font-bold"},"标题",-1),G=n("p",{class:"my-2 font-bold"},"内容",-1),H={class:"mt-2"},te=N({__name:"post-edit",setup(I){const l=B(),h=C(),s=S(),{login:w,uid:x,setting:k}=$(l),y=u(String(h.params.pid)),e=u(null);u(null),P(async()=>{if(!w.value){s.warning("请先登录"),r.push("/login");return}g.start(),await b(),g.done()});async function b(){l.pageLoading=!0,U(Number(y.value)).then(o=>{var t;if(e.value=o.post,l.pageLoading=!1,x.value!==((t=e.value)==null?void 0:t.author)){s.warning("你没有权限编辑此文章"),r.push("/profile");return}}).catch(o=>{l.pageLoading=!1})}async function V(){var o,t;if(((o=e.value)==null?void 0:o.title.trim())===""){s.warning("文章标题不可为空");return}if(((t=e.value)==null?void 0:t.text.trim())===""){s.warning("文章内容不可为空");return}e.value&&M(l.token,e.value.pid,e.value.title.trim(),e.value.text.trim()).then(a=>{s.success("保存成功"),r.back()}).catch(a=>{s.error("保存失败："+a.message)})}return(o,t)=>(i(),d("div",q,[z,D(o.$slots,"loading"),e.value?(i(),d("div",A,[F,E(n("input",{class:"w-full p-2 rounded-md border hover:border-blue-500 transition-colors",type:"text","onUpdate:modelValue":t[0]||(t[0]=a=>e.value.title=a)},null,512),[[L,e.value.title]]),G,m(k).legacyEditor?(i(),p(R,{key:0,modelValue:e.value.text,"onUpdate:modelValue":t[1]||(t[1]=a=>e.value.text=a)},null,8,["modelValue"])):(i(),p(j,{key:1,class:"h-[calc(100vh-400px)]",modelValue:e.value.text,"onUpdate:modelValue":t[2]||(t[2]=a=>e.value.text=a)},null,8,["modelValue"])),n("div",H,[c(_,{primary:"",onClick:V},{default:f(()=>[v("保存修改")]),_:1}),c(_,{onClick:t[3]||(t[3]=a=>m(r).back())},{default:f(()=>[v("取消")]),_:1})])])):T("",!0)]))}});export{te as default};