'use client'
import * as React from 'react'
import { Download, Printer } from 'lucide-react'
import { Options } from 'react-to-pdf'

import { Button } from '@/components/ui/button'
import { InvoicePreviewSheet } from './'

export interface IInvoiceActionsProps {
  toPDF: (options?: Options) => void
  handlePrint: () => void
}

export function InvoiceActions({ toPDF, handlePrint }: IInvoiceActionsProps) {
  return (
    <div className='flex justify-end gap-2 w-full'>
      <Button
        size='icon'
        variant='outline'
        className='flex items-center justify-center space-x-1 rtl:space-x-reverse'
        onClick={() => handlePrint()}
      >
        <Printer className='w-4 h-4' />
      </Button>
      <Button
        size='icon'
        variant='outline'
        className='flex items-center justify-center space-x-1 rtl:space-x-reverse'
        onClick={() => toPDF()}
      >
        <Download className='w-4 h-4' />
      </Button>
      <InvoicePreviewSheet />
    </div>
  )
}
