<template>
  <div class="projects-container wh100">
    <!-- 骨架屏 -->
    <template v-if="loading">
      <n-card v-for="i in pagination.size" :key="i" class="projects-item" hoverable>
        <div class="skeleton">
          <n-skeleton width="200px" height="140px" />
          <div class="skeleton-right">
            <n-skeleton text width="60%" />
            <n-skeleton text :repeat="2" />
          </div>
        </div>
      </n-card>
    </template>
    <!-- 内容 -->
    <ListHeader>
      <RouterLink :to="{ name: 'createProject' }">
        <n-button size="small" type="primary">
          <template #icon>
            <ExpandIcon name="AddCircleOutline" />
          </template>
          创建
        </n-button>
      </RouterLink>
    </ListHeader>
    <div class="list-content" v-infiniteScroll="{ onScroll: nextPage }">
      <n-card v-for="p in dataList" bordered :key="p.id" class="projects-item" hoverable>
        <div class="actions">
          <router-link
            :to="{
              name: 'updateProject',
              params: {
                id: p.id,
              },
            }"
          >
            <ExpandIcon name="Edit" class="edit-icon link" />
          </router-link>
          <n-popconfirm
            @positive-click="handleRemove(p.id)"
            :positive-button-props="{ size: 'tiny', loading: itemLoading[p.id] }"
            :negative-button-props="{ size: 'tiny' }"
          >
            <template #trigger>
              <ExpandIcon name="TrashOutline" class="link" />
            </template>
            确认删除吗？
          </n-popconfirm>
        </div>
        <div class="content">
          <div class="cover-image">
            <n-image :src="p.coverImage" alt="" width="100%" object-fit="cover" class="wh100" />
          </div>
          <div class="content-right">
            <h3 class="title link" @click="handleDetail(p.id)">{{ p.title }}</h3>
            <div class="information flexCSB">
              <div>
                <label for="publishTime"> 发布时间：</label>
                <span name="publishTime">{{ p.createdAt }}</span>
              </div>
              <div>
                <label for="comment"> 评论：</label>
                <span name="comment">{{ p.commentNo || 0 }}</span>
              </div>
              <div>
                <label for="readNo"> 阅读：</label>
                <span name="readNo">{{ p.readNo || 0 }}</span>
              </div>
            </div>
            <n-ellipsis
              v-if="p.content"
              class="content"
              line-clamp="5"
              :tooltip="{
                width: 'trigger',
                scrollable: true,
                style: {
                  maxHeight: '300px',
                },
              }"
            >
              {{ p.content }}
            </n-ellipsis>
            <n-empty v-else style="margin-top: 22px" />
          </div>
        </div>
      </n-card>
      <n-spin :show="loading" class="page-spin">
        <p>{{ isLoaded ? '--end--' : `第 ${pagination.page} 页` }}</p>
        <template #description>
          <div class="page-spin-content">加载中...</div>
        </template>
      </n-spin>
    </div>

    <ProjectDetail ref="projectDetailRef" />
  </div>
</template>

<script setup>
import { useTemplateRef } from 'vue'

import ListHeader from '@/components/ListHeader/ListHeader.vue'
import ProjectDetail from './ProjectDetail.vue'

import useListManager from '@/hooks/useListManager'
import { useDeleteEffect } from '@/hooks/useCRUD'
import { listApi, deleteApi } from '@/api/projects'
import ExpandIcon from '@/components/ExpandIcon/ExpandIcon.vue'

/**
 * 获取列表
 */
const { dataList, loading, pagination, refresh, isLoaded, nextPage } = useListManager(listApi, {
  scrollLoad: true,
})

// 详情
const projectDetailRef = useTemplateRef('projectDetailRef')
const handleDetail = (id) => {
  projectDetailRef.value.open(id)
}

/**
 * 删除
 */
const { itemLoading, execute } = useDeleteEffect(deleteApi, (id) => id)
const handleRemove = async (id) => {
  const res = await execute(id)
  if (res.code === 200) {
    refresh()
  }
}
</script>

<style lang="scss" scoped>
.projects-container {
  --margin-px: 8px;
  display: flex;
  flex-direction: column;
  .skeleton {
    display: flex;
    .skeleton-right {
      flex: 1;
      margin-left: 8px;
      div {
        &:first-child {
          margin-left: 20%;
        }
      }
    }
  }
  .list-content {
    flex: 1;
    .page-spin {
      width: 100%;
      height: 150px;
      text-align: center;
    }
  }
  .projects-item {
    width: calc(100% - 2 * var(--margin-px));
    margin: var(--margin-px);
    transition: var(--lds-transition-duration-fast);
    position: relative;

    .actions {
      position: absolute;
      right: 10px;
      top: 10px;
      display: flex;
      align-items: baseline;
      gap: var(--lds-block-interval);
    }

    .content {
      display: flex;
      .cover-image {
        width: 200px;
        height: 140px;
        flex-shrink: 0;
        margin-right: 8px;
        user-select: none;
      }
      .content-right {
        flex: 1;
        .title {
          font-weight: var(--lds-font-weight-strong);
          text-align: center;
          margin-bottom: 0;
          color: var(--lds-color-active);
        }
        .information {
          text-align: center;
          justify-content: center;
          gap: 0 20px;
        }
        .content {
          color: var(--lds-color-text3);
        }
      }
    }
  }
}
</style>
