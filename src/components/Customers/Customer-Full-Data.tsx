'use client'
import * as React from 'react'
import { CustomerInfo, CustomerAddress } from './'
import { Customer } from '@/types'
import { useTranslations } from 'next-intl'

export interface ICustomerCreationProps {
  customerStep?: 'info' | 'address'
  setCustomerStep?: (step: 'info' | 'address') => void
  mode?: 'create' | 'edit'
}

export function CustomerFullData({
  customerStep,
}: ICustomerCreationProps) {
  const t = useTranslations()
  const toggleComponentDisplay = (step: string): boolean => {
    if (customerStep !== undefined) {
      return customerStep === step
    }
    return true
  }
  return (
    <div
      className='flex flex-col justify-between space-y-2 p-2 
            w-full min-h-32 bg-slate-200 rounded-sm max-h-72 overflow-y-auto'
    >
      <CustomerInfo isCurrent={toggleComponentDisplay('info')} />
      <CustomerAddress isCurrent={toggleComponentDisplay('address')} />
    </div>
  )
}
