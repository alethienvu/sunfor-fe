<template>
  <div class="w-full">
    <el-card class="bg-secondary text-center">
      <template #header>
        <div class="text-muted text-center mt-1.5 mb-6"><small>Sign up with</small></div>
        <div class="flex flex-nowrap text-center justify-center pb-7.5">
          <el-button class="bg-white border-white">
            <img src="@/assets/images/github.png" alt="" class="h-4 w-4" />
            <span class="pl-4 text-indigo-410">Github</span>
          </el-button>
          <el-button class="bg-white border-white ml-7">
            <img src="@/assets/images/google.png" alt="" class="h-4 w-4" />
            <span class="pl-4 text-indigo-410">Google</span>
          </el-button>
        </div>
      </template>
      <div class="content-center items-center w-full lg:p-6">
        <div class="text-muted text-center mb-5">
          <small>Or sign up with credentials </small>
        </div>
        <Form
          @submit="onSubmit"
          @keyup.enter="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors, isSubmitting }"
        >
          <div class="el-form el-form--default authentication-form pb-6">
            <div class="el-form-item__content">
              <div
                class="authentication-form-icon z-10 absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
              >
                <div class="w-5 h-5">
                  <MailIcon class="w-5 h-5 text-gray-210" />
                </div>
              </div>
              <div class="el-input el-input--default">
                <Field
                  name="email"
                  type="email"
                  class="el-input__inner"
                  placeholder="Email"
                  :class="{
                    'border-red-400 focus:font-normal text-red-400 ring-red-400 ring-2':
                      errors.email
                  }"
                  v-model="formData.email"
                />
              </div>
              <div class="el-form-item__error mt-1">
                {{ errors.email }}
              </div>
            </div>
          </div>
          <div class="el-form el-form--default authentication-form pb-6">
            <div class="el-form-item__content">
              <div
                class="authentication-form-icon z-10 absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
              >
                <div class="w-5 h-5">
                  <LockOpenIcon class="w-5 h-5 text-gray-210" />
                </div>
              </div>
              <div class="el-input el-input--default">
                <Field
                  name="password"
                  type="password"
                  class="el-input__inner"
                  placeholder="Password"
                  :class="{
                    'border-red-400 focus:font-normal text-red-400 ring-red-400 ring-2':
                      errors.password
                  }"
                  v-model="formData.password"
                />
              </div>
              <div class="el-form-item__error mt-1">
                {{ errors.password }}
              </div>
            </div>
          </div>
          <div class="el-form el-form--default authentication-form pb-6">
            <div class="el-form-item__content">
              <div
                class="authentication-form-icon z-10 absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
              >
                <div class="w-5 h-5">
                  <LockOpenIcon class="w-5 h-5 text-gray-210" />
                </div>
              </div>
              <div class="el-input el-input--default">
                <Field
                  name="checkPass"
                  type="password"
                  class="el-input__inner"
                  placeholder="Confirm password"
                  :class="{
                    'border-red-400 focus:font-normal text-red-400 ring-red-400 ring-2':
                      errors.checkPass
                  }"
                  v-model="formData.checkPass"
                />
              </div>
              <div class="el-form-item__error mt-1">
                {{ errors.checkPass }}
              </div>
            </div>
          </div>
          <div class="mb-6 rounded-md text-left">
            <div class="italic">
              <span class="text-0.8125 text-muted font-normal">
                password strength: <strong class="text-success">{{ checkPasswordStrength }}</strong>
              </span>
            </div>
          </div>
          <div class="el-form el-form--default authentication-form pb-6">
            <div class="el-form-item el-form-item--default mb-6">
              <div class="el-form-item__content">
                <el-checkbox class="w-4 h-4 text-muted font-normal" v-model="isAggree"
                  >I agree with the
                  <a href="/404" class="text-indigo-410 hover:text-indigo-410-active"
                    >Privacy Policy</a
                  >
                </el-checkbox>
              </div>
            </div>
          </div>
          <el-button type="primary" :disabled="isSubmitting || !isAggree" @click="onSubmit">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Create account
          </el-button>
        </Form>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { MailIcon, LockOpenIcon } from '@heroicons/vue/solid';
import { ElNotification } from 'element-plus';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import useStore from 'store';
export default defineComponent({
  name: 'RegisterForm',
  components: {
    MailIcon,
    LockOpenIcon,
    Form,
    Field
  },
  setup() {
    const formData = reactive({
      email: '',
      password: '',
      checkPass: ''
    });

    const isAggree = ref(false);

    const schema = Yup.object().shape({
      email: Yup.string().required('Email is required').email(),
      password: Yup.string().required('Password is required'),
      checkPass: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    });

    const checkPasswordStrength = computed(() => {
      let strength = 0;
      if (formData.password.match(/[a-z]+/)) {
        strength += 1;
      }
      if (formData.password.match(/[A-Z]+/)) {
        strength += 1;
      }
      if (formData.password.match(/[0-9]+/)) {
        strength += 1;
      }
      if (formData.password.match(/[$@#&!]+/)) {
        strength += 1;
      }
      if (formData.password.length < 8) {
        return 'Too short';
      }
      if (strength < 2) {
        return 'Weak';
      }
      if (strength == 2 && formData.password.length >= 8) {
        return 'Moderate';
      }
      if (strength > 2 && formData.password.length >= 8) {
        return 'Strong';
      } else return 'Strong';
    });

    const onSubmit = async () => {
      const isValid = await schema.isValid(formData);
      if (isValid) {
        const store = useStore();
        const { email, password } = formData;
        store.global.actLoading(true);
        const user = await store.auth.actRegister({
          email,
          password
        });
        if (user) {
          ElNotification({
            title: 'Success',
            message: 'Register success',
            type: 'success'
          });
          // Login after register success
          setTimeout(async () => {
            await store.auth.actLogin({ email, password });
            store.global.actLoading(false);
          }, 1000);
        }
      }
    };

    return {
      formData,
      isAggree,
      schema,
      checkPasswordStrength,
      onSubmit
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
