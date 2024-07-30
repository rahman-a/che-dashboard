'use client'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLocale, useTranslations } from 'next-intl'
import uuid from 'react-uuid'
import { getLangDir } from 'rtl-detect'
import { productSchema } from '@/schema'
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
import { ProductImages, ProductSKUs } from '.'
import { RequiredAsterisk, SimpleRichTextEditor } from '@/components'
import { Label } from '@/components/ui/label'

type Product = z.infer<ReturnType<typeof productSchema>>

export interface IProductFormProps {
  mode: 'create' | 'update'
  data?: Product
}

export function ProductForm({ mode, data }: IProductFormProps) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useForm<Product>({
    resolver: zodResolver(productSchema(t)),
    defaultValues: {
      name: data?.name || '',
      abbr: data?.abbr || 'ST',
      details: data?.details || '',
      category: data?.category || '',
      price: data?.price || 0,
      discount: data?.discount || { value: 0, type: 'amount' },
      stock: data?.stock || 0,
      SKUs: data?.SKUs || [
        {
          id: uuid(),
          sku: 'ST',
          type: '',
          size: '',
        },
      ],
      images: [],
    },
  })

  const onSubmit = form.handleSubmit((data: Product) => {
    console.log('Product: ', data)
  })

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
      <form onSubmit={onSubmit} className='w-full'>
        <div
          className='absolute hidden md:block top-24 lg:top-28 right-8 
        rtl:left-8 rtl:right-auto'
        >
          <Button type='submit' className='w-full'>
            {mode === 'create' ? (
              <span>{t('add_new_product')}</span>
            ) : (
              <span>{t('update_product')}</span>
            )}
          </Button>
        </div>
        <div className='grid xl:grid-cols-[1fr_500px] gap-2 space-y-2 xl:space-y-0'>
          <section className='flex flex-col space-y-5'>
            {/* Product Details [Name - Abbreviation - Description] */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel htmlFor='name'>
                        {t('product_name')}
                        <RequiredAsterisk />
                      </FormLabel>
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
                      <FormLabel>
                        {t('product_abbr')}
                        <RequiredAsterisk />
                      </FormLabel>
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
                        <RequiredAsterisk />
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
                                placeholder={t('choose_product_category')}
                              />
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
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem className='w-full lg:w-6/12'>
                        <FormLabel htmlFor='price'>
                          {t('price')}
                          <RequiredAsterisk />
                        </FormLabel>
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
                  <div className='w-full lg:w-6/12 flex flex-col space-y-3'>
                    <Label>{t('discount')}</Label>
                    <div className='w-full flex relative items-center'>
                      <FormField
                        control={form.control}
                        name='discount.value'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormControl>
                              <Input
                                {...field}
                                type='text'
                                inputMode='numeric'
                                pattern='^[0-9]*$'
                                maxLength={6}
                                onChange={field.onChange}
                                className='w-full h-10 rounded-md rounded-e-none 
                          focus-visible:ring-0 focus-visible:ring-offset-0'
                              />
                            </FormControl>
                            <FormMessage className='absolute w-full text-sm' />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='discount.type'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger
                                  className='w-20 rounded-s-none rtl:rounded-e-none 
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
              <ProductSKUs generateSKU={generateSKU} removeSKU={removeSKU} />
            </div>
          </section>
          <section>
            {/* Product Details [images] */}
            <div className='flex flex-col space-y-5 bg-gray-100 p-4 rounded-lg'>
              <ProductImages data={data?.images as string[]} />
            </div>
          </section>
        </div>
        <div className='block md:hidden my-4'>
          <Button type='submit' className='w-full'>
            {mode === 'create' ? (
              <span>{t('add_new_product')}</span>
            ) : (
              <span>{t('update_product')}</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
