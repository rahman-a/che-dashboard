import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

type Props = {
  className?: string
  btnClassName?: string
}

export function DeleteBtnPopover({ className, btnClassName }: Props) {
  const t = useTranslations()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={btnClassName}>
          <Trash size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-32', className)}>
        <div className='flex items-center justify-center'>
          <Button variant='destructive'>
            <Trash className='mr-1 rtl:ml-1 rtl:mr-0 h-4 w-4' />
            <span>{t('confirm_deletion')}</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
