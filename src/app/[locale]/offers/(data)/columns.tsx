'use client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DataTableColumnHeader } from '@/components/Data-Table/Data-Table-Column-Header'
import { DataTableSimpleHeaderRender } from '@/components/Data-Table/Data-Table-Simple-Header-Render'
import { DataTableSimpleCellRender } from '@/components/Data-Table/Date-Table-Simple-Cell-Render'
import { DataTableRowActions } from '@/components/Data-Table/Data-Table-Row-Action'
import { DiscountTypes, OrderProduct, ToolbarOptions } from '@/types'
import { filterDateWithinRange } from '@/lib/utils'
import { OfferTableDataType } from './schema'
import { OfferItems } from '../(components)'
import { useTranslations } from 'next-intl'
import { ProductTableDataType } from '../../products/(data)/schema'
import { ShieldCheck, ShieldBan } from 'lucide-react'

export const offersColumns: ColumnDef<OfferTableDataType>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => <div className='w-20 text-xs'>{row.getValue('no')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'choices',
    header: () => <DataTableSimpleHeaderRender title='choices' />,
    cell: ({ row }) => {
      return <OfferItems choices={row.getValue('choices')} />
    },
    filterFn: (rows, id, filterValue) => {
      const choices: OrderProduct[][] = rows.original.choices
      const choiceValues: OrderProduct[] = Object.values(choices).flat()
      return choiceValues.some((choice) => {
        return (
          choice.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          choice.SKUs!.includes(filterValue.toUpperCase())
        )
      })
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='price' />
    ),
    cell: ({ row }) => (
      <div className='w-12 text-center'>{row.getValue('price')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'discount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='discount' />
    ),
    cell: ({ row }) => (
      <RenderDiscountCell discount={row.getValue('discount')} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='total' />
    ),
    cell: ({ row }) => (
      <div className='w-12 text-center'>{row.getValue('total')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='status' />
    ),
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
    accessorKey: 'expireAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='expiry_date' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('expireAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<OfferTableDataType>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<OfferTableDataType>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        updateLink={`/offers/${row.getValue('no')}`}
        resource='offers'
        row={row}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

export const offersToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: false,
    defaultFilterColumn: 'choices',
    inputPlaceholder: 'filter_offers',
  },
  filterByDateRange: {
    show: true,
    column: 'expireAt',
    title: 'order_offers_by_expiry_date',
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
