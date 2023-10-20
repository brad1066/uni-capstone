'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { ThemeToggler } from "../ui/ThemeToggler"
import Link from "next/link"
import { useEffect } from "react"

type UserDropdownProps = {
  className?: string
}

export function UserDropdown({ className }: UserDropdownProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <DropdownMenu>
      {user && <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>Hi {user?.forename}</Button>
      </DropdownMenuTrigger>
      }
      <DropdownMenuContent className="w-56">
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
          {(user?.role == 'admin') && (<>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem><Link href="/admin/users" className="w-full">All</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/admin/users?filter=teachers" className="w-full">Teachers</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/admin/users?filter=students" className="w-full">Students</Link></DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem><Link href="/admin/courses" className="w-full">Courses</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/admin/classes" className="w-full">Classes</Link></DropdownMenuItem>
          </>)}
          {/* Stuff Teachers can do in this group */}
          {(user?.role == 'teacher') && (<>
            <DropdownMenuItem><Link href="/teacher/courses" className="w-full">My courses</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/teacher/classes" className="w-full">My classes</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/" className="w-full">Dashboard</Link></DropdownMenuItem>
          </>)}
          {/* Stuff Students can do in this group */}
          {(user?.role == 'student') && (<>
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
