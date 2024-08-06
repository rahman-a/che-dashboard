'use client'
import * as React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import uuid from 'react-uuid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
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
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import countries from '@/data/countries.json'
import { RequiredAsterisk } from '@/components'
import { getLangDir } from 'rtl-detect'

export interface IOrderSettingProps {}

// 01222201778

export function OrderSettingForm(props: IOrderSettingProps) {
  const locale = useLocale()
  const t = useTranslations()
  const statusSchema = z.object({
    status: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().min(3, {
            message: t('required_value'),
          }),
          color: z.string().min(3, {
            message: t('required_value'),
          }),
        })
      )
      .max(4, { message: t('max_reached') }),
  })
  const manufactureSchema = z.object({
    id: z.string().optional(),
    pieces: z.number().min(1, {
      message: t('required_value'),
    }),
  })
  const shippingCostSchema = z.object({
    shipping: z.array(
      z.object({
        id: z.string().optional(),
        country: z.string().min(3, {
          message: t('required_value'),
        }),
        cost: z.coerce.number().min(1, {
          message: t('required_value'),
        }),
      })
    ),
  })
  type Status = z.infer<typeof statusSchema>
  type Manufacture = z.infer<typeof manufactureSchema>
  type ShippingCost = z.infer<typeof shippingCostSchema>

  const statusForm = useForm<Status>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: [
        {
          id: uuid(),
          name: '',
          color: '',
        },
      ],
    },
  })
  const manufactureForm = useForm<Manufacture>({
    resolver: zodResolver(manufactureSchema),
    defaultValues: {
      id: uuid(),
      pieces: 10,
    },
  })

  const shippingCostForm = useForm<ShippingCost>({
    resolver: zodResolver(shippingCostSchema),
    defaultValues: {
      shipping: [
        {
          id: uuid(),
          country: '',
          cost: 0,
        },
      ],
    },
  })

  const {
    fields: shippingFields,
    append: appendShipping,
    remove: removeShipping,
  } = useFieldArray({
    control: shippingCostForm.control,
    name: 'shipping',
  })

  const statusWatch = statusForm.watch('status')

  const generateStatus = () => {
    if (statusWatch.length >= 4) return
    const statusValues = statusForm.getValues('status')
    statusForm.setValue('status', [
      ...statusValues,
      {
        id: uuid(),
        name: '',
        color: '',
      },
    ])
  }

  const removeStatus = (id: string) => {
    const statusValues = statusForm.getValues('status')
    if (statusValues.length <= 1) return
    statusForm.setValue(
      'status',
      statusValues.filter((st) => st.id !== id)
    )
  }

  const statusSubmit = statusForm.handleSubmit((data: Status) => {
    console.log('Status Data: ', data)
  })
  const manufactureSubmit = manufactureForm.handleSubmit(
    (data: Manufacture) => {
      console.log('Manufacture Data: ', data)
    }
  )
  const shippingSubmit = shippingCostForm.handleSubmit((data: ShippingCost) => {
    console.log('shipping Cost: ', data)
  })
  return (
    <section className='flex flex-col space-y-4 min-w-full md:min-w-[35rem]'>
      <div className='w-full bg-gray-100 p-4 rounded-md'>
        <h2 className='text-lg'>{t('orders_status')}</h2>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-end w-full'>
            <Button variant='outline' type='button' onClick={generateStatus}>
              {t('generate_new_status')}
            </Button>
          </div>
          <Form {...statusForm}>
            <form
              action=''
              onSubmit={statusSubmit}
              className='flex flex-col space-y-6'
            >
              {statusWatch.map((status, index) => (
                <div
                  key={status.id}
                  className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 rtl:space-x-reverse w-full'
                >
                  <FormField
                    name={`status.${index}.name`}
                    control={statusForm.control}
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('type_status_name')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`status.${index}.color`}
                    control={statusForm.control}
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Input {...field} type='color' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {statusWatch.length > 1 && index !== 0 ? (
                    <Button
                      variant='outline'
                      size='icon'
                      type='button'
                      onClick={() => removeStatus(status.id as string)}
                      className='bg-red-50 w-20 md:w-32 self-end'
                    >
                      <Trash size={14} className='text-red-900' />
                    </Button>
                  ) : (
                    <div className='hidden md:block w-32'></div>
                  )}
                  <Separator className='block !mt-4 md:hidden' />
                </div>
              ))}
              <div className='flex justify-end w-full'>
                <Button type='submit' className='w-20 h-8'>
                  {t('save')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className='flex flex-col space-y-3 w-full bg-gray-100 p-4 rounded-md'>
        <h2 className='text-base md:text-lg'>{t('manufacture_period')}</h2>
        <Form {...manufactureForm}>
          <form
            action=''
            onSubmit={manufactureSubmit}
            className='flex flex-col space-y-6'
          >
            <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 rtl:space-x-reverse w-full'>
              <FormField
                name='pieces'
                control={manufactureForm.control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input
                        inputMode='numeric'
                        pattern='^[0-9]*$'
                        maxLength={6}
                        placeholder={t('type_processing_period')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-end w-full'>
              <Button type='submit' className='w-20 h-8'>
                {t('save')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className='w-full bg-gray-100 p-4 rounded-md'>
        <h2 className='text-lg'>{t('shipping_cost')}</h2>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-end w-full'>
            <Button
              variant='outline'
              type='button'
              onClick={() =>
                appendShipping({ id: uuid(), country: '', cost: 0 })
              }
            >
              {t('add_new_country')}
            </Button>
          </div>
          <Form {...shippingCostForm}>
            <form
              action=''
              onSubmit={shippingSubmit}
              className='flex flex-col space-y-6'
            >
              {shippingFields.map((shipping, index) => (
                <div
                  key={shipping.id}
                  className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 rtl:space-x-reverse w-full'
                >
                  <FormField
                    name={`shipping.${index}.country`}
                    control={shippingCostForm.control}
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel htmlFor='name'>
                          {t('shipping_country')}
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            dir={getLangDir(locale)}
                          >
                            <SelectTrigger
                              className='rounded-s-none rtl:rounded-e-none 
                          rtl:rounded-s-md focus:ring-0 focus:ring-offset-0'
                            >
                              <SelectValue
                                placeholder={t('choose_shipping_country')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.name}
                                >
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`shipping.${index}.cost`}
                    control={shippingCostForm.control}
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel htmlFor='name'>
                          {t('shipping_cost')}
                          <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <Input
                            inputMode='numeric'
                            pattern='^[0-9]*$'
                            maxLength={6}
                            placeholder={t('define_shipping_cost')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {shippingFields.length > 1 && index !== 0 ? (
                    <Button
                      variant='outline'
                      size='icon'
                      type='button'
                      onClick={() => removeShipping(index)}
                      className='bg-red-50 w-20 md:w-32 self-end'
                    >
                      <Trash size={14} className='text-red-900' />
                    </Button>
                  ) : (
                    <div className='hidden md:block w-32'></div>
                  )}
                  <Separator className='block !mt-4 md:hidden' />
                </div>
              ))}
              <div className='flex justify-end w-full'>
                <Button type='submit' className='w-20 h-8'>
                  {t('save')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
