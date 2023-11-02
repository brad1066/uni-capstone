import { TClass } from "@/lib/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { EyeOpenIcon, GlobeIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Card, CardHeader } from "../ui/card"

type AdminClassItemProps = {
  class: TClass
  onDelete?: () => Promise<any>
}

const AdminClassItem = ({ class: _class, onDelete }: AdminClassItemProps) => {
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {_class.title}
      <div className="actions flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/classes/${_class.id}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View class</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/admin/classes/${_class.id}`} className="">
              <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Edit class</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { console.log('Deletion of class: ' + _class.id); onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove class</TooltipContent>
        </Tooltip>
      </div>
    </li>
  </>)
}

export default AdminClassItem