<template>
  <div>
    <el-calendar v-model="value" />
    <el-button>{{ $t('Home.submit') }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(new Date());
</script>

<style lang="less" scoped></style>
