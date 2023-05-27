<template>
  <div class="w-full">
    <div class="flex flex-col gap-4">
      <el-alert class="success" title="success alert" type="success" show-icon />
      <el-alert class="info" title="info alert" type="info" show-icon />
      <el-alert class="warning" title="warning alert" type="warning" show-icon />
      <el-alert class="danger" title="error alert" type="error" show-icon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Alerts'
});
</script>
<style scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>
