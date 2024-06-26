'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ThemeToggler } from '../ui/ThemeToggler'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { UserRole } from '~/prisma/generated/client'

type UserDropdownProps = {
  className?: string
}

export function UserDropdown({ className }: UserDropdownProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <DropdownMenu>
      {user && <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn(className, 'bg-card border shadow')}>Hi {user?.forename}</Button>
      </DropdownMenuTrigger>
      }
      <DropdownMenuContent className="w-56 mx-6">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>{user?.forename} {user?.surname}</span>
          <ThemeToggler className="theme-toggler" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link href={`/profile/${user?.username}`} className="w-full">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Stuff Admin can do in this group */}
          {(user?.role == UserRole.admin) && (<>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className='mx-2'>
                  <DropdownMenuItem><Link href="/manage/users" className="w-full">All</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/manage/users?filter=teacher" className="w-full">Teachers</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/manage/users?filter=student" className="w-full">Students</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/manage/users?filter=admin" className="w-full">Admin</Link></DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem><Link href="/manage/courses" className="w-full">Courses</Link></DropdownMenuItem>
          </>)}
          {/* Stuff Teachers can do in this group */}
          {(user?.role == UserRole.teacher) && (<>
            <DropdownMenuItem><Link href="/" className="w-full">Dashboard</Link></DropdownMenuItem>
          </>)}
          {/* Stuff Students can do in this group */}
          {(user?.role == UserRole.student) && (<>
            <DropdownMenuItem><Link href="/" className="w-full">Dashboard</Link></DropdownMenuItem>
          </>)}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={async () => { await logout?.(); router.push('/login') }}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default UserDropdown
