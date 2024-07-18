import React from 'react'
import { Activity, CreditCard, DollarSign, Filter, Users } from 'lucide-react'
import SmallStatCard from './Small-Stat-Card'
import TotalSalesChart from './Total-Sales-Chart'
import RecentOrdersTable from './Recent-Orders-Table'
import OrderStatusChart from './Orders-Status-Chart'
import TopBySales from './cards/Top-By-Sales'
import TopByAttributes from './cards/Top-By-Attributes'
import {
  topCountriesBySales,
  topCustomersByOrders,
  topCustomersBySales,
  topStatesBySales,
  topCategories,
  topSizes,
} from '@/demo/data'
import TopProductsTable from './Top-Products'
import DateRangePicker from './Date-Range-Picker'
import { Button } from './ui/button'
import { useTranslations } from 'next-intl'

type Props = {}

export default function Dashboard({}: Props) {
  const t = useTranslations()
  return (
    <div
      className='flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
      border border-dashed shadow-sm'
      x-chunk='dashboard-02-chunk-1'
    >
      <section className='flex items-center space-x-2 rtl:space-x-reverse justify-end w-full'>
        <DateRangePicker />
        <Button size='icon' variant='outline'>
          <Filter className='h-4 w-4' />
        </Button>
      </section>
      <section className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 w-full'>
        <SmallStatCard
          title={t('total_revenue')}
          value='$45,231.89'
          state={`+20.1% ${t('from_last_month')}`}
          icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title={t('customers')}
          value='+2350'
          state={`+180.1% ${t('from_last_month')}`}
          icon={<Users className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title={t('sales')}
          value='+12,234'
          state={`+19% ${t('from_last_month')}`}
          icon={<CreditCard className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title={t('orders')}
          value='+573'
          state={`+25 ${t('last_24h')}`}
          icon={<Activity className='h-4 w-4 text-muted-foreground' />}
        />
      </section>
      <section className='w-full md:h-46'>
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
          tableHeads={[t('country'), t('name'), t('total_paid')]}
        />
        <TopBySales
          data={topCustomersByOrders}
          tableHeads={[t('country'), t('name'), t('total_orders')]}
        />
      </section>
      <section className='w-full grid md:grid-cols-2 gap-5'>
        <TopBySales
          data={topCountriesBySales}
          tableHeads={[t('country'), t('name'), t('total_paid')]}
        />
        <TopBySales
          data={topStatesBySales}
          tableHeads={[t('country'), t('name'), t('total_sales')]}
        />
      </section>
      <section className='w-full grid md:grid-cols-2 gap-5'>
        <TopByAttributes
          data={topCategories}
          tableHeads={[t('category'), t('total_orders'), t('total_sales')]}
        />
        <TopByAttributes
          data={topSizes}
          tableHeads={[t('size'), t('total_orders'), t('total_sales')]}
        />
      </section>
      <section className='w-full'>
        <TopProductsTable />
      </section>
    </div>
  )
}
