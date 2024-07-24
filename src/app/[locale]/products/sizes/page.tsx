import { Template } from '@/components'
import React from 'react'

type Props = {}

export default function ProductsSizes({}: Props) {
  return (
    <Template>
      <main className='flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <h1 className='text-7xl'>Products Sizes</h1>
      </main>
    </Template>
  )
}
