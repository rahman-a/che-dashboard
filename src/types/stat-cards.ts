export type CardStats = {
  title: string
  totalSales: string
  trending: string
  url: string
  data: {
    id: number
    country?: string
    name: string
    value: string
  }[]
}

export type TopAttributes = {
  url: string
  title: string
  data: {
    id: number
    name: string
    orders: string
    sales: string
  }[]
}

export type TopProducts = {
  url: string
  data: {
    id: number
    image: string
    name: string
    orders: string
    sales: string
  }[]
}
