<template>
  <n-drawer class="project-detail-container" v-model:show="state" resizable :default-width="800">
    <!-- 骨架屏 -->
    <n-drawer-content v-if="loading" title="详情" closable>
      <n-spin :show="true">
        <n-skeleton text style="width: 60%" />
        <n-skeleton text :repeat="3" />
        <n-skeleton height="100px" />
        <n-skeleton text :repeat="15" />
      </n-spin>
    </n-drawer-content>
    <!-- 正文 -->
    <n-drawer-content v-else :title="detail.title" closable>
      <div class="content" v-if="detail">
        <img :src="detail.coverImage" alt="封面图" class="cover-image" />
        <p>
          <n-tag
            v-for="tag in detail.tags"
            :key="tag.id"
            :color="{
              textColor: tag.fontColor,
              color: tag.bkColor,
            }"
          >
            {{ tag.text }}
          </n-tag>
        </p>
        <div v-html="marked(detail.content)"></div>
      </div>
      <n-empty v-else />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { marked } from 'marked'

import useState from '@/hooks/useState'
import { useReadEffect } from '@/hooks/useCRUD'
import { readApi } from '@/api/projects'

const { state, open, close } = useState()

const detail = ref({})
const { loading, execute } = useReadEffect(readApi)

defineExpose({
  open: (id) => {
    open()
    execute(id, (res) => {
      detail.value = res.data
    })
  },
  close,
})
</script>

<style lang="scss" scoped>
.project-detail-container {
  .cover-image {
    width: 100%;
  }
}
</style>
