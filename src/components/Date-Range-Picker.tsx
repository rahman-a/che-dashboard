'use client'

import * as React from 'react'
import { addDays, format, subDays } from 'date-fns'
import { arEG, enUS } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTranslations, useLocale } from 'next-intl'

export default function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations()
  const locale = useLocale()
  const [date, setDate] = React.useState<DateRange | undefined>()

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', {
                    locale: locale === 'en' ? enUS : arEG,
                  })}{' '}
                  -{' '}
                  {format(date.to, 'LLL dd, y', {
                    locale: locale === 'en' ? enUS : arEG,
                  })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', {
                  locale: locale === 'en' ? enUS : arEG,
                })
              )
            ) : (
              <span>{t('pick_date')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={locale === 'en' ? enUS : arEG}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
