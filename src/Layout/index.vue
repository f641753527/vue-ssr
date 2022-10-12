<template>
  <el-config-provider :locale="elemLocale">
    <div class="layout">
      <MyHeader @changeTheme="changeTheme" />
      <router-view :style="{ flex: 1 }"></router-view>
      <Footer />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import en from 'element-plus/lib/locale/lang/en';
import zh from 'element-plus/lib/locale/lang/zh-cn';

import MyHeader from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue';
import { getLanguage } from '@/api';
const { locale } = useI18n();

const elemLocale = ref(zh);

const changeTheme = (lang: string) => {
  locale.value = lang;
  if (lang === 'zh') {
    elemLocale.value = zh;
  } else {
    elemLocale.value = en;
  }
};

const initLanguage = () => {
  getLanguage().then((res) => {
    changeTheme(res.data);
  });
};
onMounted(initLanguage);
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
