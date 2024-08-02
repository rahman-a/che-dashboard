'use client'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addDays, format, differenceInDays } from 'date-fns'
import { enUS, arEG } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { useLocale, useTranslations } from 'next-intl'
import { Label } from '@/components/ui/label'
import { RequiredAsterisk } from '@/components'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { offerSchema } from '@/schema'
import { Offer } from '@/types'

// ...

export interface IOfferChoicesProps {
  mode: 'create' | 'update'
  products: {
    id: string
    name: string
  }[]
  data?: Offer
}

export function OfferChoices({ products, mode, data }: IOfferChoicesProps) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useForm<Offer>({
    resolver: zodResolver(offerSchema(t)),
    defaultValues: {
      firstChoice: data?.firstChoice || [],
      secondChoice: data?.secondChoice || [],
      thirdChoice: data?.thirdChoice || [],
      price: data?.price || 0,
      discount: {
        type: data?.discount.type || 'amount',
        value: data?.discount.value || 0,
      },
      status: data?.status || 'active',
      expiryDate: data?.expiryDate
        ? new Date(data?.expiryDate)
        : addDays(new Date(), 7),
    },
  })

  const options: { value: string; label: string }[] = products.map(
    (product) => ({
      value: product.id,
      label: product.name,
    })
  )

  const getProduct = (ids: string[]) => {
    return products.filter((product) => ids.includes(product.id))
  }

  const getDefaultedValues = (values: any) => {
    if (mode === 'update') {
      return values.map((value: any) => value.id)
    }
    return values
  }

  const onSubmit = form.handleSubmit((data) => {
    console.log('Offer Choices: ', data)
  })
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='w-full'>
        <div
          className='absolute hidden md:block top-24 lg:top-28 right-8 
        rtl:left-8 rtl:right-auto'
        >
          <Button type='submit' className='w-full'>
            {mode === 'create' ? (
              <span>{t('create_offer')}</span>
            ) : (
              <span>{t('update_offer')}</span>
            )}
          </Button>
        </div>
        <section className='flex flex-col space-y-5'>
          <div className='flex flex-col space-y-5 bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold'>{t('offer_choices')}</h2>
            <FormField
              control={form.control}
              name='firstChoice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('first_choice')}
                    <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      defaultValue={getDefaultedValues(field.value)}
                      onValueChange={(value) =>
                        field.onChange(getProduct(value))
                      }
                      placeholder={t('select_products_for_offer')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='secondChoice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('second_choice')}
                    <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      defaultValue={getDefaultedValues(field.value)}
                      onValueChange={(value) =>
                        field.onChange(getProduct(value))
                      }
                      placeholder={t('select_products_for_offer')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='thirdChoice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('third_choice')}
                    <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      defaultValue={getDefaultedValues(field.value)}
                      onValueChange={(value) =>
                        field.onChange(getProduct(value))
                      }
                      placeholder={t('select_products_for_offer')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col space-y-5 bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold'>{t('offer_pricing')}</h2>
            <div className='w-full lg:w-6/12 flex flex-col space-y-3'>
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
              name='price'
              render={({ field }) => (
                <FormItem className='w-full lg:w-6/12'>
                  <FormLabel htmlFor='price'>
                    {t('price')}
                    <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      onChange={field.onChange}
                      placeholder={t('enter_product_price')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col space-y-5 bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold'>{t('offer_settings')}</h2>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='w-full lg:w-6/12'>
                  <FormLabel>
                    {t('status')}
                    <RequiredAsterisk />
                  </FormLabel>
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
              name='expiryDate'
              render={({ field }) => (
                <FormItem className='w-full lg:w-6/12 flex flex-col space-y-2'>
                  <FormLabel>
                    {t('expiry_date')}
                    <RequiredAsterisk />
                  </FormLabel>
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
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={locale === 'en' ? enUS : arEG}
                        disabled={(date) =>
                          date < new Date() || date < new Date('1900-01-01')
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {t('offer_will_expire_on', {
                      date: field.value
                        ? differenceInDays(field.value, new Date()) + 1
                        : 7,
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <div className='block md:hidden my-4'>
          <Button type='submit' className='w-full'>
            {mode === 'create' ? (
              <span>{t('create_offer')}</span>
            ) : (
              <span>{t('update_offer')}</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
