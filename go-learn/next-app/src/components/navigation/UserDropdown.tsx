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
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user?.role == 'admin' && (<DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Manage users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem><Link href="/users/teachers">Teachers</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/users/students">Students</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/users">All</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/users/new">New user</Link></DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        )}
        <DropdownMenuItem onClick={async () => { await logout?.(); router.push('/login') }}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default UserDropdown
