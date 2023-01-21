
import NormalButton from './common/button/NormalButton.vue';

<template>
  <div class="h-[60px] w-full">
    <div class="flxed h-[60px] w-full top-0 left-0 bg-white shadow-md z-[99] flex justify-between items-center px-4 text-lg font-bold">
      Ori博客 - 管理后台
      <div>
        <NormalButton icon @click="$router.push('/profile')">
          <IconExit class="w-4 h-4" />
        </NormalButton>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import NormalButton from './common/button/NormalButton.vue';
import IconExit from './icon/IconExit.vue';


</script>