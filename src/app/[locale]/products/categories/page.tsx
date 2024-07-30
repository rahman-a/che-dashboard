import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { categoryTableSchema } from '../(data)/schema'
import { Template } from '@/components'
import { CreateUpdateCategory } from '../(components)'
import { categoriesColumns, categoriesToolbarOptions } from '../(data)/columns'
import { DataTable } from '@/components/Data-Table'

export const metadata: Metadata = {
  title: 'RB - Categories',
  description: 'List all RB Categories',
}

type Props = {}

async function getCategories() {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/categories.json')
  )

  const categories = JSON.parse(data.toString())

  return z.array(categoryTableSchema).parse(categories)
}

export default async function ProductsCategories({}: Props) {
  const categories = await getCategories()
  const t = await getTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <CreateUpdateCategory mode='create' />
          <DataTable
            data={categories}
            columns={categoriesColumns}
            toolbarOptions={categoriesToolbarOptions}
          />
        </div>
      </main>
    </Template>
  )
}
