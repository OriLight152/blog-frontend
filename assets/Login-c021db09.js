import{d as N,g as T,h as L,r as x,m as f,c as _,j as e,F as g,v as o,x as u,b as m,w as c,E as w,y as i,G as P,C as S,H as A,e as h}from"./index-29f1d840.js";import{N as v}from"./NormalButton-86da3877.js";const B={class:"w-full"},I={class:"w-[400px] bg-white mt-4 mx-auto px-8 pt-2 pb-6 rounded-[10px] overflow-hidden shadow-sm"},R=e("h1",{class:"text-center"},"用户登录",-1),$={class:"border rounded-md mt-10"},j={class:"flex items-center pl-3 border-b"},F=e("span",{class:"w-[50px]"},"用户名",-1),z={class:"flex items-center pl-3"},O=e("span",{class:"w-[50px]"},"密码",-1),D={class:"flex justify-center mt-10"},G=e("h1",{class:"text-center"},"用户注册",-1),H={class:"border rounded-md mt-10"},Z={class:"flex items-center pl-3 border-b"},q=e("span",{class:"w-[50px]"},"用户名",-1),J={class:"flex items-center pl-3 border-b"},K=e("span",{class:"w-[50px]"},"昵称",-1),Q={class:"flex items-center pl-3 border-b"},W=e("span",{class:"w-[50px]"},"邮箱",-1),X={class:"flex items-center pl-3"},Y=e("span",{class:"w-[50px]"},"密码",-1),ee={class:"pl-3 mt-2"},se=e("span",null,"性别",-1),te={for:"sex_male",class:"ml-2"},ae={for:"sex_female",class:"ml-2"},le={for:"sex_secret",class:"ml-2"},ne={class:"flex justify-center mt-10"},ue=N({__name:"Login",setup(oe){const d=T(),l=L(),k=/^[a-z0-9-_]{5,15}$/,b=/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/,y=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,p=x(!1),r=x({username:"",password:""}),s=x({username:"",nickname:"",password:"",email:"",sex:"MALE"}),U=f(()=>k.test(s.value.username)||s.value.username==""),V=f(()=>b.test(s.value.password)||s.value.password==""),E=f(()=>y.test(s.value.email));async function C(){if(r.value.username.trim()===""){l.warning("用户名不可为空");return}if(r.value.password.trim()===""){l.warning("密码不可为空");return}P(r.value.username.trim(),r.value.password.trim()).then(n=>{l.success("登录成功"),d.login=!0,d.uid=n.id,d.token=n.token,d.likeCache={POST:[],COMMENT:[]},localStorage.setItem("uid",n.id),localStorage.setItem("token",n.token),S.push("/profile")}).catch(n=>{l.error("登录失败："+n)})}async function M(){if(s.value.username.trim()===""){l.warning("用户名不可为空");return}if(s.value.nickname.trim()===""){l.warning("昵称不可为空");return}if(s.value.email.trim()===""){l.warning("邮箱不可为空");return}if(s.value.password.trim()===""){l.warning("密码不可为空");return}if(!U.value){l.warning("用户名格式错误");return}if(!E.value){l.warning("邮箱格式错误");return}if(!V.value){l.warning("密码格式错误");return}A(s.value.username.trim(),s.value.nickname.trim(),s.value.password.trim(),s.value.email.trim(),s.value.sex).then(n=>{l.success("注册成功"),p.value=!1}).catch(n=>{l.error("注册失败："+n)})}return(n,t)=>(h(),_("div",B,[e("div",I,[p.value?(h(),_(g,{key:1},[G,e("div",H,[e("div",Z,[q,o(e("input",{class:"flex-1 h-[40px] px-3 outline-none",type:"text",placeholder:"请输入用户名","onUpdate:modelValue":t[3]||(t[3]=a=>s.value.username=a)},null,512),[[u,s.value.username]])]),e("div",J,[K,o(e("input",{class:"flex-1 h-[40px] px-3 outline-none",type:"text",placeholder:"请输入昵称","onUpdate:modelValue":t[4]||(t[4]=a=>s.value.nickname=a)},null,512),[[u,s.value.nickname]])]),e("div",Q,[W,o(e("input",{class:"flex-1 h-[40px] px-3 outline-none",type:"email",placeholder:"请输入邮箱","onUpdate:modelValue":t[5]||(t[5]=a=>s.value.email=a)},null,512),[[u,s.value.email]])]),e("div",X,[Y,o(e("input",{class:"flex-1 h-[40px] px-3 outline-none",type:"password",placeholder:"请输入密码","onUpdate:modelValue":t[6]||(t[6]=a=>s.value.password=a)},null,512),[[u,s.value.password]])])]),e("div",ee,[se,e("label",te,[o(e("input",{type:"radio",name:"sex",id:"sex_male",value:"MALE","onUpdate:modelValue":t[7]||(t[7]=a=>s.value.sex=a)},null,512),[[w,s.value.sex]]),i(" 男")]),e("label",ae,[o(e("input",{type:"radio",name:"sex",id:"sex_female",value:"FEMALE","onUpdate:modelValue":t[8]||(t[8]=a=>s.value.sex=a)},null,512),[[w,s.value.sex]]),i(" 女")]),e("label",le,[o(e("input",{type:"radio",name:"sex",id:"sex_secret",value:"SECRET","onUpdate:modelValue":t[9]||(t[9]=a=>s.value.sex=a)},null,512),[[w,s.value.sex]]),i(" 保密")])]),e("div",ne,[m(v,{class:"mr-2",onClick:t[10]||(t[10]=a=>p.value=!1)},{default:c(()=>[i("返回登录")]),_:1}),m(v,{onClick:M},{default:c(()=>[i("注册")]),_:1})])],64)):(h(),_(g,{key:0},[R,e("div",$,[e("div",j,[F,o(e("input",{class:"flex-1 h-[40px] px-3 outline-none",type:"text",placeholder:"请输入用户名","onUpdate:modelValue":t[0]||(t[0]=a=>r.value.username=a)},null,512),[[u,r.value.username]])]),e("div",z,[O,o(e("input",{class:"flex-1 h-[40px] px-3 outline-none",type:"password",placeholder:"请输入密码","onUpdate:modelValue":t[1]||(t[1]=a=>r.value.password=a)},null,512),[[u,r.value.password]])])]),e("div",D,[m(v,{class:"mr-2",onClick:t[2]||(t[2]=a=>p.value=!0)},{default:c(()=>[i("前往注册")]),_:1}),m(v,{onClick:C},{default:c(()=>[i("登录")]),_:1})])],64))])]))}});export{ue as default};