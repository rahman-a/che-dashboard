'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Note } from '@/icons'
import { useFormContext } from 'react-hook-form'
type Props = {
  className?: string
  btnClassName?: string
  mode?: 'view' | 'edit'
  note?: string
  registerKey?: string
}

export function ProductNote({
  className,
  btnClassName,
  note,
  mode,
  registerKey,
}: Props) {
  const form = useFormContext()
  const t = useTranslations()
  const NoteComponent =
    mode === 'view' && note ? (
      <h3>{note}</h3>
    ) : mode === 'view' && !note ? (
      <h3 className='text-gray-900 text-center'>{t('no_note_found')}</h3>
    ) : (
      <Textarea
        {...form.register(registerKey!)}
        placeholder={t('add_note')}
        value={note ?? ''}
        className='outline-none border border-gray-300 rounded-md p-2'
      />
    )
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={btnClassName}>
          <Note className='w-4 h-4' />
        </button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader className='rtl:text-right mt-2'>
          <DialogTitle>{t('product_title')}</DialogTitle>
          {mode === 'edit' && (
            <DialogDescription>{t('product_description')}</DialogDescription>
          )}
        </DialogHeader>
        <div className='flex flex-col space-y-2'>{NoteComponent}</div>
        <DialogFooter className='flex-row space-x-3'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              {t('close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
