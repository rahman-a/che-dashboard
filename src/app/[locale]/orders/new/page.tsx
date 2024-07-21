import React from 'react'
import { Template } from '@/components'
import { getTranslations } from 'next-intl/server'
import { NewOrder } from '../(components)'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RB - New Orders',
  description: 'Create a new order',
}

type Props = {}

export default async function CreateNewOrder({}: Props) {
  const t = await getTranslations()
  return (
    <Template>
      <main
        className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 
      w-screen lg:w-full overflow-x-auto'
      >
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg p-4 
        border border-dashed shadow-sm mt-2 lg:m-0'
          x-chunk='dashboard-orders'
        >
          <h1 className='text-3xl font-light tracking-wide py-4'>
            {t('create_new_order')}
          </h1>
          <NewOrder />
        </div>
      </main>
    </Template>
  )
}
