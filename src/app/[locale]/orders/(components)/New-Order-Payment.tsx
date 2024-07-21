import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Edit } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {}

export function NewOrderPayment({}: Props) {
  const t = useTranslations()
  return (
    <section className='flex flex-col space-y-3 py-4 px-1'>
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('price')}</h3>
        <h3 className=''>{t('no_of_items', { count: 3 })}</h3>
        <h3 className=''>3,125 {t('kw')}</h3>
      </div>
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('discount')}</h3>
        <h3 className=''>{t('new_customer')}</h3>
        <h3 className=''>-155 {t('kw')}</h3>
      </div>
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('shipping')}</h3>
        <h3 className=''>{t('free_shipping')}</h3>
        <h3 className=''>0.00 {t('kw')}</h3>
      </div>
      <div className='flex items-center justify-between w-full'>
        <h3 className='font-semibold'>{t('total')}</h3>
        <h3 className='font-semibold'>3000 {t('kw')}</h3>
      </div>
      <Separator />
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('paid_by_customer')}</h3>
        <h3 className=''>1000 {t('kw')}</h3>
      </div>
    </section>
  )
}
