<template>
  <el-config-provider :locale="theme?.languageElement">
    <Header :langs="elementLanguages" @changeTheme="handleThemeChange" />
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import useMergeLocale from './lang/useMergeLocale';
import Header from '@/components/Header/index.vue';

const { elementLanguages, theme, handleThemeChange } = useMergeLocale();

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
