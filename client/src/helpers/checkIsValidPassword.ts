export default function checkIsValidPassword(password: string): boolean {
  return password.length >= 6 && password.length <= 20
}