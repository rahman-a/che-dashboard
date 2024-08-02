import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'
import { couponsSchema } from '@/schema'
import { DataTable } from '@/components/Data-Table'
import { Template } from '@/components'
import { CreateUpdateCoupon } from './(components)'
import { couponsColumns, couponsToolbarOptions } from './(data)/columns'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - Coupons',
  description: 'List all RB Coupons',
}

async function getCoupons(t: any) {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/coupons.json')
  )

  const coupons = JSON.parse(data.toString())

  return z.array(couponsSchema(t)).parse(coupons)
}

export default async function Orders({}: Props) {
  const t = await getTranslations()
  const coupons = await getCoupons(t)
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
          x-chunk='dashboard-orders'
        >
          <CreateUpdateCoupon mode='create' />
          <DataTable
            data={coupons}
            columns={couponsColumns}
            toolbarOptions={couponsToolbarOptions}
          />
        </div>
      </main>
    </Template>
  )
}
