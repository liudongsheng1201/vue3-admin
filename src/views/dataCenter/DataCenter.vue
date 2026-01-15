<template>
  <div class="data-center-container wh100">
    <div class="card-list">
      <n-card title="系统信息">
        <n-highlight
          class="sys-info"
          :text="sysInfo.text"
          :patterns="sysInfo.patterns"
          :highlight-style="{
            padding: '0 6px',
            borderRadius: themeVars.borderRadius,
            display: 'inline-block',
            color: themeVars.baseColor,
            background: themeVars.primaryColor,
            transition: `all .3s ${themeVars.cubicBezierEaseInOut}`,
          }"
        />
      </n-card>
      <n-card title="群消息">
        <n-statistic label="你一共处理了" tabular-nums>
          <n-number-animation :from="0" :to="12039" />
          <template #suffix> 条群消息 </template>
        </n-statistic>
      </n-card>

      <n-card title="活跃用户">
        <n-statistic>
          <n-number-animation :from="0.0" show-separator :to="9999" />
        </n-statistic>
        <n-space vertical> 花时间、花精力、花心思，愿你每一份努力都不负所望 </n-space>
      </n-card>
    </div>
    <div class="echarts-list">
      <Echarts :option="lineOpt" @inited="getData" class="echart-item line" />
      <Echarts :option="barOpt" @inited="getBarData" class="echart-item bar" />
      <Echarts :option="pieOpt" @inited="getPieData" class="echart-item pie" />
    </div>
  </div>
</template>

<script setup>
import { useThemeVars } from 'naive-ui'
import Echarts from '@/components/Echarts/Echarts.vue'
import * as apis from '@/api/dataCenter'

const themeVars = useThemeVars()
const sysInfo = {
  text: `本系统采用 Vue3 框架开发，结合 Composition API ；使用 Pinia 作为状态管理方案，提供清晰的数据流管理；基于 Naive UI 组件库构建用户界面，保证设计统一性和交互体验；使用 Vite7 作为构建工具，支持快速的开发热更新和生产环境优化构建，实现了现代化的前端开发流程和高效的项目架构。`,
  patterns: ['Vue3', 'Pinia', 'Naive UI', 'Vite7'],
}

const lineOpt = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
}

const getData = async ({ setOption, setLoading }) => {
  setLoading(true)
  try {
    const res = await apis.getLineApi()
    if (res.code === 200) {
      lineOpt.series = res.data.map((data) => {
        return {
          data,
          type: 'line',
        }
      })
      setOption(lineOpt)
    }
  } finally {
    setLoading(false)
  }
}

const barOpt = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
}

const getBarData = async ({ setOption, setLoading }) => {
  setLoading(true)
  try {
    const res = await apis.getBarApi()
    if (res.code === 200) {
      lineOpt.series = res.data.map((data) => {
        return {
          data,
          type: 'bar',
        }
      })
      setOption(lineOpt)
    }
  } finally {
    setLoading(false)
  }
}

const pieOpt = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}
const getPieData = async ({ setOption, setLoading }) => {
  setLoading(true)
  try {
    const res = await apis.getPieApi()
    if (res.code === 200) {
      pieOpt.series.at(0).data = res.data
    }
    setOption(pieOpt)
  } finally {
    setLoading(false)
  }
}
</script>

<style lang="scss" scoped>
.data-center-container {
  .card-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 8px;
    :deep(.n-card-header) {
      padding: 12px 16px;
      border-bottom: 1px solid var(--theme-border-color);
    }
    :deep(.n-card__content) {
      padding: 14px 20px;
    }
    .sys-info {
      line-height: 1.5;
    }
  }
  .echarts-list {
    height: 500px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    margin-top: 8px;

    .echart-item {
      border: 1px solid var(--theme-border-color);
      &.line {
        grid-area: 1 / 1 / 2 / 3;
        height: 300px;
      }
      &.bar {
        grid-area: 2 / 1 / 3 / 2;
        height: 300px;
      }
      &.pie {
        grid-area: 2 / 2 / 3 / 3;
        height: 300px;
      }
    }
  }
}
</style>
