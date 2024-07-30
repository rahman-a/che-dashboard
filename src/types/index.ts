import { z } from 'zod'
import {
  customerAddressSchema,
  customerSchema,
  orderProductSchema,
  orderSchema,
  productSchema,
} from '@/schema'
import { MessageKeys, useTranslations } from 'next-intl'

export type Customer = z.infer<ReturnType<typeof customerSchema>>
export type CustomerAddress = z.infer<ReturnType<typeof customerAddressSchema>>
export type Product = z.infer<ReturnType<typeof productSchema>>
export type Order = z.infer<ReturnType<typeof orderSchema>>
export type OrderProduct = z.infer<ReturnType<typeof orderProductSchema>>

export type TranslationKeys = MessageKeys<IntlMessages, keyof IntlMessages>

export type ResourceTypes =
  | 'orders'
  | 'products'
  | 'categories'
  | 'sizes'
  | 'types'
  | 'statuses'
  | 'customers'
  | 'users'
  | 'offers'
  | 'coupons'
  | 'invoices'
  | 'addresses'
  | 'assets'

export type StatusLabelTypes = 'new' | 'cut' | 'sewed' | 'delivered'
export type PrioritizationLabelTypes = 'urgent' | 'important' | 'contact'
export type PaymentLabelTypes = 'paid' | 'unpaid'
export type DiscountTypes = 'amount' | 'percentage'
export type AddressTypes = 'home' | 'office' | 'other'
export type OrderStates = 'completed' | 'uncompleted' | 'canceled' | 'returned'
export type UseTranslationsType = ReturnType<typeof useTranslations>
export type ComponentFormMode = 'create' | 'edit' | 'view'

export type TableFilterOptionsTypes = {
  value: string
  label: TranslationKeys
  icon: React.ComponentType<{ className?: string }>
  color?: string
}

export type ToolbarOptions = {
  filterByOptions: {
    show: boolean
    options?: TableFilterOptionsTypes[]
    defaultFilterColumn: string
    inputPlaceholder: TranslationKeys
  }
  filterByDateRange: {
    show: boolean
    column?: TranslationKeys
  }
  facetedFilter: {
    show: boolean
    data?: { column: TranslationKeys; options: TableFilterOptionsTypes[] }[]
  }
  selectedRowFilter: {
    show: boolean
    options?: TableFilterOptionsTypes[]
  }
  toggleColumn: {
    show: boolean
  }
}
