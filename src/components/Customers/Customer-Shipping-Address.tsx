import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  title?: string
  className?: string
}

export function CustomerShippingAddress({ title, className }: Props) {
  return (
    <div className={cn(`w-full lg:w-auto flex flex-col space-y-2`, className)}>
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
