'use client'
import { Printer, FileEdit, FileOutput, FileCog } from 'lucide-react'
import { Row } from '@tanstack/react-table'
import { Button } from './ui/button'
import { Order } from '@/app/[locale]/orders/(data)/data-schema'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function OrderInvoiceActions<TData extends Order>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='flex'>
          <FileCog className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem className='cursor-pointer'>
          <DropdownMenuShortcut className='mr-1 ml-0'>
            <Printer className='h-4 w-4' />
          </DropdownMenuShortcut>
          <span>Print Invoice</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <DropdownMenuShortcut className='mr-1 ml-0'>
            <FileOutput className='h-4 w-4' />
          </DropdownMenuShortcut>
          <span>Send Invoice</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <DropdownMenuShortcut className='mr-1 ml-0'>
            <FileEdit className='h-4 w-4' />
          </DropdownMenuShortcut>
          <span>View Invoice</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
