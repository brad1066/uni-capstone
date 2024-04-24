'use client'

import { getModule } from '@/actions/moduleActions'
import NotFoundPage from '@/app/not-found'
import AssignmentItem from '@/components/item-cards/AssignmentItem'
import CourseItem from '@/components/item-cards/CourseItem'
import UnitItem from '@/components/item-cards/UnitItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Assignment, Course, Module, Unit, UserRole } from '~/prisma/generated/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ViewModulePageProps = {
  params: {
    module_id: string
  }
}

export default function ViewModulePage({ params: { module_id } }: ViewModulePageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [module, setModule] = useState<Module & {
    course: Course | null
    units: Unit[] | null
    assignments: Assignment[] | null
  }>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      await getModule(module_id, ['course', 'units', 'assignments']).then(module => setModule(module))
    })().finally(() => setLoading(false))
  }, [])

  return (
    <>
      {!loading && !module && <NotFoundPage />}
      {!loading && module && <>
        <h1 className="mb-4">{module?.title}</h1>
        <div className="w-full grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Information Card */}
          <Card>
            <CardHeader><CardTitle>Information</CardTitle></CardHeader>
            <CardContent>
              <h4 className="mb-2">Description</h4>
              {module.description ? module.description : 'No description'}
              <h4 className="mt-4 mb-2">Course</h4>
              {module?.course ? (
                <CourseItem
                  className='max-w-fit min-w-sm'
                  editable={user?.role == UserRole.admin}
                  course={module.course}
                  onClick={() => { module?.course && router.push(`/view/courses/${module.course.id}`) }} />
              )
                : 'Not assigned to a course'}
            </CardContent>
          </Card>

          {/* Module Assignments Card */}
          <Card className='lg:col-span-2'>
            <CardHeader><CardTitle className='flex flex-row items-center justify-between'>Assignments</CardTitle></CardHeader>
            <CardContent>
              {module.assignments?.length ? (
                <div className="flex flex-row flex-wrap">
                  {module.assignments.map(assignment => (
                    <AssignmentItem
                      key={assignment.id}
                      assignment={assignment}
                      className='max-w-fit min-w-sm'
                      editable={user?.role == UserRole.admin || user?.role == UserRole.teacher} />
                  ))}
                </div>
              ) : 'No assignments'}
            </CardContent>
          </Card>

          {/* Module Units Card */}
          <Card className='lg:col-span-3'>
            <CardHeader><CardTitle className='flex flex-row items-center justify-between'>Units</CardTitle></CardHeader>
            <CardContent>
              {module.units?.length ? (
                <ul className="flex flex-row flex-wrap">
                  {module.units.map(unit => (
                    <UnitItem
                      key={unit.id}
                      unit={unit}
                      editable={user?.role == UserRole.admin || user?.role == UserRole.teacher}
                      className='max-w-fit min-w-sm'
                      onClick={() => { router.push(`/view/units/${unit.id}`) }} />
                  ))}
                </ul>
              ) : 'No units'}
            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}
