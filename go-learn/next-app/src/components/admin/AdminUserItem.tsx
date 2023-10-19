import { TUser } from "@/lib/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { EyeOpenIcon, GearIcon, ReaderIcon, TrashIcon, ViewNoneIcon, ViewVerticalIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type AdminUserItemProps = {
  user: TUser
}

const AdminUserItem = ({ user }: AdminUserItemProps) => {
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
              <Link href={`/admin/users/${user.username}`}><GearIcon /></Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit user</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { console.log('Deletion of user: ' + user.username) }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove user</TooltipContent>
        </Tooltip>
      </div>
    </li>
  </>)
}

export default AdminUserItem