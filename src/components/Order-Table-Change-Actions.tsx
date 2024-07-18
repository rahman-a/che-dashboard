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
import { useLocale, useTranslations } from 'next-intl'
import { getLangDir } from 'rtl-detect'

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
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='p-4 pl-1 pr-0 rtl:pl-0 rtl:pr-1 space-x-2 rtl:space-x-reverse justify-start 
                font-normal text-gray-800 rtl:flex-row-reverse'
        >
          {Icon && <Icon className='h-4 w-4' />}
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='rtl:text-center'>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{t('order_change_guide_msg')}</DialogDescription>
        </DialogHeader>
        <div className='flex justify-center items-center py-4'>
          <Select dir={getLangDir(locale)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options[value as OptionsValue].map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                      {option.icon && <option.icon className='h-4 w-4' />}
                      <span>{t(option.label)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type='submit'>{t('save_change')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
