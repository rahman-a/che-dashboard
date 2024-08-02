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
import { useTranslations } from 'next-intl'
import { CustomerShippingAddressEdit } from '@/components/Customers'
import { CustomerAddress } from '@/types'
export interface ICustomerShippingAddressDialogEditProps {
    data:CustomerAddress
}

export function CustomerShippingAddressEditDialog(
  {data}: ICustomerShippingAddressDialogEditProps
) {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button
            type='button'
            variant='outline'
            className='px-2 w-16 rtl:w-20 justify-between'
          >
            <Edit size={12} />
            <span>{t("edit")}</span>
          </Button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        aria-describedby='Edit customer address'
      >
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2'>
            <p>{t('edit_shipping_address')}</p>
          </DialogTitle>
        </DialogHeader>
        <CustomerShippingAddressEdit data={data}/>
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
