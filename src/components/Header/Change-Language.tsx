'use client'
import * as React from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname, useParams } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import kwFlag from '@/images/flag_of_kw.png'
import usFlag from '@/images/flag_of_usa.png'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export interface ILanguageChangerProps {
  className?: string
}
type Locale = 'en' | 'ar'

export function LanguageChanger({ className }: ILanguageChangerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale() as Locale
  const language = {
    ar: 'English',
    en: 'العربية',
  }
  const isMobileScreen = useMediaQuery('(max-width: 768px)')
  const changeDirection = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
    const updatedUrl =
      pathname === `/${params.locale}`
        ? '/'
        : pathname.replace(`/${params.locale}/`, `/${locale}/`)
    router.push(updatedUrl)
    router.refresh()
  }
  return (
    <DropdownMenu modal={isMobileScreen}>
      <DropdownMenuTrigger>
        <p className={cn('px-2 border rounded-sm', className)}>
          {language[locale]}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeDirection('ar')}>
          <div className='flex items-center space-x-2 w-full justify-end cursor-pointer'>
            <p className='rtl:ml-2'>العربية</p>
            <Image src={kwFlag} alt='kuwait Flag' width={24} height={17} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeDirection('en')}>
          <div className='flex items-center space-x-2 w-full justify-end cursor-pointer'>
            <p className='rtl:ml-2'>English</p>
            <Image src={usFlag} alt='US Flag' width={24} height={17} />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
