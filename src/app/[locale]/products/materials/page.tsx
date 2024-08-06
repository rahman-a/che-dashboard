import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Template } from '@/components'
import { DataTable } from '@/components/Data-Table'
import { materialSchema } from '@/schema'
import { CreateUpdateMaterial } from '../(components)'
import { materialsColumns, materialsToolbarOptions } from '../(data)/columns'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - Materials',
  description: 'Manage materials',
}

async function getMaterials(t: any) {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/materials.json')
  )

  const materials = JSON.parse(data.toString())

  return z.array(materialSchema(t)).parse(materials)
}

export default async function Materials({}: Props) {
  const t = await getTranslations()
  const materials = await getMaterials(t)
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <CreateUpdateMaterial mode='create' />
          <DataTable
            data={materials}
            columns={materialsColumns}
            toolbarOptions={materialsToolbarOptions}
            initialVisibilityState={{
              description: false,
            }}
          />
        </div>
      </main>
    </Template>
  )
}
