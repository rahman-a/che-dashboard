'use client'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLocale, useTranslations } from 'next-intl'
import uuid from 'react-uuid'
import { productSchema } from '@/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { ProductNewImages, ProductNewSKUs } from './'
import { SimpleRichTextEditor } from '@/components'
import { getLangDir } from 'rtl-detect'

export interface INewProductFormProps {}

// name - details - price - category - type -size - images -discount

/**
 * name - shortcut
 * details
 * size - type - category
 * price - discount - shipping
 * images
 * //////////////////////////
 * sku/'s
 */

export function ProductCreationForm(props: INewProductFormProps) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useForm<z.infer<ReturnType<typeof productSchema>>>({
    resolver: zodResolver(productSchema(t)),
    defaultValues: {
      name: '',
      abbr: 'ST',
      details: '',
      category: '',
      price: 0,
      discount: 0,
      shipping: 0,
      stock: 0,
      SKUs: [
        {
          id: uuid(),
          sku: 'ST',
          type: '',
          size: '',
        },
      ],
      images: [] as File[],
    },
  })

  const onSubmit = form.handleSubmit(
    (data: z.infer<ReturnType<typeof productSchema>>) => {
      const jsonData = JSON.stringify(data, null, 2)
      window.alert(jsonData)
      console.log('Product: ', data)
    }
  )

  const generateSKU = () => {
    const SKUsValues = form.getValues('SKUs')
    form.setValue('SKUs', [
      ...SKUsValues,
      {
        id: uuid(),
        sku: form.getValues('abbr'),
        type: '',
        size: '',
      },
    ])
  }

  const removeSKU = (id: string) => {
    const SKUsValues = form.getValues('SKUs')
    if (SKUsValues.length <= 1) return
    form.setValue(
      'SKUs',
      SKUsValues.filter((sku) => sku.id !== id)
    )
  }

  const abbrWatch = form.watch('abbr')
  React.useEffect(() => {
    const SKUs = form.getValues('SKUs')
    SKUs.forEach((sku, index) => {
      const skuArray = sku.sku.split('-')
      skuArray[0] = abbrWatch
      const newSKU = skuArray.join('-')
      form.setValue(`SKUs.${index}.sku`, newSKU)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abbrWatch])
  return (
    <Form {...form}>
      <form action='' onSubmit={onSubmit} className='w-full'>
        <div
          className='absolute hidden md:block top-24 lg:top-28 right-8 
        rtl:left-8 rtl:right-auto'
        >
          <Button className='w-full'>
            <span>{t('add_new_product')}</span>
          </Button>
        </div>
        <div className='grid xl:grid-cols-[1fr_500px] gap-2 space-y-2'>
          <section className='flex flex-col space-y-5'>
            {/* Product Details [Name - Abbreviation - Description] */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='name'>{t('product_name')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('choose_product_name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='abbr'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{t('product_abbr')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('type_product_abbr')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex items-center justify-between gap-4'>
                <FormField
                  control={form.control}
                  name='details'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='details'>
                        {t('product_details')}
                      </FormLabel>
                      <FormControl>
                        <SimpleRichTextEditor
                          html={field.value}
                          setHTML={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Product Details [Category - Price - Discount - Shipping - Stock] */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <div className='flex flex-col space-y-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='category'>
                          {t('category')}
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
                                placeholder={t('choose_product_category')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value='embroidery_abaya'
                                defaultChecked
                              >
                                {t('embroidery_abaya')}
                              </SelectItem>
                              <SelectItem value='classic_abaya'>
                                {t('classic_abaya')}
                              </SelectItem>
                              <SelectItem value='white_abaya'>
                                {t('white_abaya')}
                              </SelectItem>
                              <SelectItem value='black_abaya'>
                                {t('black_abaya')}
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
                    name='price'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='price'>{t('price')}</FormLabel>
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
                <div className='flex flex-col md:flex-row items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='discount'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='discount'>
                          {t('discount')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='text'
                            inputMode='numeric'
                            pattern='^[0-9]*$'
                            maxLength={6}
                            onChange={field.onChange}
                            placeholder={t('enter_product_discount')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='shipping'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='shipping'>
                          {t('shipping')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='text'
                            inputMode='numeric'
                            pattern='^[0-9]*$'
                            maxLength={6}
                            onChange={field.onChange}
                            placeholder={t('enter_product_shipping_value')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col md:flex-row items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='stock'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='shipping'>
                          {t('stock_status')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='text'
                            inputMode='numeric'
                            pattern='^[0-9]*$'
                            maxLength={6}
                            onChange={field.onChange}
                            placeholder={t('enter_product_stock_quantity')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <ProductNewSKUs generateSKU={generateSKU} removeSKU={removeSKU} />
            </div>
          </section>
          <section>
            {/* Product Details [images] */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <ProductNewImages />
            </div>
          </section>
        </div>
        <div className='block md:hidden my-4'>
          <Button className='w-full'>
            <span>{t('add_new_product')}</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
