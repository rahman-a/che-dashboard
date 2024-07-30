'use client'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  prioritization,
  statuses,
  filterByOptions,
  payment,
  selectedRowsOptions,
} from './data'
import { Order } from './data-schema'
import { DataTableColumnHeader } from '@/components/Data-Table/Data-Table-Column-Header'
import { DataTableRowActions } from '@/components/Data-Table/Data-Table-Row-Action'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { filterDateWithinRange } from '@/lib/utils'
import { OrdersItems, OrderInvoiceActions } from '@/components/Orders'
import { DataTableSimpleHeaderRender } from '@/components/Data-Table/Data-Table-Simple-Header-Render'
import { ToolbarOptions } from '@/types'
import { format } from 'date-fns'

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
      <DataTableColumnHeader
        column={column}
        title='status'
        className='order-status-head'
      />
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
          <DataTableSimpleHeaderRender title={status.label} />
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
      <DataTableColumnHeader
        column={column}
        title='priority'
        className='order-priority-head'
      />
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
          <DataTableSimpleHeaderRender title={priority.label} />
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
      <DataTableColumnHeader
        column={column}
        title='payment'
        className='order-payment-head'
      />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          className='flex items-center justify-center 
        w-28 space-x-1 rtl:space-x-reverse bg-neutral-100 border hover:bg-slate-100'
        >
          {row.original.payment === 'paid' ? (
            <CircleCheckBig className='h-4 w-4 text-green-500' />
          ) : (
            <CircleX className='h-4 w-4 text-red-500' />
          )}
          <DataTableSimpleHeaderRender
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
      <DataTableColumnHeader
        column={column}
        title='total'
        className='order-total-head'
      />
    ),
    cell: ({ row }) => (
      <DataTableSimpleHeaderRender text={row.getValue('total')} title='kw' />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'products',
    header: () => <DataTableSimpleHeaderRender title='products' />,
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
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('date')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<Order>,
  },
  {
    accessorKey: 'invoice',
    header: () => <DataTableSimpleHeaderRender title='invoice' />,
    cell: ({ row }) => {
      return <OrderInvoiceActions row={row} />
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions resource='orders' row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
]

export const toolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: true,
    options: filterByOptions,
    defaultFilterColumn: 'no',
    inputPlaceholder: 'filter_orders',
  },
  filterByDateRange: {
    show: true,
    column: 'date',
  },
  facetedFilter: {
    show: true,
    data: [
      {
        column: 'status',
        options: statuses,
      },
      {
        column: 'priority',
        options: prioritization,
      },
      {
        column: 'payment',
        options: payment,
      },
    ],
  },
  selectedRowFilter: {
    show: true,
    options: selectedRowsOptions,
  },
  toggleColumn: {
    show: true,
  },
}
