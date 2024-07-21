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

export interface ICustomerInfoProps {
  isCurrent: boolean
}

export function CustomerInfo({ isCurrent }: ICustomerInfoProps) {
  const t = useTranslations()
  const { control } = useFormContext()
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
            <FormLabel>{t('customer_name')}</FormLabel>
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
            <FormLabel>{t('customer_email')}</FormLabel>
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
            <FormLabel>{t('customer_phone')}</FormLabel>
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
