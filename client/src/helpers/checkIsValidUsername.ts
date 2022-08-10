export default function checkIsValidUsername(username: string): boolean {
  return username.length >= 3 && username.length <= 15
}