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
import { Button } from './ui/button'
import orders from '@/demo/data/orders.json'
import { useTranslations } from 'next-intl'

type Props = {}

export default function RecentOrdersTable({}: Props) {
  const t = useTranslations()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('recent_orders')}</CardTitle>
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
                <TableCell>{t(order.status)}</TableCell>
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
