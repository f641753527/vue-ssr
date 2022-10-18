<template>
  <div>
    <Banner />
    <div class="list">
      <div
        class="item"
        v-for="room in roomList"
        :key="room.desc"
        @click="router.push(`/detail/${room.id}`)"
      >
        <img
          class="image"
          :src="room.image"
          :alt="room.image"
          :title="room.image"
        />
        <h3 class="title">{{ room.title }}</h3>
        <h4 class="title">{{ room.desc }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Banner from './Banner.vue';
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { Banner },
  asyncData({ store, route }: any) {
    return store.dispatch('GET_ROOM_LIST');
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const roomList = computed(() => store.state.roomList);

    return {
      router,
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
