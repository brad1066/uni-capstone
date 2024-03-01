import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { EyeOpenIcon, GlobeIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Module } from './../../prisma/generated/client'
import { cn } from '@/lib/utils'

type ModuleItemProps = {
  className?: string
  module: Module
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const ModuleItem = ({ className, module, editable, onClick, onDelete }: ModuleItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]'+ (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {module.title}
      <div className="actions flex gap-1">
        {module?.websiteURL && (
          <Link
            href={module.websiteURL}
            onClick={(e) => e.stopPropagation()}
            className={buttonVariants({variant: 'ghost', size: 'icon'})}>
            <GlobeIcon role='external-view-icon'/>
          </Link>
        )}
        <Link
          href={`/view/modules/${module.id}`}
          onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline', size: 'icon'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {
          editable && (
            <Link
              href={`/manage/modules/${module.id}`}
              onClick={(e) => e.stopPropagation()}
              className={buttonVariants({variant: 'secondary', size: 'icon'})}>
              <Pencil2Icon role='edit-icon'/>
            </Link>
          )}
        
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon role='remove-icon'/>
          </Button>
        )}
      </div>
    </li>
  </>)
}

export default ModuleItem