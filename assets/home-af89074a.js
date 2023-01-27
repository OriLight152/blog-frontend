import{d as V,u as D,n as E,r as d,x as f,o as I,C as T,c as A,k as a,j as p,D as m,e as h,w as g,E as B,G as j,H as z,h as M,i as _}from"./index-f13a1ebc.js";import{N as w}from"./nprogress-a817ebd9.js";import{_ as y}from"./NormalButton.vue_vue_type_script_setup_true_lang-3abfc611.js";import"./_commonjsHelpers-28e086c5.js";const L=a("p",{class:"mb-4 text-2xl font-bold"},"个人资料",-1),S={class:"my-2"},$=a("h3",null,"修改昵称",-1),F={class:"my-2"},G=a("h3",null,"修改密码",-1),H={class:"my-2"},O=a("h3",null,"修改头像",-1),R=a("p",null,"修改图片地址或选择图片上传，图片最大为 5M",-1),Z=a("p",null,"建议上传方向图片，防止图片被拉伸影响显示效果",-1),q=["src"],Y=V({__name:"home",setup(J){const c=D(),t=E(),k=/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,30}$/,u=d(),x=f(()=>n.value.length>=2&&n.value.length<=20||n.value==""),b=f(()=>k.test(r.value)||r.value==""),n=d("加载中"),r=d(""),l=d("加载中");I(()=>{N()});function N(){w.start(),T(c.uid).then(e=>{u.value=e.userInfo,n.value=u.value.nickname,l.value=u.value.avatar}).catch(e=>{t.error(e.message)}).finally(()=>{w.done()})}function P(){const e=document.createElement("input");e.type="file",e.accept="image/gif, image/jpeg, image/png, image/jpg",e.style.display="none",document.body.appendChild(e),e.addEventListener("change",()=>{if(!e.files||e.files.length===0){t.warning("上传取消，未选择图片"),e.remove();return}const o=e.files[0];if(!["image/jpeg","image/png","image/gif"].includes(o.type)){t.warning("上传取消，图片不是允许的格式");return}if(o.size>=5*1024*1024){t.warning("上传取消，文件大小超出限制"),e.remove();return}B(c.token).then(s=>{const C=s.token,v=new FormData;v.append("file",o),fetch(j,{method:"POST",headers:{Authorization:"Bearer "+C},body:v}).then(i=>i.json()).then(i=>{i.status?(t.success("上传成功，点击保存即可替换头像"),console.debug("[image-uploader] image upload success, url:"+i.data.links.url),l.value=i.data.links.url):t.error("上传失败，图片服务器错误")}).catch(i=>{t.error("上传失败，图片服务器错误")}).finally(()=>{e.remove()})}).catch(s=>{t.error("上传失败，服务器错误")})}),e.click()}function U(){if(n.value.trim()==""){t.warning("新昵称不可为空");return}if(!x.value){t.warning("昵称格式错误");return}if(!b.value){t.warning("密码格式错误");return}z(c.token,n.value.trim(),r.value.trim(),l.value.trim()).then(e=>{u.value=e.userInfo,r.value="",t.success("保存成功")}).catch(e=>{t.error("保存失败"+e)})}return(e,o)=>(M(),A("div",null,[L,a("div",S,[$,p(a("input",{class:"px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors",type:"text","onUpdate:modelValue":o[0]||(o[0]=s=>n.value=s)},null,512),[[m,n.value]])]),a("div",F,[G,p(a("input",{class:"px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors",type:"password","onUpdate:modelValue":o[1]||(o[1]=s=>r.value=s),placeholder:"留空则不修改"},null,512),[[m,r.value]])]),a("div",H,[O,R,Z,a("img",{class:"w-16 h-16 my-2",src:l.value,alt:"user-avatar"},null,8,q),p(a("input",{class:"px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors",type:"text","onUpdate:modelValue":o[2]||(o[2]=s=>l.value=s),placeholder:"留空则不修改"},null,512),[[m,l.value]]),h(y,{onClick:P},{default:g(()=>[_("选择图片上传")]),_:1})]),h(y,{primary:"",onClick:U},{default:g(()=>[_("保存修改")]),_:1})]))}});export{Y as default};