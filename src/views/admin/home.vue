<template>
  <div>
    <p class="mb-4 text-2xl font-bold">个人资料</p>
    <div class="my-2">
      <h3>修改昵称</h3>
      <input class="px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors" type="text" v-model="newNickname">
    </div>
    <div class="my-2">
      <h3>修改密码</h3>
      <input class="px-2 py-1 w-[300px] rounded-md border hover:border-blue-500 transition-colors" type="password" v-model="newPassword" placeholder="留空则不修改">
    </div>
    <NormalButton primary @click="handleEditProfile">保存</NormalButton>
  </div>
</template>

<script setup lang="ts">
import NProgress from 'nprogress'
import { useStore } from '@/store';
import NormalButton from '@cp/common/button/NormalButton.vue';
import { computed, onMounted, ref } from 'vue';
import { getInfo, edit } from '@/api/user';
import { useToast } from 'vue-toastification';
import { UserProfile } from '@/core/types';

const store = useStore()
const toast = useToast()

const rePassword = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,30}$/
const userProfile = ref<UserProfile>()
const vaildNickname = computed(() => newNickname.value.length >= 2 && newNickname.value.length <= 20 || newNickname.value == '')
const vaildPassword = computed(() => rePassword.test(newPassword.value) || newPassword.value == '')

const newNickname = ref('加载中')
const newPassword = ref('')

onMounted(() => {
  fetchData()
})

async function fetchData() {
  NProgress.start()
  getInfo(store.uid)
    .then((result: any) => {
      userProfile.value = result['userInfo'] as UserProfile
      newNickname.value = userProfile.value.nickname
    })
    .catch((err: any) => {
      toast.error(err.message)
    })
    .finally(() => {
      NProgress.done()
    })
}

function handleEditProfile() {
  let promise
  if (newNickname.value.trim() == '') {
    toast.warning('新昵称不可为空')
    return
  }
  if (!vaildNickname.value) {
    toast.warning('昵称格式错误')
    return
  }
  if (newPassword.value.trim() == '') {
    promise = edit(store.token, newNickname.value)
  } else {
    if (!vaildPassword.value) {
      toast.warning('密码格式错误')
      return
    } else {
      promise = edit(store.token, newNickname.value.trim(), newPassword.value.trim())
    }
  }
  promise
    .then((result: any) => {
      userProfile.value = result['userInfo']
      newPassword.value = ''
      toast.success('保存成功')
    })
    .catch((err: any) => {
      toast.error('保存失败' + err)
    })

}
</script>