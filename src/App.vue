<template>
  <el-config-provider :locale="theme?.languageElement">
    <el-select
      :model-value="theme && theme.lanuageLabel"
      @change="handleThemeChange"
    >
      <el-option
        v-for="l of elementLanguages"
        :key="l.lanuageKey"
        :value="l.lanuageKey"
        >{{ l.lanuageLabel }}</el-option
      >
    </el-select>
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import useMergeLocale from './lang/useMergeLocale';

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
