import React from 'react'

import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Edit as EditIcon } from '@/icons'
import ProductEdit from './Product-Edit'
type Props = {
  className?: string
  btnClassName?: string
}

export default function ProductCartEdit({ className, btnClassName }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={btnClassName}>
          <EditIcon className='w-6 h-6' />
        </button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <ProductEdit />
        <DialogFooter className='flex-row space-x-3 mt-2'>
          <Button
            type='submit'
            className='text-black capitalize hover:bg-primary rtl:ml-2'
          >
            Edit
          </Button>
          <DialogClose asChild>
            <Button
              type='button'
              className='text-white capitalize hover:bg-red-800'
              variant='secondary'
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
