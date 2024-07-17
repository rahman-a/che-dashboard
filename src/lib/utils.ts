import { Row } from '@tanstack/react-table'
import { Order } from '@/app/[locale]/orders/(data)/data-schema'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterDateWithinRange(
  row: Row<Order>,
  columnId: string,
  value: any
) {
  const date: Date = new Date(row.getValue(columnId))
  const [start, end] = value // value => two date input values
  const startDate = start ? new Date(start) : null
  const endDate = end ? new Date(end) : null
  //If one filter defined and date is null filter it
  if ((startDate || endDate) && !date) return false
  if (startDate && !endDate) {
    return date.getTime() >= startDate?.getTime()!
  } else if (!startDate && endDate) {
    return date.getTime() <= endDate?.getTime()!
  } else if (startDate && endDate) {
    return (
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime()
    )
  } else return true
}
