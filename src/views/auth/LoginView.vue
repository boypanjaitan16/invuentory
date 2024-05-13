<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { authMessageMapper } from '@/utils/authMessageMapper'
import { useUserStore } from '@/stores/user'
import type { User } from '@/interfaces/User'

const userStore = useUserStore()
const router = useRouter()

const { errors, setErrors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email('Email format is not valid').required('Email is required'),
      password: yup
        .string()
        .min(8, 'Minimum of 8 characters length')
        .required('Password is required')
    })
  )
})

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: false })
const handleLogin = handleSubmit((values) => {
  return signInWithEmailAndPassword(auth, values.email, values.password)
    .then(({ user }) => {
      const userState: User = {
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photo: user.photoURL
      }
      userStore.setUser(userState)
      router.push('/')
    })
    .catch((err) => {
      setErrors({
        password: authMessageMapper(err.code, err.message)
      })
    })
})
</script>
<template>
  <div class="flex items-center justify-center w-full min-h-screen md:bg-gray-200">
    <div class="w-full p-5 bg-white rounded md:shadow md:p-10 md:border md:w-5/12 lg:w-4/12">
      <h1 class="text-2xl font-semibold">Welcome to Invuentory</h1>
      <form @submit.prevent="handleLogin" class="mt-10 space-y-5">
        <TextInputComponent
          v-model="email"
          v-bind="emailAttrs"
          label="Email"
          type="email"
          name="email"
          placeholder="user@mail.com"
          :errors="errors?.email ? [errors?.email] : undefined"
        />
        <TextInputComponent
          v-model="password"
          v-bind="passwordAttrs"
          label="Password"
          type="password"
          name="password"
          :errors="errors?.password ? [errors?.password] : undefined"
        />

        <ButtonComponent block htmlType="submit" type="primary" :loading="isSubmitting"
          >Login</ButtonComponent
        >
      </form>
    </div>
  </div>
</template>
