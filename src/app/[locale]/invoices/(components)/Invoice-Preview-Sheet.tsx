import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { EyeIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { InvoicePreview } from './'
export interface IInvoicePreviewSheetProps {}

export function InvoicePreviewSheet(props: IInvoicePreviewSheetProps) {
  const t = useTranslations()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='flex lg:hidden items-center justify-center space-x-1 rtl:space-x-reverse'
        >
          <EyeIcon className='w-4 h-4' />
        </Button>
      </SheetTrigger>
      <SheetContent
        className='w-full overflow-y-auto'
        aria-describedby='invoice preview'
      >
        <InvoicePreview />
        <SheetFooter>
          <SheetClose asChild>
            <Button>{t('close')}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
