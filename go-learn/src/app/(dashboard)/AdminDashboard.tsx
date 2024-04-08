import { Button } from '@/components/ui/button';
import { User } from '~/prisma/generated/client'

type AdminDashboardProps = {
  user: User;
};

const AdminDashboard = ({ user } : AdminDashboardProps) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button>Users</Button>
      <Button>Courses</Button>
    </div>
  )
}

export default AdminDashboard