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
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
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
    days: z.number().min(1, {
      message: t('required_value'),
    }),
  })
  type Status = z.infer<typeof statusSchema>
  type Manufacture = z.infer<typeof manufactureSchema>
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
      days: 2,
    },
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
                name='days'
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
    </section>
  )
}
