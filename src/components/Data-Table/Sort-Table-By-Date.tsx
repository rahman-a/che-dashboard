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
  DialogClose,
} from '@/components/ui/dialog'
import { CalendarSearchIcon } from 'lucide-react'
import { DatePicker } from '../Date-Picker'
import { Column } from '@tanstack/react-table'
import { addDays } from 'date-fns'
import { useTranslations } from 'next-intl'
interface SortDataTableByDateProps<TData, TValue> {
  column?: Column<TData, TValue>
}

export default function SortDataTableByDate<TData, TValue>({
  column,
}: SortDataTableByDateProps<TData, TValue>) {
  const t = useTranslations()
  const [start, setStart] = React.useState<Date | undefined>(new Date())
  const [end, setEnd] = React.useState<Date | undefined>(addDays(new Date(), 7))
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSubmit = () => {
    column?.setFilterValue(
      [start?.toISOString(), end?.toISOString()].filter(Boolean) as string[]
    )
    // close the dialog
    setIsOpen(false)
  }
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size='icon' variant='outline' className='h-7 w-8'>
          <CalendarSearchIcon className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='rtl:text-center'>
          <DialogTitle>{t('sort_by_date')}</DialogTitle>
          <DialogDescription>
            {t('filter_orders_by_date_range')}
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center items-center py-4'>
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center space-x-2 rtl:space-x-reverse'>
              <span className='w-10'>{t('from')}</span>
              <DatePicker
                date={start}
                onSelect={(newDate) => setStart(newDate)}
              />
            </div>
            <div className='flex items-center space-x-2 rtl:space-x-reverse'>
              <span className='w-10'>{t('to')}</span>
              <DatePicker date={end} onSelect={(newDate) => setEnd(newDate)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>
            {t('show_results')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
