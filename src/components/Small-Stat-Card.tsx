import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from './ui/separator'
import { useTranslations } from 'next-intl'
type Props = {
  title: string
  value: string
  state: string
  icon: React.ReactNode
  type: 'revenue' | 'customers' | 'sales' | 'orders'
}

export function SmallStatCard({ title, value, state, icon, type }: Props) {
  const t = useTranslations()
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='w-full text-sm font-medium'>
          <div className='w-full flex items-center justify-between'>
            <span>{title}</span>
            {type === 'orders' && <span>{t('pieces')}</span>}
            {type !== 'orders' && <span>{icon}</span>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between text-2xl font-bold'>
          <span>{value}</span>
          {type === 'orders' && (
            <Separator className='h-8' orientation='vertical' />
          )}
          {type === 'orders' && <span>{value}</span>}
        </div>
        <p className='text-xs text-muted-foreground'>{state}</p>
      </CardContent>
    </Card>
  )
}
