import { Template } from '@/components'
import React from 'react'
import { ProductForm } from '../(components)'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - Edit Product',
  description: 'Update product details',
}

const exampleProductData = {
  id: '1',
  name: 'Product Name',
  abbr: 'PN',
  details:
    'But if you wanna convert it to a blob for making some edits and convert it back to a File object, you can use the File() constructor for converting a blob to a File.',
  category: 'classic',
  price: 100,
  stock: 10,
  discount: {
    value: 10,
    type: 'percentage' as const,
  },
  shipping: 0,
  material: {
    name: '5',
    usedUnits: 2,
  },
  SKUs: [
    {
      id: '1',
      sku: 'PN-48-VINTAGE',
      type: 'embroidery',
      size: '50',
    },
    {
      id: '2',
      sku: 'PN-44-MAKANI',
      type: 'classic',
      size: '44',
    },
  ],
  images: [
    'http://localhost:3000/images/products/abaya_1.png',
    'http://localhost:3000/images/products/abaya_2.png',
  ],
}

export default function ProductPage({}: Props) {
  const t = useTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <h1 className='text-3xl font-light tracking-wide py-4'>
            {t('update_product')}
          </h1>
          <ProductForm mode='update' data={exampleProductData} />
        </div>
      </main>
    </Template>
  )
}
