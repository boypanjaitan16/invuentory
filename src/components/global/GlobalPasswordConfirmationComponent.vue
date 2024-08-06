<script setup lang="ts">
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { auth } from '@/services/firebase'
import { usePasswordStore } from '@/stores/password'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { useUserStore } from '@/stores/user'
import { authMessageMapper } from '@/utils/authMessageMapper'

const {
  user: { data }
} = useUserStore()
const { confirmPassword, hidePasswordForm, password: passwordStore } = usePasswordStore()
const { errors, handleSubmit, isSubmitting, defineField, setErrors } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      password: yup.string().required('Password is required')
    })
  )
})

const [password, passwordAttrs] = defineField('password')

const handleSetPassword = handleSubmit((values) => {
  const credential = EmailAuthProvider.credential(data?.email!, values.password)
  return reauthenticateWithCredential(auth.currentUser!, credential)
    .then(() => {
      confirmPassword()
    })
    .catch((error) => {
      setErrors({
        password: authMessageMapper(error.code, error.message)
      })
    })
})
</script>
<template>
  <div
    v-if="passwordStore.show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
  >
    <div class="max-w-md p-5 mx-5 bg-white rounded shadow min-w-[30vw]">
      <h4 class="text-lg font-semibold">Confirmation Required</h4>
      <p class="text-gray-500">Type-in your password to confirm this action.</p>
      <form @submit.prevent="handleSetPassword" class="mt-5 space-y-5">
        <TextInputComponent
          v-model="password"
          v-bind="passwordAttrs"
          name="password"
          type="password"
          placeholder="password"
          :errors="errors?.password ? [errors?.password] : undefined"
        />
        <div class="flex justify-between space-x-3">
          <ButtonComponent @click="hidePasswordForm()" danger block type="button"
            >Cancel</ButtonComponent
          >
          <ButtonComponent block :loading="isSubmitting" type="primary" htmlType="submit"
            >Confirm</ButtonComponent
          >
        </div>
      </form>
    </div>
  </div>
</template>
