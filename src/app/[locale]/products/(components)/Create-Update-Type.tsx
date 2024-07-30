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
import { typeFormSchema } from '@/schema'
import { RequiredAsterisk } from '@/components'

type TypeFormType = z.infer<ReturnType<typeof typeFormSchema>>

interface ICreateUpdateTypeProps {
  mode: 'create' | 'update'
  data?: TypeFormType
}

export function CreateUpdateType({ mode, data }: ICreateUpdateTypeProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const t = useTranslations()

  const form = useForm<TypeFormType>({
    resolver: zodResolver(typeFormSchema(t)),
    defaultValues: {
      name: data?.name ?? '',
      description: data?.description ?? '',
      image: undefined,
    },
  })

  const onSubmitHandler = form.handleSubmit((data: TypeFormType) => {
    console.log('Type Data: ', data)
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
            <span>{t('create_new_type')}</span>
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
      <DialogContent aria-describedby='create new type'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? t('create_new_type') : t('update_type')}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmitHandler} className='flex flex-col space-y-2'>
            <FormField
              control={form.control}
              rules={{ required: true }}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('type_name')} <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('enter_type_name')} {...field} />
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
                  <FormLabel>{t('type_description')} </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('enter_type_description')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('type_img')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={undefined}
                      onChange={(e) => field.onChange(e.target.files![0])}
                      placeholder={t('upload_type_img')}
                      type='file'
                      accept='image/*'
                      ref={inputRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='flex-row space-x-2 rtl:space-x-reverse justify-end !mt-5'>
              <Button type='submit'>{t('save')}</Button>
              <DialogClose>
                <Button variant='outline'>{t('cancel')}</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
