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
import { Edit } from 'lucide-react'
import { CustomerNewShippingAddress } from '@/components/Customers'
import { useTranslations } from 'next-intl'
export interface INewOrderCustomerShippingAddressDialogProps {}

export function NewOrderCustomerShippingAddressDialog(
  props: INewOrderCustomerShippingAddressDialogProps
) {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className='flex flex-col space-y-2 items-center justify-center 
          border border-dashed w-full lg:w-56 h-20 rounded-lg'
          onClick={(e) => e.stopPropagation()}
        >
          <p>{t('add_new_address')}</p>
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='h-6 w-6 p-1'
          >
            <Edit className='w-5 h-5 cursor-pointer' />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        aria-describedby='create new customer'
      >
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            <p>{t('create_new_shipping_address')}</p>
          </DialogTitle>
        </DialogHeader>
        <CustomerNewShippingAddress />
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
