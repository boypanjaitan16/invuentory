export interface User {
  name?: string | null
  email?: string | null
  emailVerified?: boolean
  phoneNumber?: string | null
  photo?: string | null
  gender?: 'MALE' | 'FEMALE'
  birthDate?: string
}
