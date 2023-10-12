'use client'
import { ThemeToggler } from "./ThemeToggler"
import Navbar from "./navigation/Navbar"
import Image from "next/image"
import { useRouter } from "next/navigation"


type HeaderProps = {
  showNav?: boolean
  showThemeSwitcher?: boolean
}

const Header = ({ showNav, showThemeSwitcher }: HeaderProps) => {
  const router = useRouter()

  return <header>
    <Image src="/icon.png" height="100" width="100" alt="Image"
      className="rounded-md object-cover cursor-pointer m-3"
      onClick={(e) => router.push('/')} />


    {showNav && <Navbar />}
    {showThemeSwitcher && <ThemeToggler />}
  </header>
}

export default Header