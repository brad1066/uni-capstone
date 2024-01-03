import Link from 'next/link'
import { Button } from '../ui/button'
import { EyeOpenIcon, GlobeIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Course } from '@prisma/client'
import { useAuth } from '@/hooks/useAuth'

type AdminCourseItemProps = {
  course: Course
  onDelete?: () => Promise<unknown>
}

const AdminCourseItem = ({ course, onDelete }: AdminCourseItemProps) => {

  const { user } = useAuth()
  return (<>
    <li className="w-full flex justify-between gap-[1rem] items-center border-2 rounded-lg p-[0.5rem]">
      {course.title}
      <div className="actions flex gap-1">
        {course?.websiteURL && <Tooltip>
          <TooltipTrigger asChild>
            <Link href={course.websiteURL ?? ''}>
              <Button type="button" size="icon" variant="ghost"><GlobeIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>External Link</TooltipContent>
        </Tooltip>}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/courses/${course.id}`}>
              <Button type="button" size="icon" variant="outline"><EyeOpenIcon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>View course</TooltipContent>
        </Tooltip>
        {user?.role === 'admin' && <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/manage/courses/${course.id}`} className="">
              <Button type="button" size="icon" variant="secondary"><Pencil2Icon /></Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Edit course</TooltipContent>
        </Tooltip>
        }
        {onDelete && user?.role === 'admin' && <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="destructive" onClick={() => { onDelete?.() }}><TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove course</TooltipContent>
        </Tooltip>
        }
      </div>
    </li>
  </>)
}

export default AdminCourseItem