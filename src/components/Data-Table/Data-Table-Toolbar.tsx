'use client'

import { CircleMinus, CirclePlus, FilterIcon } from 'lucide-react'
import { Table } from '@tanstack/react-table'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DataTableViewOptions } from './Data-Table-View-Options'

import {
  prioritization,
  statuses,
  payment,
  filterByOptions,
  selectedRowsOptions,
} from '@/app/[locale]/orders/(data)/data'
import { DataTableFacetedFilter } from './Data-Table-Faceted-Filter'
import { DateTableFilterByOptions } from './Date-Table-FilterBy-Options'
import { SelectedRowsActions } from './Selected-Rows-Actions'
import SortDataTableByDate from './Sort-Table-By-Date'
import { useTranslations } from 'next-intl'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const t = useTranslations()
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className='flex items-start md:items-center justify-between'>
      <div
        className='flex flex-1 items-center space-y-2 lg:space-y-0 md:space-x-2 
      rtl:space-x-reverse flex-wrap lg:flex-nowrap'
      >
        <div className='flex items-center space-x-1 rtl:space-x-reverse'>
          <DateTableFilterByOptions
            options={filterByOptions}
            getColumn={table.getColumn}
          />
          <SortDataTableByDate column={table.getColumn('date')} />
        </div>
        <div className='flex items-center w-[22rem] lg:w-80 flex-wrap lg:flex-nowrap gap-1'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='status'
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title='priority'
              options={prioritization}
            />
          )}
          {table.getColumn('payment') && (
            <DataTableFacetedFilter
              column={table.getColumn('payment')}
              title='payment'
              options={payment}
            />
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              {t('reset')}
              <CircleMinus className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
      <div
        className='flex items-center space-x-2 rtl:space-x-reverse 
      -translate-x-16 rtl:translate-x-16 lg:translate-x-0 rtl:lg:translate-x-0'
      >
        <SelectedRowsActions
          getColumn={table.getColumn}
          getRow={table.getRow}
          options={selectedRowsOptions}
          isRowsSelected={
            table.getIsAllPageRowsSelected() ||
            table.getIsSomePageRowsSelected()
          }
          selectedRows={table.getState().rowSelection}
        />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
