import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'

type Props = {}

export default function NavigationItems({}: Props) {
  return (
    <nav className='grid gap-2 md:gap-0 md:items-start md:px-2 text-lg md:text-sm font-medium lg:px-4'>
      <Link
        href='/'
        className='flex items-center gap-2 text-lg font-semibold md:hidden'
      >
        <Package2 className='h-6 w-6' />
        <span className='sr-only'>Acme Inc</span>
      </Link>
      <Link
        href='/'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <Home className='h-5 w-5 md:h-4 md:w-4' />
        Dashboard
      </Link>
      <Link
        href='/orders'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 bg-muted rounded-xl md:rounded-lg px-3 py-2 text-foreground md:text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <ShoppingCart className='h-5 w-5 md:h-4 md:w-4' />
        Orders
        <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
          6
        </Badge>
      </Link>
      <Link
        href='/products'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <Package className='h-5 w-5 md:h-4 md:w-4' />
        Products
      </Link>
      <Link
        href='/customers'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <Users className='h-5 w-5 md:h-4 md:w-4' />
        Customers
      </Link>
      <Link
        href='/offers'
        className='mx-[-0.65rem] md:mx-0 flex items-center gap-4 md:gap-4 rounded-xl md:rounded-lg px-3 py-2 text-muted-foreground md:transition-all hover:text-foreground md:hover:text-primary'
      >
        <LineChart className='h-5 w-5 md:h-4 md:w-4' />
        Offers
      </Link>
    </nav>
  )
}
