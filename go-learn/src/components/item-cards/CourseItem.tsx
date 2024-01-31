import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { EyeOpenIcon, GlobeIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Course } from '@prisma/client'
import { cn } from '@/lib/utils'

type CourseItemProps = {
  className?: string
  course: Course
  editable?: boolean
  onClick?: () => void
  onDelete?: () => Promise<unknown>
}

const CourseItem = ({ className, course, editable, onClick, onDelete }: CourseItemProps) => {
  return (<>
    <li className={cn('w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]' + (onClick ? ' cursor-pointer' : ''), className)}
      onClick={onClick}
    >
      {course.title}
      <div className="actions flex gap-1">
        {course?.websiteURL && (
          <Link
            href={course.websiteURL}
            onClick={(e) => e.stopPropagation()}
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <GlobeIcon role='external-view-icon'/>
          </Link>
        )}
        <Link
          href={`/view/courses/${course.id}`}
          onClick={(e) => e.stopPropagation()}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}>
          <EyeOpenIcon role='view-icon'/>
        </Link>
        {editable && (
          <Link
            href={`/manage/courses/${course.id}`}
            onClick={(e) => e.stopPropagation()}
            className={buttonVariants({ variant: 'secondary', size: 'icon' })}>
            <Pencil2Icon role='edit-icon'/>
          </Link>
        )}
        {onDelete && (
          <Button type="button" size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); onDelete?.() }}>
            <TrashIcon />
          </Button>
        )}
      </div>
    </li>
  </>)
}

export default CourseItem