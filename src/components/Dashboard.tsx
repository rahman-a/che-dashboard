import React from 'react'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'
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

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <div
      className='flex flex-col space-y-5 flex-1 items-start rounded-lg p-4 
      border border-dashed shadow-sm'
      x-chunk='dashboard-02-chunk-1'
    >
      <section className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 w-full'>
        <SmallStatCard
          title='Total Revenue'
          value='$45,231.89'
          state='+20.1% from last month'
          icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title='Subscriptions'
          value='+2350'
          state='+180.1% from last month'
          icon={<Users className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title='Sales'
          value='+12,234'
          state='+19% from last month'
          icon={<CreditCard className='h-4 w-4 text-muted-foreground' />}
        />
        <SmallStatCard
          title='Active Now'
          value='+573'
          state='+201 since last hour'
          icon={<Activity className='h-4 w-4 text-muted-foreground' />}
        />
      </section>
      <section className='w-full md:h-44'>
        <OrderStatusChart />
      </section>
      <section className='w-full'>
        <TotalSalesChart />
      </section>
      <section className='w-screen md:w-full'>
        <RecentOrdersTable />
      </section>
      <section className='grid md:grid-cols-2 w-screen md:w-full gap-5'>
        <TopBySales
          data={topCustomersBySales}
          tableHeads={['Country', 'Name', 'Total Paid']}
        />
        <TopBySales
          data={topCustomersByOrders}
          tableHeads={['Country', 'Name', 'Total Orders']}
        />
      </section>
      <section className='grid md:grid-cols-3 w-screen md:w-full gap-5'>
        <TopBySales
          data={topCountriesBySales}
          tableHeads={['Country', 'Name', 'Total Paid']}
        />
        <TopBySales
          data={topStatesBySales}
          tableHeads={['Country', 'Name', 'Total Sales']}
        />
        <TopByAttributes
          data={topCategories}
          tableHeads={['Category', 'Total Orders', 'Total Sales']}
        />
      </section>
      <section className='grid md:grid-cols-[1fr_370px] w-screen md:w-full gap-5'>
        <TopProductsTable />
        <TopByAttributes
          data={topSizes}
          tableHeads={['Size', 'Total Orders', 'Total Sales']}
          className='[&_table]:md:mt-2'
        />
      </section>
    </div>
  )
}
