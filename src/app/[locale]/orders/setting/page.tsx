import React from 'react'
import { Metadata } from 'next'
import { Template } from '@/components'
import { getTranslations } from 'next-intl/server'
import { OrderSettingForm } from '../(components)'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - Orders Setting',
  description: 'Define orders status and manufacture period',
}

export default async function OrdersSetting({}: Props) {
  const t = await getTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <h1 className='w-full text-2xl text-center md:text-start md:text-3xl py-4'>
            {t('orders_setting')}
          </h1>
          <OrderSettingForm />
        </div>
      </main>
    </Template>
  )
}
