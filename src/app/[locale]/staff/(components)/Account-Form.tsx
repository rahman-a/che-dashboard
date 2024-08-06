'use client'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLocale, useTranslations } from 'next-intl'
import uuid from 'react-uuid'
import { getLangDir } from 'rtl-detect'
import { staffSchema } from '@/schema'
import { Staff } from '@/types'
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
import {
  PhoneInput,
  RequiredAsterisk,
  SimpleRichTextEditor,
} from '@/components'
import { Label } from '@/components/ui/label'
import countries from '@/data/countries.json'
import { Textarea } from '@/components/ui/textarea'

export interface IAccountFormProps {
  mode: 'create' | 'update'
  data?: Omit<Staff, 'password'>
}

export function AccountForm({ mode, data }: IAccountFormProps) {
  const t = useTranslations()
  const schema = staffSchema(t)
    .extend({ confirmPassword: z.string() })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('password_mismatch'),
      path: ['confirmPassword'],
    })
  const locale = useLocale()
  const form = useForm<Staff & { confirmPassword: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id || '',
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      country: data?.country || '',
      address: data?.address || '',
      password: data ? '********' : '',
      confirmPassword: data ? '********' : '',
      role: data?.role || 'employee',
      status: data?.status || 'active',
    },
  })

  const errors = form.formState.errors
  console.log('Errors: ', errors)

  const onSubmit = form.handleSubmit((data: Staff) => {
    console.log('Staff: ', data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='w-full'>
        <div className='grid xl:md:grid-cols-[1fr_400px] gap-2 space-y-2 xl:space-y-0'>
          <section className='flex flex-col space-y-5'>
            {/* Employee Auth Data [Name - Email - Password - Confirm Password] */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                {/* Employee Name */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='name'>
                        {t('employee_name')}
                        <RequiredAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('enter_employee_name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Employee E-mail */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        {t('employee_email')}
                        <RequiredAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('enter_employee_email')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col lg:flex-row justify-between gap-4'>
                {/* Employee Password */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='details'>
                        {t('password')}
                        <RequiredAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          placeholder={t('type_password')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Employee Confirm Password */}
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='details'>
                        {t('confirm_password')}
                        <RequiredAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          placeholder={t('confirm_password')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Employee Contact [Phone - Country - Address] */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                {/* EMPLOYEE PHONE NUMBER */}
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        {t('employee_phone')}
                        <RequiredAsterisk />
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          onChange={field.onChange}
                          phone={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* EMPLOYEE COUNTRY */}
                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='name'>
                        {t('employee_country')}
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
                              placeholder={t('select_employee_country')}
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
              </div>
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                {/* EMPLOYEE ADDRESS */}
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{t('employee_address')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('type_employee_address')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Employee Role & Status */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <div className='flex flex-col space-y-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                  {/* EMPLOYEE ROLE*/}
                  <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='category'>
                          {t('employee_role')}
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
                                placeholder={t('choose_employee_role')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='employee' defaultChecked>
                                {t('employee')}
                              </SelectItem>
                              <SelectItem value='manager'>
                                {t('manager')}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* EMPLOYEE STATUS */}
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='category'>
                          {t('employee_status')}
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
                                placeholder={t('choose_employee_status')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='active' defaultChecked>
                                {t('active')}
                              </SelectItem>
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
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className='my-4 w-full md:w-40'>
          <Button type='submit' className='w-full'>
            {mode === 'create' ? (
              <span>{t('create_new_account')}</span>
            ) : (
              <span>{t('update_account')}</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
