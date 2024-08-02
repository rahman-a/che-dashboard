'use client'
import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { CustomerAddress, Order } from '@/types'
import { useTranslations } from 'next-intl'
import { CustomerShippingAddressListDialog } from '@/app/[locale]/orders/(components)'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { CheckCheck } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CustomerShippingAddressEditDialog } from '@/app/[locale]/customers/(components)'

type Props = {
  data: CustomerAddress
  addresses?: CustomerAddress[]
  isSelect?: boolean
  title?: string
  className?: string
}

export function CustomerShippingAddress({
  title,
  className,
  data,
  addresses,
  isSelect,
}: Props) {
  const t = useTranslations()
  const [isSelected, setIsSelected] = React.useState(false)
  const formContext = useFormContext<Order>()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSelected(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [isSelected])
  return (
    <div className={cn(`w-full lg:w-auto flex flex-col space-y-2`, className)}>
      {title && (
        <div className='w-full flex items-center justify-between space-x-2 rtl:space-x-reverse'>
          <h3 className='text-base font-semibold capitalize'>{title}</h3>
          {addresses && (
            <CustomerShippingAddressListDialog addresses={addresses} />
          )}
        </div>
      )}
      <div className='flex flex-col space-y-2'>
        <div className='w-full lg:w-auto flex justify-between space-x-2'>
          {data && (
            <ul>
              <li>{`${data.building} ${data.street} ${t('st')}, ${
                data.floor
              }, ${data.apartment}`}</li>
              <li>{`${data.neighborhood}, ${data.block}`}</li>
              <li>{`${data.region}, ${data.governorate}`}</li>
              <li>{data.country?.toLocaleUpperCase()}</li>
              {isSelect && (
                <li className='w-full md:w-48'>
                  <span className='font-semibold'>{t('note')}: </span>
                  {data.note}
                </li>
              )}
            </ul>
          )}
          <CustomerShippingAddressEditDialog data={data}/>
        </div>
        {isSelect && (
          <Button
            variant='outline'
            size={isSelected ? 'icon' : 'default'}
            type='button'
            className='text-xs font-semibold text-sky-800'
            onClick={() => {
              const customer = formContext.getValues('customer')
              customer.address = data
              formContext.setValue('customer', customer)
              setIsSelected(true)
            }}
          >
            {isSelected ? <CheckCheck size={16} /> : t('select')}
          </Button>
        )}
      </div>
      {isSelect && <Separator className='w-full' />}
    </div>
  )
}
