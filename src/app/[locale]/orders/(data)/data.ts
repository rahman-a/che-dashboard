import {
  LucideLogIn,
  Scissors,
  Shirt,
  Truck,
  Siren,
  FileWarningIcon,
  PhoneForwarded,
  CircleCheckBig,
  CircleX,
  Hash,
  UserCheck2,
  Globe,
  Phone,
  Factory,
  ArrowUpDown,
  BadgeDollarSign,
} from 'lucide-react'
import { TableFilterOptionsTypes } from '@/types'
// new - cut - sewed - delivered
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

export const payment: TableFilterOptionsTypes[] = [
  {
    value: 'paid',
    label: 'paid',
    icon: CircleCheckBig,
  },
  {
    value: 'unpaid',
    label: 'unpaid',
    icon: CircleX,
  },
]

export const filterByOptions: TableFilterOptionsTypes[] = [
  {
    value: 'no',
    label: 'order_no',
    icon: Hash,
  },
  {
    value: 'customer',
    label: 'customer',
    icon: UserCheck2,
  },
  {
    value: 'country',
    label: 'country',
    icon: Globe,
  },
  {
    value: 'phone',
    label: 'phone',
    icon: Phone,
  },
]
// urgent - important - contact
export const prioritization: TableFilterOptionsTypes[] = [
  {
    value: 'urgent',
    label: 'urgent',
    icon: Siren,
    color: '--order-urgent',
  },
  {
    value: 'important',
    label: 'important',
    icon: FileWarningIcon,
    color: '--order-important',
  },
  {
    value: 'contact',
    label: 'contact',
    icon: PhoneForwarded,
    color: '--order-contact',
  },
]

export const selectedRowsOptions: TableFilterOptionsTypes[] = [
  {
    value: 'change-status',
    label: 'change_status',
    icon: Factory,
  },
  {
    value: 'change-priority',
    label: 'change_priority',
    icon: ArrowUpDown,
  },
  {
    value: 'change-payment',
    label: 'change_payment',
    icon: BadgeDollarSign,
  },
]
