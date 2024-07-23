'use client'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CalendarIcon, Edit } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SelectTrigger } from '@radix-ui/react-select'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { arEG, enUS } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { getLangDir } from 'rtl-detect'
import { useLocale, useTranslations } from 'next-intl'

export interface IInvoiceHeaderEditDialogProps {}

const formSchema = z.object({
  status: z.string(),
  dueDate: z.date(),
})

export function InvoiceHeaderEditDialog(props: IInvoiceHeaderEditDialogProps) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 'important',
      dueDate: new Date(),
    },
  })
  // create a function to subtract selected data from the current date and return result in days
  const subtractDates = (date: Date) => {
    const currentDate = new Date()
    const diffTime = Math.abs(date.getTime() - currentDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='absolute -top-8 right-3 flex items-center justify-center 
      space-x-1 rtl:space-x-reverse bg-gray-100 z-0 
      text-black rounded-b-none rounded-t-md hover:bg-gray-200'
        >
          <Edit className='w-4 h-4' />
          <span>{t('edit')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t('edit_invoice')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='grid gap-5 py-4' onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start space-y-2'>
                  <FormLabel className='font-semibold'>
                    {t('select_invoice_status')}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    dir={getLangDir(locale)}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full flex border p-2 rounded-md'>
                        <SelectValue placeholder={t('select_invoice_status')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='urgent'>{t('urgent')}</SelectItem>
                      <SelectItem value='important'>
                        {t('important')}
                      </SelectItem>
                      <SelectItem value='contact'>{t('contact')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dueDate'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <FormLabel className='font-semibold'>
                    {t('due_date')}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left rtl:flex-row-reverse font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', {
                              locale: locale === 'en' ? enUS : arEG,
                            })
                          ) : (
                            <span>{t('pick_date')}</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        locale={locale === 'en' ? enUS : arEG}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {t('invoice_expired_after_days', {
                      days: subtractDates(field.value),
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='flex-row gap-2 justify-end'>
              <Button type='submit'>{t('save')}</Button>
              <DialogClose asChild>
                <Button variant='outline'>{t('cancel')}</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
