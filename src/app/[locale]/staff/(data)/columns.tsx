'use client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DataTableColumnHeader } from '@/components/Data-Table/Data-Table-Column-Header'
import { DataTableSimpleHeaderRender } from '@/components/Data-Table/Data-Table-Simple-Header-Render'
import { DataTableRowActions } from '@/components/Data-Table/Data-Table-Row-Action'
import { filterDateWithinRange } from '@/lib/utils'
import { ToolbarOptions, Staff } from '@/types'
import { staffSchema } from '@/schema'
import { DataTableSimpleCellRender } from '@/components/Data-Table/Date-Table-Simple-Cell-Render'
import {
  AtSign,
  Globe,
  Phone,
  ShieldBan,
  ShieldCheck,
  User,
} from 'lucide-react'

export const staffColumns: ColumnDef<Omit<Staff, 'password'>>[] = [
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
    header: () => <DataTableSimpleHeaderRender title='name' />,
    cell: ({ row }) => <div className='w-full'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableSimpleHeaderRender title='email' />,
    cell: ({ row }) => <div className='w-full'>{row.getValue('email')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='role' />
    ),
    cell: ({ row }) => <div className='w-full'>{row.getValue('role')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableSimpleHeaderRender
        title='phone'
        className='block text-center'
      />
    ),
    cell: ({ row }) => (
      <span className='w-32 order-customer-phone block'>
        {row.getValue('phone')}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'country',
    header: () => <DataTableSimpleHeaderRender title='country' />,
    cell: ({ row }) => <div className='w-full'>{row.getValue('country')}</div>,
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as string).toLocaleLowerCase())
    },
  },
  {
    accessorKey: 'address',
    header: () => <DataTableSimpleHeaderRender title='address' />,
    cell: ({ row }) => <div className='w-full'>{row.getValue('address')}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableSimpleHeaderRender title='status' />,
    cell: ({ row }) => (
      <DataTableSimpleCellRender
        badge={{
          text: row.getValue('status'),
          variant:
            row.getValue('status') === 'active' ? 'default' : 'destructive',
        }}
      />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<Omit<Staff, 'password'>>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        resource='staff'
        row={row}
        updateLink={`/staff/${row.original.id}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

export const staffToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: true,
    defaultFilterColumn: 'name',
    inputPlaceholder: 'filter_employees',
    options: [
      { value: 'name', label: 'name', icon: User },
      { value: 'email', label: 'email', icon: AtSign },
      { value: 'phone', label: 'phone', icon: Phone },
      { value: 'country', label: 'country', icon: Globe },
    ],
  },
  filterByDateRange: {
    show: false,
  },
  selectedRowFilter: {
    show: false,
  },
  facetedFilter: {
    show: true,
    data: [
      {
        column: 'status',
        options: [
          { value: 'active', label: 'active', icon: ShieldCheck },
          { value: 'inactive', label: 'inactive', icon: ShieldBan },
        ],
      },
    ],
  },
  toggleColumn: {
    show: true,
  },
}
