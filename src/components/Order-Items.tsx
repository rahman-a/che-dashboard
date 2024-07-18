import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from './ui/button'
import { List } from 'lucide-react'
import OrderProductCard from './Product-Card'
import { useLocale, useTranslations } from 'next-intl'
type Props = {}

export default function OrdersItems({}: Props) {
  const t = useTranslations()
  const locale = useLocale()
  const note =
    locale === 'en'
      ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias numquam nemo esse nulla nam delectus eos? Deserunt reprehenderit voluptates ea aperiam nostrum minus quam recusandae nisi! Unde harum quae commodi?'
      : 'لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ، وأشرح التعاليم الفعلية للمستكشف العظيم للحقيقة'
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='flex'>
          <List className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-xl'>
        <div className='flex flex-col space-y-2 py-4'>
          <OrderProductCard isOrder />
          <OrderProductCard isOrder note={note} />
          <OrderProductCard isOrder />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit' className='hover:bg-primary'>
              {t('close')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
