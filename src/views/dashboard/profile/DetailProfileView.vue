<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { auth } from '@/services/firebase'
import { sendEmailVerification } from 'firebase/auth'
import { useAlertStore } from '@/stores/alert'
import moment from 'moment'

const { user } = useUserStore()
const { setAlert } = useAlertStore()

const verifyEmail = () => {
  sendEmailVerification(auth.currentUser!)
    .then(() => {
      setAlert({
        type: 'success',
        message: 'Verification email has been sent.'
      })
    })
    .catch((reason) => {
      console.log(reason)
    })
}
</script>
<template>
  <div class="flex flex-row space-x-5 divide-x">
    <div class="flex-grow space-y-5 user-info">
      <div>
        <span>Name</span>
        <p>{{ user.data?.name ?? '-' }}</p>
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <span>Email</span>
          <span
            v-if="user.data?.emailVerified"
            class="icon-[mdi--verified] text-green-700 w-4 h-4"
          ></span>
          <span v-else class="icon-[mdi--warning-circle] text-yellow-500"></span>
        </div>
        <div class="flex items-center space-x-5">
          <p class="flex-grow">{{ user.data?.email ?? '-' }}</p>
          <button
            v-if="!user.data?.emailVerified"
            @click="verifyEmail"
            class="flex items-center px-3 py-1 text-xs bg-gray-200 rounded-full"
          >
            Verify Email
          </button>
        </div>
      </div>
      <div>
        <span>Phone Number</span>
        <p>{{ user.data?.phoneNumber ?? '-' }}</p>
      </div>
      <div>
        <span>Birth Date</span>
        <p>{{ user.data?.birthDate ? moment(user.data.birthDate).format('DD MMM yyyy') : '-' }}</p>
      </div>
      <div>
        <span>Gender</span>
        <p>{{ user.data?.gender ?? '-' }}</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center px-5">
      <span class="icon-[mdi--image-outline] md:w-24 md:h-24 text-gray-400"></span>
      <p class="text-gray-400">Accept: JPG, PNG with max file size of 1MB</p>
    </div>
  </div>
</template>
<style scoped>
.user-info > div span:first-child {
  @apply uppercase text-xs text-gray-500;
}
</style>
