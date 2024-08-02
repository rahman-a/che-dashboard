'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Blocks, Link } from 'lucide-react'
import { sizeFormSchema } from '@/schema'
import { RequiredAsterisk } from '@/components'

type SizeFormType = z.infer<ReturnType<typeof sizeFormSchema>>

interface ICreateUpdateSizeProps {
  mode: 'create' | 'update'
  data?: SizeFormType
}

export function CreateUpdateSize({ mode, data }: ICreateUpdateSizeProps) {
  const t = useTranslations()

  const form = useForm<SizeFormType>({
    resolver: zodResolver(sizeFormSchema(t)),
    defaultValues: {
      size: (data?.size as number) ?? '',
      description: data?.description ?? '',
    },
  })

  const onSubmitHandler = form.handleSubmit((data: SizeFormType) => {
    console.log('Size Data: ', data)
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button
            variant='outline'
            className='flex items-center justify-center 
            space-x-2 rtl:space-x-reverse'
          >
            <Blocks className='w-5 h-5' />
            <span>{t('create_new_size')}</span>
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
      <DialogContent aria-describedby='create new size'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? t('create_new_size') : t('update_size')}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmitHandler} className='flex flex-col space-y-2'>
            <FormField
              control={form.control}
              rules={{ required: true }}
              name='size'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('size_value')} <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      inputMode='numeric'
                      pattern='^[0-9]*$'
                      maxLength={6}
                      onChange={field.onChange}
                      placeholder={t('enter_size_value')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('size_description')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('enter_size_description')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
