import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { DataTable } from '@/components/Data-Table'
import React from 'react'
import Template from '@/components/Template'
import { orderSchema } from './(data)/data-schema'
import { columns } from './(data)/columns'
import { z } from 'zod'

type Props = {}

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Orders page',
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
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6 w-screen md:w-[1190px] overflow-x-auto'>
        <div
          className='flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm'
          x-chunk='dashboard-orders'
        >
          <DataTable data={orders} columns={columns} />
        </div>
      </main>
    </Template>
  )
}
