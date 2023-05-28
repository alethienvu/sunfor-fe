<template>
  <div class="w-full">
    <el-card class="bg-secondary text-center">
      <template #header>
        <div class="text-muted text-center mt-1.5 mb-6"><small>Sign up with</small></div>
        <div class="flex flex-nowrap text-center justify-center pb-7.5">
          <el-button class="bg-white border-white" href="#">
            <img src="@/assets/images/github.png" alt="" class="h-4 w-4" />
            <span class="pl-4 text-indigo-410">Github</span>
          </el-button>
          <el-button class="bg-white border-white ml-7" href="#">
            <img src="@/assets/images/google.png" alt="" class="h-4 w-4" />
            <span class="pl-4 text-indigo-410">Google</span>
          </el-button>
        </div>
      </template>
      <div class="content-center items-center w-full lg:p-6">
        <div class="text-muted text-center mb-5">
          <small>Or sign up with credentials </small>
        </div>
        <el-form ref="formRef" :model="formData" :rules="rules" class="authentication-form pb-6">
          <el-form-item class="mb-6 rounded-md" prop="email">
            <div
              class="authentication-form-icon z-10 absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
            >
              <div class="w-5 h-5">
                <MailIcon class="w-5 h-5 text-gray-210" />
              </div>
            </div>
            <el-input type="email" placeholder="Email" v-model="formData.email" />
          </el-form-item>
          <el-form-item class="mb-6 rounded-md" prop="password">
            <div
              class="authentication-form-icon z-10 absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
            >
              <div class="w-5 h-5">
                <LockOpenIcon class="w-5 h-5 text-gray-210" />
              </div>
            </div>
            <el-input type="password" placeholder="Password" v-model="formData.password" />
          </el-form-item>
          <el-form-item class="mb-6 rounded-md" prop="checkPass">
            <div
              class="authentication-form-icon z-10 absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
            >
              <div class="w-5 h-5">
                <LockOpenIcon class="w-5 h-5 text-gray-210" />
              </div>
            </div>
            <el-input type="password" placeholder="Confirm Password" v-model="formData.checkPass" />
          </el-form-item>
          <el-form-item class="mb-6 rounded-md">
            <div class="italic">
              <span class="text-0.8125 text-muted font-normal">
                password strength: <strong class="text-success">strong</strong>
              </span>
            </div>
          </el-form-item>
          <el-form-item class="mb-6">
            <el-checkbox class="w-4 h-4 text-muted font-normal"
              >I agree with the
              <a href="/404" class="text-indigo-410 hover:text-indigo-410-active">Privacy Policy</a>
            </el-checkbox>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm(formRef)"> Create account </el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { MailIcon, LockOpenIcon } from '@heroicons/vue/solid';
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import useStore from 'store';
export default defineComponent({
  name: 'RegisterForm',
  components: {
    MailIcon,
    LockOpenIcon
  },
  setup() {
    const formRef = ref<FormInstance>();
    const formData = reactive({
      email: '',
      password: '',
      checkPass: ''
    });
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (formData.checkPass !== '') {
          if (!formRef.value) return;
          formRef.value.validateField('checkPass', () => null);
        }
        callback();
      }
    };
    const validateCheckPass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== formData.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };

    const rules = reactive<FormRules>({
      email: [
        {
          required: true,
          message: 'Email can not be null!',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: 'Invalid email!',
          trigger: 'blur'
        }
      ],
      password: [{ validator: validatePass, trigger: 'blur' }],
      checkPass: [{ validator: validateCheckPass, trigger: 'blur' }]
    });
    const store = useStore();
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          const user = store.auth.actRegister({
            email: formData.email,
            password: formData.password
          });
          if (user) {
            ElNotification({
              title: 'Success',
              message: 'Register success',
              type: 'success'
            });
          }
        } else {
          ElNotification({
            title: 'Error',
            message: 'Register fail',
            type: 'error'
          });
          return false;
        }
      });
    };
    return {
      formRef,
      formData,
      rules,
      submitForm
    };
  }
});
</script>

<style lang="scss" scoped>
.item-input-popper {
  .el-select-dropdown__item.selected {
    @apply text-indigo-410;
  }
}
</style>
