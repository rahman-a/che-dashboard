'use client'
import { Printer, FileEdit, FileOutput, FileCog, FileInput } from 'lucide-react'
import { Row } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Order } from '@/app/[locale]/orders/(data)/data-schema'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function OrderInvoiceActions<TData extends Order>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original
  const t = useTranslations()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='flex'>
          <FileCog className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem className='cursor-pointer rtl:flex-row-reverse space-x-2 rtl:space-x-reverse'>
          <DropdownMenuShortcut className='mr-1 ml-0'>
            <Printer className='h-4 w-4' />
          </DropdownMenuShortcut>
          <span>{t('print_invoice')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer rtl:flex-row-reverse space-x-2 rtl:space-x-reverse'>
          <DropdownMenuShortcut className='mr-1 ml-0'>
            <FileOutput className='flex rtl:hidden h-4 w-4' />
            <FileInput className='hidden rtl:flex h-4 w-4' />
          </DropdownMenuShortcut>
          <span>{t('send_invoice')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer rtl:flex-row-reverse space-x-2 rtl:space-x-reverse'>
          <DropdownMenuShortcut className='mr-1 ml-0'>
            <FileEdit className='h-4 w-4' />
          </DropdownMenuShortcut>
          <Link href="/invoices/1">{t('view_invoice')}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
