import React from 'react'
import { Button } from '../ui/button'
import { Edit } from 'lucide-react'

type Props = {
  title?: string
}

export function CustomerShippingAddress({ title }: Props) {
  return (
    <div className='w-full lg:w-auto flex flex-col space-y-2'>
      {title && (
        <div className='w-full flex items-center justify-between space-x-2'>
          <h3 className='text-base font-semibold capitalize'>{title}</h3>
        </div>
      )}
      <div className='w-full lg:w-auto flex justify-between space-x-2'>
        <ul>
          <li>Abdelaziz Mohamed</li>
          <li>35 Elsary St</li>
          <li>Kuwait, Darba, Josh</li>
        </ul>
      </div>
    </div>
  )
}
