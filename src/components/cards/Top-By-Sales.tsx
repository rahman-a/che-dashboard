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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { TrendingDown, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { type CardStats } from '@/types/stat-cards'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

type TopBySalesType =
  | 'top-customer-by-sales'
  | 'top-customer-by-orders'
  | 'top-states-by-sales'
  | 'top-countries-by-sales'

type Props = {
  className?: string
  data: CardStats
  type: TopBySalesType
  tableHeads: string[]
}

export default function TopCountriesBySales({
  data,
  type,
  tableHeads,
  className,
}: Props) {
  const t = useTranslations()

  const renderValue = (value: number | string) => {
    if (type === 'top-customer-by-orders') {
      return t('no_of_orders', { count: value })
    }
    return value + ' ' + t('kw')
  }
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader>
        <CardTitle className='text-xl text-gray-700 font-medium'>
          {t(data.title)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full flex items-center justify-center pt-5 pb-8 space-x-8 rtl:space-x-reverse'>
          <h2 className='text-3xl'>
            <span>{data.totalSales}</span>
            <span className='text-xl'>{t('kw')}</span>
          </h2>
          {data.trending === 'up' ? (
            <TrendingUp className='h-10 w-10 text-green-500' />
          ) : (
            <TrendingDown className='h-10 w-10 text-red-500' />
          )}
        </div>
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
                <TableCell className='flex justify-center' title={d.country}>
                  <Image
                    src={d.country!}
                    alt={d.name}
                    width={35}
                    height={35}
                    className='clip-circle'
                  />
                </TableCell>
                <TableCell className='text-center'>{d.name}</TableCell>
                <TableCell className='text-center'>
                  {renderValue(d.value)}
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
