'use client'

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  orderStatusChartConfig,
  ordersStatusData,
  orderStatusValues,
} from '@/demo/charts'
import { useTranslations } from 'next-intl'

export default function OrderStatusChart() {
  const t = useTranslations()

  return (
    <Card className='grid gap-2 w-full h-full md:grid-cols-[1fr_500px] lg:grid-cols-[1fr_500px]'>
      <div className='flex flex-col'>
        <CardHeader className='pb-4 md:pb-8'>
          <CardTitle>{t('orders_status')}</CardTitle>
          <CardDescription>{`${t('january')} - ${t(
            'june'
          )} 2024`}</CardDescription>
        </CardHeader>
        <div className='flex justify-between items-start p-4 md:px-8 gap-2 text-sm'>
          {ordersStatusData(t).map((data) => (
            <div
              key={data.status}
              className='flex items-center flex-col space-y-2'
            >
              <span className='text-sm font-semibold'>{data.pieces}</span>
              <h4
                className={cn(
                  `flex justify-center w-fit min-w-12 capitalize text-xs text-white rounded-lg px-2 py-1`
                )}
                style={{ backgroundColor: data.fill }}
              >
                {data.status}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <CardContent className='hidden md:flex justify-end pb-0'>
        <ChartContainer className='h-full' config={orderStatusChartConfig(t)}>
          <BarChart accessibilityLayer data={ordersStatusData(t)}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='pieces'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className='capitalize'
              tickFormatter={(value) => {
                return ordersStatusData(t).find((o) => o.pieces === value)
                  ?.status
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className='text-slate-900' />
              }
            />
            <Bar
              dataKey='pieces'
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    className='w-16'
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
