import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  Blocks,
  BookType,
  File,
  Home,
  LineChart,
  List,
  Package,
  Ruler,
  ShoppingCart,
  Users,
} from 'lucide-react'
import { Logo } from '@/icons'
import { Badge } from '../ui/badge'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '../ui/menubar'

type Props = {}

export function NavigationItems({}: Props) {
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
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 
        bg-muted rounded-xl md:rounded-lg px-3 py-2 text-foreground 
        md:text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <ShoppingCart className='h-5 w-5 md:h-4 md:w-4' />
        {t('orders')}
        <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
          6
        </Badge>
      </Link>
      <Menubar className='w-full !border-none p-0'>
        <MenubarMenu>
          <MenubarTrigger
            className='w-full mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 text-muted-foreground 
          md:transition-all text-lg md:text-base rounded-lg px-3 py-2 hover:text-foreground md:hover:text-primary cursor-pointer'
          >
            <Package className='h-5 w-5 md:h-4 md:w-4' />
            {t('products')}
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link
                href='/products'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <List className='h-5 w-5 md:h-4 md:w-4' />
                {t('products_list')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/products/new'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <File className='h-5 w-5 md:h-4 md:w-4' />
                {t('add_new_product')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/products/categories'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <Blocks className='h-5 w-5 md:h-4 md:w-4' />
                {t('categories')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/products/sizes'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <Ruler className='h-5 w-5 md:h-4 md:w-4' />
                {t('sizes')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/products/types'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <BookType className='h-5 w-5 md:h-4 md:w-4' />
                {t('types')}
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

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
      <Link
        href='/invoices/1'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <Package className='h-5 w-5 md:h-4 md:w-4' />
        {t('invoices')}
      </Link>
    </nav>
  )
}
