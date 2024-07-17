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

// new - cut - sewed - delivered
export const statuses = [
  {
    value: 'new',
    label: 'New',
    icon: LucideLogIn,
    color: '--order-new',
  },
  {
    value: 'cut',
    label: 'Cut',
    icon: Scissors,
    color: '--order-cut',
  },
  {
    value: 'sewed',
    label: 'Sewed',
    icon: Shirt,
    color: '--order-sewed',
  },
  {
    value: 'delivered',
    label: 'Delivered',
    icon: Truck,
    color: '--order-delivered',
  },
]

export const payment = [
  {
    value: 'paid',
    label: 'Paid',
    icon: CircleCheckBig,
  },
  {
    value: 'unpaid',
    label: 'Unpaid',
    icon: CircleX,
  },
]

export const filterByOptions = [
  {
    value: 'no',
    label: 'Order No',
    icon: Hash,
  },
  {
    value: 'customer',
    label: 'Customer',
    icon: UserCheck2,
  },
  {
    value: 'country',
    label: 'Country',
    icon: Globe,
  },
  {
    value: 'phone',
    label: 'Phone',
    icon: Phone,
  },
]
// urgent - important - contact
export const prioritization = [
  {
    value: 'urgent',
    label: 'Urgent',
    icon: Siren,
    color: '--order-urgent',
  },
  {
    value: 'important',
    label: 'Important',
    icon: FileWarningIcon,
    color: '--order-important',
  },
  {
    value: 'contact',
    label: 'Contact',
    icon: PhoneForwarded,
    color: '--order-contact',
  },
]

export const selectedRowsOptions = [
  {
    value: 'change-status',
    label: 'Change Status',
    icon: Factory,
  },
  {
    value: 'change-priority',
    label: 'Change Priority',
    icon: ArrowUpDown,
  },
  {
    value: 'change-payment',
    label: 'Change Payment',
    icon: BadgeDollarSign,
  },
]
