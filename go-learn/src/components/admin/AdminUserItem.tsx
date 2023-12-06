import Link from "next/link"
import { Button } from "../ui/button"
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { User } from "@prisma/client"

type AdminUserItemProps = {
  user: User
  onDelete?: () => Promise<any>
}

const AdminUserItem = ({ user, onDelete }: AdminUserItemProps) => {
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center">
      {user.title} {user.forename} {user.surname}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="outline">
              <Link href={`/profile/${user.username}`}><EyeOpenIcon /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Profile</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="secondary">
              <Link href={`/admin/users/${user.username}`}><Pencil2Icon /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit user</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove user</TooltipContent>
        </Tooltip>
      </div>
    </li>
  </>)
}

export default AdminUserItem