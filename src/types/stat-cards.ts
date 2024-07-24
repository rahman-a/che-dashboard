import { TranslationKeys } from '.'

export type CardStats = {
  title: TranslationKeys
  totalSales: string
  trending: string
  url: string
  data: {
    id: number
    country?: string
    name: string
    value: string | number
  }[]
}

export type TopAttributes = {
  url: string
  title: TranslationKeys
  data: {
    id: number
    name: string
    orders: number
    sales: string
  }[]
}

export type TopProducts = {
  url: string
  data: {
    id: number
    image: string
    name: string
    orders: number
    sales: string
  }[]
}
