import{l as f}from"./index-29f1d840.js";var N=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function E(o=1,u=null){return f({url:"/post/getList",method:"get",params:{page:o,uid:u}})}function M(){return f({url:"/post/getHotList",method:"get"})}function U(o){return f({url:"/post/getPost",method:"get",params:{pid:o}})}function q(o,u,e){return f({url:"/post/newPost",method:"post",data:{token:o,title:u,text:e}})}function O(o,u,e,s){return f({url:"/post/editPost",method:"post",data:{token:o,pid:u,title:e,text:s}})}function W(o,u){return f({url:"/post/deletePost",method:"post",data:{token:o,pid:u}})}function z(o){return f({url:"/post/countPostView",method:"get",params:{pid:o}})}function B(o){return f({url:"/post/getComment",method:"get",params:{pid:o}})}function R(o,u,e,s,v=null){return f({url:"/post/newComment",method:"post",data:{token:o,pid:u,text:e,agent:s,replyTo:v}})}function H(o,u,e){return f({url:"/post/submitLike",method:"post",data:{token:o,type:u,sid:e}})}function I(o,u,e){return f({url:"/post/cancelLike",method:"post",data:{token:o,type:u,sid:e}})}var C={exports:{}};(function(o,u){(function(e,s){o.exports=s()})(N,function(){var e={};e.version="0.2.0";var s=e.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};e.configure=function(t){var r,n;for(r in t)n=t[r],n!==void 0&&t.hasOwnProperty(r)&&(s[r]=n);return this},e.status=null,e.set=function(t){var r=e.isStarted();t=v(t,s.minimum,1),e.status=t===1?null:t;var n=e.render(!r),a=n.querySelector(s.barSelector),c=s.speed,p=s.easing;return n.offsetWidth,T(function(i){s.positionUsing===""&&(s.positionUsing=e.getPositioningCSS()),y(a,L(t,c,p)),t===1?(y(n,{transition:"none",opacity:1}),n.offsetWidth,setTimeout(function(){y(n,{transition:"all "+c+"ms linear",opacity:0}),setTimeout(function(){e.remove(),i()},c)},c)):setTimeout(i,c)}),this},e.isStarted=function(){return typeof e.status=="number"},e.start=function(){e.status||e.set(0);var t=function(){setTimeout(function(){!e.status||(e.trickle(),t())},s.trickleSpeed)};return s.trickle&&t(),this},e.done=function(t){return!t&&!e.status?this:e.inc(.3+.5*Math.random()).set(1)},e.inc=function(t){var r=e.status;return r?(typeof t!="number"&&(t=(1-r)*v(Math.random()*r,.1,.95)),r=v(r+t,0,.994),e.set(r)):e.start()},e.trickle=function(){return e.inc(Math.random()*s.trickleRate)},function(){var t=0,r=0;e.promise=function(n){return!n||n.state()==="resolved"?this:(r===0&&e.start(),t++,r++,n.always(function(){r--,r===0?(t=0,e.done()):e.set((t-r)/t)}),this)}}(),e.render=function(t){if(e.isRendered())return document.getElementById("nprogress");P(document.documentElement,"nprogress-busy");var r=document.createElement("div");r.id="nprogress",r.innerHTML=s.template;var n=r.querySelector(s.barSelector),a=t?"-100":h(e.status||0),c=document.querySelector(s.parent),p;return y(n,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),s.showSpinner||(p=r.querySelector(s.spinnerSelector),p&&k(p)),c!=document.body&&P(c,"nprogress-custom-parent"),c.appendChild(r),r},e.remove=function(){w(document.documentElement,"nprogress-busy"),w(document.querySelector(s.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&k(t)},e.isRendered=function(){return!!document.getElementById("nprogress")},e.getPositioningCSS=function(){var t=document.body.style,r="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return r+"Perspective"in t?"translate3d":r+"Transform"in t?"translate":"margin"};function v(t,r,n){return t<r?r:t>n?n:t}function h(t){return(-1+t)*100}function L(t,r,n){var a;return s.positionUsing==="translate3d"?a={transform:"translate3d("+h(t)+"%,0,0)"}:s.positionUsing==="translate"?a={transform:"translate("+h(t)+"%,0)"}:a={"margin-left":h(t)+"%"},a.transition="all "+r+"ms "+n,a}var T=function(){var t=[];function r(){var n=t.shift();n&&n(r)}return function(n){t.push(n),t.length==1&&r()}}(),y=function(){var t=["Webkit","O","Moz","ms"],r={};function n(i){return i.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(l,d){return d.toUpperCase()})}function a(i){var l=document.body.style;if(i in l)return i;for(var d=t.length,g=i.charAt(0).toUpperCase()+i.slice(1),m;d--;)if(m=t[d]+g,m in l)return m;return i}function c(i){return i=n(i),r[i]||(r[i]=a(i))}function p(i,l,d){l=c(l),i.style[l]=d}return function(i,l){var d=arguments,g,m;if(d.length==2)for(g in l)m=l[g],m!==void 0&&l.hasOwnProperty(g)&&p(i,g,m);else p(i,d[1],d[2])}}();function S(t,r){var n=typeof t=="string"?t:b(t);return n.indexOf(" "+r+" ")>=0}function P(t,r){var n=b(t),a=n+r;S(n,r)||(t.className=a.substring(1))}function w(t,r){var n=b(t),a;!S(t,r)||(a=n.replace(" "+r+" "," "),t.className=a.substring(1,a.length-1))}function b(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function k(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return e})})(C);const V=C.exports;export{V as N,M as a,z as b,I as c,U as d,B as e,O as f,E as g,q as h,W as i,R as n,H as s};