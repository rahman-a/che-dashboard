import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
type Props = {
  className?: string
  isTitle?: boolean
  description: string
}

export function ProductDetails({ className, isTitle, description }: Props) {
  const t = useTranslations()
  const locale = useLocale() as 'en' | 'ar'
  return (
    <div className={cn('flex flex-col space-y-3', className)}>
      {isTitle && (
        <h3 className='text-xl md:text-2xl min-w-fit'>Design Details:</h3>
      )}
      <article className='text-base md:text-base bg-primary/5 shadow-sm p-2 rounded-md'>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </article>
    </div>
  )
}
