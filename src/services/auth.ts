import {
  updateProfile,
  updateEmail,
  updatePhoneNumber,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import { auth } from './firebase'
import { watch } from 'vue'
import { usePasswordStore } from '@/stores/password'

export const useUpdateProfile = (
  values: any,
  shouldUpdateEmail: boolean = false,
  shouldUpdatePhoneNumber: boolean = false
) => {
  const updateEmailPromise = shouldUpdateEmail
    ? updateEmail(auth.currentUser!, values.email)
    : Promise.resolve(auth.currentUser)

  const updatePhoneNumberPromise = shouldUpdatePhoneNumber
    ? updatePhoneNumber(auth.currentUser!, values.phoneNumber)
    : Promise.resolve(auth.currentUser)

  const updateProfilePromise = updateProfile(auth.currentUser!, {
    displayName: values.name
  })
  return Promise.all([updateEmailPromise, updatePhoneNumberPromise, updateProfilePromise])
}

export const usePasswordConfirmationNeeded = () => {
  const { showPasswordForm, password } = usePasswordStore()

  return new Promise((resolve, reject) => {
    showPasswordForm()
    watch(
      () => ({
        show: password.show,
        confirmed: password.confirmed
      }),
      (newPassword, oldPassword) => {
        console.log(newPassword, oldPassword)
        if (!newPassword.show && newPassword.confirmed) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    )
  })
}
