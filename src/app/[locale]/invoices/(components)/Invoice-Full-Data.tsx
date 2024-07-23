'use client'
import * as React from 'react'
import { usePDF, Margin, Resolution } from 'react-to-pdf'
import { useReactToPrint } from 'react-to-print'
import { InvoiceActions, InvoiceInfo, InvoicePreview } from '.'
import { useLocale } from 'next-intl'

export interface IInvoiceFullDataProps {}

export function InvoiceFullData(props: IInvoiceFullDataProps) {
  const locale = useLocale()
  const { toPDF, targetRef } = usePDF({
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      orientation: 'p',
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
        onclone: (doc: Document) => {
          const ele = doc.getElementById('invoice-full-data') as HTMLDivElement
          const values = doc.querySelectorAll(
            '.invoice-quantity-value'
          ) as NodeListOf<HTMLSpanElement>
          ele.classList.remove('hidden')
          ele.style.width = '800px'
          values.forEach((val) => {
            val.style.backgroundColor = '#e5e7eb'
          })
        },
      },
    },
  })
  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    bodyClass: locale === 'ar' ? 'dir-rtl' : 'dir-ltr',
    onBeforeGetContent: () => {
      const quantityElement = document.getElementById(
        'product-quantity-invoice-print'
      )
      const skuElement = document.getElementById('product-sku-invoice-print')
      const totalElement = document.getElementById(
        'product-total-invoice-print'
      )
      if (quantityElement && skuElement && totalElement && locale === 'ar') {
        quantityElement.classList.remove('text-right')
        quantityElement.classList.add('text-left')
        skuElement.classList.add('text-right')
        totalElement.classList.remove('text-right')
        totalElement.classList.add('text-left')
      }
    },
    onAfterPrint: () => {
      const quantityElement = document.getElementById(
        'product-quantity-invoice-print'
      )
      const skuElement = document.getElementById('product-sku-invoice-print')
      const totalElement = document.getElementById(
        'product-total-invoice-print'
      )
      if (quantityElement && skuElement && totalElement && locale === 'ar') {
        quantityElement.classList.remove('text-left')
        quantityElement.classList.add('text-right')
        skuElement.classList.remove('text-right')
        totalElement.classList.add('text-right')
        totalElement.classList.remove('text-left')
      }
    },
  })
  const getPageMargins = () => {
    return `@page { margin: 2rem !important; }`
  }
  return (
    <>
      <style>{getPageMargins()}</style>
      <InvoiceActions toPDF={toPDF} handlePrint={handlePrint} />
      <section className='grid 2xl:grid-cols-[1fr_500px] w-full gap-2'>
        <div className='w-full mt-10 2xl:mt-0 flex flex-col space-y-5'>
          <InvoiceInfo />
        </div>
        <div
          className='w-full mt-10 lg:mt-1 hidden lg:flex'
          id='invoice-full-data'
        >
          <div className='bg-gray-100 w-full text-black p-4 shadow-sm rounded-lg'>
            <InvoicePreview ref={targetRef} />
          </div>
        </div>
      </section>
    </>
  )
}
