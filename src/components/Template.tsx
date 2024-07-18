import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

export default function Template({ children }: Props) {
  return (
    <div className='grid min-h-screen overflow-hidden w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        {children}
      </div>
    </div>
  )
}
