<template>
  <el-button type="danger">危险按钮 </el-button>
  <a>123</a>
</template>

<script setup lang="ts">
import http from '@/utils/http';

const getList = async () => {
  const data = await http.get<number[]>('/api/videos/near');
  console.log(data);
};

getList();
</script>

<style scoped lang="scss">
a {
  color: $danger;
}
</style>
