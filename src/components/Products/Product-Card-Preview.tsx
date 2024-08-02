'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import abaya from '@/images/demo/products/abaya_1.png'
import { ProductNote } from './'
import { OrderProduct } from '@/types'

type ProductCardPreviewProps = {
  data?: OrderProduct
  className?: string
  note?: string
}

export function ProductCardPreview({
  data,
  className,
  note,
}: ProductCardPreviewProps) {
  const t = useTranslations()
  return (
    <section>
      <div
        className={cn(
          `w-full max-w-screen-2xl flex items-start justify-between bg-primary/10 p-2 rounded-md`,
          className
        )}
      >
        <div className='flex space-x-3'>
          <figure
            className='w-14 p-2 bg-white flex items-center 
          justify-center rounded-md rtl:ml-3'
          >
            <Image
              src={data?.image ?? abaya}
              alt={data?.name ?? 'abaya'}
              width={25}
              height={25}
              className='object-contain'
            />
          </figure>
          <div className='flex flex-col justify-evenly space-y-2'>
            <h2
              className={cn(
                'flex items-center text-[11px] font-semibold md:font-light md:text-base'
              )}
            >
              {data?.name ?? t('product_name_example')}
            </h2>
            <p className='flex items-center text-xs md:text-md space-x-1 tracking-wide'>
              <span>{t('order_quantity')}:</span>
              <span>{data?.quantity ?? 12}</span>
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center space-y-2 mt-2 px-2'>
          <h3 className='text-xs md:text-sm tracking-wide w-max mb-2'>
            {data?.total} {t('kw')}
          </h3>
          <div className='w-full flex items-center justify-end space-x-2 text-primary rtl:space-x-reverse'>
            <ProductNote
              btnClassName='rtl:ml-2'
              mode='view'
              note={data?.note ?? note}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
