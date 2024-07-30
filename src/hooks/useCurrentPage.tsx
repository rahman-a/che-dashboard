import { usePathname, useParams } from 'next/navigation'

export const useCurrentPage = () => {
  const pathname = usePathname()
  const params = useParams()
  const pathnameWithoutLocale = pathname.replace(`/${params.locale}`, '')
  const isMatch = (url: string) => {
    if (url.split('/').includes('*')) {
      const urlWithoutAsterix = url.replace('/*', '')
      return pathnameWithoutLocale.startsWith(urlWithoutAsterix)
    }
    return url === pathnameWithoutLocale
  }
  return (url: string | string[]) => {
    if (Array.isArray(url)) return url.some(isMatch)
    return isMatch(url as string)
  }
}
