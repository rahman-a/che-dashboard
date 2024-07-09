import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations('NotFound')

  return (
    <main
      className='relative flex items-center justify-center min-h-screen 
    flex-col space-y-5 my-10 py-10 px-2 sm:px-5 md:p-10'
    >
      <h1 className='text-xl text-slate-900'>{t('not_found')}</h1>
      <Button className='hover:bg-primary' asChild>
        <Link href='/' className='space-x-1'>
          <Home size={18} className='mr-1 rtl:ml-1 rtl:mr-0' />
          {t('back_to_home')}
        </Link>
      </Button>
    </main>
  )
}
