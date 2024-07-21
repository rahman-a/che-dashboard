import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { CustomerInfo, CustomerAddress } from './'
import { Customer } from '@/types'
import { useTranslations } from 'next-intl'

export interface ICustomerCreationProps {
  customer?: Customer
  customerStep?: 'info' | 'address'
  setCustomerStep?: (step: 'info' | 'address') => void
  mode?: 'create' | 'edit'
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  address: z.object({
    country: z.string().min(2, {
      message: 'Please enter a valid country.',
    }),
    governorate: z.string().min(2, {
      message: 'Please enter a valid governorate.',
    }),
    region: z.string().min(2, {
      message: 'Please enter a valid region.',
    }),
    block: z
      .string()
      .min(2, {
        message: 'Please enter a valid Block.',
      })
      .optional(),
    street: z
      .string()
      .min(2, {
        message: 'Please enter a valid street address.',
      })
      .optional(),
    neighborhood: z
      .string()
      .min(2, {
        message: 'Please enter a valid Neighborhood.',
      })
      .optional(),
    building: z
      .string()
      .min(2, {
        message: 'Please enter a valid Building.',
      })
      .optional(),
    floor: z
      .string()
      .min(2, {
        message: 'Please enter a valid floor.',
      })
      .optional(),
    apartment: z
      .string()
      .min(5, {
        message: 'Please enter a valid apartment.',
      })
      .optional(),
    note: z.string().optional(),
  }),
})

export function CustomerFullData({
  customer,
  customerStep,
  setCustomerStep,
}: ICustomerCreationProps) {
  const t = useTranslations()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: customer?.name || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      address: {
        country: customer?.address.country || '',
        governorate: customer?.address.governorate || '',
        region: customer?.address.region || '',
        block: customer?.address.block || '',
        street: customer?.address.street || '',
        neighborhood: customer?.address.neighborhood || '',
        building: customer?.address.building || '',
        floor: customer?.address.floor || '',
        apartment: customer?.address.apartment || '',
        note: customer?.address.note || '',
      },
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form Data: ', data)
  }
  const toggleComponentDisplay = (step: string): boolean => {
    if (customerStep !== undefined) {
      return customerStep === step
    }
    return true
  }
  return (
    <Form {...form}>
      <form
        action=''
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-between space-y-2 p-2 
            w-full min-h-32 bg-slate-200 rounded-sm max-h-72 overflow-y-auto'
      >
        <CustomerInfo isCurrent={toggleComponentDisplay('info')} />
        <CustomerAddress isCurrent={toggleComponentDisplay('address')} />
        <div className='flex w-full justify-end py-2'>
          <Button
            type='submit'
            className={cn(
              `hidden ml-2 bg-transparent border border-slate-950 text-slate-950 
                  hover:bg-slate-950 hover:text-slate-50 py-0 h-8`,
              {
                flex: customerStep === 'address',
              }
            )}
          >
            {t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
