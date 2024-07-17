import React, { useEffect } from 'react'
import {
  LayoutList,
  ListChecks,
  Trash,
  Factory,
  ArrowUpDown,
  BadgeDollarSign,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Column, Row, RowSelectionState } from '@tanstack/react-table'
import { OrderTableChangeActions } from '../Order-Table-Change-Actions'
import DeleteBtn from '../Delete-Btn'
import { get } from 'http'

interface SelectedRowsActionsProps<TData> {
  getColumn: (columnId: string) => Column<TData, unknown> | undefined
  getRow: (id: string, searchAll?: boolean) => Row<TData>
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  selectedRows: RowSelectionState
  isRowsSelected?: boolean
}

export function SelectedRowsActions<TData>({
  getColumn,
  getRow,
  options,
  isRowsSelected,
  selectedRows,
}: SelectedRowsActionsProps<TData>) {
  const SelectedRowsCount = Object.keys(selectedRows).filter(
    (key) => selectedRows[key]
  ).length
  const selectedRowsData: TData[] = React.useMemo(() => {
    const selectedAllRows = Object.keys(selectedRows).filter(
      (key) => selectedRows[key]
    )
    return selectedAllRows.map((key) => getRow(key).original)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SelectedRowsCount])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='h-7 w-8'>
          {isRowsSelected ? (
            <ListChecks className='h-4 w-4' />
          ) : (
            <LayoutList className='h-4 w-4' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40 p-1'>
        <DropdownMenuLabel className='flex items-center justify-between text-[13px]'>
          <span>Selected Rows</span>
          <span className='border border-dashed px-1 rounded-sm'>
            {SelectedRowsCount > 0 ? SelectedRowsCount : ''}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='flex flex-col'>
          {options.map((option) => (
            <OrderTableChangeActions
              key={option.value}
              label={option.label}
              value={option.value}
              Icon={option.icon}
            />
          ))}
        </div>
        <DropdownMenuSeparator />
        <DeleteBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
