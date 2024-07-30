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
import { useForm, useFormContext } from 'react-hook-form'
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
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { Order } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

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
            <Button variant='secondary'>{t('close')}</Button>
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
  const form = useFormContext<Order>()

  return (
    <section className='flex max-h-72 overflow-y-auto flex-col space-y-3 py-4 px-1'>
      <div className='flex flex-col space-y-4'>
        <div className='w-full flex flex-col space-y-3'>
          <Label>{t('discount')}</Label>
          <div className='w-full flex relative items-center'>
            <FormField
              control={form.control}
              name='discount.value'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      onChange={field.onChange}
                      className='w-full h-10 rounded-md rounded-e-none 
                          focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage className='absolute w-full text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discount.type'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className='rounded-s-none rtl:rounded-e-none 
                          rtl:rounded-s-md focus:ring-0 focus:ring-offset-0'
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='amount' defaultChecked>
                          {t('kw')}
                        </SelectItem>
                        <SelectItem value='percentage'>%</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='discount.reason'
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
          name='shipping.value'
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
          name='shipping.reason'
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
    </section>
  )
}
