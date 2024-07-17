import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from './ui/button'
import { List } from 'lucide-react'
import OrderProductCard from './Product-Card'
type Props = {}

export default function OrdersItems({}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='flex'>
          <List className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-xl'>
        <div className='flex flex-col space-y-2 py-4'>
          <OrderProductCard isOrder />
          <OrderProductCard isOrder />
          <OrderProductCard isOrder />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit' className='hover:bg-primary'>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
