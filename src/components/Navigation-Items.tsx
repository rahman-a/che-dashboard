import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from 'lucide-react'
import { Logo } from '@/icons'
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'
import { useTranslations } from 'next-intl'

type Props = {}

export default function NavigationItems({}: Props) {
  const t = useTranslations()
  return (
    <nav className='grid gap-2 md:gap-0 md:items-start md:px-2 text-lg md:text-sm font-medium lg:px-4'>
      <Link
        href='/'
        className='flex items-center gap-2 rtl:justify-end text-lg font-semibold md:hidden'
      >
        <Logo className='h-12 w-12' />
        <span className='sr-only'>ٌRB Inc</span>
      </Link>
      <Link
        href='/'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <Home className='h-5 w-5 md:h-4 md:w-4' />
        {t('dashboard')}
      </Link>
      <Link
        href='/orders'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 bg-muted rounded-xl md:rounded-lg px-3 py-2 text-foreground md:text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <ShoppingCart className='h-5 w-5 md:h-4 md:w-4' />
        {t('orders')}
        <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
          6
        </Badge>
      </Link>
      <Link
        href='/products'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <Package className='h-5 w-5 md:h-4 md:w-4' />
        {t('products')}
      </Link>
      <Link
        href='/customers'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <Users className='h-5 w-5 md:h-4 md:w-4' />
        {t('customers')}
      </Link>
      <Link
        href='/offers'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <LineChart className='h-5 w-5 md:h-4 md:w-4' />
        {t('offers')}
      </Link>
    </nav>
  )
}
