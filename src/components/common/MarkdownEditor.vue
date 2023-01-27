<template>
  <div class="flex min-h-[400px] h-full shadow-[0_2px_12px_0_rgb(0_0_0/10%)]">
    <Transition>
      <div class="flex-1 flex-shrink-0 flex flex-col pl-4 pb-4 w-1/2 h-full overflow-hidden" v-show="showMode !== 2">
        <h2>Markdown <NormalButton icon class="font-normal text-base" @click="showMode = showMode ? 0 : 1">
            <IconReturn class="w-4 h-4" v-if="showMode" />
            <IconView class="w-4 h-4" v-else />
          </NormalButton>
        </h2>
        <textarea class="w-full h-full pr-4 overflow-y-auto resize-none border-none outline-none" :value="modelValue"
          @input="handleInput($event.target as HTMLTextAreaElement)" @scroll="alignPreview"></textarea>
      </div>
    </Transition>
    <Transition>
      <div class="flex-1 flex-shrink-0 flex flex-col pl-4 pb-4 w-1/2 h-full overflow-hidden border-l"
        v-show="showMode !== 1">
        <h2>预览 <NormalButton icon class="font-normal text-base" @click="showMode = showMode ? 0 : 2">
            <IconReturn class="w-4 h-4" v-if="showMode" />
            <IconView class="w-4 h-4" v-else />
          </NormalButton>
        </h2>
        <div class="w-full h-full pr-4 overflow-y-auto" v-html="preview" ref="elePreview">
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { renderMarkdown } from '@/utils';
import { debounce } from 'lodash';
import { ref, toRefs } from 'vue';
import IconView from '@cp/icon/IconView.vue';
import IconReturn from '@cp/icon/IconReturn.vue'
import NormalButton from '@cp/common/NormalButton.vue';

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits(['update:modelValue'])

const store = useStore()

const { setting } = toRefs(store)
const elePreview = ref<HTMLDivElement>()
const preview = ref(renderMarkdown(props.modelValue))
const showMode = ref(0) // 0->普通模式 1->只显示编辑框 2->只显示预览框

// 使用 debounce 防抖函数减少更新，优化性能
const updateValue = debounce((value) => {
  preview.value = renderMarkdown(value)
  emits('update:modelValue', value)
}, 100)

const updatePreviewTop = debounce((eleTextarea) => {
  if (elePreview.value) {
    elePreview.value.scrollTo({
      top: eleTextarea.scrollTop / (eleTextarea.scrollHeight - eleTextarea.clientHeight) * (elePreview.value.scrollHeight - elePreview.value.clientHeight),
      behavior: 'smooth'
    })
    // elePreview.value.scrollTop = eleTextarea.scrollTop / (eleTextarea.scrollHeight - eleTextarea.clientHeight) / (elePreview.value?.scrollHeight - elePreview.value.clientHeight)
  }
}, 100)

function alignPreview(e: Event) {
  if (setting.value.autoAlign)
    updatePreviewTop(e.target)
}

function handleInput(ele: HTMLTextAreaElement) {
  updateValue(ele.value)
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>