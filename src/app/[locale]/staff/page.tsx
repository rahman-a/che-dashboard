import React from 'react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Template } from '@/components'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { staffSchema } from '@/schema'
import { staffColumns, staffToolbarOptions } from './(data)/columns'
import { DataTable } from '@/components/Data-Table'
type Props = {}

export const metadata: Metadata = {
  title: 'RB - Staff',
  description: 'List all RB Staff',
}

async function getStaff(t: any) {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/accounts.json')
  )

  const accounts = JSON.parse(data.toString())
  return z.array(staffSchema(t).omit({ password: true })).parse(accounts)
}

export default async function Staff({}: Props) {
  const t = await getTranslations()
  const staff = await getStaff(t)
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-4 w-screen lg:w-full overflow-x-auto'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <Button variant='outline' asChild>
            <Link
              href='/staff/new'
              className='flex items-center justify-center 
            space-x-2 rtl:space-x-reverse'
            >
              <User className='w-5 h-5' />
              <span>{t('create_new_account')}</span>
            </Link>
          </Button>
          <DataTable
            data={staff}
            columns={staffColumns}
            toolbarOptions={staffToolbarOptions}
            initialVisibilityState={{
              address: false,
            }}
          />
        </div>
      </main>
    </Template>
  )
}

// name, phone, email, country, address, permissions, status, created_at
