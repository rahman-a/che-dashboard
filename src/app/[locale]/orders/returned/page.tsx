import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { z } from 'zod'
import { DataTable } from '@/components/Data-Table'
import { Template } from '@/components'
import { orderSchema } from '../(data)/data-schema'
import { columns, toolbarOptions } from '../(data)/columns'
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

export default async function ReturnedOrders({}: Props) {
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
          <h1 className='w-full text-2xl text-center md:text-start md:text-3xl py-4'>
            {t('returned_orders')}
          </h1>
          <DataTable
            data={orders}
            columns={columns}
            toolbarOptions={toolbarOptions}
            type='returned'
          />
        </div>
      </main>
    </Template>
  )
}
