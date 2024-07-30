import {
  Hash,
  Layers,
  Blocks,
  LucideLogIn,
  Scissors,
  Shirt,
  Truck,
} from 'lucide-react'
import { TableFilterOptionsTypes } from '@/types'

export const filterByOptions: TableFilterOptionsTypes[] = [
  {
    value: 'no',
    label: 'product_no',
    icon: Hash,
  },
  {
    value: 'SKUs',
    label: 'skus',
    icon: Layers,
  },
  {
    value: 'category',
    label: 'category',
    icon: Blocks,
  },
]

export const statuses: TableFilterOptionsTypes[] = [
  {
    value: 'new',
    label: 'new',
    color: '--order-new',
    icon: LucideLogIn,
  },
  {
    value: 'cut',
    label: 'cut',
    color: '--order-cut',
    icon: Scissors,
  },
  {
    value: 'sewed',
    label: 'sewed',
    color: '--order-sewed',
    icon: Shirt,
  },
  {
    value: 'delivered',
    label: 'delivered',
    color: '--order-delivered',
    icon: Truck,
  },
]
