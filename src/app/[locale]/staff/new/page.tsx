import React from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { Template } from '@/components'
import { AccountForm } from '../(components)'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - New Staff Account',
  description: 'Create new staff account',
}

export default function NewStaff({}: Props) {
  const t = useTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <AccountForm mode='create' />
        </div>
      </main>
    </Template>
  )
}
