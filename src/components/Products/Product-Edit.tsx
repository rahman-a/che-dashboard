'use client'
import React, { useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useFormContext, useFieldArray } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { AlignJustify } from 'lucide-react'
import { ProductDetails } from './'
import { Label } from '../ui/label'
import { Order } from '@/types'
type Props = {
  keyIndex?: number
  id?: string
}

// Define the schema for the form fields [sizes, types,note, quantity]

export function ProductEdit({ keyIndex, id }: Props) {
  const t = useTranslations()
  const form = useFormContext<Order>()

  if (keyIndex === undefined) return null
  return (
    <div className='flex flex-col space-y-4 mt-2'>
      <div className='flex items-center justify-between'>
        <div className='relative flex flex-col items-center space-y-3'>
          <FormField
            control={form.control}
            name={`products.${keyIndex}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-center w-full block'>
                  {t('quantity')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='text'
                    inputMode='numeric'
                    pattern='^[0-9]*$'
                    maxLength={6}
                    className='w-20 h-10 rounded-md 
                        focus-visible:ring-0 focus-visible:ring-offset-0'
                  />
                </FormControl>
                <FormMessage className='absolute w-full text-sm' />
              </FormItem>
            )}
          />
        </div>
        <div className='relative flex flex-col items-center mx-2 space-y-3'>
          <FormField
            control={form.control}
            name={`products.${keyIndex}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-center w-full block'>
                  {t('price')}
                </FormLabel>
                <FormControl>
                  <div className='relative flex items-center'>
                    <Input
                      {...field}
                      type='text'
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      className='w-20 h-10 rounded-md rounded-e-none 
                          focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                    <span
                      className='w-10 h-10 flex items-center justify-center 
                          rounded-s-none border rounded-md'
                    >
                      {t('kw')}
                    </span>
                  </div>
                </FormControl>
                <FormMessage className='absolute w-full text-sm' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col items-center space-y-3'>
          <Label>{t('discount')}</Label>
          <div className='flex relative items-center'>
            <FormField
              control={form.control}
              name={`products.${keyIndex}.discount.value`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      onChange={field.onChange}
                      className='w-20 h-10 rounded-md rounded-e-none 
                          focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage className='absolute w-full text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`products.${keyIndex}.discount.type`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className='rounded-s-none rtl:rounded-e-none 
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
      </div>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger
            className='flex items-center justify-start space-x-2 rtl:space-x-reverse
          bg-transparent rounded-md py-1 pr-2 rtl:pl-2 rtl:pr-0'
          >
            <AlignJustify className='h-5 w-5 text-muted-foreground' />
            <span>{t('product_details')}</span>
          </AccordionTrigger>
          <AccordionContent>
            <ProductDetails
              description={form.getValues('products')[keyIndex]?.details}
              className='basis-2/4 [&_ul]:list-disc 
              [&_ul]:pl-4 [&_ul]:rtl:pr-4 [&>article]:bg-transparent 
              [&>article]:text-sm [&>article]:md:text-base'
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
