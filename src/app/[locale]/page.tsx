import { Dashboard, Template } from '@/components'
import { Metadata } from 'next'


export const metadata:Metadata = {
  title:'RB - Dashboard',
  description:'Dashboard to control the RB e-commerce System'
}

export default function Main() {
  return (
    <Template>
      <main className='flex w-screen lg:w-full overflow-auto flex-1 flex-col gap-4 lg:gap-4 lg:p-6'>
        <Dashboard />
      </main>
    </Template>
  )
}
