import{d as I,u as V,l as D,r as d,s as h,o as E,C as T,c as A,m as t,D as m,E as p,j as v,e as g,w as _,G as B,H as j,I as z,i as M}from"./index-2045cc68.js";import{N as w}from"./nprogress-131c7954.js";import{_ as y}from"./NormalButton.vue_vue_type_script_setup_true_lang-54783e34.js";const L=t("p",{class:"mb-4 text-2xl font-bold"},"个人资料",-1),S={class:"my-2"},$=t("h3",null,"修改昵称",-1),F={class:"my-2"},G=t("h3",null,"修改密码",-1),H={class:"my-2"},O=t("h3",null,"修改头像",-1),R=["src"],Q=I({__name:"home",setup(Z){const c=V(),a=D(),k=/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,30}$/,u=d(),x=h(()=>n.value.length>=2&&n.value.length<=20||n.value==""),b=h(()=>k.test(r.value)||r.value==""),n=d("加载中"),r=d(""),l=d("加载中");E(()=>{N()});function N(){w.start(),T(c.uid).then(e=>{u.value=e.userInfo,n.value=u.value.nickname,l.value=u.value.avatar}).catch(e=>{a.error(e.message)}).finally(()=>{w.done()})}function P(){const e=document.createElement("input");e.type="file",e.accept="image/gif, image/jpeg, image/png, image/jpg",e.style.display="none",document.body.appendChild(e),e.addEventListener("change",()=>{if(!e.files||e.files.length===0){a.warning("上传取消，未选择图片"),e.remove();return}const o=e.files[0];if(!["image/jpeg","image/png","image/gif"].includes(o.type)){a.warning("上传取消，图片不是允许的格式");return}if(o.size>=5*1024*1024){a.warning("上传取消，文件大小超出限制"),e.remove();return}B(c.token).then(s=>{const C=s.token,f=new FormData;f.append("file",o),fetch(j,{method:"POST",headers:{Authorization:"Bearer "+C},body:f}).then(i=>i.json()).then(i=>{i.status?(a.success("上传成功，点击保存即可替换头像"),console.debug("[image-uploader] image upload success, url:"+i.data.links.url),l.value=i.data.links.url):a.error("上传失败，图片服务器错误")}).catch(i=>{a.error("上传失败，图片服务器错误")}).finally(()=>{e.remove()})}).catch(s=>{a.error("上传失败，服务器错误")})}),e.click()}function U(){if(n.value.trim()==""){a.warning("新昵称不可为空");return}if(!x.value){a.warning("昵称格式错误");return}if(!b.value){a.warning("密码格式错误");return}z(c.token,n.value.trim(),r.value.trim(),l.value.trim()).then(e=>{u.value=e.userInfo,r.value="",a.success("保存成功")}).catch(e=>{a.error("保存失败"+e)})}return(e,o)=>(M(),A("div",null,[L,t("div",S,[$,m(t("input",{class:"px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors",type:"text","onUpdate:modelValue":o[0]||(o[0]=s=>n.value=s)},null,512),[[p,n.value]])]),t("div",F,[G,m(t("input",{class:"px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors",type:"password","onUpdate:modelValue":o[1]||(o[1]=s=>r.value=s),placeholder:"留空则不修改"},null,512),[[p,r.value]])]),t("div",H,[O,v(" 修改图片地址或选择图片上传，图片最大为 5M "),t("img",{class:"w-16 h-16 my-2",src:l.value,alt:"user-avatar"},null,8,R),m(t("input",{class:"px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors",type:"text","onUpdate:modelValue":o[2]||(o[2]=s=>l.value=s),placeholder:"留空则不修改"},null,512),[[p,l.value]]),g(y,{onClick:P},{default:_(()=>[v("选择图片上传")]),_:1})]),g(y,{primary:"",onClick:U},{default:_(()=>[v("保存修改")]),_:1})]))}});export{Q as default};
