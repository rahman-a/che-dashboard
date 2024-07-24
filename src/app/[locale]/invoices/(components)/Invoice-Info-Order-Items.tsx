import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { InvoiceNoteViewDialog } from './'
import { useTranslations } from 'next-intl'
export interface IInvoiceInfoOrderItemsProps {}

const productsData = [
  {
    id: 1,
    product: 'Product 1',
    status: 'new',
    quantity: 1,
    amount: 100,
    note: 'Note 1',
  },
  {
    id: 2,
    product: 'Product 2',
    status: 'new',
    quantity: 1,
    amount: 100,
    note: 'Note 2',
  },
  {
    id: 3,
    product: 'Product 3',
    status: 'new',
    quantity: 1,
    amount: 100,
    note: 'Note 3',
  },
]

type ValidStatusKeys = 'new' | 'cut' | 'sewed' | 'delivered'

export function InvoiceInfoOrderItems(props: IInvoiceInfoOrderItemsProps) {
  const t = useTranslations()
  return (
    <div className='bg-gray-100 w-full text-black p-4 shadow-sm rounded-lg'>
      <div className='flex flex-col space-y-2 w-[85vw] lg:w-full overflow-auto'>
        <h3 className='font-semibold'>{t('order_items')}</h3>
        <Table className='min-w-[40rem]'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px] rtl:text-right'>
                {t('product')}
              </TableHead>
              <TableHead className='rtl:text-right'>{t('status')}</TableHead>
              <TableHead className='rtl:text-right'>{t('quantity')}</TableHead>
              <TableHead className='rtl:text-right'>{t('total')}</TableHead>
              <TableHead className='rtl:text-right'>{t('note')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.product}</TableCell>
                <TableCell>{t(product.status as ValidStatusKeys)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>
                  <InvoiceNoteViewDialog />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
