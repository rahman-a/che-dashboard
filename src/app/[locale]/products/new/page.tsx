import { Template } from '@/components'
import React from 'react'
import { ProductForm } from '../(components)'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - New Products',
  description: 'Create new products',
}

export default function NewProduct({}: Props) {
  const t = useTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <h1 className='text-3xl font-light tracking-wide py-4'>
            {t('create_new_product')}
          </h1>
          <ProductForm mode='create' />
        </div>
      </main>
    </Template>
  )
}
