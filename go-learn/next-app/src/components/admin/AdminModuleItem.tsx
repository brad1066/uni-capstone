import { TModule } from "@/lib/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { EyeOpenIcon, GlobeIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type AdminModuleItemProps = {
  module: TModule
  onDelete?: () => Promise<any>
}

const AdminModuleItem = ({ module, onDelete }: AdminModuleItemProps) => {
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {module.title}
      <div className="actions flex gap-1">
        {module?.websiteURL && <Tooltip>
          <TooltipTrigger asChild>
            <Link href={module.websiteURL ?? ''}>
              <Button type="button" size="icon" variant="ghost"><GlobeIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>External Link</TooltipContent>
        </Tooltip>}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/modules/${module.id}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View module</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/admin/modules/${module.id}`} className="">
              <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Edit module</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { console.log('Deletion of module: ' + module.id); onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove module</TooltipContent>
        </Tooltip>
      </div>
    </li>
  </>)
}

export default AdminModuleItem