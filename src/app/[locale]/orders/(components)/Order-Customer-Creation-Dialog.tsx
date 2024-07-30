'use client'
import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowLeft, ArrowRight, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CustomerFullData } from '@/components/Customers'
import { useLocale, useTranslations } from 'next-intl'
import { useForm, useFormContext } from 'react-hook-form'
import { Customer, Order } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerSchema } from '@/schema'
import { Form } from '@/components/ui/form'

export interface ICustomerCreationDialogProps {}

export function NewOrderCustomerCreationDialog(
  props: ICustomerCreationDialogProps
) {
  const orderCustomerForm = useFormContext<Order>()
  const t = useTranslations()
  const locale = useLocale()
  const [customerStep, setCustomerStep] = React.useState<'info' | 'address'>(
    'info'
  )

  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: {
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
    console.log(data)
    orderCustomerForm.setValue('customer', data)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className='flex rtl:flex-row-reverse items-center text-sm cursor-pointer
        bg-transparent hover:bg-transparent border-none 
        h-auto px-2 py-1.5 space-x-1 rtl:space-x-reverse rounded-sm hover:bg-gray-100'
          onClick={(e) => e.stopPropagation()}
        >
          <PlusCircle className='h-5 w-5 text-muted-foreground' />
          <span>{t('new_customer')}</span>
        </div>
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
