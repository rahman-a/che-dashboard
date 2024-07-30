'use client'
import { Separator } from '@/components/ui/separator'
import { Order } from '@/types'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

type Props = {}

export function NewOrderPayment({}: Props) {
  const t = useTranslations()
  const orderFormContext = useFormContext<Order>()
  const products = useWatch({
    name: 'products',
    defaultValue: [],
    control: orderFormContext.control,
  })
  const discount = useWatch({
    name: 'discount',
    defaultValue: {
      type: 'amount',
      value: 0,
      reason: '',
    },
    control: orderFormContext.control,
  })
  const shipping = useWatch({
    name: 'shipping',
    defaultValue: {
      value: 0,
      reason: '',
    },
    control: orderFormContext.control,
  })
  const paidByCustomer = useWatch({
    name: 'paidByCustomer',
    defaultValue: 0,
    control: orderFormContext.control,
  })
  const calculateProductsQuantity = products.reduce(
    (acc, product) => acc + parseInt(product.quantity as unknown as string),
    0
  )
  const calculatePrice = useMemo(() => {
    const price = products.reduce((acc, product) => acc + product.total, 0)
    orderFormContext.setValue('price', parseFloat(price.toFixed(2)))
    return price
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const calculateTotal = useMemo(() => {
    if (
      discount.value === undefined ||
      shipping.value === undefined ||
      calculatePrice === 0
    )
      return 0
    let total = calculatePrice
    if (discount.type === 'amount') {
      total -= discount.value!
    } else {
      total -= (discount.value! / 100) * calculatePrice
    }
    total += parseFloat(shipping.value! as unknown as string)
    orderFormContext.setValue('total', parseFloat(total.toFixed(2)))
    return total
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatePrice, discount, shipping])
  return (
    <section className='flex flex-col space-y-3 py-4 px-1'>
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('price')}</h3>
        <h3 className='pl-[1.2rem] rtl:pr-[1.2rem] rtl:pl-0'>
          {t('no_of_items', { count: calculateProductsQuantity })}
        </h3>
        <h3 className=''>
          {calculatePrice.toFixed(2)} {t('kw')}
        </h3>
      </div>
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('discount')}</h3>
        <h3 className=''>{discount.reason}</h3>
        <h3 className=''>
          {discount.value} {discount.type === 'amount' ? t('kw') : '%'}
        </h3>
      </div>
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('shipping')}</h3>
        <h3 className=''>{shipping.reason}</h3>
        <h3 className=''>
          {shipping.value} {t('kw')}
        </h3>
      </div>
      <div className='flex items-center justify-between w-full'>
        <h3 className='font-semibold'>{t('total')}</h3>
        <h3 className='font-semibold'>
          {calculateTotal?.toFixed(2)} {t('kw')}
        </h3>
      </div>
      <Separator />
      <div className='flex items-center justify-between w-full'>
        <h3 className=''>{t('paid_by_customer')}</h3>
        <h3 className=''>
          {paidByCustomer} {t('kw')}
        </h3>
      </div>
    </section>
  )
}
