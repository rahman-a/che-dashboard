import { StatusLabelTypes, TranslationKeys } from '@/types'
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

type OptionsTypes = {
  value: string
  label: TranslationKeys
  icon: React.ComponentType<{ className?: string }>
  color?: string
}

// new - cut - sewed - delivered
export const statuses: OptionsTypes[] = [
  {
    value: 'new',
    label: 'new',
    icon: LucideLogIn,
  },
  {
    value: 'cut',
    label: 'cut',
    icon: Scissors,
  },
  {
    value: 'sewed',
    label: 'sewed',
    icon: Shirt,
  },
  {
    value: 'delivered',
    label: 'delivered',
    icon: Truck,
  },
]

export const payment: OptionsTypes[] = [
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

export const filterByOptions: OptionsTypes[] = [
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
export const prioritization: OptionsTypes[] = [
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

export const selectedRowsOptions: OptionsTypes[] = [
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
