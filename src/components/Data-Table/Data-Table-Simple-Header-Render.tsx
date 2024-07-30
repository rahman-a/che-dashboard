import * as React from 'react'
import { TranslationKeys } from '@/types'
import { useTranslations } from 'next-intl'

export interface IDataTableSimpleHeaderRenderProps {
  text?: string
  title: TranslationKeys
  className?: string
}

export function DataTableSimpleHeaderRender({
  text,
  title,
  className,
}: IDataTableSimpleHeaderRenderProps) {
  const t = useTranslations()
  return (
    <span className={className}>
      {text ? `${text} ` : ''}
      {t(title as TranslationKeys)}
    </span>
  )
}
