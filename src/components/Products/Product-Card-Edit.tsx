'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
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

type Props = {
  className?: string
  btnClassName?: string
  keyIndex?: number
  id?: string
}

export function ProductCardEdit({
  className,
  btnClassName,
  keyIndex,
  id,
}: Props) {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={btnClassName}>
          <EditIcon className='w-4 h-4' />
        </button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <ProductEdit keyIndex={keyIndex} id={id} />
        <DialogFooter className='flex-row space-x-3 mt-2 justify-end'>
          <DialogClose asChild>
            <Button type='button' className='capitalize' variant='secondary'>
              {t('close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
