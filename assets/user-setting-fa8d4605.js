import{_ as a}from"./Switch.vue_vue_type_script_setup_true_lang-6ba0c049.js";import{d as r,u as c,t as i,c as m,m as e,e as n,g as o,i as u}from"./index-8d1e5d37.js";const _=e("p",{class:"mb-4 text-2xl font-bold"},"用户设置",-1),p={class:"flex items-center p-1"},f=e("span",null,"使用旧版编辑器",-1),x={class:"flex items-center p-1"},V=e("span",null,"固定输入框高度(旧版编辑器)",-1),B=r({__name:"user-setting",setup(g){const d=c(),{setting:s}=i(d);return(k,t)=>(u(),m("div",null,[_,e("div",p,[f,n(a,{class:"ml-2",modelValue:o(s).legacyEditor,"onUpdate:modelValue":t[0]||(t[0]=l=>o(s).legacyEditor=l)},null,8,["modelValue"])]),e("div",x,[V,n(a,{class:"ml-2",modelValue:o(s).stickyTextarea,"onUpdate:modelValue":t[1]||(t[1]=l=>o(s).stickyTextarea=l)},null,8,["modelValue"])])]))}});export{B as default};
