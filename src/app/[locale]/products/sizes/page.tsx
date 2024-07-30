import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { sizeTableSchema } from '../(data)/schema'
import { Template } from '@/components'
import { CreateUpdateSize, UploadSizesTableImage } from '../(components)'
import { sizesColumns, sizesToolbarOptions } from '../(data)/columns'
import { DataTable } from '@/components/Data-Table'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'RB - Sizes',
  description: 'List all RB Sizes',
}

type Props = {}

async function getSizes() {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/sizes.json')
  )

  const sizes = JSON.parse(data.toString())

  return z.array(sizeTableSchema).parse(sizes)
}

export default async function ProductsSizes({}: Props) {
  const sizes = await getSizes()
  const t = await getTranslations()
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <CreateUpdateSize mode='create' />
          <DataTable
            data={sizes}
            columns={sizesColumns}
            toolbarOptions={sizesToolbarOptions}
          />
          <div className='flex flex-col space-y-4'>
            <h2 className='text-lg md:text-2xl text-gray-800 font-semibold'>
              {t('upload_sizes_table_img')}
            </h2>
            <UploadSizesTableImage imageUrl='/images/products/sizes.png' />
          </div>
        </div>
      </main>
    </Template>
  )
}
