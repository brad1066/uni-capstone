'use client'

import Navbar from '../navigation/Navbar'
import Image from 'next/image'
import UserDropdown from '../navigation/UserDropdown'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type HeaderProps = {
  className?: string
}

const Header = ({className }: HeaderProps) => {
  return <header className={cn('site-header', className)}>
    <Link href="/" className="site-icon" >
      <Image src="/icon.png" height="50" width="50" alt="Image" priority/>
    </Link>
    <Navbar className="navbar" />
    <UserDropdown className="account-button" />
  </header>
}

export default Header