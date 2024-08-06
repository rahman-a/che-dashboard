import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { type TopAttributes } from '@/types/stat-cards'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { DateRangePicker } from '../Date-Range-Picker'
import { DateRange } from 'react-day-picker'

type TopByAttributesType = 'top-categories' | 'top-sizes'

type Props = {
  className?: string
  data: TopAttributes
  type: TopByAttributesType
  tableHeads: string[]
}

export function TopByAttributes({ data, className, tableHeads }: Props) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const t = useTranslations()
  return (
    <Card className={cn(className)}>
      <CardHeader className='flex lg:flex-row items-center justify-between'>
        <CardTitle className='text-xl text-gray-700 font-medium'>
          {t(data.title)}
        </CardTitle>
        <div className='flex mx-4 w-60'>
          <DateRangePicker
            date={dateRange}
            setDate={setDateRange}
            className='w-full [&>button]:w-full'
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table className='border-separate'>
          <TableHeader>
            <TableRow className='bg-gray-50'>
              {tableHeads.map((head) => (
                <TableCell
                  key={head}
                  className='text-center font-medium p-2 text-sm'
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((d) => (
              <TableRow key={d.id}>
                <TableCell className='font-medium text-center' title={d.name}>
                  {d.name}
                </TableCell>
                <TableCell className='text-center'>
                  {t('no_of_orders', { count: d.orders })}
                </TableCell>
                <TableCell className='text-center'>
                  {d.sales + ' ' + t('kw')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='w-full flex-col items-end gap-2 text-sm mt-auto'>
        <Button variant='outline' size='sm' asChild>
          <Link href={data.url}>{t('view_all')}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
