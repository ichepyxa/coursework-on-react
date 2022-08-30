export default function createHref(page: string | number = 1, name: string = '', region: string |number = 1): string {
  return `/houses?page=${page}&name=${name}&region=${region}`
}