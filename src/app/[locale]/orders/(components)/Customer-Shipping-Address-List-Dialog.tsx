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
import { Button } from '@/components/ui/button'
import { Edit, List } from 'lucide-react'
import {
  CustomerNewShippingAddress,
  CustomerShippingAddress,
} from '@/components/Customers'
import { useTranslations } from 'next-intl'
import { CustomerAddress } from '@/types'
export interface ICustomerShippingAddressListDialogProps {
  addresses: CustomerAddress[]
}

export function CustomerShippingAddressListDialog({
  addresses,
}: ICustomerShippingAddressListDialogProps) {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='outline'
          size='icon'
          className='h-6 w-6 p-1'
        >
          <List className='w-5 h-5 cursor-pointer' />
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        aria-describedby='List all shipping addresses'
      >
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            <p>{t('list_shipping_addresses')}</p>
          </DialogTitle>
        </DialogHeader>
        <div className='relative max-h-[32rem] overflow-y-auto flex flex-col md:flex-row gap-8 md:flex-wrap'>
          {addresses.map((address) => (
            <CustomerShippingAddress data={address} key={address.id} isSelect />
          ))}
        </div>
        <DialogFooter className='flex-row justify-end space-x-2'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              {t('cancel')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
