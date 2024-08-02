import { Row } from '@tanstack/react-table'
import { Order } from '@/app/[locale]/orders/(data)/data-schema'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterDateWithinRange<T>(
  row: Row<T>,
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

export const getFileNameAndExtension = (url: string) => {
  const urlParts = url.split('/')
  const lastPart = urlParts[urlParts.length - 1]
  const name = lastPart.split('.')[0]
  const extension = lastPart.split('.')[1]
  return { name, extension }
}

export const blobUrlToFile = (blobUrl: string): Promise<File> =>
  new Promise((resolve) => {
    fetch(blobUrl).then((res) => {
      res.blob().then((blob) => {
        const { extension, name } = getFileNameAndExtension(blobUrl)
        const file = new File([blob], `${name}.${extension}`, {
          type: blob.type,
        })
        resolve(file)
      })
    })
  })

export const getFullNameInitials = (fullName: string) => {
  if (!fullName) return 'CN'
  const isArabic = /[\u0600-\u06FF]/.test(fullName)
  const initials =
    fullName
      .match(/(^\S\S?|\s\S)?/g)
      ?.map((v) => v.trim())
      .join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join(isArabic ? ' ' : '')
      ?.toLocaleUpperCase() || ''
  return isArabic ? initials.trimEnd() : initials
}

export function generateCouponCode(length = 10) {
  let text = ''
  const generated: string[] = []
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  if (generated.indexOf(text) == -1) {
    generated.push(text)
  } else {
    generateCouponCode(length)
  }

  return text
}
