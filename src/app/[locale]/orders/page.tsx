import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { z } from 'zod'
import Link from 'next/link'
import { DataTable } from '@/components/Data-Table'
import { Button } from '@/components/ui/button'
import { Template } from '@/components'
import { orderSchema } from './(data)/data-schema'
import { columns } from './(data)/columns'
import { CartPlus } from '@/icons'
import { getTranslations } from 'next-intl/server'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - Orders',
  description: 'List all RB orders',
}

async function getOrders() {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/orders.json')
  )

  const orders = JSON.parse(data.toString())

  return z.array(orderSchema).parse(orders)
}

export default async function Orders({}: Props) {
  const orders = await getOrders()
  const t = await getTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
          x-chunk='dashboard-orders'
        >
          <Button variant='outline' asChild>
            <Link
              href='/orders/new'
              className='flex items-center justify-center 
            space-x-2 rtl:space-x-reverse'
            >
              <CartPlus className='w-5 h-5' />
              <span>{t('create_new_order')}</span>
            </Link>
          </Button>
          <DataTable data={orders} columns={columns} />
        </div>
      </main>
    </Template>
  )
}
