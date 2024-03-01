import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { EyeOpenIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Section } from '~/prisma/generated/client'
import { cn } from '@/lib/utils'

type SectionItemProps = {
  className?: string
  section: Section
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const SectionItem = ({ className, section, editable, onClick, onDelete }: SectionItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]'+ (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {section.title}
      <div className="actions flex gap-1">
        <Link 
          href={`/view/sections/${section.id}`} 
          onClick={(e) => e.stopPropagation()}
          className={buttonVariants({variant: 'outline', size: 'icon'})}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {editable && (
          <Link 
            href={`/manage/sections/${section.id}`} 
            onClick={(e) => e.stopPropagation()}
            className={buttonVariants({variant: 'secondary', size: 'icon'})}>
            <Pencil2Icon role='edit-icon'/>
          </Link>
        )}
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon role='destroy-icon'/>
          </Button>
        )}
      </div>
    </li>
  </>)
}

export default SectionItem