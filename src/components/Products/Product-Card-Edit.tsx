import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Edit as EditIcon } from '@/icons'
import { ProductEdit } from './'
import { Form } from '../ui/form'

const schema = z.object({
  price: z.coerce.number(),
  quantity: z.coerce.number().min(1),
  discount: z.object({
    value: z.coerce.number(),
    type: z.string(),
  }),
})

type Props = {
  className?: string
  btnClassName?: string
}

export function ProductCartEdit({ className, btnClassName }: Props) {
  const t = useTranslations()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: 80,
      quantity: 1,
      discount: {
        value: 0,
        type: 'amount',
      },
    },
  })
  const onsubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={btnClassName}>
          <EditIcon className='w-4 h-4' />
        </button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <Form {...form}>
          <form action='' onSubmit={form.handleSubmit(onsubmit)}>
            <ProductEdit />
            <DialogFooter className='flex-row space-x-3 mt-2 justify-end'>
              <Button type='submit' className='capitalize rtl:ml-2'>
                {t('edit')}
              </Button>
              <DialogClose asChild>
                <Button
                  type='button'
                  className='capitalize'
                  variant='secondary'
                >
                  {t('close')}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
