import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { customerSchema } from '@/schema'
import { Template } from '@/components'
import { CreateUpdateCustomer } from './(components)/Create-Update-Customer'
import { CustomerColumns, CustomerToolbarOptions } from './(data)/columns'
import { DataTable } from '@/components/Data-Table'

export const metadata: Metadata = {
  title: 'RB - Customers',
  description: 'List all RB Customers',
}

type Props = {}

async function getCustomers(t: any) {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/customers.json')
  )

  const Customers = JSON.parse(data.toString())

  return z.array(customerSchema(t)).parse(Customers)
}

export default async function ProductsCategories({}: Props) {
  const t = await getTranslations()
  const customers = await getCustomers(t)
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <CreateUpdateCustomer mode='create' />
          <DataTable
            data={customers}
            columns={CustomerColumns}
            toolbarOptions={CustomerToolbarOptions}
          />
        </div>
      </main>
    </Template>
  )
}
