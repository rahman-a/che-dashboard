import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {}

export function NewOrderNote({}: Props) {
  const t = useTranslations()
  return (
    <div className='w-full py-4 px-1'>
      <Textarea
        placeholder={t('add_note')}
        className='outline-none border border-dashed 
        border-gray-300 rounded-md p-2'
      />
      <div className='w-full flex justify-end mt-5'>
        <Button>{t('add_note')}</Button>
      </div>
    </div>
  )
}
