import { AsyncSelectInput } from '@/components'
import { AsyncDataOptions, colourOptions } from '@/demo/data/async-select-data'
import { ProductCard } from '@/components/Products'
import React from 'react'
import { useTranslations } from 'next-intl'

type Props = {}

export function NewOrderProducts({}: Props) {
  const [dataCard, setDataCard] = React.useState(0)
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
          placeholder={t(`search_products_placeholder`)}
          loadedData={promiseOptions}
          onChange={(value) => setDataCard(dataCard + 1)}
        />
        <div className='flex flex-col space-y-2'>
          {Array.from({ length: dataCard }).map((_, index) => (
            <ProductCard key={index} className='bg-transparent border' />
          ))}
        </div>
      </div>
    </section>
  )
}
