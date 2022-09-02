<template>
  <el-config-provider :locale="theme?.languageElement">
    <Header :langs="elementLanguages" @changeTheme="handleThemeChange" />
    <router-view></router-view>
    <Footer />
  </el-config-provider>
</template>

<script setup lang="ts">
import { getLanguage } from '@/api';
import useMergeLocale from './lang/useMergeLocale';
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue';

const { elementLanguages, theme, handleThemeChange, initTheme } =
  useMergeLocale();

const initLanguage = async () => {
  getLanguage()
    .then((res) => {
      handleThemeChange(res.data);
    })
    .catch((e) => {
      console.error(e);
      setTimeout(initTheme, 150);
    });
};

initLanguage();
</script>

<style scoped lang="scss">
a {
  color: $danger;
}
</style>
