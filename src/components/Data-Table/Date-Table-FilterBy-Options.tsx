import React from 'react'
import { FilterIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Column } from '@tanstack/react-table'
import { Input } from '../ui/input'

interface DataTableFilterByOptionsProps<TData> {
  getColumn: (columnId: string) => Column<TData, unknown> | undefined
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function DateTableFilterByOptions<TData>({
  getColumn,
  options,
}: DataTableFilterByOptionsProps<TData>) {
  const [filterColumn, setFilterColumn] = React.useState('no')
  return (
    <div className='flex items-center space-x-2'>
      <Input
        placeholder='Filter orders...'
        value={(getColumn(filterColumn)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          getColumn(filterColumn)?.setFilterValue(event.target.value)
        }
        className='h-8 w-[150px] lg:w-[250px]'
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' size='icon' className='h-7 w-8'>
            <FilterIcon className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='py-2 px-1 w-36'>
          <RadioGroup
            defaultValue={filterColumn}
            className='gap-0'
            onValueChange={setFilterColumn}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className='flex items-center space-x-2 cursor-pointer hover:bg-primary-foreground p-2 rounded-sm'
              >
                <RadioGroupItem value={option.value} id={option.value} />
                {option.icon && (
                  <option.icon className='h-4 w-4 text-muted-foreground' />
                )}
                <Label
                  htmlFor={option.value}
                  className='text-[13px] text-primary cursor-pointer'
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </PopoverContent>
      </Popover>
    </div>
  )
}
