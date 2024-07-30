import * as React from 'react'
import { useTranslations } from 'next-intl'

export interface IRequiredAsteriskProps {}

export function RequiredAsterisk(props: IRequiredAsteriskProps) {
  const t = useTranslations()
  return (
    <span className='text-red-500 ml-1 rtl:mr-1 rtl:ml-0' title={t('required')}>
      *
    </span>
  )
}
