import * as React from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Button } from '@/components/ui/button'
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
import { EyeIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
export interface IDataTableCellContentDialogProps {
  content: string
  className?: string
}

export default function DataTableCellContentDialog({
  content,
  className,
}: IDataTableCellContentDialogProps) {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            `group flex items-center justify-center relative w-28 h-full text-xs 
        p-4 cursor-pointer truncate table-data-padding-none`,
            className
          )}
        >
          <div
            className='flex items-center justify-center absolute top-0 left-0 w-full h-full 
        bg-black/70 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible'
          >
            <EyeIcon size={18} className='text-gray-50' />
          </div>
          <span>{content.slice(0, 50)}</span>
        </div>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-md'
        aria-describedby='table cell content dialog'
      >
        <DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>show content of table cell in dialog</DialogTitle>
          </VisuallyHidden.Root>
        </DialogHeader>
        <p className='px-4 text-center'>{content}</p>
        <DialogFooter className='sm:justify-start'>
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
