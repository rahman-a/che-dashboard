'use client'
import * as React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { CustomerInfo, CustomerAddress } from './'
import { Customer } from '@/types'
import { useTranslations } from 'next-intl'

export interface ICustomerCreationProps {
  customer?: Customer
  customerStep?: 'info' | 'address'
  setCustomerStep?: (step: 'info' | 'address') => void
  mode?: 'create' | 'edit'
}

export function CustomerFullData({
  customer,
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
