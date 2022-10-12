<template>
  <div>
    <Banner />
    <div class="list">
      <div class="item" v-for="i in 6" :key="i">
        <img
          class="image"
          src="https://z1.muscache.cn/im/pictures/348571bd-1eb6-4414-b550-671c385588d3.jpg?aki_policy=large"
          alt=""
        />
        <h3 class="title">主标题</h3>
        <h4 class="title">副标题</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from './Banner.vue';
</script>

<style lang="scss" scoped>
.list {
  margin-top: 36px;
  margin-right: -24px;
  padding: 0 120px;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-right: 24px;
    flex: 1 1 auto;
    max-width: 400px;
    .image {
      width: 100%;
      height: auto;
    }
  }
}
</style>
