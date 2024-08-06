'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { DialogClose } from '@radix-ui/react-dialog'
import { BrickWall, Link } from 'lucide-react'
import { materialSchema } from '@/schema'
import { RequiredAsterisk } from '@/components'
import { Material } from '@/types'

interface ICreateUpdateMaterialProps {
  mode: 'create' | 'update'
  data?: Material
}

export function CreateUpdateMaterial({
  mode,
  data,
}: ICreateUpdateMaterialProps) {
  const t = useTranslations()

  const form = useForm<Material>({
    resolver: zodResolver(materialSchema(t)),
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
      purchasedUnits: data?.purchasedUnits || 0,
      pricePerUnit: data?.pricePerUnit || 0,
      consumedUnits: data?.consumedUnits || 0,
      availableUnits: data?.availableUnits || 0,
      totalPrice: data?.totalPrice || 0,
      image: data?.image || '',
    },
  })

  const purchasedUnits = form.watch('purchasedUnits')
  const pricePerUnit = form.watch('pricePerUnit')
  const consumedUnits = form.watch('consumedUnits')

  const errors = form.formState.errors
  console.log('Errors: ', errors)

  const calculateTotalPrice = React.useCallback(
    () => {
      const totalPrice = pricePerUnit * purchasedUnits
      form.setValue('totalPrice', totalPrice, {
        shouldValidate: true,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [purchasedUnits, pricePerUnit]
  )

  const calculateAvailableUnits = React.useCallback(() => {
    const availableUnits = purchasedUnits - consumedUnits
    form.setValue('availableUnits', availableUnits, {
      shouldValidate: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasedUnits, consumedUnits])

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    form.setValue('image', files[0], {
      shouldValidate: true,
    })
  }

  const onSubmitHandler = form.handleSubmit((data: Material) => {
    console.log('Material Data: ', data)
  })

  React.useEffect(() => {
    calculateTotalPrice()
  }, [purchasedUnits, pricePerUnit, calculateTotalPrice])

  React.useEffect(() => {
    calculateAvailableUnits()
  }, [purchasedUnits, consumedUnits, calculateAvailableUnits])

  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button
            variant='outline'
            className='flex items-center justify-center 
            space-x-2 rtl:space-x-reverse'
          >
            <BrickWall className='w-5 h-5' />
            <span>{t('create_new_material')}</span>
          </Button>
        ) : (
          <Button
            variant='outline'
            className='w-full cursor-pointer rtl:flex-row-reverse justify-start space-x-1 rtl:space-x-reverse'
          >
            <Link className='h-4 w-4' />
            <span>{t('edit')}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent aria-describedby='manage material data'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create'
              ? t('create_new_material')
              : t('update_material')}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmitHandler} className='flex flex-col space-y-2'>
            <div className='relative h-96 overflow-y-auto flex flex-col space-y-4 px-2'>
              {/*  MATERIAL NAME */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('material_name')}
                      <RequiredAsterisk />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t('type_material_name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  MATERIAL DESCRIPTION */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('material_description')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('type_material_description')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  PURCHASED UNITS */}
              <FormField
                control={form.control}
                rules={{ required: true }}
                name='purchasedUnits'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('purchased_units')}
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
                        placeholder={t('type_purchased_units_quantity')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  PRICE PER UNIT */}
              <FormField
                control={form.control}
                rules={{ required: true }}
                name='pricePerUnit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('price_per_unit')} <RequiredAsterisk />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        inputMode='numeric'
                        pattern='^[0-9]*$'
                        maxLength={6}
                        onChange={field.onChange}
                        placeholder={t('type_price_per_unit')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  TOTAL PRICE */}
              <FormField
                control={form.control}
                rules={{ required: true }}
                name='totalPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('total_price')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        inputMode='numeric'
                        pattern='^[0-9]*$'
                        value={
                          field.value > 0 ? `${field.value} ${t('kw')}` : '0'
                        }
                        maxLength={6}
                        onChange={field.onChange}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  CONSUMED UNITS */}
              <FormField
                control={form.control}
                rules={{ required: true }}
                name='consumedUnits'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('consumed_units')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        inputMode='numeric'
                        pattern='^[0-9]*$'
                        maxLength={6}
                        onChange={field.onChange}
                        placeholder={t('type_consumed_units_quantity')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  AVAILABLE UNITS */}
              <FormField
                control={form.control}
                rules={{ required: true }}
                name='availableUnits'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('available_units')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        inputMode='numeric'
                        pattern='^[0-9]*$'
                        maxLength={6}
                        onChange={field.onChange}
                        placeholder={t('type_available_units_quantity')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  MATERIAL IMAGE */}
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel htmlFor='image '>
                      {t('material_image')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={undefined}
                        onChange={(e) => handleImages(e)}
                        id={field.name}
                        type='file'
                        accept='image/*'
                        multiple
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='flex-row space-x-2 rtl:space-x-reverse justify-end !mt-5'>
              <Button type='submit'>{t('save')}</Button>
              <DialogClose>
                <Button type='button' variant='outline'>
                  {t('cancel')}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
