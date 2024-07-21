import { CustomerCard, CustomerShippingAddress } from '@/components/Customers'
import { NewOrderCustomerShippingAddressDialog } from './'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useTranslations } from 'next-intl'

type Props = {}

export function OrderCustomerData({}: Props) {
  const t = useTranslations()
  return (
    <section
      className='flex flex-col lg:flex-row items-start 
    lg:items-center space-y-4 justify-between pt-4 lg:pt-0'
    >
      <CustomerCard title={t('customer_data')} />
      <Separator className='flex lg:hidden' />
      <CustomerShippingAddress title={t('shipping_address')} />
      <Separator className='flex lg:hidden' />
      <NewOrderCustomerShippingAddressDialog />
    </section>
  )
}
