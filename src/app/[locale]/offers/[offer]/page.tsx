import { Template } from '@/components'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { OfferChoices } from '../(components)'
import { ChoiceOptions } from '../(data)/data'
import { offerSchema } from '@/schema'
import { offerExample, offerProducts } from '@/demo/data/offers'

export const metadata: Metadata = {
  title: 'RB - Update Offer',
  description: 'RB - Update Offer',
}

type Props = {}

async function getOffer(t: any) {
  return offerSchema(t).parse(offerExample)
}

export default async function OfferPage({}: Props) {
  const t = await getTranslations()
  const offer = await getOffer(t)
  console.log('Offer: ', offer)
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
          border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <h1 className='text-3xl font-light tracking-wide py-4'>
            {t('update_offer')}
          </h1>
          <OfferChoices products={offerProducts} mode='update' data={offer} />
        </div>
      </main>
    </Template>
  )
}
