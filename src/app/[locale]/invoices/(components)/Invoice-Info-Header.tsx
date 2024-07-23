import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import * as React from 'react'
import { InvoiceHeaderEditDialog } from './Invoice-Header-Edit-Dialog'
import { useTranslations } from 'next-intl'

export interface IInvoiceInfoHeaderProps {}

export function InvoiceInfoHeader(props: IInvoiceInfoHeaderProps) {
  const t = useTranslations()
  return (
    <div
      className='relative flex items-center justify-between 
    p-4 shadow-sm'
    >
      <div className='absolute w-full h-full z-10 top-0 left-0 bg-gray-100 rounded-xl ' />
      <InvoiceHeaderEditDialog />
      <div className='relative z-20 flex flex-col space-y-5'>
        <div className='flex flex-col space-y-1'>
          <h3 className='font-bold tracking-wide'>{t('invoice_no')}</h3>
          <p className='text-gray-500 text-sm'>#85412</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <p className='text-gray-500 text-xs'>
            {t('issued_date')}: 12/05/2024
          </p>
          <p className='text-gray-500 text-xs'>{t('due_date')}: 12/05/2024</p>
        </div>
      </div>
      <div className='relative z-20 flex flex-col space-y-5'>
        <div className='flex flex-col items-center space-y-1'>
          <h3 className='text-sm font-bold tracking-wide'>{t('total')}</h3>
          <p className='text-gray-500 text-sm'>250 {t('kw')}</p>
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <h3 className='text-sm font-bold tracking-wide'>{t('status')}</h3>
          <p className='text-gray-500 text-sm'>{t('important')}</p>
        </div>
      </div>
    </div>
  )
}
