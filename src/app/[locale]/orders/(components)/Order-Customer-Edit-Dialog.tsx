'use client'
import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowLeft, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CustomerFullData } from '@/components/Customers'
import { useTranslations } from 'next-intl'

export interface NewOrderCustomerEditDialog {}

export function NewOrderCustomerEditDialog(props: NewOrderCustomerEditDialog) {
  const t = useTranslations()
  const [customerStep, setCustomerStep] = React.useState<'info' | 'address'>(
    'info'
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon' className='h-6 w-6 p-1'>
          <Edit className='w-5 h-5 cursor-pointer' />
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        aria-describedby='create new customer'
      >
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            {customerStep === 'address' && (
              <Button
                asChild
                variant='outline'
                size='icon'
                onClick={() => setCustomerStep('info')}
              >
                <ArrowLeft className='h-5 w-5 cursor-pointer' />
              </Button>
            )}
            <p>
              {customerStep === 'info' ? 'Customer Info' : 'Customer Address'}
            </p>
          </DialogTitle>
        </DialogHeader>
        <CustomerFullData
          mode='edit'
          customerStep={customerStep}
          setCustomerStep={setCustomerStep}
        />
        <DialogFooter className='flex-row justify-end space-x-2'>
          <Button
            onClick={() => setCustomerStep('address')}
            variant='outline'
            className={cn(`hidden ml-2`, {
              flex: customerStep === 'info',
            })}
          >
            {t('next')}
          </Button>
          <DialogClose asChild>
            <Button variant='secondary'>{t('cancel')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
