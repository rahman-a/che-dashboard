import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import NavigationItems from './Navigation-Items'
type Props = {}

export default function MobileSidebar({}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <NavigationItems />
      </SheetContent>
    </Sheet>
  )
}
