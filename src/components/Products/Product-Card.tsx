'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  Control,
  useFormContext,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
import { cn } from '@/lib/utils'
import abaya from '@/images/demo/products/abaya_1.png'
import { ProductNote, ProductCardEdit } from './'
import { DeleteBtnPopover } from '../'
import { Separator } from '../ui/separator'
import { OrderProduct, Order } from '@/types'
import { orderProductExample } from '@/demo/data/orders'
import uuid from 'react-uuid'
import { CheckCheck } from 'lucide-react'

type Props = {
  data?: OrderProduct
  keyIndex?: number
  className?: string
  mode: 'view' | 'edit'
  note?: string
  isSelectMode?: boolean
}

export function ProductCard({
  data,
  className,
  mode,
  note,
  keyIndex,
  isSelectMode,
}: Props) {
  const [isSelected, setIsSelected] = React.useState(false)
  const [productTotal, setProductTotal] = React.useState(0)
  const form = useFormContext<Order>()
  const products = useWatch({
    control: form.control,
    name: 'products',
    defaultValue: [],
  })
  const t = useTranslations()

  const removeProduct = () => {
    form.setValue(
      'products',
      form.getValues('products').filter((product) => product.id !== data?.id)
    )
  }

  const setProduct = () => {
    form.setValue('products', [
      ...form.getValues('products'),
      {
        ...orderProductExample,
        id: uuid(),
      },
    ])
    setIsSelected(true)
  }

  const renderActionsComponents = () => {
    if (isSelectMode) {
      return (
        <button
          onClick={setProduct}
          className='flex items-center justify-center text-sky-700 min-w-12 hover:bg-gray-100 p-1 rounded-sm'
        >
          {isSelected ? <CheckCheck size={18} /> : t('select')}
        </button>
      )
    } else {
      return (
        <>
          {mode === 'edit' && (
            <ProductCardEdit keyIndex={keyIndex} id={data?.id} />
          )}
          <ProductNote
            btnClassName='rtl:ml-2'
            mode={mode}
            note={data?.note ?? note}
            registerKey={`products.${keyIndex}.note`}
          />
          {mode === 'edit' && (
            <DeleteBtnPopover
              onClick={removeProduct}
              className='w-44 rtl:w-36'
            />
          )}
        </>
      )
    }
  }

  React.useEffect(() => {
    if (productTotal && data && products.length > 0) {
      const updatedProducts = products.map((product) => {
        if (product.id === data?.id) {
          return {
            ...product,
            total: parseFloat(productTotal.toFixed(2)),
          }
        }
        return product
      })
      form.setValue('products', updatedProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productTotal])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsSelected(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [isSelected])
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
                'flex items-center text-[11px] md:text-sm font-semibold md:font-light',
                mode === 'view' ? 'md:text-base' : 'md:text-lg',
                isSelectMode && 'md:text-base max-w-72'
              )}
            >
              {data?.name ?? t('product_name_example')}
            </h2>
            {mode === 'view' && (
              <p className='flex items-center text-xs md:text-md space-x-1 tracking-wide'>
                <span>{t('order_quantity')}:</span>
                <span>{data?.quantity ?? 12}</span>
              </p>
            )}
          </div>
        </div>

        <div
          className={cn(`flex flex-col items-center space-y-2 mt-2 px-2`, {
            'space-y-0 mt-0': isSelectMode,
          })}
        >
          <ProductCardTotal
            setProductTotal={setProductTotal}
            products={products}
            total={data?.total ?? 0}
            id={data?.id ?? ''}
          />
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

const ProductCardTotal = ({
  products,
  id,
  setProductTotal,
  total,
}: {
  products: OrderProduct[]
  setProductTotal: React.Dispatch<React.SetStateAction<number>>
  id: string
  total: number
}) => {
  const t = useTranslations()

  const calculateProductTotal = useMemo(() => {
    if (!id) return 50.0
    const product = products.find((p) => p.id === id)
    let calculatedTotal = total
    if (product) {
      calculatedTotal = product.quantity * product.price
      if (product.discount.type === 'amount') {
        calculatedTotal -= product.discount.value!
      } else {
        calculatedTotal -= (calculatedTotal * product.discount.value!) / 100
      }
    }
    return calculatedTotal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  React.useEffect(() => {
    setProductTotal(calculateProductTotal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateProductTotal])
  return (
    <h3 className={cn('text-xs md:text-sm tracking-wide w-max mb-2')}>
      {parseFloat(calculateProductTotal.toFixed(2))} {t('kw')}
    </h3>
  )
}
