import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
type Props = {
  title: string
  value: string
  state: string
  icon: React.ReactNode
}

export function SmallStatCard({ title, value, state, icon }: Props) {
  return (
    <Card x-chunk='dashboard-01-chunk-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-xs text-muted-foreground'>{state}</p>
      </CardContent>
    </Card>
  )
}
