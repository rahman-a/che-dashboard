import Dashboard from '@/components/Dashboard'
import Template from '@/components/Template'

export default function Main() {
  return (
    <Template>
      <main className='flex w-screen lg:w-full overflow-auto flex-1 flex-col gap-4 lg:gap-6 lg:p-6'>
        <Dashboard />
      </main>
    </Template>
  )
}
