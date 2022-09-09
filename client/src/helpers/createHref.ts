export default function createHref(pageHrefPath: string, page: string | number = 1, name: string = '', region: string |number = 1): string {
  return `/${pageHrefPath}?page=${page}&name=${name}&region=${region}`
}