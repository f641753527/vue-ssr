<template>
  <div>
    <Banner />
    <div class="list">
      <div class="item" v-for="room in roomList" :key="room.desc">
        <img class="image" :src="room.image" alt="" />
        <h3 class="title">{{ room.title }}</h3>
        <h4 class="title">{{ room.desc }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Banner from './Banner.vue';
import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  components: { Banner },
  asyncData({ store }: any) {
    return store.dispatch('GET_ROOM_LIST');
  },
  setup() {
    const store = useStore();

    const roomList = store.state.roomList;

    return {
      roomList,
    };
  },
});
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
