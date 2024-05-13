export const authMessageMapper = (
  code: string,
  message: string | undefined = undefined
): string => {
  switch (code) {
    case 'auth/invalid-credential':
      return 'Email or Password is not valid'
    case 'auth/too-many-requests':
      return 'Too much requests. Please try again later'
    default:
      return message ?? code
  }
}
