<script lang="ts">
import { useGlobalStore } from 'store';
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import {
  WarningFilled,
  InfoFilled,
  SuccessFilled,
  WarnTriangleFilled
} from '@element-plus/icons-vue';
import { AlertType } from '../../types/alert';
export default defineComponent({
  name: 'Alert',
  components: { WarningFilled, InfoFilled, SuccessFilled, WarnTriangleFilled },
  setup() {
    const store = useGlobalStore();
    const { alert } = storeToRefs(store);
    return {
      alert,
      store,
      WarningFilled,
      InfoFilled,
      SuccessFilled,
      WarnTriangleFilled,
      AlertType
    };
  }
});
</script>

<template>
  <div v-if="!!alert" class="el-notification right" role="alert" style="top: 16px; z-index: 2068">
    <el-icon
      v-if="alert.type === AlertType.error"
      class="el-notification__icon el-notification--error"
      ><WarningFilled
    /></el-icon>
    <el-icon
      v-if="alert.type === AlertType.info"
      class="el-notification__icon el-notification--info"
      ><InfoFilled
    /></el-icon>
    <el-icon
      v-if="alert.type === AlertType.success"
      class="el-notification__icon el-notification--success"
      ><SuccessFilled
    /></el-icon>
    <el-icon
      v-if="alert.type === AlertType.warning"
      class="el-notification__icon el-notification--warning"
      ><WarnTriangleFilled
    /></el-icon>
    <div class="el-notification__group">
      <h2 class="el-notification__title capitalize">{{ alert.type }}</h2>
      <div class="el-notification__content">
        <p class="text-muted">{{ alert.message }}</p>
      </div>
      <i class="el-icon el-notification__closeBtn" @click="store.clearAlert()">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          ></path>
        </svg>
      </i>
    </div>
  </div>
</template>
