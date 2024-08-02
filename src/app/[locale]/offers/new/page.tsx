import { Template } from '@/components'
import React from 'react'
import { OfferChoices } from '../(components)'
import { offerProducts } from '@/demo/data/offers'

type Props = {}

export default function NewOffers({}: Props) {
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <OfferChoices products={offerProducts} mode='create' />
        </div>
      </main>
    </Template>
  )
}
