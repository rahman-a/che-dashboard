'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { OrderAccordionOptions } from './Order-Accordion-Options'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import {
  NewOrderProducts,
  NewOrderCustomer,
  NewOrderPayment,
  NewOrderNote,
  NewOrderCustomerCreationDialog,
  NewOrderCustomerListDialog,
  NewOrderPaymentEditDialog,
  NewOrderProductsListDialog,
  OrderOtherDetails,
} from '.'
import { useTranslations } from 'next-intl'
import { orderSchema } from '@/schema'
import { Order } from '@/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

type Props = {
  mode: 'create' | 'update'
  data?: Order
}

export function CreateUpdateOrder({ mode, data }: Props) {
  const t = useTranslations()
  const form = useForm<Order>({
    resolver: zodResolver(orderSchema(t)),
    defaultValues: {
      id: data?.id || '',
      price: data?.price || 0,
      total: data?.total || 0,
      discount: data?.discount || {
        type: 'amount',
        value: 0,
        reason: '',
      },
      shipping: data?.shipping || {
        value: 0,
        reason: '',
      },
      paidByCustomer: data?.paidByCustomer || 0,
      state: data?.state || 'uncompleted',
      status: data?.status || 'new',
      priority: data?.priority || 'important',
      payment: data?.payment || 'unpaid',
      invoice: data?.invoice || '',
      customer: data?.customer || undefined,
      products: data?.products || [],
      orderNote: data?.orderNote || '',
      deliveryNote: data?.deliveryNote || '',
      createdAt: data?.createdAt || '',
    },
  })
  const errors = form.formState.errors

  const onSubmit = form.handleSubmit((data: Order) => {
    console.log('Final data:', data)
  })

  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMsgs = Object.keys(errors).map(
        (error: string) => errors[error as keyof Order]!.message
      )
      console.log('Errors:', errors)
      errorMsgs.forEach((msg) => toast.error(msg))
    }
  }, [errors])
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='w-full'>
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
              <div
                className='flex flex-col space-x-0 md:flex-row
              items-center md:space-x-5 rtl:space-x-reverse'
              >
                <NewOrderNote registerKey='orderNote' label={t('order_note')} />
                <NewOrderNote
                  registerKey='deliveryNote'
                  label={t('delivery_note')}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='other_details'>
            <AccordionTrigger className='bg-gray-200 rounded-md border border-gray-300 px-2'>
              {t('other_details')}
            </AccordionTrigger>
            <AccordionContent>
              <OrderOtherDetails />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='flex justify-end my-4'>
          <Button type='submit' className='w-full md:w-20'>
            {mode === 'create' ? t('save') : t('edit')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
