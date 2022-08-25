<template>
  <el-config-provider :locale="themeCount % 2 ? zhCn : en">
    <el-button @click="toggle">切换主题</el-button>
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import http from '@/utils/http';

const themeCount = ref(1);
const toggle = () => {
  themeCount.value++;
};

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
