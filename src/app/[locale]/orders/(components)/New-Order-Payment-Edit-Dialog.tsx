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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'

export interface NewOrderPaymentEditDialogProps {}

export function NewOrderPaymentEditDialog(
  props: NewOrderPaymentEditDialogProps
) {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className='self-end flex w-full'
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-full space-x-2 rtl:flex-row-reverse rtl:space-x-reverse'
          >
            <Edit className='w-4 h-4 cursor-pointer' />
            <span>{t('edit')}</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        aria-describedby='create new customer'
      >
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            <p>{t('payment_details_edit')}</p>
          </DialogTitle>
        </DialogHeader>
        <NewOrderPaymentEdit />
        <DialogFooter className='flex-row justify-end space-x-2'>
          <DialogClose asChild>
            <Button variant='secondary'>{t('cancel')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  discountValue: z.coerce.number(),
  discountReason: z.string().min(2),
  shippingValue: z.coerce.number(),
  shippingReason: z.string().min(2),
  paidByCustomer: z.coerce.number(),
})

function NewOrderPaymentEdit() {
  const t = useTranslations()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discountValue: 0,
      discountReason: '',
      shippingValue: 0,
      shippingReason: '',
      paidByCustomer: 0,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('Form Data: ', data)
  }
  return (
    <section className='flex max-h-72 overflow-y-auto flex-col space-y-3 py-4 px-1'>
      <Form {...form}>
        <form action='' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-4'>
            <FormField
              control={form.control}
              name='discountValue'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('discount_value')}</FormLabel>
                  <FormControl>
                    <Input
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      placeholder={t('discount_value')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discountReason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('discount_reason')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('discount_reason')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
          </div>
          <div className='flex flex-col space-y-4 mt-2'>
            <FormField
              control={form.control}
              name='shippingValue'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('shipping_value')}</FormLabel>
                  <FormControl>
                    <Input
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      placeholder={t('shipping_value')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='shippingReason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('shipping_reason')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('shipping_reason')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
          </div>
          <div className='flex flex-col space-y-4 mt-2'>
            <FormField
              control={form.control}
              name='paidByCustomer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('paid_by_customer')}</FormLabel>
                  <FormControl>
                    <Input
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      placeholder={t('paid_by_customer')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full justify-end mt-2 py-2'>
            <Button
              type='submit'
              className='ml-2 bg-transparent border border-slate-950 text-slate-950 
                  hover:bg-slate-950 hover:text-slate-50 py-0 h-8'
            >
              {t('submit')}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
