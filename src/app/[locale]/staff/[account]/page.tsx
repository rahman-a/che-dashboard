import { Template } from '@/components'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { staffSchema } from '@/schema'
import { AccountForm } from '../(components)'

type Props = {
  params: {
    account: string
  }
}

export const metadata: Metadata = {
  title: 'RB - New Staff Account',
  description: 'Create new staff account',
}

async function getStaff(id: string, t: any) {
  const data = await fs.readFile(
    path.join(process.cwd(), '/src/demo/data/accounts.json')
  )

  const account = JSON.parse(data.toString()).find(
    (account: any) => account.id === id
  )
  return staffSchema(t).omit({ password: true }).parse(account)
}

export default async function Staff({ params: { account } }: Props) {
  const t = await getTranslations()
  const staff = await getStaff(account, t)
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <div
          className='w-full flex flex-col space-y-5 flex-1 items-start rounded-lg py-4 px-2 
        border border-dashed shadow-sm mt-2 lg:m-0'
        >
          <AccountForm mode='update' data={staff} />
        </div>
      </main>
    </Template>
  )
}
