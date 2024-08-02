'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'
import { ProductCardPreview } from '@/components/Products'
import { useLocale, useTranslations } from 'next-intl'
import { OfferChoice } from '../(data)/schema'

type Props = {
  choices: OfferChoice
}

export function OfferItems({ choices }: Props) {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='flex'>
          <List className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='h-[calc(100vw-0)] overflow-y-auto w-full sm:max-w-xl'>
        <section className='flex flex-col'>
          <div className='flex flex-col space-y-2 py-4'>
            <h2 className='text-2xl font-semibold my-4'>{t('first_choice')}</h2>
            {choices.firstChoice.map((choice, index) => (
              <ProductCardPreview key={choice.id} data={choice} />
            ))}
          </div>
          <div className='flex flex-col space-y-2 py-4'>
            <h2 className='text-2xl font-semibold my-4'>
              {t('second_choice')}
            </h2>
            {choices.secondChoice.map((choice, index) => (
              <ProductCardPreview key={choice.id} data={choice} />
            ))}
          </div>
          <div className='flex flex-col space-y-2 py-4'>
            <h2 className='text-2xl font-semibold my-4'>{t('third_choice')}</h2>
            {choices.thirdChoice.map((choice, index) => (
              <ProductCardPreview key={choice.id} data={choice} />
            ))}
          </div>
        </section>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit' className='hover:bg-primary'>
              {t('close')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
