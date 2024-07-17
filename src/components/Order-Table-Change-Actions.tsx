import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  prioritization,
  statuses,
  payment,
} from '@/app/[locale]/orders/(data)/data'

type ActionTriggerProps = {
  label: string
  value: string
  Icon?: React.ComponentType<{ className?: string }>
}

const options = {
  'change-status': statuses,
  'change-payment': payment,
  'change-priority': prioritization,
}

type OptionsValue = keyof typeof options

export function OrderTableChangeActions({
  label,
  value,
  Icon,
}: ActionTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='p-4 pl-1 pr-0 space-x-2 rtl:space-x-reverse justify-start 
                font-normal text-gray-800'
        >
          {Icon && <Icon className='h-4 w-4' />}
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            Make changes to your order here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center items-center py-4'>
          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options[value as OptionsValue].map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className='flex items-center space-x-2'>
                      {option.icon && <option.icon className='h-4 w-4' />}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
