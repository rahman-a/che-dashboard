import { z } from 'zod'
import {
  couponsSchema,
  customerAddressSchema,
  customerSchema,
  materialSchema,
  offerSchema,
  orderProductSchema,
  orderSchema,
  productSchema,
  staffSchema,
} from '@/schema'
import { MessageKeys, useTranslations } from 'next-intl'

export type Customer = z.infer<ReturnType<typeof customerSchema>>
export type CustomerAddress = z.infer<ReturnType<typeof customerAddressSchema>>
export type Product = z.infer<ReturnType<typeof productSchema>>
export type Order = z.infer<ReturnType<typeof orderSchema>>
export type OrderProduct = z.infer<ReturnType<typeof orderProductSchema>>
export type Offer = z.infer<ReturnType<typeof offerSchema>>
export type Coupon = z.infer<ReturnType<typeof couponsSchema>>
export type Material = z.infer<ReturnType<typeof materialSchema>>
export type Staff = z.infer<ReturnType<typeof staffSchema>>
export type TranslationKeys = MessageKeys<IntlMessages, keyof IntlMessages>

export type ResourceTypes =
  | 'orders'
  | 'products'
  | 'categories'
  | 'sizes'
  | 'types'
  | 'statuses'
  | 'customers'
  | 'staff'
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
export type FacetedFilterOption = {
  column: TranslationKeys
  options: TableFilterOptionsTypes[]
}

export type TableFilterOptionsTypes = {
  value: string
  label: TranslationKeys
  icon?: React.ComponentType<{ className?: string }>
  color?: string
  resource?: ResourceTypes
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
    title?: TranslationKeys
  }
  facetedFilter: {
    show: boolean
    data?: FacetedFilterOption[]
  }
  selectedRowFilter: {
    show: boolean
    options?: TableFilterOptionsTypes[]
  }
  toggleColumn: {
    show: boolean
  }
}
