import { Unit } from "@prisma/client"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Link from "next/link"
import { Button } from "../ui/button"
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"

type AdminUnitListItemProps = {
  unit: Unit,
  onDelete?: () => Promise<any>
}

export default function AdminUnitListItem({ unit, onDelete }: AdminUnitListItemProps) {
  return (
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {unit.title}
      <div className="actions flex gap-1">

        {/* View Action */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/units/${unit.id}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View</TooltipContent>
        </Tooltip>

        {/* Edit Action */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/admin/units/${unit.id}`}>
              <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>

        {/* Remove Action */}
        {onDelete && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove Unit</TooltipContent>
        </Tooltip>
        }
      </div>
    </li>
  )
}