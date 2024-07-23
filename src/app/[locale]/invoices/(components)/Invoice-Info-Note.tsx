import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Edit2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export interface IInvoiceNoteProps {
  title: string
  type: 'order' | 'delivery'
}

export function InvoiceInfoNote({ title }: IInvoiceNoteProps) {
  const t = useTranslations()
  return (
    <div className='bg-gray-100 w-full text-black p-4 shadow-sm rounded-lg'>
      <div className='flex flex-col space-y-4'>
        <h3 className='font-semibold'>{title}</h3>
        <Textarea className='bg-transparent p-2 border-none leading-6'>
          {t('note_example')}
        </Textarea>
        <div className='flex justify-end w-full my-4'>
          <Button
            variant='secondary'
            className='flex items-center justify-center bg-gray-200
             hover:bg-gray-300 space-x-1 rtl:space-x-reverse text-xs h-8'
          >
            <Edit2 className='w-3 h-3' />
            <span>{t('edit')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
