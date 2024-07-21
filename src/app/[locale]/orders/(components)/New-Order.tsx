'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Edit, FolderTree } from 'lucide-react'
import { OrderAccordionOptions } from './Order-Accordion-Options'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ProductNote } from '@/components/Products'
import {
  NewOrderProducts,
  NewOrderCustomer,
  NewOrderPayment,
  NewOrderNote,
  NewOrderCustomerCreationDialog,
  NewOrderCustomerListDialog,
  NewOrderPaymentEditDialog,
  NewOrderProductsListDialog,
} from './'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
type Props = {}

export function NewOrder({}: Props) {
  const t = useTranslations()
  return (
    <Accordion
      type='multiple'
      defaultValue={['products']}
      className='w-full space-y-5'
    >
      <AccordionItem value='products'>
        <AccordionTrigger className='bg-gray-200 rounded-md border border-gray-300 px-2'>
          <span>{t('products')}</span>
          <OrderAccordionOptions>
            <DropdownMenuItem asChild>
              <NewOrderProductsListDialog />
            </DropdownMenuItem>
          </OrderAccordionOptions>
        </AccordionTrigger>
        <AccordionContent>
          <NewOrderProducts />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='customer'>
        <AccordionTrigger className='bg-gray-200 rounded-md border border-gray-300 px-2'>
          <span>{t('customers')}</span>
          <OrderAccordionOptions>
            <DropdownMenuItem asChild>
              <NewOrderCustomerListDialog />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NewOrderCustomerCreationDialog />
            </DropdownMenuItem>
          </OrderAccordionOptions>
        </AccordionTrigger>
        <AccordionContent>
          <NewOrderCustomer />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='payment'>
        <AccordionTrigger className='bg-gray-200 rounded-md border border-gray-300 px-2'>
          <span>{t('payment')}</span>
          <OrderAccordionOptions>
            <DropdownMenuItem className='p-0' asChild>
              <NewOrderPaymentEditDialog />
            </DropdownMenuItem>
          </OrderAccordionOptions>
        </AccordionTrigger>
        <AccordionContent>
          <NewOrderPayment />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='note'>
        <AccordionTrigger className='bg-gray-200 rounded-md border border-gray-300 px-2'>
          {t('note')}
        </AccordionTrigger>
        <AccordionContent>
          <NewOrderNote />
          {/* <ProductNote
            btnClassName='mt-4 w-full h-20 flex items-center justify-center 
          bg-transparent rounded-md border border-gray-300 border-dashed'
          /> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
