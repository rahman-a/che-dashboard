'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import uuid from 'react-uuid'
import { AsyncSelectInput } from '@/components'
import { AsyncDataOptions, colourOptions } from '@/demo/data/async-select-data'
import { ProductCard } from '@/components/Products'
import { Order } from '@/types'
import { orderProductExample } from '@/demo/data/orders'

type Props = {}

export function NewOrderProducts(props: Props) {
  const orderDataForm = useFormContext<Order>()
  const t = useTranslations()

  const products = orderDataForm.watch('products')

  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  const promiseOptions = (inputValue: string) =>
    new Promise<AsyncDataOptions[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue))
      }, 500)
    })
  return (
    <section className='py-4 px-1'>
      <div className='flex flex-col space-y-4'>
        <AsyncSelectInput
          className='w-80'
          placeholder={t(`search_products_placeholder`)}
          loadedData={promiseOptions}
          onChange={(value) =>
            orderDataForm.setValue('products', [
              ...orderDataForm.getValues('products'),
              {
                ...orderProductExample,
                id: uuid(),
              },
            ])
          }
        />
        <div className='flex flex-col space-y-2'>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              data={product}
              mode='edit'
              keyIndex={index}
              className='bg-transparent border'
            />
          ))}
        </div>
      </div>
    </section>
  )
}
