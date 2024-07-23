import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { NotepadText } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { DialogClose } from '@radix-ui/react-dialog'

export interface IInvoiceNoteViewDialogProps {}

export function InvoiceNoteViewDialog(props: IInvoiceNoteViewDialogProps) {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <NotepadText size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t('product_note')}</DialogTitle>
        </DialogHeader>
        <p>{t('note_example')}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>{t('close')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
