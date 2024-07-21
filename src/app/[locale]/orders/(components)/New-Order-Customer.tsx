import React from 'react'
import { AsyncSelectInput } from '@/components'
import { AsyncDataOptions, colourOptions } from '@/demo/data/async-select-data'
import { OrderCustomerData } from './'
import { useTranslations } from 'next-intl'

type Props = {}

export function NewOrderCustomer({}: Props) {
  const t = useTranslations()
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
          placeholder={t('search_customers_placeholder')}
          loadedData={promiseOptions}
          onChange={(value) => console.log(value)}
        />
        <div className='flex flex-col space-y-2'>
          <OrderCustomerData />
        </div>
      </div>
    </section>
  )
}
