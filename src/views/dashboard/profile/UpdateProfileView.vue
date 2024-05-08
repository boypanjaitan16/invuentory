<script setup lang="ts">
import * as yup from 'yup'
import moment from 'moment'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useUserStore } from '@/stores/user'
import { auth } from '@/services/firebase'
import { useUpdateProfile } from '@/services/auth'
import { authMessageMapper } from '@/utils/authMessageMapper'
import { ref } from 'vue'
import { useAlertStore } from '@/stores/alert'

const error = ref<string | undefined>(undefined)
const genderOptions = [
  {
    value: 'MALE',
    label: 'Male'
  },
  {
    value: 'FEMALE',
    label: 'Female'
  }
]
const {
  user: { data },
  setUser
} = useUserStore()
const { setAlert } = useAlertStore()
const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  initialValues: {
    name: data?.name!,
    email: data?.email!,
    phoneNumber: data?.phoneNumber!,
    birthDate: data?.birthDate ? moment(data?.birthDate).toDate() : undefined,
    gender: data?.gender ?? ''
  },
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email('Email format is not valid').required('Email is required'),
      name: yup.string().required('Name is required'),
      phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d+$/, 'Phone number format is not valid'),
      birthDate: yup.date().required('Birth date is required'),
      gender: yup.string().oneOf(['MALE', 'FEMALE'], 'Please select a gender')
    })
  )
})

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [name, nameAttrs] = defineField('name', { validateOnModelUpdate: false })
const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber', { validateOnModelUpdate: false })
const [birthDate, birthDateAttrs] = defineField('birthDate', { validateOnModelUpdate: false })
const [gender, genderAttrs] = defineField('gender', { validateOnModelUpdate: false })

const setError = (err: string | undefined) => {
  error.value = err
}
const handleSaveChanges = handleSubmit((values) => {
  setError(undefined)
  if (auth.currentUser) {
    return useUpdateProfile(values, true, false)
      .then((result) => {
        setAlert({
          type: 'success',
          message: 'Profile updated succesfully.'
        })
        setUser({
          ...values,
          gender: values.gender as 'MALE' | 'FEMALE',
          birthDate: moment(values.birthDate).toISOString()
        })
        console.log(result)
      })
      .catch((result) => {
        setError(authMessageMapper(result.code, result.message))
      })
  } else {
    setError('No active user')
  }
})
</script>
<template>
  <div class="w-full lg:w-7/12">
    <AlertComponent v-if="error" type="error" @onDismiss="setError(undefined)" className="mb-5">{{
      error
    }}</AlertComponent>
    <form class="space-y-3" @submit.prevent="handleSaveChanges">
      <TextInputComponent
        v-model="name"
        v-bind="nameAttrs"
        label="Name"
        name="name"
        type="text"
        :errors="errors?.name ? [errors?.name] : undefined"
      />
      <TextInputComponent
        v-model="email"
        v-bind="emailAttrs"
        label="Email"
        name="email"
        type="email"
        :errors="errors?.email ? [errors?.email] : undefined"
      />
      <TextInputComponent
        v-model="phoneNumber"
        v-bind="phoneNumberAttrs"
        label="Phone Number"
        name="phoneNumber"
        type="text"
        :errors="errors?.phoneNumber ? [errors?.phoneNumber] : undefined"
      />
      <TextInputComponent
        v-model="birthDate"
        v-bind="birthDateAttrs"
        label="Birth Date"
        name="birthDate"
        type="date"
        :errors="errors?.birthDate ? [errors?.birthDate] : undefined"
      />
      <SelectComponent
        v-model="gender"
        v-bind="genderAttrs"
        :options="genderOptions"
        :errors="errors.gender ? [errors.gender] : undefined"
        name="gender"
        label="Gender"
      />

      <ButtonComponent type="primary" htmlType="submit" :loading="isSubmitting"
        >Save Changes</ButtonComponent
      >
    </form>
  </div>
</template>
