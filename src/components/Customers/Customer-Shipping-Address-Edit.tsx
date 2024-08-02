'use client'
import React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CustomerAddress, Order } from '@/types'
import { useLocale, useTranslations } from 'next-intl'
import { getLangDir } from 'rtl-detect'
type Props = {
    data:CustomerAddress
}

export function CustomerShippingAddressEdit({data}: Props) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useForm<CustomerAddress>({
    defaultValues: data ? data : {
      country: '',
      governorate: '',
      region: '',
      block: '',
      street: '',
      neighborhood: '',
      building: '',
      floor: '',
      apartment: '',
      note: '',
      primary: false,
      type: 'home',
    },
  })
  function onSubmit(data: CustomerAddress) {
    console.log('Form Data: ', data)
  }
  return (
    <Form {...form}>
      <form
        action=''
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-between space-y-4 p-2 
            w-full min-h-32 bg-slate-200 rounded-sm max-h-72 overflow-y-auto'
      >
        <div className='grid gap-3'>
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('country')}</FormLabel>
                <FormControl>
                  <Select
                    dir={getLangDir(locale)}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t('select_country')}
                        onFocus={(e) => e.stopPropagation()}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t('countries')}</SelectLabel>
                        <SelectItem value='kuwait'>Kuwait</SelectItem>
                        <SelectItem value='egypt'>Egypt</SelectItem>
                        <SelectItem value='usa'>USA</SelectItem>
                        <SelectItem value='canada'>Canada</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='governorate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('governorate')}</FormLabel>
                <FormControl>
                  <Select
                    dir={getLangDir(locale)}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_governorate')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t('governorate')}</SelectLabel>
                        <SelectItem value='kuwait'>Kuwait</SelectItem>
                        <SelectItem value='egypt'>Egypt</SelectItem>
                        <SelectItem value='usa'>USA</SelectItem>
                        <SelectItem value='canada'>Canada</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='region'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('region')}</FormLabel>
                <FormControl>
                  <Select
                    dir={getLangDir(locale)}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_region')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t('region')}</SelectLabel>
                        <SelectItem value='kuwait'>Kuwait</SelectItem>
                        <SelectItem value='egypt'>Egypt</SelectItem>
                        <SelectItem value='usa'>USA</SelectItem>
                        <SelectItem value='canada'>Canada</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid gap-3'>
          <FormField
            control={form.control}
            name='block'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('block')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_block')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='street'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('street')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_street')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='neighborhood'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('neighborhood')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_neighborhood')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='building'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('building')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_building')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='floor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('floor')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_floor')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='apartment'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('apartment')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_apartment')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='note'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('other_details')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('other_address_details_needed')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex w-full justify-end py-2'>
          <Button
            type='submit'
            className='flex ml-2 bg-transparent border border-slate-950 text-slate-950 
                  hover:bg-slate-950 hover:text-slate-50 py-0 h-8'
          >
            {t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
