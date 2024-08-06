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
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { topProducts } from '@/demo/data'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { DateRangePicker } from '../Date-Range-Picker'
import { DateRange } from 'react-day-picker'

type Props = {
  className?: string
}

export function TopProductsTable({ className }: Props) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const t = useTranslations()
  return (
    <Card className={cn('flex flex-col w-full', className)}>
      <CardHeader className='flex space-y-4 lg:space-y-0 lg:flex-row items-center justify-between'>
        <CardTitle>{t('top_products')}</CardTitle>
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
              <TableHead className='w-[100px] rtl:text-right'>
                {t('no')}
              </TableHead>
              <TableHead className='rtl:text-right'>{t('image')}</TableHead>
              <TableHead className='rtl:text-right'>{t('name')}</TableHead>
              <TableHead className='rtl:text-right'>
                {t('total_orders')}
              </TableHead>
              <TableHead className='rtl:text-right'>
                {t('total_sales')}
              </TableHead>
              <TableHead className='rtl:text-right'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell title={product.name}>
                  <Image
                    src={product.image!}
                    alt={product.name}
                    width={35}
                    height={35}
                    className='object-contain w-12 h-12'
                  />
                </TableCell>
                <TableCell className='max-w-40'>{product.name}</TableCell>
                <TableCell>
                  {t('no_of_orders', { count: product.orders })}
                </TableCell>
                <TableCell>{product.sales + ' ' + t('kw')}</TableCell>
                <TableCell>
                  <Button
                    variant='outline'
                    size='icon'
                    className='flex items-center space-x-1 text-gray-600 w-6 h-6'
                    asChild
                  >
                    <Link href={`/products/${product.id}`}>
                      <Eye className='w-4 h-4' />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='w-full flex-col items-end gap-2 text-sm mt-auto'>
        <Button variant='outline' size='sm' asChild>
          <Link href={topProducts.url}>{t('view_all')}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
