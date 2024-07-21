import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { CircleUser } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
type Props = {}

export function ProfileDropdown({}: Props) {
  const t = useTranslations()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='rounded-full'>
          <CircleUser className='h-5 w-5' />
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='cursor-pointer rtl:justify-end'>
          {t('my_account')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer rtl:justify-end'>
          {t('account_setting')}
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer rtl:justify-end'>
          {t('view_accounts')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer rtl:justify-end'>
          <Link href='/login'>{t('logout')}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
