import React from 'react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Template } from '@/components'
import { Button } from '@/components/ui/button'
import { BadgePercent } from 'lucide-react'
import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { offerTableSchema } from './(data)/schema'
import { offersColumns, offersToolbarOptions } from './(data)/columns'
import { DataTable } from '@/components/Data-Table'

type Props = {}

export const metadata: Metadata = {
  title: 'RB - Offers',
  description: 'List all RB Offers',
}

async function getOffers() {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/offers.json')
  )

  const offers = JSON.parse(data.toString())

  return z.array(offerTableSchema).parse(offers)
}
export default async function Offers({}: Props) {
  const offers = await getOffers()
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
              href='/offers/new'
              className='flex items-center justify-center 
            space-x-2 rtl:space-x-reverse'
            >
              <BadgePercent className='w-5 h-5' />
              <span>{t('create_new_offer')}</span>
            </Link>
          </Button>
          <DataTable
            data={offers}
            columns={offersColumns}
            toolbarOptions={offersToolbarOptions}
          />
        </div>
      </main>
    </Template>
  )
}
