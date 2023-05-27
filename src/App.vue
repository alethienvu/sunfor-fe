<template>
  <el-config-provider :zIndex="9999">
    <AuthLayout v-if="isAuthLayout" />
    <DefaultLayout v-else />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import DefaultLayout from 'layouts/default-layout.vue';
import AuthLayout from 'layouts/auth-layout.vue';
import { useRoute } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
export default defineComponent({
  components: {
    DefaultLayout,
    AuthLayout,
    ElConfigProvider
  },
  inheritAttrs: false,

  setup() {
    const router = useRoute();
    // if requiresAuth === true => signed in => use default layout
    // else use auth layout
    const isAuthLayout = computed(() => !router.meta?.requiresAuth);
    const initialize = () => {
      return Promise.resolve();
    };
    initialize().catch((error: Error) => {
      console.error(`Couldn't initialize the system with error: ${error.message}`);
    });

    return { zIndex: 3000, size: 'small', isAuthLayout };
  }
});
</script>
<style>
#global-loading {
  z-index: 120000;
}
</style>
