<template>
  <div class="footer">
    <ul class="footer-content">
      <li
        class="footer-item"
        v-for="(item, index1) of footerConfig"
        :key="index1"
      >
        <h3 class="menu-title">{{ t(item.title) }}</h3>
        <a
          class="menu-item"
          href=""
          target="_blank"
          v-for="(menu, index2) of item.menus"
          :key="index2"
          >{{ t(menu) }}</a
        >
      </li>
    </ul>
    <div class="copyright">2022@copyright.inc all right resvered!</div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { footerConfig } from './const';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 120px;
  border-top: 1px solid #f1f1f1;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  padding: 0;
  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .menu-title {
    font-size: 16px;
    font-weight: normal;
  }
  .menu-item {
    margin-bottom: 12px;
    font-size: 14px;
    color: #999;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.copyright {
  padding: 30px 0;
  border-top: 1px solid #f1f1f1;
  color: #ccc;
  text-align: center;
}
</style>
