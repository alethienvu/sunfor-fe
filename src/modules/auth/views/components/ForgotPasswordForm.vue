<template>
  <div class="w-full">
    <el-card class="bg-secondary text-center">
      <div class="content-center items-center w-full md:p-6 mb-6">
        <div class="text-muted text-center -mt-0.5 mb-6">
          <small> Reset password </small>
        </div>
        <el-form
          ref="form"
          :model="formData"
          class="authentication-form pb-6"
          @keyup.enter="forgotPass"
        >
          <el-form-item class="mb-4 rounded-md" prop="email">
            <div
              class="authentication-form-icon z-10 absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
            >
              <div class="w-5 h-5">
                <MailIcon class="w-5 h-5 text-gray-210" />
              </div>
            </div>
            <el-input type="email" placeholder="Email" v-model="formData.email" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="forgotPass"> Send Password Reset Link </el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MailIcon } from '@heroicons/vue/solid';
import AuthService from '../../../../services/auth.service';
import { ElNotification } from 'element-plus';
export default defineComponent({
  name: 'ForgotPasswordForm',
  components: {
    MailIcon
  },
  setup() {
    const form = ref<any>();
    const formData = ref({ email: '' });
    const forgotPass = async () => {
      const newPass = await AuthService.forgotPass(formData.value);
      if (newPass) {
        ElNotification({
          title: 'Success',
          message: `Email has been sent successfully to ${formData.value.email}`,
          type: 'success'
        });
      }
    };
    return {
      form,
      formData,
      forgotPass
    };
  }
});
</script>
