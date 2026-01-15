<template>
  <div class="not-found-container wh100">
    <ExpandIcon name="AirplaneOutline" size="100" />
    <p class="tips">NOT FOUND</p>
    <p>
      <n-countdown :duration="3000" @finish="goHome" />
      秒后回到首页
    </p>
    <p>
      <n-button size="small" @click="goHome"> 回到首页 </n-button>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
.not-found-container {
  @include flexCenter();
  flex-direction: column;
  .tips {
    font-size: 2rem;
  }
}
</style>
