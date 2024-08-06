<script setup lang="ts">
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref, watch, defineModel } from 'vue'
import { auth } from '@/services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { authMessageMapper } from '@/utils/authMessageMapper'
import { useAlertStore } from '@/stores/alert'

const visible = defineModel('visible', { type: Boolean })
const { setAlert } = useAlertStore()

const submitButton = ref<HTMLInputElement | undefined>(undefined)

const { errors, resetForm, setErrors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email('Email format is not valid').required('Email is required'),
      name: yup.string().required('Name confirmation is required')
    })
  )
})

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [name, nameAttrs] = defineField('name', { validateOnModelUpdate: false })

const handleSaveUser = handleSubmit((values) => {
  return createUserWithEmailAndPassword(auth, values.email, import.meta.env.VITE_NEW_USER_PASSWORD)
    .then(() => {
      setAlert({
        asToast: true,
        type: 'success',
        message: 'User created succesfully'
      })
      hideModal()
    })
    .catch((error) => {
      setErrors({
        email: authMessageMapper(error.code, error.message)
      })
    })
})

const triggerSubmit = () => {
  submitButton.value?.click()
}

const hideModal = () => {
  visible.value = false
}

watch(
  () => visible.value,
  (newVal) => {
    if (!newVal) {
      resetForm()
    }
  }
)
</script>
<template>
  <div
    class="fixed inset-0 z-50 items-center justify-center p-5 bg-black bg-opacity-75 border-2 rounded border-primary-10"
    :class="[visible ? 'flex' : 'hidden']"
  >
    <div class="w-full overflow-hidden bg-white rounded md:w-5/12 lg:w-4/12">
      <div class="px-10 py-5 bg-gray-100">
        <h4 class="text-lg font-semibold">Create New User</h4>
      </div>
      <form @submit.prevent="handleSaveUser" class="flex flex-col justify-between gap-5 px-10 mt-5">
        <TextInputComponent
          required
          v-model="email"
          v-bind="emailAttrs"
          name="email"
          type="email"
          label="Email"
          :errors="errors.email ? [errors.email] : undefined"
        />
        <TextInputComponent
          required
          v-model="name"
          v-bind="nameAttrs"
          name="name"
          type="name"
          label="Name"
          :errors="errors.name ? [errors.name] : undefined"
        />
        <input ref="submitButton" type="submit" name="submit" hidden />
      </form>
      <div class="flex flex-row justify-end gap-3 px-10 py-5 mt-8 bg-gray-100">
        <ButtonComponent @click="hideModal" danger> Cancel </ButtonComponent>
        <ButtonComponent @click="triggerSubmit" type="primary" :loading="isSubmitting">
          Create User
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>
