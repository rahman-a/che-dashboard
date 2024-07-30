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
import { DataTableFilterByOptions } from './Data-Table-FilterBy-Options'
import { SelectedRowsActions } from './Selected-Rows-Actions'
import SortDataTableByDate from './Sort-Table-By-Date'
import { useTranslations } from 'next-intl'
import { ToolbarOptions } from '@/types'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  toolbarOptions: ToolbarOptions
}

export function DataTableToolbar<TData>({
  table,
  toolbarOptions,
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
          <DataTableFilterByOptions
            options={toolbarOptions.filterByOptions}
            getColumn={table.getColumn}
          />
          {toolbarOptions.filterByDateRange.show && (
            <SortDataTableByDate
              column={table.getColumn(toolbarOptions.filterByDateRange.column!)}
            />
          )}
        </div>
        <div className='flex items-center w-[22rem] lg:w-80 flex-wrap lg:flex-nowrap gap-1'>
          {toolbarOptions.facetedFilter.show &&
            toolbarOptions.facetedFilter.data?.map(
              (filter) =>
                table.getColumn(filter.column) && (
                  <DataTableFacetedFilter
                    key={filter.column}
                    column={table.getColumn(filter.column)}
                    title={filter.column}
                    options={filter.options}
                  />
                )
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
        {toolbarOptions.selectedRowFilter.show && (
          <SelectedRowsActions
            getColumn={table.getColumn}
            getRow={table.getRow}
            options={toolbarOptions.selectedRowFilter.options!}
            isRowsSelected={
              table.getIsAllPageRowsSelected() ||
              table.getIsSomePageRowsSelected()
            }
            selectedRows={table.getState().rowSelection}
          />
        )}

        {toolbarOptions.toggleColumn.show && (
          <DataTableViewOptions table={table} />
        )}
      </div>
    </div>
  )
}
