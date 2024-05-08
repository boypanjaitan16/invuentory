<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import TextInput from '../../components/forms/TextInputComponent.vue'
import Button from '../../components/forms/ButtonComponent.vue'

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
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

const handleLogin = handleSubmit(
  (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted', JSON.stringify(values, null, 2))
        resolve()
      }, 2000)
    })
  },
  (result) => {
    console.log(result)
  }
)
</script>
<template>
  <div class="flex items-center justify-center w-full min-h-screen md:bg-gray-200">
    <div class="w-full p-5 bg-white rounded shadow md:p-10 md:border md:w-5/12 lg:w-4/12">
      <h1 class="text-2xl font-semibold">Welcome to Invuentory</h1>
      <form @submit.prevent="handleLogin" class="mt-10 space-y-5">
        <TextInput
          v-model="email"
          v-bind="emailAttrs"
          label="Email"
          type="email"
          name="email"
          placeholder="user@mail.com"
          :errors="errors?.email ? [errors?.email] : undefined"
        />
        <TextInput
          v-model="password"
          v-bind="passwordAttrs"
          label="Password"
          type="password"
          name="password"
          :errors="errors?.password ? [errors?.password] : undefined"
        />

        <Button htmlType="submit" type="primary" :disabled="isSubmitting">Login</Button>
      </form>
    </div>
  </div>
</template>
