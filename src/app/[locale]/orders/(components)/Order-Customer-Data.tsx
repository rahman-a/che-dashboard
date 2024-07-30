'use client'
import { CustomerCard, CustomerShippingAddress } from '@/components/Customers'
import { NewOrderCustomerShippingAddressDialog } from './'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Customer, CustomerAddress } from '@/types'

type Props = {
  data?: Customer
  addresses: CustomerAddress[]
}

export function OrderCustomerData({ data, addresses }: Props) {
  const t = useTranslations()
  if (!data) return null
  return (
    <section
      className='flex flex-col lg:flex-row items-start 
    lg:items-center space-y-4 justify-between pt-4 lg:pt-0'
    >
      <CustomerCard
        title={t('customer_data')}
        data={{
          id: data.id!,
          name: data.name,
          phone: data.phone,
          email: data.email,
        }}
      />
      <Separator className='flex lg:hidden' />
      <CustomerShippingAddress
        data={data.address as CustomerAddress}
        addresses={addresses}
        title={t('shipping_address')}
      />
      <Separator className='flex lg:hidden' />
      <NewOrderCustomerShippingAddressDialog />
    </section>
  )
}
