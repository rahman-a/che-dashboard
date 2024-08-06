'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import orders from '@/demo/data/orders.json'
import { useLocale, useTranslations } from 'next-intl'
import { TranslationKeys } from '@/types'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getLangDir } from 'rtl-detect'
import { DateRangePicker } from '../Date-Range-Picker'
import { DateRange } from 'react-day-picker'

type Props = {}

export function RecentOrdersTable({}: Props) {
  const [tableType, setTableType] = React.useState<string>('orders')
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>{t('recent_orders')}</CardTitle>
          <div className='flex flex-col space-y-2 lg:space-y-0 lg:flex-row items-center lg:space-x-2 rtl:space-x-reverse'>
            <Select
              onValueChange={setTableType}
              defaultValue={tableType}
              dir={getLangDir(locale)}
            >
              <SelectTrigger className='w-full lg:w-[90px]'>
                <SelectValue placeholder={t('orders')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='orders' defaultChecked>
                    {t('orders')}
                  </SelectItem>
                  <SelectItem value='pieces'>{t('pieces')}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='flex lg:mx-4'>
              <DateRangePicker
                className='hidden lg:block'
                date={dateRange}
                setDate={setDateRange}
              />
            </div>
          </div>
        </div>
        <div className='flex lg:mx-4'>
          <DateRangePicker
            className='block lg:hidden'
            date={dateRange}
            setDate={setDateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table className='border-separate w-full overflow-x-auto'>
          <TableHeader>
            <TableRow className='bg-gray-50'>
              <TableHead className='w-[100px] capitalize rtl:text-right'>
                {t('no')}
              </TableHead>
              <TableHead className='rtl:text-right capitalize'>
                {t('status')}
              </TableHead>
              <TableHead className='rtl:text-right capitalize'>
                {t('country')}
              </TableHead>
              <TableHead className='rtl:text-right capitalize'>
                {t('customers')}
              </TableHead>
              <TableHead className='rtl:text-right capitalize'>
                {t('date')}
              </TableHead>
              <TableHead className='rtl:text-right capitalize'>
                {t('total')}
              </TableHead>
              <TableHead className='rtl:text-right capitalize'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(0, 5).map((order) => (
              <TableRow key={order.no}>
                <TableCell className='font-medium'>{order.no}</TableCell>
                <TableCell>{t(order.status as TranslationKeys)}</TableCell>
                <TableCell>{order.country}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  {order.total} {t('kw')}
                </TableCell>
                <TableCell>
                  <Button
                    variant='outline'
                    size='icon'
                    className='flex items-center space-x-1 text-gray-600 w-6 h-6'
                    asChild
                  >
                    <Link href={`/orders/${order.no}`}>
                      <Eye className='w-4 h-4' />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
