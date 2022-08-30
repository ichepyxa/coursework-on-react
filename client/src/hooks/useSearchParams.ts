import { useLocation } from "react-router-dom"

export const useSearchParams = () => {
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)

  const name: string = searchParams.get('name') ?? ''
	const region: string | number = searchParams.get('region') ?? 1
  const page: string | number = (searchParams.get('page') === '' ? 1 : searchParams.get('page')) ?? 1

  return {name, region, page}
}
