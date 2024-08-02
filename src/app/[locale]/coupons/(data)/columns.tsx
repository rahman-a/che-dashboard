'use client'
import { ColumnDef } from '@tanstack/react-table'
import { Fragment } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import { couponsSchema } from '@/schema'
import { DataTableColumnHeader } from '@/components/Data-Table/Data-Table-Column-Header'
import { DataTableSimpleHeaderRender } from '@/components/Data-Table/Data-Table-Simple-Header-Render'
import { DataTableRowActions } from '@/components/Data-Table/Data-Table-Row-Action'
import { CreateUpdateCoupon } from '../(components)'
import { filterDateWithinRange } from '@/lib/utils'
import { Coupon, DiscountTypes, ToolbarOptions } from '@/types'
import DateTableCellCopyClipboard from '@/components/Data-Table/Date-Table-Cell-Copy-Clipboard'
import DateTableCellContentDialog from '@/components/Data-Table/Data-Table-Cell-content-Dialog'
import { useTranslations } from 'next-intl'
import { ShieldBan, ShieldCheck } from 'lucide-react'
import { DataTableSimpleCellRender } from '@/components/Data-Table/Date-Table-Simple-Cell-Render'

export const couponsColumns: ColumnDef<Coupon>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => <div className='text-xs'>{parseInt(row.id) + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableSimpleHeaderRender
        title='code'
        className='p-4 block text-center table-data-padding-none'
      />
    ),
    cell: ({ row }) => (
      <DateTableCellCopyClipboard content={row.getValue('code')} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: () => <DataTableSimpleHeaderRender title='description' />,
    cell: ({ row }) => {
      const value = row.getValue('description') as string
      return <DateTableCellContentDialog content={value} />
    },
    enableSorting: false,
  },
  {
    accessorKey: 'discount',
    header: ({ column }) => <DataTableSimpleHeaderRender title='name' />,
    cell: ({ row }) => (
      <RenderDiscountCell discount={row.getValue('discount')} />
    ),
    enableSorting: false,
    enableHiding: false,
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
    enableSorting: true,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'timesUsed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='times_used' />
    ),
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('timesUsed')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'maxUsed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='max_used' />
    ),
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('maxUsed')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'expireAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='expireAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('expireAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<Coupon>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        updateComponent={
          <CreateUpdateCoupon mode='update' data={row.original} />
        }
        resource='coupons'
        row={row}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

export const couponsToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: false,
    defaultFilterColumn: 'code',
    inputPlaceholder: 'filter_coupons',
  },
  filterByDateRange: {
    show: true,
    column: 'expireAt',
    title: 'order_coupons_by_expiry_date',
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

const RenderDiscountCell = ({
  discount,
}: {
  discount: { value: number; type: DiscountTypes }
}) => {
  const t = useTranslations()
  return (
    <div className='w-12 text-center'>
      {discount.value === 0
        ? 'N/A'
        : `${discount.value} ${discount.type === 'amount' ? t('kw') : '%'}`}
    </div>
  )
}
