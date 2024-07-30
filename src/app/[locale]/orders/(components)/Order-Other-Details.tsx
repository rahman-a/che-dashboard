'use client'
import * as React from 'react'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import { getLangDir } from 'rtl-detect'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Order } from '@/types'

export interface IOrderOtherDetailsProps {}

export function OrderOtherDetails(props: IOrderOtherDetailsProps) {
  const [loading, setLoading] = React.useState<boolean>(false)
  const form = useFormContext<Order>()
  const t = useTranslations()
  const locale = useLocale()
  const invoice = form.watch('invoice')
  const generateInvoiceLink = () => {
    if (invoice) return
    setLoading(true)
    setTimeout(() => {
      form.setValue('invoice', 'http://localhost:3000/invoices/12')
      setLoading(false)
    }, 2000)
  }
  return (
    <div className='flex flex-col space-y-4 py-4'>
      <div className='flex flex-col md:flex-row gap-4'>
        <FormField
          control={form.control}
          name='state'
          render={({ field }) => (
            <FormItem className='w-full lg:w-6/12'>
              <FormLabel htmlFor='category'>{t('order_category')}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  dir={getLangDir(locale)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('choose_order_category')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='uncompleted' defaultChecked>
                      {t('non_completed_orders')}
                    </SelectItem>
                    <SelectItem value='completed'>
                      {t('completed_orders')}
                    </SelectItem>
                    <SelectItem value='canceled'>
                      {t('canceled_orders')}
                    </SelectItem>
                    <SelectItem value='returned'>
                      {t('returned_orders')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem className='w-full lg:w-6/12'>
              <FormLabel htmlFor='status'>{t('order_status_single')}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  dir={getLangDir(locale)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('choose_order_status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='new' defaultChecked>
                      {t('new')}
                    </SelectItem>
                    <SelectItem value='cut'>{t('cut')}</SelectItem>
                    <SelectItem value='sewed'>{t('sewed')}</SelectItem>
                    <SelectItem value='delivered'>{t('delivered')}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='flex flex-col md:flex-row items-center gap-4'>
        <FormField
          control={form.control}
          name='priority'
          render={({ field }) => (
            <FormItem className='w-full lg:w-6/12'>
              <FormLabel htmlFor='priority'>{t('order_priority')}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  dir={getLangDir(locale)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('choose_order_priority')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='important' defaultChecked>
                      {t('important')}
                    </SelectItem>
                    <SelectItem value='urgent'>{t('urgent')}</SelectItem>
                    <SelectItem value='contact'>{t('contact')}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='payment'
          render={({ field }) => (
            <FormItem className='w-full lg:w-6/12'>
              <FormLabel htmlFor='payment'>{t('payment_status')}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  dir={getLangDir(locale)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('choose_payment_status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='unpaid' defaultChecked>
                      {t('unpaid')}
                    </SelectItem>
                    <SelectItem value='paid'>{t('paid')}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='flex flex-col space-y-2 w-full md:w-5/12'>
        <p>{invoice ? t('invoice_link') : t('invoice_link_generate')}</p>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <div className='flex items-center px-4 w-full h-10 border border-gray-200 rounded-md'>
            {invoice ? (
              <Link
                className='w-full text-sky-700 hover:text-sky-600'
                href={invoice}
              >
                {invoice}
              </Link>
            ) : (
              <p className='w-full text-gray-400'>
                {t('invoice_link_generate')}
              </p>
            )}
          </div>
          <Button
            disabled={loading}
            onClick={generateInvoiceLink}
            type='button'
            variant='outline'
            size='icon'
            className={invoice && 'hidden'}
          >
            {loading ? (
              <Loader2 size={20} className='animate-spin' />
            ) : (
              <RefreshCcw size={20} />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
