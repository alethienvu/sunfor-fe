<template>
  <div class="w-full">
    <el-card class="bg-secondary text-center pb-6">
      <template #header>
        <div class="text-muted text-center mt-2 mb-4">
          <small class="text-90">Sign in with</small>
        </div>
        <div class="pb-6 flex flex-nowrap text-center justify-center">
          <el-button class="bg-white border-white h-10.75">
            <img src="@/assets/images/github.png" alt="" class="h-4 w-4" />
            <span class="pl-4 text-indigo-410">Github</span>
          </el-button>
          <el-button class="bg-white border-white h-10.75">
            <img src="@/assets/images/google.png" alt="" class="h-4 w-4" />
            <span class="pl-4 text-indigo-410">Google</span>
          </el-button>
        </div>
      </template>
      <div class="content-center items-center w-full lg:p-6">
        <div class="mb-4 mt-2 text-center">
          <small class="block w-full text-12.8 mb-6 text-muted">{{ description }}</small>
        </div>
        <el-form ref="formRef" :model="formData" class="authentication-form" @keyup.enter="login">
          <el-form-item
            class="warning-input mb-6 rounded-md"
            prop="email"
            :rules="[
              { required: true, message: 'Email is required', trigger: 'blur' },
              { type: 'email', message: 'Invalid email', trigger: 'blur' }
            ]"
          >
            <div class="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div class="w-5 h-5">
                <MailIcon class="w-5 h-5 text-gray-210" />
              </div>
            </div>
            <el-input placeholder="Email" v-model="formData.email" />
          </el-form-item>
          <el-form-item
            class="mb-6 rounded-md"
            prop="password"
            :rules="[{ required: true, message: 'Password is required', trigger: 'blur' }]"
          >
            <div class="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div class="w-5 h-5">
                <LockOpenIcon class="w-5 h-5 text-gray-210" />
              </div>
            </div>
            <el-input type="password" placeholder="Password" v-model="formData.password" />
          </el-form-item>
          <el-form-item class="mb-4">
            <el-checkbox class="text-muted font-normal">Remember me</el-checkbox>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login"> Sign in </el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import useStore from 'store';
import { MailIcon, LockOpenIcon } from '@heroicons/vue/solid';
import { ElNotification } from 'element-plus';
import type { FormInstance } from 'element-plus';
import router from 'router';
export default defineComponent({
  name: 'LoginForm',
  components: {
    MailIcon,
    LockOpenIcon
  },
  props: {
    description: {
      type: String,
      default: ''
    }
  },
  setup() {
    const store = useStore();
    const formRef = ref<FormInstance>();
    const formData = ref({ email: '', password: '' });
    const login = async () => {
      if (!store.auth.isAuthenticated) {
        store.global.actLoading(true);
        const user = await store.auth.actLogin(formData.value);
        if (user) {
          ElNotification({
            title: 'Success',
            message: 'You are signed in!',
            type: 'success'
          });
          setTimeout(() => {
            store.global.actLoading(false);
            router.push({ name: 'Dashboard' });
          }, 1000);
        }
      }
    };
    return {
      formRef,
      formData,
      login
    };
  }
});
</script>
