'use client'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Order } from '@/types'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  registerKey: string
  label?: string
}

export function NewOrderNote({ registerKey, label }: Props) {
  const t = useTranslations()
  const form = useFormContext()
  return (
    <div className='flex flex-col space-y-4 w-full py-4 px-1'>
      {label && <Label>{label}</Label>}
      <Textarea
        placeholder={t('add_note')}
        className='outline-none border border-dashed 
        border-gray-300 rounded-md p-2'
        {...form.register(registerKey!)}
      />
    </div>
  )
}
