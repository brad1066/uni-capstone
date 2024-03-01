import { getStudent } from '@/actions/studentActions'
import { Course, Module, Student, User } from '~/prisma/generated/client'
import { useEffect, useState } from 'react'
import ModuleItem from '../item-cards/ModuleItem'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { useRouter } from 'next/navigation'
import CourseItem from '../item-cards/CourseItem'

type StudentDashboardProps = {
  user: User;
};

export default function StudentDashboard({ user }: StudentDashboardProps) {

  const router = useRouter()

  const [student, setStudent] = useState<Student & {
    enrolledCourse?: Course | null
    modules?: Module[] | null
  }>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const student = await getStudent(user.username, ['enrolledCourse', 'modules'])
      if (student) setStudent(student)
      setLoading(false)
    })()
  }, [user.username])

  return <>
    <h1 className="mb-[1rem]">Dashboard</h1>

    {!loading && student && <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {student?.enrolledCourse ? (
        <Card>
          <CardHeader><CardTitle>Enrolled Course</CardTitle></CardHeader>
          <CardContent>
            <CourseItem course={student.enrolledCourse} onClick={() => {
              router.push(`/view/courses/${student.enrolledCourse?.id}`)
            }} />
          </CardContent>
        </Card>
      )
        : (
          <></>
        )
      }
      {!!student?.modules?.length && (
        <Card className='md:col-span-2'>
          <CardHeader><CardTitle>Modules</CardTitle></CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-2'>
            {student.modules?.map(module => (
              <ModuleItem
              key={module.id}
              module={module}
              onClick={() => {
                router.push(`/view/modules/${module.id}`)
              }} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>}
  </>
}