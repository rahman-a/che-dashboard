'use client'
import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  BadgePercent,
  Blocks,
  BookType,
  CircleOff,
  FilePlus,
  Home,
  LineChart,
  List,
  ListChecks,
  ListRestart,
  ListX,
  Package,
  Ruler,
  Settings,
  ShoppingCart,
  TicketPercent,
  Users,
} from 'lucide-react'
import { Logo } from '@/icons'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '../ui/menubar'
import { cn } from '@/lib/utils'
import { useCurrentPage } from '@/hooks/useCurrentPage'

type Props = {}

export function NavigationItems({}: Props) {
  const t = useTranslations()
  const isCurrentPage = useCurrentPage()
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
        className={cn(
          `mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 
          rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
          md:transition-all hover:text-foreground md:hover:text-primary`,
          {
            'bg-muted': isCurrentPage(''),
          }
        )}
      >
        <Home className='h-5 w-5 md:h-4 md:w-4' />
        {t('dashboard')}
      </Link>
      <Menubar className='w-full !border-none p-0'>
        <MenubarMenu>
          <MenubarTrigger
            className={cn(
              `w-full mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 text-muted-foreground 
          md:transition-all text-lg md:text-base rounded-lg px-3 py-2 hover:text-foreground md:hover:text-primary cursor-pointer`,
              {
                'bg-muted': isCurrentPage('/orders/*'),
              }
            )}
          >
            <ShoppingCart className='h-5 w-5 md:h-4 md:w-4' />
            {t('orders')}
          </MenubarTrigger>
          <MenubarContent className='w-56'>
            <MenubarItem asChild>
              <Link
                href='/orders/new'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <FilePlus className='h-5 w-5 md:h-4 md:w-4' />
                {t('create_new_order')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/orders'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <ListChecks className='h-5 w-5 md:h-4 md:w-4' />
                {t('completed_orders')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/orders/non-completed'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <ListX className='h-5 w-5 md:h-4 md:w-4' />
                {t('non_completed_orders')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/orders/canceled'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <CircleOff className='h-5 w-5 md:h-4 md:w-4' />
                {t('canceled_orders')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/orders/returned'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <ListRestart className='h-5 w-5 md:h-4 md:w-4' />
                {t('returned_orders')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/orders/setting'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <Settings className='h-5 w-5 md:h-4 md:w-4' />
                {t('orders_setting')}
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Menubar className='w-full !border-none p-0'>
        <MenubarMenu>
          <MenubarTrigger
            className={cn(
              `w-full mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 text-muted-foreground 
          md:transition-all text-lg md:text-base rounded-lg px-3 py-2 hover:text-foreground md:hover:text-primary cursor-pointer`,
              {
                'bg-muted': isCurrentPage('/products/*'),
              }
            )}
          >
            <Package className='h-5 w-5 md:h-4 md:w-4' />
            {t('products')}
          </MenubarTrigger>
          <MenubarContent className='w-56'>
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
                <FilePlus className='h-5 w-5 md:h-4 md:w-4' />
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
      <Menubar className='w-full !border-none p-0'>
        <MenubarMenu>
          <MenubarTrigger
            className={cn(
              `w-full mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 text-muted-foreground 
          md:transition-all text-lg md:text-base rounded-lg px-3 py-2 hover:text-foreground md:hover:text-primary cursor-pointer`,
              {
                'bg-muted': isCurrentPage('/offers/*'),
              }
            )}
          >
            <BadgePercent className='h-5 w-5 md:h-4 md:w-4' />
            {t('offers')}
          </MenubarTrigger>
          <MenubarContent className='w-56'>
            <MenubarItem asChild>
              <Link
                href='/offers'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <List className='h-5 w-5 md:h-4 md:w-4' />
                {t('offers_list')}
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link
                href='/offers/new'
                className='w-full mx-[-0.65rem] md:mx-0 flex items-center rtl:flex-row-reverse gap-4 md:gap-4 
                rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
                md:transition-all hover:text-foreground md:hover:text-primary cursor-pointer'
              >
                <FilePlus className='h-5 w-5 md:h-4 md:w-4' />
                {t('create_new_offer')}
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Link
        href='/customers'
        className={cn(
          `mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 
          rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
          md:transition-all hover:text-foreground md:hover:text-primary`,
          {
            'bg-muted': isCurrentPage('/customers/*'),
          }
        )}
      >
        <Users className='h-5 w-5 md:h-4 md:w-4' />
        {t('customers')}
      </Link>
      <Link
        href='/coupons'
        className={cn(
          `mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 
          rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
          md:transition-all hover:text-foreground md:hover:text-primary`,
          {
            'bg-muted': isCurrentPage('/coupons/*'),
          }
        )}
      >
        <TicketPercent className='h-5 w-5 md:h-4 md:w-4' />
        {t('coupons')}
      </Link>
      {/* <Link
        href='/invoices/1'
        className={cn(
          `mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 
          rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground 
          md:transition-all hover:text-foreground md:hover:text-primary`,
          {
            'bg-muted': isCurrentPage('/invoices/*'),
          }
        )}
      >
        <Package className='h-5 w-5 md:h-4 md:w-4' />
        {t('invoices')}
      </Link> */}
    </nav>
  )
}
