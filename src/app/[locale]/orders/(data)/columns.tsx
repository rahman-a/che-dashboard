'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { prioritization, statuses } from './data'
import { Order } from './data-schema'
import { DataTableColumnHeader } from '@/components/Data-Table/Data-Table-Column-Header'
import { DataTableRowActions } from '@/components/Data-Table/Data-Table-Row-Action'
import { Button } from '@/components/ui/button'
import { List, CircleCheckBig, CircleX, FileCog } from 'lucide-react'
import { cn, filterDateWithinRange } from '@/lib/utils'
import OrdersItems from '@/components/Order-Items'
import { OrderInvoiceActions } from '@/components/Order-Invoice-Actions'
import { useTranslations } from 'next-intl'

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'no',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='no' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('no')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <Badge
          className='flex w-28 items-center justify-center'
          style={{ backgroundColor: `hsl(var(${status.color}))` }}
        >
          {status.icon && (
            <status.icon className='mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-white' />
          )}
          <RenderColumnHeader title={status.label} />
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='priority' />
    ),
    cell: ({ row }) => {
      const priority = prioritization.find(
        (priority) => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      return (
        <Badge
          className='flex items-center justify-center w-24'
          style={{ backgroundColor: `hsl(var(${priority.color}))` }}
        >
          {priority.icon && (
            <priority.icon className='mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-white' />
          )}
          <RenderColumnHeader title={priority.label} />
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'payment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='payment' />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          className='flex items-center justify-center 
        w-24 space-x-1 rtl:space-x-reverse bg-neutral-100 border hover:bg-slate-100'
        >
          {row.original.payment === 'paid' ? (
            <CircleCheckBig className='h-4 w-4 text-green-500' />
          ) : (
            <CircleX className='h-4 w-4 text-red-500' />
          )}
          <RenderColumnHeader
            title={row.getValue('payment')}
            className='capitalize text-slate-800'
          />
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='total' />
    ),
    cell: ({ row }) => (
      <RenderColumnHeader text={row.getValue('total')} title='kw' />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'products',
    header: () => <RenderColumnHeader title='products' />,
    cell: ({ row }) => {
      return <OrdersItems />
    },
  },

  {
    accessorKey: 'customer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='customer' />
    ),
    cell: ({ row }) => <span>{row.getValue('customer')}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='country' />
    ),
    cell: ({ row }) => <span>{row.getValue('country')}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='phone' className='w-32' />
    ),
    cell: ({ row }) => (
      <span className='w-32 order-customer-phone'>{row.getValue('phone')}</span>
    ),
    enableSorting: false,
  },

  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='date' />
    ),
    cell: ({ row }) => <span>{row.getValue('date')}</span>,
    filterFn: filterDateWithinRange,
  },
  {
    accessorKey: 'invoice',
    header: () => <RenderColumnHeader title='invoice' />,
    cell: ({ row }) => {
      return <OrderInvoiceActions row={row} />
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
]

function RenderColumnHeader({
  text,
  title,
  className,
}: {
  text?: string
  title: string
  className?: string
}) {
  const t = useTranslations()
  return (
    <span className={className}>
      {text ? `${text} ` : ''}
      {t(title)}
    </span>
  )
}
