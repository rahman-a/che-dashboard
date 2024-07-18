import { ChartConfig } from '@/components/ui/chart'

export const ordersStatusData = (t: any) => [
  { status: t('new'), pieces: 187, fill: 'hsl(var(--order-new))' },
  { status: t('cut'), pieces: 200, fill: 'hsl(var(--order-cut))' },
  { status: t('sewed'), pieces: 275, fill: 'hsl(var(--order-sewed))' },
  { status: t('delivered'), pieces: 173, fill: 'hsl(var(--order-delivered))' },
]

export const orderStatusChartConfig = (t: any) => ({
  pieces: {
    label: t('pieces'),
  },
  new: {
    label: t('new'),
    color: 'hsl(var(--chart-1))',
  },
  cut: {
    label: t('cut'),
    color: 'hsl(var(--chart-2))',
  },
  sewed: {
    label: t('sewed'),
    color: 'hsl(var(--chart-3))',
  },
  delivered: {
    label: t('delivered'),
    color: 'hsl(var(--chart-4))',
  },
})

export const orderStatusValues = {
  pieces: {
    label: 'pieces',
  },
  new: {
    label: 'new',
    color: 'hsl(var(--chart-1))',
  },
  cut: {
    label: 'cut',
    color: 'hsl(var(--chart-2))',
  },
  sewed: {
    label: 'sewed',
    color: 'hsl(var(--chart-3))',
  },
  delivered: {
    label: 'delivered',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig
