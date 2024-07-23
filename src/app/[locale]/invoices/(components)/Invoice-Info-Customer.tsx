import { CustomerCard, CustomerShippingAddress } from '@/components/Customers'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export interface IInvoiceInfoCustomerProps {}

export function InvoiceInfoCustomer(props: IInvoiceInfoCustomerProps) {
  const t = useTranslations()
  return (
    <div className='bg-gray-100 w-full text-black p-4 shadow-sm rounded-lg'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-5 lg:gap-0'>
        <CustomerCard title={t('customer_data')} className='[&_h3]:text-sm' />
        <CustomerShippingAddress
          title={t('shipping_address')}
          className='[&_ul]:text-sm [&_h3]:text-sm m-0 lg:mr-20 rtl:lg:ml-20 rtl:lg:mr-0'
        />
      </div>
    </div>
  )
}
