'use client'
import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { getLangDir } from 'rtl-detect'
import { RequiredAsterisk } from '../Required-Asterisk'
import { Customer } from '@/types'
import { Checkbox } from '../ui/checkbox'

export interface ICustomerCreationAddressProps {
  isCurrent: boolean
}

export function CustomerAddress({ isCurrent }: ICustomerCreationAddressProps) {
  const t = useTranslations()
  const locale = useLocale()
  const { control, getValues } = useFormContext<Customer>()
  console.log('customer-Values', getValues())
  return (
    <section
      className={cn(`hidden flex-col space-y-4`, {
        flex: isCurrent,
      })}
    >
      <FormField
        control={control}
        name='address.country'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('country')}
              <RequiredAsterisk/>
              </FormLabel>
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
        control={control}
        name='address.governorate'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('governorate')}
              <RequiredAsterisk/>
              </FormLabel>
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
        control={control}
        name='address.region'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('region')}
              <RequiredAsterisk/>
              </FormLabel>
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
      <div className='grid gap-3'>
        <FormField
          control={control}
          name='address.block'
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
          control={control}
          name='address.street'
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
          control={control}
          name='address.neighborhood'
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
          control={control}
          name='address.building'
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
          control={control}
          name='address.floor'
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
          control={control}
          name='address.apartment'
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
          control={control}
          name='address.note'
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
        <FormField
          control={control}
          name='address.primary'
          render={({ field }) => (
            <FormItem className='flex items-center space-x-1 py-2'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='!mt-0'>
                {t('make_address_primary')}
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  )
}
