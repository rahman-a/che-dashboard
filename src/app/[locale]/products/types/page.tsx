import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { typeTableSchema } from '../(data)/schema'
import { Template } from '@/components'
import { CreateUpdateType } from '../(components)'
import { typesColumns, typesToolbarOptions } from '../(data)/columns'
import { DataTable } from '@/components/Data-Table'

export const metadata: Metadata = {
  title: 'RB - Types',
  description: 'List all RB Types',
}

type Props = {}

async function getTypes() {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/types.json')
  )

  const types = JSON.parse(data.toString())

  return z.array(typeTableSchema).parse(types)
}

export default async function ProductsTypes({}: Props) {
  const types = await getTypes()
  const t = await getTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <CreateUpdateType mode='create' />
          <DataTable
            data={types}
            columns={typesColumns}
            toolbarOptions={typesToolbarOptions}
          />
        </div>
      </main>
    </Template>
  )
}
