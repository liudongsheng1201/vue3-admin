<template>
  <div class="user-list-container wh100">
    <ListHeader :has-border="['bottom']" :boxShadow="false">
      <n-button size="small" type="primary" @click="handleCreate">
        <template #icon>
          <ExpandIcon name="AddCircleOutline" />
        </template>
        创建
      </n-button>
    </ListHeader>
    <DataTable :single-line="false" :columns :data :loading :pagination>
      <template #actions="{ row }">
        <div class="actions-container">
          <n-button
            :disabled="!row.status"
            type="info"
            size="tiny"
            quaternary
            @click="handleUpdate(row)"
          >
            修改
          </n-button>
          <n-popconfirm
            @positive-click="resetPassword(row, index)"
            :positive-button-props="{ size: 'tiny', loading: resetLoading[row.id] }"
            :negative-button-props="{ size: 'tiny' }"
          >
            <template #trigger>
              <n-button :disabled="!row.status" quaternary size="tiny" type="error">
                重置密码
              </n-button>
            </template>
            确认重置密码为“123456”吗？
          </n-popconfirm>
        </div>
      </template>
    </DataTable>
    <CreateUser ref="createUserRef" @refresh="refresh" />
    <UpdateUser ref="updateUserRef" @refresh="refresh" />
  </div>
</template>

<script setup>
import { h, useTemplateRef } from 'vue'
import { NSwitch, NImage } from 'naive-ui'

import ListHeader from '@/components/ListHeader/ListHeader.vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import CreateUser from './CreateUser.vue'
import UpdateUser from './UpdateUser.vue'

import { useUpdateEffect } from '@/hooks/useCRUD'
import useListManager from '@/hooks/useListManager'
import { userListApi, setUserStatusApi, updateUserApi } from '@/api/user'
import ExpandIcon from '@/components/ExpandIcon/ExpandIcon.vue'

const { itemLoading, execute } = useUpdateEffect(setUserStatusApi, (id) => id)

const columns = [
  {
    title: '昵称',
    key: 'name',
    width: 180,
  },
  {
    title: '账号',
    key: 'account',
  },
  {
    title: '头像',
    key: 'avatar',
    render(row) {
      return h(NImage, { src: row.avatar, width: 50, height: 50 })
    },
  },
  {
    title: '创建时间',
    key: 'createAt',
    minWidth: 200,
  },
  {
    title: '更新时间',
    key: 'updateAt',
    minWidth: 200,
  },
  {
    title: '状态',
    key: 'status',
    width: 120,
    render(row) {
      return h(NSwitch, {
        value: row.status,
        loading: itemLoading[row.id],
        onUpdateValue: async (value) => {
          const res = await execute(row.id, value)
          if (res.code === 200) {
            row.status = res.data.status
          }
        },
      })
    },
  },
  {
    key: 'actions',
    width: 150,
  },
]

/**
 * 获取列表
 */
const { dataList: data, loading, pagination, refresh } = useListManager(userListApi)

/**
 * 创建
 */
const createUserRef = useTemplateRef('createUserRef')
const handleCreate = () => {
  createUserRef.value.open()
}

/**
 * 修改
 */
const updateUserRef = useTemplateRef('updateUserRef')
const handleUpdate = (row) => {
  updateUserRef.value.open(row)
}

/**
 * 重置密码
 */
const { itemLoading: resetLoading, execute: reset } = useUpdateEffect(
  updateUserApi,
  (row) => row.id,
)
const resetPassword = async (row) => {
  const res = await reset(row.id, { password: '123456' })
  if (res.code === 200) {
    refresh()
  }
}
</script>

<style lang="scss" scoped>
.user-list-container {
  height: calc(100% - 46px);
  .loading-text {
    font-size: 18px;
    color: var(--theme-text-color-base);
  }
  .table-header {
    padding: var(--lds-block-interval);
  }
}
</style>
