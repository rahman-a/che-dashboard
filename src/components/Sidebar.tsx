import React from 'react'
import Link from 'next/link'
import { Package2 } from 'lucide-react'
import NavigationItems from './Navigation-Items'
import Notifications from './Notifications'
type Props = {}

export default function Sidebar({}: Props) {
  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Package2 className='h-6 w-6' />
            <span className=''>Acme Inc</span>
          </Link>
          <Notifications />
        </div>
        <div className='flex-1'>
          <NavigationItems />
        </div>
      </div>
    </div>
  )
}
