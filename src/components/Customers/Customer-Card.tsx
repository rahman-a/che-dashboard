import React from 'react'
import { Button } from '../ui/button'
import { NewOrderCustomerEditDialog } from '@/app/[locale]/orders/(components)'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

type Props = {
  title?: string
  mode?: 'view' | 'edit' | 'select'
  className?: string
}

export function CustomerCard({ title, mode, className }: Props) {
  const t = useTranslations()
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
        <div className='flex items-center justify-center w-12 h-12 bg-gray-200 clip-circle'>
          <p className='text-slate-900'>CN</p>
        </div>
        <div
          className={cn(`flex flex-col w-full space-y-1.5`, {
            'space-y-0': mode === 'select',
          })}
        >
          <div className='w-full flex justify-between items-center'>
            <span className='text-sm font-semibold'>{t('customer_name')}</span>
            {mode === 'select' && (
              <Button className='text-sky-700 h-6 border-none bg-transparent hover:bg-gray-50'>
                {t('select')}
              </Button>
            )}
          </div>
          <p className='flex items-center space-x-5 rtl:space-x-reverse'>
            <span className='text-xs'>{t('customer_phone')}</span>
            <span className='text-xs'>{t('customer_email')}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
