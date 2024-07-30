'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { getFullNameInitials } from '@/lib/utils'
import { orderCostumerExample } from '@/demo/data/orders'
import { useFormContext } from 'react-hook-form'
import { Order } from '@/types'
import { CheckCheck } from 'lucide-react'
import uuid from 'react-uuid'

type Props = {
  title?: string
  mode?: 'view' | 'edit' | 'select'
  className?: string
  data: {
    id: string
    name: string
    phone: string
    email: string
  }
}

export function CustomerCard({ title, mode, className, data }: Props) {
  const [isSelected, setIsSelected] = React.useState(false)
  const t = useTranslations()
  const form = useFormContext<Order>()

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsSelected(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [isSelected])
  if (!data) return null
  return (
    <div className={cn(`w-full lg:w-auto flex flex-col space-y-2`, className)}>
      {title && (
        <div
          className='w-full flex items-center justify-between 
        lg:justify-start space-x-2 rtl:space-x-reverse'
        >
          <h3 className='text-base font-semibold capitalize'>{title}</h3>
          {/* <NewOrderCustomerEditDialog /> */}
        </div>
      )}
      <div className='w-full lg:w-auto relative flex items-center space-x-2 rtl:space-x-reverse'>
        <div className='flex items-center justify-center w-[3.2rem] h-[3.2rem] bg-gray-200 clip-circle'>
          <p className='text-slate-900'>{getFullNameInitials(data?.name)}</p>
        </div>
        <div
          className={cn(`flex flex-col w-full space-y-1.5`, {
            'space-y-0': mode === 'select',
          })}
        >
          <div className='w-full flex justify-between items-center'>
            <span className='text-sm font-semibold'>{data?.name}</span>
            {mode === 'select' && (
              <Button
                onClick={() => {
                  form.setValue('customer', {
                    ...orderCostumerExample,
                    address: orderCostumerExample.address.find(
                      (address) => address.primary
                    )!,
                    id: uuid(),
                  })
                  setIsSelected(true)
                }}
                type='button'
                className='flex items-center justify-center text-sky-700 h-6 w-16
                border-none bg-transparent hover:bg-gray-50'
              >
                {isSelected ? <CheckCheck size={20} /> : t('select')}
              </Button>
            )}
          </div>
          <p className='flex items-center space-x-5 rtl:space-x-reverse'>
            <span className='text-xs'>{data?.phone}</span>
            <span className='text-xs'>{data?.email}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
