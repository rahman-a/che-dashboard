import * as React from 'react'
import { CustomerShippingAddress } from '@/components/Customers'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { orderCostumerExample } from '@/demo/data/orders'

export interface IInvoicePreviewProps {
  className?: string
  id?: string
}

export const InvoicePreview = React.forwardRef<
  HTMLDivElement,
  IInvoicePreviewProps
>(function InvoicePreview({ className, id }, ref) {
  const t = useTranslations()
  return (
    <div
      id={id}
      className={cn(`flex flex-col space-y-5 py-6`, className)}
      ref={ref}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>{t('invoice')} #85412</h2>
        <Badge className='text-sm font-semibold text-black border bg-gray-200'>
          {t('important')}
        </Badge>
      </div>
      <div className='flex items-center justify-between'>
        <CustomerShippingAddress
          data={orderCostumerExample.address[0]}
          className='[&_ul]:text-sm [&_ul]:space-y-1.5 [&_ul]:text-gray-500'
        />
        <div
          className='flex items-center justify-center 
        w-28 h-20 md:h-24 lg:h-28 rounded-full border border-dashed border-gray-400 bg-gray-200'
        >
          <p className='text-red-700 font-semibold text-xl'>{t('unpaid')}</p>
          {/* <p className='text-green-700 font-semibold text-xl'>{t("paid")}</p> */}
        </div>
      </div>

      <div className='w-full'>
        <h3 className='font-bold'>{t('order_items')}:</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                id='product-sku-invoice-print'
                colSpan={3}
                className='w-[100px] rtl:text-right'
              >
                SKU
              </TableHead>
              <TableHead
                id='product-quantity-invoice-print'
                className='text-right rtl:text-left text-black font-bold'
              >
                {t('quantity')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>S10-50</TableCell>
              <TableCell className='flex justify-end text-[17px] font-bold'>
                <span
                  className='flex items-center justify-center w-8 h-8 
                rounded-full bg-gray-200 lg:bg-gray-300 invoice-quantity-value'
                >
                  5
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>S12-65</TableCell>
              <TableCell className='flex justify-end text-[17px] font-bold'>
                <span
                  className='flex items-center justify-center w-8 h-8 
                rounded-full bg-gray-200 lg:bg-gray-300 invoice-quantity-value'
                >
                  3
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>S14-25</TableCell>
              <TableCell className='flex justify-end text-[17px] font-bold'>
                <span
                  className='flex items-center justify-center w-8 h-8 
                rounded-full bg-gray-200 lg:bg-gray-300 invoice-quantity-value'
                >
                  8
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className='font-semibold'>
                {t('total')}
              </TableCell>
              <TableCell
                id='product-total-invoice-print'
                className='text-right rtl:text-left font-semibold'
              >
                $2,500.00
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className='w-full flex flex-col space-y-4'>
        <div className='flex flex-col space-y-2'>
          <h3 className='font-bold'>{t('order_note')}:</h3>
          <p className='text-sm text-gray-600'>{t('note_example')}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <h3 className='font-bold'>{t('delivery_note')}:</h3>
          <p className='text-sm text-gray-600'>{t('note_example')}</p>
        </div>
      </div>
    </div>
  )
})
