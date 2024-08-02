'use client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DataTableColumnHeader } from '@/components/Data-Table/Data-Table-Column-Header'
import { DataTableSimpleHeaderRender } from '@/components/Data-Table/Data-Table-Simple-Header-Render'
import { DataTableSimpleCellRender } from '@/components/Data-Table/Date-Table-Simple-Cell-Render'
import { DataTableRowActions } from '@/components/Data-Table/Data-Table-Row-Action'
import {
  Customer,
  CustomerAddress,
  DiscountTypes,
  OrderProduct,
  ToolbarOptions,
} from '@/types'
import { filterDateWithinRange } from '@/lib/utils'
import { CustomerAddresses } from '../(components)/Addresses'
import { useTranslations } from 'next-intl'
import { User, Phone, AtSign } from 'lucide-react'
import { CreateUpdateCustomer } from '../(components)/Create-Update-Customer'

export const CustomerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => {
      return <div className='w-auto text-xs'>{parseInt(row.id) + 1}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: () => <DataTableSimpleHeaderRender title='customer_name' />,
    cell: ({ row }) => <div className='w-full'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableSimpleHeaderRender title='customer_email' />
    ),
    cell: ({ row }) => <div className='w-full'>{row.getValue('email')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableSimpleHeaderRender title='customer_phone' />
    ),
    cell: ({ row }) => <span className='w-32 order-customer-phone block'>{row.getValue('phone')}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'address',
    header: () => <DataTableSimpleHeaderRender title='customer_address' />,
    cell: ({ row }) => {
      return <CustomerAddresses addresses={row.getValue('address')} />
    },
  },
  //   {
  //     accessorKey: 'createdAt',
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title='createdAt' />
  //     ),
  //     cell: ({ row }) => (
  //       <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
  //     ),
  //     filterFn: filterDateWithinRange<Customer>,
  //   },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        resource='customers'
        row={row}
        updateComponent={
        <CreateUpdateCustomer
          mode='update'
          data={row.original}
        />}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

export const CustomerToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: true,
    defaultFilterColumn: 'name',
    inputPlaceholder: 'filter_customers',
    options: [
      { value: 'name', label: 'name', icon: User },
      { value: 'email', label: 'email', icon: AtSign },
      { value: 'phone', label: 'phone', icon: Phone },
    ],
  },
  filterByDateRange: {
    show: false,
  },
  selectedRowFilter: {
    show: false,
  },
  facetedFilter: {
    show: false,
  },
  toggleColumn: {
    show: true,
  },
}
