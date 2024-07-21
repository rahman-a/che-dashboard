'use client'
import React from 'react'

import { SingleValue, ActionMeta } from 'react-select'
import AsyncSelect from 'react-select/async'
import { AsyncDataOptions } from '@/demo/data/async-select-data'
import { useLocale, useTranslations } from 'next-intl'

type AsyncSelectInputProps = {
  placeholder?: string
  className?: string
  onChange: (
    value: SingleValue<AsyncDataOptions>,
    actions: ActionMeta<AsyncDataOptions>
  ) => void
  loadedData: (value: string) => Promise<AsyncDataOptions[]>
}

export const AsyncSelectInput = ({
  placeholder,
  className,
  onChange,
  loadedData,
}: AsyncSelectInputProps) => {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <AsyncSelect
      loadOptions={loadedData}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      noOptionsMessage={() => t('no_options_found')}
      loadingMessage={() => t('loading')}
      isRtl={locale === 'ar'}
    />
  )
}
