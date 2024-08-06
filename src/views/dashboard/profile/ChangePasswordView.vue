<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { auth } from '@/services/firebase'
import { usePasswordConfirmationNeeded } from '@/services/auth'
import { updatePassword } from 'firebase/auth'
import { authMessageMapper } from '@/utils/authMessageMapper'
import { useAlertStore } from '@/stores/alert'

const { setAlert } = useAlertStore()
const { errors, setErrors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      password: yup.string().min(8).required('Password is required'),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Password confirmation do not match')
        .required('Password confirmation is required')
    })
  )
})

const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: false })
const [passwordConfirmation, passwordConfirmationAttrs] = defineField('password_confirmation', {
  validateOnModelUpdate: false
})

const handleSavePassword = handleSubmit((values) => {
  if (auth.currentUser) {
    return new Promise((resolve, reject) => {
      usePasswordConfirmationNeeded().then((isConfirmed) => {
        if (isConfirmed) {
          updatePassword(auth.currentUser!, values.password)
            .then(() => {
              resolve(true)
            })
            .catch((reason) => {
              reject(reason)
            })
        } else {
          resolve(false)
        }
      })
    })
      .then((isCompleted) => {
        if (isCompleted) {
          setAlert({
            type: 'success',
            message: 'Password updated succesfully.'
          })
        }
      })
      .catch((reason) => {
        setErrors({ password: authMessageMapper(reason.code, reason.message) })
      })
  }
})
</script>
<template>
  <div class="w-full lg:w-7/12">
    <form class="flex flex-col gap-5" @submit.prevent="handleSavePassword">
      <TextInputComponent
        v-model="password"
        v-bind="passwordAttrs"
        label="New Password"
        name="password"
        type="password"
        :errors="errors?.password ? [errors?.password] : undefined"
      />
      <TextInputComponent
        v-model="passwordConfirmation"
        v-bind="passwordConfirmationAttrs"
        label="Confirm New Password"
        name="password_confirmation"
        type="password"
        :errors="errors?.password_confirmation ? [errors?.password_confirmation] : undefined"
      />

      <ButtonComponent type="primary" htmlType="submit" :loading="isSubmitting"
        >Change Password</ButtonComponent
      >
    </form>
  </div>
</template>
