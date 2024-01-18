'use client'

import { getModule } from '@/actions/moduleActions'
import NotFoundPage from '@/app/not-found'
import CourseItem from '@/components/item-cards/CourseItem'
import UnitItem from '@/components/item-cards/UnitItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Course, Module, Unit } from '@prisma/client'
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
  const [module, setModule] = useState<Module & { course: Course | null, units: Unit[] | null }>()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      await getModule(module_id, ['course', 'units']).then(module => setModule(module))
    })().finally(() => setLoading(false))
  }, [])

  return (
    <>
      {!loading && !module && <>
        <NotFoundPage />
      </>}
      {!loading && module && <>
        <h1 className="mb-4">{module?.title}</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Information Card */}
          <Card className="">
            <CardHeader><CardTitle>Information</CardTitle></CardHeader>
            <CardContent>
              <h4 className="mb-2">Description</h4>
              {module.description ? module.description : 'No description'}
              <h4 className="mt-4 mb-2">Course</h4>
              {module?.course ? <CourseItem course={module.course} /> : 'Not assigned to a course'}
            </CardContent>
          </Card>

          {/* Module Units Card */}
          <Card className='md:col-span-2'>
            <CardHeader><CardTitle>Units</CardTitle></CardHeader>
            <CardContent>
              {module.units?.length ? (
                <ul className="grid grid-cols-1 md:grid-cols-2">
                  {module.units.map(unit => <UnitItem key={unit.id} unit={unit} />)}
                </ul>
              ) : 'No units'}
            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}
