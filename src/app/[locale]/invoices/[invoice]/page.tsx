import React from 'react'
import { Metadata } from 'next'
import { Template } from '@/components'
import { getTranslations } from 'next-intl/server'
import { InvoiceFullData } from '../(components)'

type Props = {}

export const metadata: Metadata = {
  title: 'Invoice',
  description: 'Invoice page',
}

export default async function Invoice({}: Props) {
  const t = await getTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
          border border-dashed shadow-sm mt-2 lg:m-0'
          x-chunk='dashboard-invoice'
        >
          <InvoiceFullData />
        </div>
      </main>
    </Template>
  )
}
