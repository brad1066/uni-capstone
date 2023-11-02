'use client'
import { ThemeToggler } from "./ThemeToggler"
import Navbar from "../navigation/Navbar"
import Image from "next/image"
import { useRouter } from "next/navigation"
import UserDropdown from "../navigation/UserDropdown"
import Link from "next/link"


type HeaderProps = {
}

const Header = ({ }: HeaderProps) => {
  const router = useRouter()

  return <header className="site-header">
    <Link href="/" className="site-icon" >
      <Image src="/icon.png" height="50" width="50" alt="Image" />
    </Link>
    <Navbar className="navbar" />
    <UserDropdown className="account-button" />
  </header>
}

export default Header