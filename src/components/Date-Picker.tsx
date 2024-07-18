'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { arEG, enUS } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SelectSingleEventHandler } from 'react-day-picker'
import { useTranslations, useLocale } from 'next-intl'

interface DatePickerProps {
  className?: string
  onSelect: SelectSingleEventHandler | undefined
  date: Date | undefined
}

export function DatePicker({ className, onSelect, date }: DatePickerProps) {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4' />
          {date ? (
            <span>
              {format(date, 'PPP', {
                locale: locale === 'en' ? enUS : arEG,
              })}
            </span>
          ) : (
            <span>{t('pick_date')}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(`w-auto p-0`, className)} align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={onSelect}
          initialFocus
          locale={locale === 'en' ? enUS : arEG}
        />
      </PopoverContent>
    </Popover>
  )
}
