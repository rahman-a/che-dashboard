'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import abaya from '@/images/demo/products/abaya_1.png'
import { ProductNote, ProductCardEdit } from './'
import { DeleteBtnPopover } from '../'
import { Button } from 'react-day-picker'
import { Separator } from '../ui/separator'

type Props = {
  className?: string
  isOrder?: boolean
  note?: string
  isSelectMode?: boolean
}

export function ProductCard({ className, isOrder, note, isSelectMode }: Props) {
  const t = useTranslations()
  const renderActionsComponents = () => {
    if (isSelectMode) {
      return (
        <button className='text-sky-700 min-w-12 hover:bg-gray-100 p-1 rounded-sm'>
          {t('select')}
        </button>
      )
    } else {
      return (
        <>
          {!isOrder && <ProductCardEdit />}
          <ProductNote btnClassName='rtl:ml-2' isOrder={isOrder} note={note} />
          {!isOrder && <DeleteBtnPopover className='w-44 rtl:w-36' />}
        </>
      )
    }
  }
  return (
    <section>
      <div
        className={cn(
          `w-full max-w-screen-2xl flex items-start justify-between bg-primary/10 p-2 rounded-md`,
          className,
          {
            'rounded-none bg-transparent p-0': isSelectMode,
          }
        )}
      >
        <div className='flex space-x-3'>
          <figure
            className='w-14 p-2 bg-white flex items-center 
          justify-center rounded-md rtl:ml-3'
          >
            <Image
              src={abaya}
              alt='Abaya'
              width={25}
              height={25}
              className='object-contain'
            />
          </figure>
          <div className='flex flex-col justify-evenly space-y-2'>
            <h2
              className={cn(
                'flex items-center text-[11px] md:text-sm font-semibold md:font-light',
                isOrder ? 'md:text-base' : 'md:text-lg'
              )}
            >
              {t('product_name')}
            </h2>
            {isOrder && (
              <p className='flex items-center text-xs md:text-md space-x-1 tracking-wide'>
                <span>{t('order_quantity')}:</span>
                <span>12</span>
              </p>
            )}
          </div>
        </div>
        <div
          className={cn(`flex flex-col items-center space-y-2 mt-2`, {
            'space-y-0 mt-0': isSelectMode,
          })}
        >
          <h3 className={cn('text-xs md:text-sm tracking-wide w-max mb-2')}>
            50,00 {t('kw')}
          </h3>
          <div
            className={cn(
              'w-full flex items-center justify-end space-x-2 text-primary rtl:space-x-reverse'
            )}
          >
            {renderActionsComponents()}
          </div>
        </div>
      </div>
      {isSelectMode && <Separator className='my-1' />}
    </section>
  )
}
