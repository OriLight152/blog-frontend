import{d as p,u as f,t as _,r as a,H as v,c as x,m as s,B as w,C as V,g as b,k as d,e as h,w as k,F as y,i as l,j as g}from"./index-8d1e5d37.js";import{m as B}from"./index-74aade08.js";import{l as C,_ as E}from"./MarkdownEditor.vue_vue_type_script_setup_true_lang-4de768b1.js";import{_ as N}from"./NormalButton.vue_vue_type_script_setup_true_lang-ea2df4d5.js";import{_ as T}from"./NormalEditor.vue_vue_type_script_setup_true_lang-5776c190.js";import"./_commonjsHelpers-28e086c5.js";const U=s("p",{class:"mb-4 text-2xl font-bold"},"发布文章",-1),$={class:"w-full"},F=s("p",{class:"my-2 font-bold"},"标题",-1),P=s("p",{class:"my-2 font-bold"},"内容",-1),z=p({__name:"post-new",setup(j){const m=f(),{setting:u}=_(m),n=a(""),o=a(""),c=a(""),i=C.exports.debounce(r=>{c.value=B.parse(r)},100);return v(()=>{i(o.value)}),(r,e)=>(l(),x(y,null,[U,s("div",$,[F,w(s("input",{class:"w-full px-2 py-1 rounded-md border hover:border-blue-500 transition-colors","onUpdate:modelValue":e[0]||(e[0]=t=>n.value=t),placeholder:"有什么新鲜事要向大家分享？",maxlength:"30"},null,512),[[V,n.value]]),P,b(u).legacyEditor?(l(),d(T,{key:0,modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=t=>o.value=t)},null,8,["modelValue"])):(l(),d(E,{key:1,class:"h-[calc(100vh-320px)]",modelValue:o.value,"onUpdate:modelValue":e[2]||(e[2]=t=>o.value=t)},null,8,["modelValue"])),h(N,{class:"mt-2",primary:""},{default:k(()=>[g("发布")]),_:1})])],64))}});export{z as default};
