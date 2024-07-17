import React from 'react'
import { Heading3, StickyNote } from 'lucide-react'
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
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Note } from '@/icons'
type Props = {
  className?: string
  btnClassName?: string
  isOrder?: boolean
  note?: string
}

export default function ProductNote({
  className,
  btnClassName,
  note,
  isOrder,
}: Props) {
  const NoteComponent =
    isOrder && note ? (
      <h3>{note}</h3>
    ) : isOrder && !note ? (
      <h3 className='text-gray-900 text-center'>No notes found</h3>
    ) : (
      <Textarea
        placeholder='Add a note'
        className='outline-none border border-gray-300 rounded-md p-2'
      />
    )
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={btnClassName}>
          <Note className='w-5 h-5' />
        </button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader className='rtl:text-right mt-2'>
          <DialogTitle>Product Note Title</DialogTitle>
          {!isOrder && (
            <DialogDescription>Product Note Description</DialogDescription>
          )}
        </DialogHeader>
        <div className='flex flex-col space-y-2'>{NoteComponent}</div>
        <DialogFooter className='flex-row space-x-3'>
          {!isOrder && (
            <Button type='submit' className='rtl:ml-2'>
              Save
            </Button>
          )}
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
