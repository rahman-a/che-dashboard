'use client'
import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FolderTree } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CustomerList } from '@/components/Customers'
import { useTranslations } from 'next-intl'
export interface ICustomerListDialogProps {}

export function NewOrderCustomerListDialog(props: ICustomerListDialogProps) {
  const t = useTranslations()
  const [selectedCustomer, setSelectedCustomer] = React.useState<string | null>(
    null
  )
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className='flex rtl:flex-row-reverse items-center text-sm cursor-pointer
        bg-transparent hover:bg-transparent border-none 
        h-auto px-2 py-1.5 space-x-1 rtl:space-x-reverse rounded-sm hover:bg-gray-100'
        >
          <FolderTree className='h-5 w-5 text-muted-foreground' />
          <span>{t('browse_customers')}</span>
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        aria-describedby='create new customer'
      >
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            <p>{t('customers_list')}</p>
          </DialogTitle>
        </DialogHeader>
        <CustomerList mode='select' />
        <DialogFooter className='flex-row justify-end space-x-2'>
          <DialogClose asChild>
            <Button variant='secondary'>{t('cancel')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
