'use client'
import React from 'react'
import { Activity, CreditCard, DollarSign, Filter, Users } from 'lucide-react'
import { SmallStatCard, TotalSalesChart, DateRangePicker } from '@/components'
import { RecentOrdersTable, OrderStatusChart } from '@/components/Orders'
import { TopByAttributes, TopBySales } from '@/components/cards'
import { TopProductsTable } from '@/components/Products'
import { Button } from '@/components/ui/button'
import {
  topCountriesBySales,
  topCustomersByOrders,
  topCustomersBySales,
  topStatesBySales,
  topCategories,
  topSizes,
} from '@/demo/data'
import { getTranslations } from 'next-intl/server'
import { DateRange } from 'react-day-picker'
import { useTranslations } from 'next-intl'

type Props = {}

export function Dashboard({}: Props) {
  const t = useTranslations()
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  return (
    <div
      className='flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
      border border-dashed shadow-sm mt-2 mx-2 lg:m-0'
      x-chunk='dashboard-02-chunk-1'
    >
      <section className='flex items-center space-x-2 rtl:space-x-reverse justify-end w-full'>
        <DateRangePicker date={dateRange} setDate={setDateRange} />
        <Button size='icon' variant='outline'>
          <Filter className='h-4 w-4' />
        </Button>
      </section>
      <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 w-full'>
        <SmallStatCard
          title={t('total_revenue')}
          value='$45,231.89'
          state={`+20.1% ${t('from_last_month')}`}
          type='revenue'
          icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title={t('customers')}
          value='+2350'
          state={`+180.1% ${t('from_last_month')}`}
          type='customers'
          icon={<Users className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title={t('sales')}
          value='+12,234'
          state={`+19% ${t('from_last_month')}`}
          type='sales'
          icon={<CreditCard className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title={t('orders')}
          value='+573'
          state={`+25 ${t('last_24h')}`}
          type='orders'
          icon={<Activity className='h-4 w-4 text-muted-foreground' />}
        />
      </section>
      <section className='w-full lg:h-46'>
        <OrderStatusChart />
      </section>
      <section className='w-full'>
        <TotalSalesChart />
      </section>
      <section className='w-full'>
        <RecentOrdersTable />
      </section>
      <section className='w-full grid md:grid-cols-2 gap-5'>
        <TopBySales
          data={topCustomersBySales}
          type='top-customer-by-sales'
          tableHeads={[t('country'), t('name'), t('total_paid')]}
        />
        <TopBySales
          data={topCustomersByOrders}
          type='top-customer-by-orders'
          tableHeads={[t('country'), t('name'), t('total_orders')]}
        />
      </section>
      <section className='w-full grid md:grid-cols-2 gap-5'>
        <TopBySales
          data={topCountriesBySales}
          type='top-countries-by-sales'
          tableHeads={[t('country'), t('name'), t('total_paid')]}
        />
        <TopBySales
          data={topStatesBySales}
          type='top-states-by-sales'
          tableHeads={[t('country'), t('name'), t('total_sales')]}
        />
      </section>
      <section className='w-full grid md:grid-cols-2 gap-5'>
        <TopByAttributes
          data={topCategories}
          type='top-categories'
          tableHeads={[t('category'), t('total_orders'), t('total_sales')]}
        />
        <TopByAttributes
          data={topSizes}
          type='top-sizes'
          tableHeads={[t('size'), t('total_orders'), t('total_sales')]}
        />
      </section>
      <section className='w-full'>
        <TopProductsTable />
      </section>
    </div>
  )
}
