'use client'
import { ColumnDef } from '@tanstack/react-table'
import { Fragment } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import {
  ProductTableDataType,
  CategoryDataTable,
  SizeDataTable,
  TypeDataTable,
} from './schema'
import { DataTableColumnHeader } from '@/components/Data-Table/Data-Table-Column-Header'
import { DataTableSimpleHeaderRender } from '@/components/Data-Table/Data-Table-Simple-Header-Render'
import { DataTableRowActions } from '@/components/Data-Table/Data-Table-Row-Action'
import DateTableCellContentDialog from '@/components/Data-Table/Data-Table-Cell-content-Dialog'
import {
  CreateUpdateCategory,
  CreateUpdateMaterial,
  CreateUpdateSize,
  CreateUpdateType,
} from '../(components)'
import { filterDateWithinRange } from '@/lib/utils'
import { ToolbarOptions, Material } from '@/types'
import { materialSchema, productSchema } from '@/schema'
import { filterByOptions } from './data'

// no - image - name - description - stock - price - category - SKUs - actions

//******************* PRODUCTS *******************//
export const productsColumns: ColumnDef<ProductTableDataType>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => <div className='w-20 text-xs'>{row.getValue('no')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: () => <DataTableSimpleHeaderRender title='image' />,
    cell: ({ row }) => {
      return (
        <div className='w-[80px]'>
          <Image
            width={25}
            height={25}
            src={row.getValue('image')}
            alt='product image'
          />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' />
    ),
    cell: ({ row }) => (
      <div className='w-20 text-xs'>{row.getValue('name')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'description',
  //   header: () => <DataTableSimpleHeaderRender title='description' />,
  //   cell: ({ row }) => {
  //     const value = row.getValue('description') as string
  //     return <div className='w-20 text-xs truncate'>{value.slice(0, 50)}</div>
  //   },
  //   enableSorting: false,
  // },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='stock_status' />
    ),
    cell: ({ row }) => (
      <div className='w-12 text-center'>{row.getValue('stock')}</div>
    ),
    enableSorting: true,
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
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: () => <DataTableSimpleHeaderRender title='category' />,
    cell: ({ row }) => (
      <div className='w-20 capitalize'>{row.getValue('category')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'SKUs',
    header: () => <DataTableSimpleHeaderRender title='skus' />,
    cell: ({ row }) => {
      const SKUs = row.getValue('SKUs') as Pick<
        ProductTableDataType,
        'SKUs'
      >['SKUs']
      return (
        <ul className='flex flex-col text-xs space-y-1 w-32 list-disc list-inside'>
          {SKUs.map((sku) => (
            <Fragment key={sku}>
              <li>{sku}</li>
            </Fragment>
          ))}
        </ul>
      )
    },
    filterFn: (row, id, value) => {
      const SKUs = row.original.SKUs
      for (let sku of SKUs) {
        if (sku.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
          return true
      }
      return false
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<ProductTableDataType>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        updateLink={`/products/${row.getValue('no')}`}
        resource='products'
        row={row}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

export const productsToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: true,
    defaultFilterColumn: 'SKUs',
    options: filterByOptions,
    inputPlaceholder: 'filter_products',
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

//******************* CATEGORIES *******************//
export const categoriesColumns: ColumnDef<CategoryDataTable>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => <div className='w-20 text-xs'>{row.getValue('no')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: () => <DataTableSimpleHeaderRender title='image' />,
    cell: ({ row }) => {
      return (
        <div className='w-[80px]'>
          <Image
            width={25}
            height={25}
            src={row.getValue('image')}
            alt='product image'
          />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' />
    ),
    cell: ({ row }) => <div className='w-20'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: () => <DataTableSimpleHeaderRender title='description' />,
    cell: ({ row }) => {
      const value = row.getValue('description') as string
      return <div className='w-28 truncate'>{value.slice(0, 50)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'products_no',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='products' />
    ),
    cell: ({ row }) => {
      return (
        <div className='w-20 text-center'>{row.getValue('products_no')}</div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<CategoryDataTable>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { name, description, image } = row.original
      return (
        <DataTableRowActions
          resource='categories'
          row={row}
          updateComponent={
            <CreateUpdateCategory
              mode='update'
              data={{ name, description, image }}
            />
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
export const categoriesToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: false,
    defaultFilterColumn: 'name',
    inputPlaceholder: 'filter_categories',
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

//******************* SIZES *******************//
export const sizesColumns: ColumnDef<SizeDataTable>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => <div className='w-20 text-xs'>{row.getValue('no')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='size' />
    ),
    cell: ({ row }) => <div className='w-20'>{row.getValue('size')}</div>,
    enableSorting: true,
    filterFn: (row, id, value) => {
      const size = row.original.size
      return size.toString().includes(value)
    },
  },
  {
    accessorKey: 'description',
    header: () => <DataTableSimpleHeaderRender title='description' />,
    cell: ({ row }) => {
      const value = row.getValue('description') as string
      return <div className='w-28 truncate'>{value.slice(0, 50)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'products_no',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='products' />
    ),
    cell: ({ row }) => {
      return (
        <div className='w-20 text-center'>{row.getValue('products_no')}</div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<SizeDataTable>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { size, description } = row.original
      return (
        <DataTableRowActions
          resource='sizes'
          row={row}
          updateComponent={
            <CreateUpdateSize mode='update' data={{ size, description }} />
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
export const sizesToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: false,
    defaultFilterColumn: 'size',
    inputPlaceholder: 'filter_sizes',
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

//******************* TYPES *******************//
export const typesColumns: ColumnDef<TypeDataTable>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => <div className='w-20 text-xs'>{row.getValue('no')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: () => <DataTableSimpleHeaderRender title='image' />,
    cell: ({ row }) => {
      return (
        <div className='w-[80px]'>
          <Image
            width={25}
            height={25}
            src={row.getValue('image')}
            alt='product image'
          />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' />
    ),
    cell: ({ row }) => <div className='w-20'>{row.getValue('name')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: () => <DataTableSimpleHeaderRender title='description' />,
    cell: ({ row }) => {
      const value = row.getValue('description') as string
      return <div className='w-28 truncate'>{value.slice(0, 50)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'products_no',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='products' />
    ),
    cell: ({ row }) => {
      return (
        <div className='w-20 text-center'>{row.getValue('products_no')}</div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<TypeDataTable>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { name, description, image } = row.original
      return (
        <DataTableRowActions
          resource='types'
          row={row}
          updateComponent={
            <CreateUpdateType
              mode='update'
              data={{ name, description, image }}
            />
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
export const typesToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: false,
    defaultFilterColumn: 'name',
    inputPlaceholder: 'filter_types',
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

//******************* MATERIALS *******************//
export const materialsColumns: ColumnDef<Material>[] = [
  {
    accessorKey: 'no',
    header: () => <DataTableSimpleHeaderRender title='no' />,
    cell: ({ row }) => <div className='text-xs'>{parseInt(row.id) + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: () => <DataTableSimpleHeaderRender title='name' />,
    cell: ({ row }) => <div className='w-28'>{row.getValue('name')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'image',
    header: () => <DataTableSimpleHeaderRender title='image' />,
    cell: ({ row }) => {
      return (
        <div className='w-[80px]'>
          <Image
            width={100}
            height={100}
            src={row.getValue('image')}
            alt='product image'
          />
        </div>
      )
    },
    enableSorting: false,
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
    accessorKey: 'purchasedUnits',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='purchased_units'
        className='w-full lg:w-20'
      />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('purchasedUnits')}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: 'pricePerUnit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='price_per_unit'
        className='w-full lg:w-28 translate-x-4 rtl:translate-x-0'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-center w-full'>{row.getValue('pricePerUnit')}</div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'availableUnits',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='available_units'
        className='w-full lg:w-20'
      />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('availableUnits')}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: 'consumedUnits',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='consumed_units'
        className='w-full lg:w-20'
      />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('consumedUnits')}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy')}</span>
    ),
    filterFn: filterDateWithinRange<Material>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DataTableRowActions
          resource='types'
          row={row}
          updateComponent={
            <CreateUpdateMaterial mode='update' data={row.original} />
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
export const materialsToolbarOptions: ToolbarOptions = {
  filterByOptions: {
    show: false,
    defaultFilterColumn: 'name',
    inputPlaceholder: 'filter_materials',
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
