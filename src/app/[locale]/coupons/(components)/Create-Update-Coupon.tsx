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
  FormControl,
  FormDescription,
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
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useLocale, useTranslations } from 'next-intl'
import { DialogClose } from '@radix-ui/react-dialog'
import { BadgePercent, Link, RefreshCcw } from 'lucide-react'
import { couponsSchema } from '@/schema'
import { Coupon } from '@/types'
import { RequiredAsterisk } from '@/components'
import { addDays, format, differenceInDays } from 'date-fns'
import { enUS, arEG } from 'date-fns/locale'
import { Label } from '@/components/ui/label'
import { cn, generateCouponCode } from '@/lib/utils'

export interface ICreateUpdateCouponProps {
  data?: Coupon
  mode: 'create' | 'update'
}

export function CreateUpdateCoupon({ mode, data }: ICreateUpdateCouponProps) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useForm<Coupon>({
    resolver: zodResolver(couponsSchema(t)),
    defaultValues: {
      code: data?.code || '',
      description: data?.description || '',
      discount: {
        type: data?.discount.type || 'percentage',
        value: data?.discount.value || 0,
      },
      timesUsed: data?.timesUsed || 0,
      maxUsed: data?.maxUsed || 1,
      status: data?.status || 'active',
      expireAt: data?.expireAt
        ? new Date(data.expireAt)
        : addDays(new Date(), 7),
    },
  })

  const onSubmitHandler = form.handleSubmit((data: Coupon) => {
    console.log('Coupons Data: ', data)
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
            <BadgePercent className='w-5 h-5' />
            <span>
              {mode === 'create' ? t('create_new_coupon') : t('update_coupon')}
            </span>
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
        className='h-96 overflow-y-auto'
        aria-describedby='create new coupon'
      >
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? t('create_new_coupon') : t('update_coupon')}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={onSubmitHandler}
            className='flex flex-col space-y-6 py-4'
          >
            <div className='flex flex-col space-y-2'>
              <Label>
                {t('coupon_code')}
                <RequiredAsterisk />
              </Label>
              <div className='w-full flex space-x-1 rtl:space-x-reverse'>
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input placeholder={t('type_coupon_code')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => {
                    form.setValue('code', generateCouponCode())
                  }}
                  type='button'
                  variant='outline'
                  size='icon'
                >
                  <RefreshCcw className='w-5 h-5' />
                </Button>
              </div>
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <Label>
                    {t('description')}
                    <RequiredAsterisk />
                  </Label>
                  <FormControl>
                    <Input placeholder={t('type_description')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='w-full flex flex-col space-y-3'>
              <Label>
                {t('discount')}
                <RequiredAsterisk />
              </Label>
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
                            className='w-20 rounded-s-none rtl:rounded-e-none 
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
              name='maxUsed'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel htmlFor='price'>{t('max_used')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      onChange={field.onChange}
                      placeholder={t('define_max_usage')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>{t('status')}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='active'>{t('active')}</SelectItem>
                        <SelectItem value='inactive'>
                          {t('inactive')}
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
              name='expireAt'
              render={({ field }) => (
                <FormItem className='w-full flex flex-col space-y-2'>
                  <FormLabel>{t('expiry_date')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal justify-start ',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <div className='flex items-center'>
                            <CalendarIcon className='mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 opacity-50' />
                            {field.value ? (
                              format(field.value, 'PPP', {
                                locale: locale === 'en' ? enUS : arEG,
                              })
                            ) : (
                              <span>{t('pick_date')}</span>
                            )}
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        locale={locale === 'en' ? enUS : arEG}
                        disabled={(date) =>
                          date < new Date() || date < new Date('1900-01-01')
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {t('coupon_will_expire_on', {
                      date: field.value
                        ? differenceInDays(field.value, new Date()) + 1
                        : 7,
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='flex-row space-x-2 rtl:space-x-reverse justify-end !mt-5'>
              <Button type='submit'>{t('save')}</Button>
              <DialogClose>
                <Button type='button' variant='outline' className='w-full'>
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
