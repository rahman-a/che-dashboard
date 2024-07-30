import React from 'react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Template } from '@/components'
import { Button } from '@/components/ui/button'
import { Shirt } from 'lucide-react'
import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { productTableSchema } from './(data)/schema'
import { productsColumns, productsToolbarOptions } from './(data)/columns'
import { DataTable } from '@/components/Data-Table'
type Props = {}

export const metadata: Metadata = {
  title: 'RB - Products',
  description: 'List all RB Products',
}

async function getProducts() {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/products.json')
  )

  const products = JSON.parse(data.toString())

  return z.array(productTableSchema).parse(products)
}

export default async function Products({}: Props) {
  const products = await getProducts()
  const t = await getTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <Button variant='outline' asChild>
            <Link
              href='/products/new'
              className='flex items-center justify-center 
            space-x-2 rtl:space-x-reverse'
            >
              <Shirt className='w-5 h-5' />
              <span>{t('create_new_product')}</span>
            </Link>
          </Button>
          <DataTable
            data={products}
            columns={productsColumns}
            toolbarOptions={productsToolbarOptions}
          />
        </div>
      </main>
    </Template>
  )
}
