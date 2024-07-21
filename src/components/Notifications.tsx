import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
type Props = {
  className?: string
  triggerClassName?: string
}

export function Notifications({ className, triggerClassName }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className={cn('ml-auto h-8 w-8', triggerClassName)}
        >
          <Bell className='h-4 w-4' />
          <span className='sr-only'>Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className={className}>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
