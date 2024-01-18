import { getTeacher } from '@/actions/teacherActions'
import { Module, Resource, Teacher, User } from '@prisma/client'
import { useEffect, useState } from 'react'
import ModuleItem from '../item-cards/ModuleItem'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { deleteResource, getResources } from '@/actions/resourceActions'
import ResourceItem from '../item-cards/ResourceItem'

type TeacherDashboardProps = {
  user: User;
};

export default function TeacherDashboard({ user }: TeacherDashboardProps) {

  const [teacher, setTeacher] = useState<Teacher & { modules?: Module[] | null }>()
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    (async () => {
      const teacher = await getTeacher(user.username, ['modules'])
      const resources = await getResources(user.username)
      if (teacher) setTeacher(teacher)
      if (resources) setResources(resources)
      setLoading(false)
    })()
  }, [user.username])

  return <>
    <h1 className="mb-[1rem]">Dashboard</h1>

    {!loading && teacher && <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {!!teacher?.modules?.length && (
        <Card>
          <CardHeader><CardTitle>Modules</CardTitle></CardHeader>
          <CardContent>
            {teacher.modules?.map(module => <ModuleItem key={module.id} module={module} />)}
          </CardContent>
        </Card>
      )}
      {resources.length > 0 && (
        <Card className='col-span-2'>
          <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
          <CardContent className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {resources?.map(resource => <ResourceItem key={module.id} resource={resource} onDelete={async () => {
              await deleteResource(resource.id)
            }} />)}
          </CardContent>
        </Card>
      )}
    </div>}
  </>
}