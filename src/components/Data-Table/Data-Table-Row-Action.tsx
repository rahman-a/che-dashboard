'use client'

import { EllipsisVertical, LucideEye, Link } from 'lucide-react'
import { Row } from '@tanstack/react-table'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { DeleteBtn } from '../'
import { useTranslations } from 'next-intl'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const t = useTranslations()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <EllipsisVertical className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem className='cursor-pointer flex-row-reverse rtl:flex-row justify-end'>
          <span>{t('view')}</span>
          <DropdownMenuShortcut className='mr-2 ml-0 rtl:ml-2 rtl:mr-0'>
            <Link className='h-4 w-4' />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
