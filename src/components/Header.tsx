import React from 'react'
import MobileSidebar from './Mobile-Sidebar'
import ProfileDropdown from './Profile-Dropdown'
import HeaderSearchInput from './Header-Search-Input'
import Notifications from './Notifications'
type Props = {}

export default function Header({}: Props) {
  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <MobileSidebar />
      <div className='w-full flex-1'>
        <HeaderSearchInput />
      </div>
      <div className='flex items-center space-x-2 rtl:space-x-reverse'>
        <Notifications triggerClassName='flex md:hidden' />
        <ProfileDropdown />
      </div>
    </header>
  )
}
