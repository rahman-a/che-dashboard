import React from 'react'
import { Sidebar, Header } from './Header'
type Props = {
  children: React.ReactNode
}

export function Template({ children }: Props) {
  return (
    <div className='grid min-h-screen overflow-hidden lg:overflow-visible w-full lg:grid-cols-[220px_1fr]'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        {children}
      </div>
    </div>
  )
}
