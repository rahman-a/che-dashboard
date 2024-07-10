import {
    ChartConfig,
  } from '@/components/ui/chart'

export const ordersStatusData = [
  { status: 'new', pieces: 187, fill: 'hsl(var(--order-new))' },
  { status: 'cut', pieces: 200, fill: 'hsl(var(--order-cut))' },
  { status: 'sewed', pieces: 275, fill: 'hsl(var(--order-sewed))' },
  { status: 'delivered', pieces: 173, fill: 'hsl(var(--order-delivered))' },
]

export const orderStatusChartConfig = {
  pieces: {
    label: 'Pieces',
  },
  new: {
    label: 'New',
    color: 'hsl(var(--chart-1))',
  },
  cut: {
    label: 'Cut',
    color: 'hsl(var(--chart-2))',
  },
  sewed: {
    label: 'Sewed',
    color: 'hsl(var(--chart-3))',
  },
  delivered: {
    label: 'Delivered',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig
