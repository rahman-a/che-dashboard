import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { CircleEllipsis } from 'lucide-react'

type OrderCustomerAccordionOptionsProps = {
  children: React.ReactNode
}

export function OrderAccordionOptions({
  children,
}: OrderCustomerAccordionOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='bg-transparent h-auto p-0 border-none hover:bg-transparent'>
          <CircleEllipsis className='w-5 h-5' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
