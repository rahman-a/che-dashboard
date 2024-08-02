import * as React from 'react'
import { TranslationKeys } from '@/types'
import { useTranslations } from 'next-intl'
import { Badge } from '../ui/badge'

export interface IDataTableSimpleCellRenderProps {
  text?: string
  title?: TranslationKeys
  className?: string
  badge?: {
    text: string
    variant?:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'outline'
      | undefined
      | null
    className?: string
  }
}

export function DataTableSimpleCellRender({
  text,
  title,
  className,
  badge,
}: IDataTableSimpleCellRenderProps) {
  const t = useTranslations()
  return (
    <>
      {badge ? (
        <Badge className={badge.className} variant={badge.variant}>
          {badge.text}
        </Badge>
      ) : (
        <span className={className}>
          {text ? `${text} ` : ''}
          {t(title as TranslationKeys)}
        </span>
      )}
    </>
  )
}
