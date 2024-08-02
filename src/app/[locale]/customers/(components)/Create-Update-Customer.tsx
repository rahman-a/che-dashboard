'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLocale, useTranslations } from 'next-intl'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowRight, Blocks, Link } from 'lucide-react'
import { customerSchema } from '@/schema'
import { Customer, CustomerAddress } from '@/types'
import { CustomerFullData } from '@/components/Customers'
import { cn } from '@/lib/utils'


interface ICreateUpdateCustomerProps {
  mode: 'create' | 'update'
  data?: Customer
}

export function CreateUpdateCustomer({
  mode,
  data,
}: ICreateUpdateCustomerProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [customerStep, setCustomerStep] = React.useState<'info' | 'address'>(
    'info'
  )

  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema(t)),
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      address: (data?.address as CustomerAddress[])?.find(ad => ad.primary) ||  {
        country: '',
        governorate: '',
        region: '',
        block: '',
        street: '',
        neighborhood: '',
        building: '',
        floor: '',
        apartment: '',
        type: 'home',
        primary: false,
        note: '',
      },
    },
  })

  const onSubmitHandler = form.handleSubmit((data: Customer) => {
    console.log('ahmed customer',data)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button
            variant='outline'
            className='flex items-center justify-center 
            space-x-2 rtl:space-x-reverse'
          >
            <Blocks className='w-5 h-5' />
            <span>{t('create_new_customer')}</span>
          </Button>
        ) : (
          <Button
            variant='outline'
            className='w-full cursor-pointer rtl:flex-row-reverse justify-start space-x-1 rtl:space-x-reverse'
          >
            <Link className='h-4 w-4' />
            <span>{t('edit')}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        aria-describedby='create new customer'
      >
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2 rtl:space-x-reverse'>
            {customerStep === 'address' && (
              <Button
                asChild
                variant='outline'
                size='icon'
                type='button'
                onClick={() => setCustomerStep('info')}
              >
                {locale === 'ar' ? (
                  <ArrowRight className='h-5 w-5 cursor-pointer' />
                ) : (
                  <ArrowLeft className='h-5 w-5 cursor-pointer' />
                )}
              </Button>
            )}
            <p>
              {customerStep === 'info'
                ? t('customer_info')
                : t('customer_address')}
            </p>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmitHandler}>
            <CustomerFullData
              mode='create'
              customerStep={customerStep}
              setCustomerStep={setCustomerStep}
            />
            <DialogFooter className='flex-row justify-end space-x-2 mt-2'>
              <Button
                onClick={() => {
                  setCustomerStep('address')
                }}
                variant='outline'
                type='button'
                className={cn(`hidden ml-2`, {
                  flex: customerStep === 'info',
                })}
              >
                {t('next')}
              </Button>
              <Button
                type='submit'
                className={cn(`hidden ml-2`, {
                  flex: customerStep === 'address',
                })}
              >
                {t('submit')}
              </Button>
              <DialogClose dir='rtl' asChild>
                <Button type='button' variant='secondary'>
                  {t('cancel')}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
