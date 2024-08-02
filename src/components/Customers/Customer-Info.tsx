'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl'
import { Customer } from '@/types'
import { RequiredAsterisk } from '../Required-Asterisk'

export interface ICustomerInfoProps {
  isCurrent: boolean
}

export function CustomerInfo({ isCurrent }: ICustomerInfoProps) {
  const t = useTranslations()
  const { control } = useFormContext<Customer>()
  return (
    <section
      className={cn(`hidden flex-col space-y-2`, {
        flex: isCurrent,
      })}
    >
      <FormField
        control={control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('customer_name')}
              <RequiredAsterisk/>
              </FormLabel>
            <FormControl>
              <Input placeholder={t('customer_name')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('customer_email')}
              <RequiredAsterisk/>
              </FormLabel>
            <FormControl>
              <Input placeholder={t('customer_email')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='phone'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('customer_phone')}
              <RequiredAsterisk/>
              </FormLabel>
            <FormControl>
              <Input placeholder={t('customer_phone')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  )
}
