import{d as N,u as C,a as B,n as D,t as P,r as u,o as $,O as r,c as d,j as L,D as S,k as n,f as m,m as c,e as p,w as f,A as T,h as i,i as v}from"./index-10d97bec.js";import{N as _}from"./nprogress-a817ebd9.js";import{b as U,f as E}from"./post-471e27b3.js";import{_ as g}from"./NormalButton.vue_vue_type_script_setup_true_lang-c36d645a.js";import{_ as M,a as R}from"./NormalEditor.vue_vue_type_script_setup_true_lang-759c7658.js";import"./_commonjsHelpers-28e086c5.js";import"./index-74aade08.js";import"./IconView-a9988df5.js";import"./_plugin-vue_export-helper-c27b6911.js";const j={class:"w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-4"},A=n("h2",null,"编辑文章",-1),O={key:0},q=n("p",{class:"my-2 font-bold"},"标题",-1),z=n("p",{class:"my-2 font-bold"},"内容",-1),F={class:"mt-2"},ee=N({__name:"post-edit",setup(G){const l=C(),h=B(),o=D(),{login:x,uid:w,setting:k}=P(l),y=u(String(h.params.pid)),e=u(null);u(null),$(async()=>{if(!x.value){o.warning("请先登录"),r.push("/login");return}_.start(),await b(),_.done()});async function b(){l.pageLoading=!0,U(Number(y.value)).then(s=>{var t;if(e.value=s.post,l.pageLoading=!1,w.value!==((t=e.value)==null?void 0:t.author)){o.warning("你没有权限编辑此文章"),r.push("/profile");return}}).catch(s=>{l.pageLoading=!1})}async function V(){var s,t;if(((s=e.value)==null?void 0:s.title.trim())===""){o.warning("文章标题不可为空");return}if(((t=e.value)==null?void 0:t.text.trim())===""){o.warning("文章内容不可为空");return}e.value&&E(l.token,e.value.pid,e.value.title.trim(),e.value.text.trim()).then(a=>{o.success("保存成功"),r.back()}).catch(a=>{o.error("保存失败："+a.message)})}return(s,t)=>(i(),d("div",j,[A,e.value?(i(),d("div",O,[q,L(n("input",{class:"w-full p-2 rounded-md border hover:border-blue-500 transition-colors",type:"text","onUpdate:modelValue":t[0]||(t[0]=a=>e.value.title=a)},null,512),[[S,e.value.title]]),z,m(k).legacyEditor?(i(),c(M,{key:0,modelValue:e.value.text,"onUpdate:modelValue":t[1]||(t[1]=a=>e.value.text=a)},null,8,["modelValue"])):(i(),c(R,{key:1,class:"h-[calc(100vh-400px)]",modelValue:e.value.text,"onUpdate:modelValue":t[2]||(t[2]=a=>e.value.text=a)},null,8,["modelValue"])),n("div",F,[p(g,{primary:"",onClick:V},{default:f(()=>[v("保存修改")]),_:1}),p(g,{onClick:t[3]||(t[3]=a=>m(r).back())},{default:f(()=>[v("取消")]),_:1})])])):T("",!0)]))}});export{ee as default};