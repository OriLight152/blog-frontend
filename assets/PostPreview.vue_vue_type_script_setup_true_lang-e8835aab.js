import{f as v,I as k,a as x,b as D}from"./IconView-2badf007.js";import{I as g}from"./IconLikeS-7fcdb7db.js";import{d as w,u as b,h as S,t as y,r as _,i as C,f as m,c as O,j as t,b as n,w as r,k as l,e as P,g as p}from"./index-f715197c.js";import{s as T,c as L}from"./nprogress-2de68035.js";const I={class:"w-full bg-white my-2 rounded-md overflow-hidden shadow-sm"},B={class:"flex pt-6 px-4"},j=["src"],R={class:"flex flex-col"},V={class:"mt-2 text-lg font-bold"},N={class:"text-gray-500 flex items-center text-sm"},q={class:"ml-[80px] pl-4 pr-8"},A={class:"text-2xl leading-[60px]"},E={class:""},z={class:"flex h-10 mt-4"},F={class:"h-full flex items-center justify-center hover:bg-gray-500/10 transition-colors"},Q=w({__name:"PostPreview",props:{postData:null},setup(e){const o=e,u=b(),d=S(),{login:f,likeCache:i}=y(u),s=_(!1);f.value&&(s.value=i.value.POST.includes(o.postData.pid.toString()));function h(){if(!f.value){d.warning("请先登录");return}s.value?L(u.token,"POST",o.postData.pid).then(a=>{s.value=!s.value,o.postData.like-=1}).catch(a=>{d("取消点赞失败："+a.message)}).finally(()=>{let a=i.value.POST.indexOf(o.postData.pid.toString());a!==-1&&i.value.POST.splice(a,1)}):T(u.token,"POST",o.postData.pid).then(a=>{s.value=!s.value,o.postData.like+=1}).catch(a=>{s.value=!s.value,d("点赞失败："+a.message)}).finally(()=>{i.value.POST.push(o.postData.pid.toString())})}return(a,G)=>{const c=C("RouterLink");return m(),O("div",I,[t("div",B,[n(c,{to:"/user/"+e.postData.user.uid},{default:r(()=>[t("img",{class:"rounded-full w-16 h-16 mr-4 hover:scale-[1.1] transition-transform",src:e.postData.user.avatar,alt:"avatar"},null,8,j)]),_:1},8,["to"]),t("div",R,[n(c,{to:"/user/"+e.postData.user.uid},{default:r(()=>[t("span",V,l(e.postData.user.nickname),1)]),_:1},8,["to"]),t("div",N,[t("span",null,l(P(v)(e.postData.createdAt)),1),n(k,{class:"w-4 h-4 inline-block ml-2 mr-1"}),t("span",null,l(e.postData.viewCount),1)])])]),n(c,{to:"/post/"+e.postData.pid},{default:r(()=>[t("div",q,[t("p",A,l(e.postData.title),1),t("p",E,l(e.postData.text),1)])]),_:1},8,["to"]),t("div",z,[n(c,{class:"flex-1",to:{path:"/post/"+e.postData.pid,query:{navigate:"comments"}}},{default:r(()=>[t("div",F,[n(x,{class:"w-5 h-5 inline-block mr-1"}),t("span",null,l(e.postData._count.comments),1)])]),_:1},8,["to"]),t("button",{class:"flex-1 flex items-center justify-center hover:bg-gray-500/10 transition-colors",onClick:h},[s.value?(m(),p(g,{key:0,class:"w-5 h-5 inline-block mr-1 text-red-500"})):(m(),p(D,{key:1,class:"w-5 h-5 inline-block mr-1"})),t("span",null,l(e.postData.like),1)])])])}}});export{Q as _};
