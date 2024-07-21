import React from 'react'
import {
  LanguageChanger,
  ProfileDropdown,
  MobileSidebar,
  // HeaderSearchInput,
} from './'
// import Notifications from '../Notifications'
type Props = {}

export function Header({}: Props) {
  return (
    <header className='flex h-14 items-center justify-between lg:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <MobileSidebar />
      {/* <div className='w-full flex-1'>
        <HeaderSearchInput />
      </div> */}
      <div className='flex items-center  space-x-2 rtl:space-x-reverse'>
        {/* <Notifications triggerClassName='flex lg:hidden' /> */}
        <LanguageChanger />
        <ProfileDropdown />
      </div>
    </header>
  )
}
