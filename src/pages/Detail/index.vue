<template>
  <div>detail</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  asyncData({ store, route }: any) {
    console.log(route.params);
    return Promise.resolve();
  },
});
</script>
