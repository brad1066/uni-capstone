import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Resource } from '~/prisma/generated/client'
import { cn } from '@/lib/utils'

type ResourceItemProps = {
  className?: string
  resource: Resource
  editable?: boolean,
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const ResourceItem = ({ className, resource, editable, onClick, onDelete }: ResourceItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]' + (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {resource.title}
      <div className="actions flex gap-1">
        <Link
          href={`/view/resources/${resource.id}`}
          onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline', size: 'icon'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {editable && (
          <Link
            href={`/manage/resources/${resource.id}`}
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

export default ResourceItem