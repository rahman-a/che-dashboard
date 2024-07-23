import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'RB - Not found',
  description: 'Page not found',
}

export default function CatchAllPage() {
  notFound()
}
