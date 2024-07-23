import * as React from 'react'
import {
  InvoiceInfoHeader,
  InvoiceInfoBarcode,
  InvoiceInfoCustomer,
  InvoiceInfoOrderItems,
  InvoiceInfoNote,
} from './'
import { useTranslations } from 'next-intl'

export interface IInvoiceInfoProps {}

export function InvoiceInfo(props: IInvoiceInfoProps) {
  const t = useTranslations()
  return (
    <>
      <InvoiceInfoHeader />
      <InvoiceInfoBarcode />
      <InvoiceInfoCustomer />
      <InvoiceInfoOrderItems />
      <InvoiceInfoNote title={t('order_note')} type='order' />
      <InvoiceInfoNote title={t('delivery_note')} type='delivery' />
    </>
  )
}
