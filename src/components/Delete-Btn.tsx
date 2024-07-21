import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
type Props = {
  className?: string
}

export function DeleteBtn({ className }: Props) {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='p-4 pl-2 rtl:pl-0 rtl:pr-2 justify-start space-x-2 font-normal
          rtl:space-x-reverse text-red-600 rtl:flex-row-reverse w-full'
          onClick={(e) => e.stopPropagation()}
        >
          <Trash className='h-4 w-4' />
          <span>{t('delete')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className={cn(`sm:max-w-[425px]`, className)}
      >
        <DialogHeader className='rtl:text-center'>
          <DialogTitle>{t('confirm_deletion')}</DialogTitle>
          <DialogDescription>{t('confirm_deletion_msg')}</DialogDescription>
        </DialogHeader>
        <div className='flex justify-center items-center py-4'></div>
        <DialogFooter className='rtl:flex-row rtl:justify-end'>
          <Button type='submit' variant='destructive' className='ml-2'>
            {t('delete')}
          </Button>
          <DialogClose>
            <Button variant='outline'>{t('cancel')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
