'use client'

import { EllipsisVertical, Link } from 'lucide-react'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
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
import { ResourceTypes } from '@/types'
import React from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  resource: ResourceTypes
  updateLink?: string
  updateComponent?: React.ReactNode
}

export function DataTableRowActions<TData>({
  row,
  resource,
  updateLink,
  updateComponent,
}: DataTableRowActionsProps<TData>) {
  const t = useTranslations()
  const router = useRouter()
  const renderUpdateComponent = () => {
    if (updateLink) {
      return (
        <DropdownMenuItem asChild>
          <Button
            variant='outline'
            onClick={() => router.push(updateLink)}
            className='w-full cursor-pointer rtl:flex-row-reverse justify-start space-x-1 rtl:space-x-reverse'
          >
            <Link className='h-4 w-4' />
            <span>{t('edit')}</span>
          </Button>
        </DropdownMenuItem>
      )
    } else if (updateComponent) {
      return <DropdownMenuItem asChild>{updateComponent}</DropdownMenuItem>
    }
  }
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
        {renderUpdateComponent()}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
