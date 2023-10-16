import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";

type NavbarProps = {
  className?: string
}

const navComponents: { title: string; href?: string; }[] = []

const Navbar = ({ className }: NavbarProps) => {
  return <>
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        {
          navComponents.map(comp => (
            <NavigationMenuItem>
                <NavigationMenuLink href={comp?.href ?? ''} className={navigationMenuTriggerStyle()}>
                  {comp.title}
                </NavigationMenuLink>
            </NavigationMenuItem>
          ))
        }

      </NavigationMenuList>
    </NavigationMenu>
  </>
}

export default Navbar