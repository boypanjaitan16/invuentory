export const authMessageMapper = (code: string): string => {
  switch (code) {
    case 'auth/invalid-credential':
      return 'Email or Password is not valid'
    case 'auth/too-many-requests':
      return 'Too much requests. Please try again later'
    default:
      return code
  }
}
