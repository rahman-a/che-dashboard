import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
type Props = {
  className?: string
  isTitle?: boolean
  description: {
    en: {
      title: string
      points: { id: number; text: string }[]
    }
    ar: {
      title: string
      points: { id: number; text: string }[]
    }
  }
}

export function ProductDetails({ className, description, isTitle }: Props) {
  const t = useTranslations()
  const locale = useLocale() as 'en' | 'ar'
  return (
    <div className={cn('flex flex-col space-y-3', className)}>
      {isTitle && (
        <h3 className='text-xl md:text-2xl min-w-fit'>Design Details:</h3>
      )}
      <article className='text-base md:text-base bg-primary/5 shadow-sm p-2 rounded-md'>
        <h4>{description[locale].title}</h4>
        <ul>
          {description[locale].points.map((point) => (
            <li key={point.id}>{point.text}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}
