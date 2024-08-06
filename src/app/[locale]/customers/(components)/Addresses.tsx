'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { CustomerShippingAddress } from '@/components/Customers'
import { CustomerAddress } from '@/types'

type Props = {
  addresses: any
}

export function CustomerAddresses({ addresses }: Props) {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='flex'>
          <List className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='h-[calc(100vw-0)] overflow-y-auto w-full sm:max-w-xl'>
        <div className='flex flex-col space-y-6 mt-4'>
          {addresses.map((address: CustomerAddress) => (
            <CustomerShippingAddress data={address} key={address.id} isEdit />
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit' className='hover:bg-primary'>
              {t('close')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
