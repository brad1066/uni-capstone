import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const AdminDashboard = () => {
  return (
    <div>
      <h1 className='text-center'>Admin Dashboard</h1>
      <Card className='mt-8'>
        <CardContent className='p-8 flex flex-col gap-4'>
          <Link href='manage/users' className={buttonVariants({variant: 'default'})}>Users</Link>
          <Link href='manage/courses' className={buttonVariants({variant: 'default'})}>Courses</Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard