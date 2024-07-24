'use client'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
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
import { z } from 'zod'
import { productSchema } from '@/schema'
import { Trash } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { getLangDir } from 'rtl-detect'
export interface INewProductSKUsProps {
  generateSKU: () => void
  removeSKU: (id: string) => void
}

export function ProductNewSKUs({
  generateSKU,
  removeSKU,
}: INewProductSKUsProps) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useFormContext<z.infer<ReturnType<typeof productSchema>>>()
  const SKUs = form.watch('SKUs')
  const setSKUBasesOnTypeAndSize = ({
    index,
    type,
    size,
  }: {
    index: number
    type: string
    size: string
  }) => {
    const abbr = form.getValues('abbr')
    const sku = `${abbr}-${size}-${type.toLocaleUpperCase()}`
    form.setValue(`SKUs.${index}.sku`, sku)
  }
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-end rtl:justify-start w-full'>
        <Button variant='outline' type='button' onClick={generateSKU}>
          {t('generate_new_sku')}
        </Button>
      </div>
      <div className='flex flex-col space-y-5'>
        {SKUs.map((sku, index) => (
          <div
            key={sku.id}
            className='flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 rtl:space-x-reverse w-full'
          >
            <FormField
              name={`SKUs.${index}.sku`}
              control={form.control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder='SKU'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`SKUs.${index}.size`}
              control={form.control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e)
                        setSKUBasesOnTypeAndSize({
                          index,
                          type: form.getValues(`SKUs.${index}.type`),
                          size: e,
                        })
                      }}
                      defaultValue={field.value}
                      dir={getLangDir(locale)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('size') + '...'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='40' defaultChecked>
                          40
                        </SelectItem>
                        <SelectItem value='44'>44</SelectItem>
                        <SelectItem value='50'>50</SelectItem>
                        <SelectItem value='55'>55</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`SKUs.${index}.type`}
              control={form.control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e)
                        setSKUBasesOnTypeAndSize({
                          index,
                          type: e,
                          size: form.getValues(`SKUs.${index}.size`),
                        })
                      }}
                      defaultValue={field.value}
                      dir={getLangDir(locale)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('type') + '...'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='embroidery' defaultChecked>
                          {t('embroidery_abaya')}
                        </SelectItem>
                        <SelectItem value='classic'>
                          {t('classic_abaya')}
                        </SelectItem>
                        <SelectItem value='white'>
                          {t('white_abaya')}
                        </SelectItem>
                        <SelectItem value='black'>
                          {t('black_abaya')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {SKUs.length > 1 && index !== 0 ? (
              <Button
                variant='outline'
                size='icon'
                type='button'
                onClick={() => removeSKU(sku.id)}
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
      </div>
    </div>
  )
}
