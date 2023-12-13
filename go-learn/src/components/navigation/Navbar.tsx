import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

type NavbarProps = {
  className?: string
}

const navComponents: { title: string; href?: string; }[] = []

const Navbar = ({ className }: NavbarProps) => {
  return <>
    <NavigationMenu className={cn('mx-auto', className)}>
      <NavigationMenuList>
        {
          navComponents.map(comp => (
            <NavigationMenuItem key={comp.title}>
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