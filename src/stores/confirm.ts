import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useConfirmStore = defineStore(
  'confirm',
  () => {
    const data = reactive<{
      show: boolean
      title: string
      message: string
      icon?: string
      confirmText?: string
      cancelText?: string
      onCancel?: () => void
      onConfirm?: () => void
    }>({
      show: false,
      title: '',
      message: '',
      icon: 'icon-[mdi--question-mark-circle]',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onCancel: () => {
        dismiss()
      },
      onConfirm: () => {
        dismiss()
      }
    })

    const reset = () => {
      data.icon = 'icon-[mdi--question-mark-circle]'
      data.confirmText = 'Confirm'
      data.cancelText = 'Cancel'
      data.onCancel = () => {
        dismiss()
      }
      data.onConfirm = () => {
        dismiss()
      }
    }

    const dismiss = () => {
      data.show = false
    }

    const confirm = (arg: Omit<typeof data, 'show'>) => {
      reset()

      data.show = true
      data.icon = arg.icon ?? data.icon
      data.title = arg.title
      data.message = arg.message
      data.confirmText = arg.confirmText ?? data.confirmText
      data.cancelText = arg.cancelText ?? data.cancelText

      data.onCancel = () => {
        if (arg.onCancel) arg.onCancel()
        dismiss()
      }
      data.onConfirm = () => {
        if (arg.onConfirm) arg.onConfirm()
        dismiss()
      }
    }

    return { data, confirm, dismiss }
  },
  { persist: false }
)
