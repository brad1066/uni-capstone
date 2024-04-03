import { deleteResource, getResources } from '@/actions/resourceActions'
import { getTeacher } from '@/actions/teacherActions'
import ModuleItem from '@/components/item-cards/ModuleItem'
import ResourceItem from '@/components/item-cards/ResourceItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Module, Resource, Teacher, User } from '~/prisma/generated/client'

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
      <Card className='col-span-2'>
        <CardHeader><CardTitle>Modules</CardTitle></CardHeader>
        <CardContent>
          {teacher?.modules?.length
            ? teacher.modules.map(module => <ModuleItem key={module.id} module={module} />)
            : <p>No modules found</p>
          }
        </CardContent>
      </Card>
      <Card className='col-span-1'>
        <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {resources?.length
            ? resources.map(resource => (
              <ResourceItem
                key={module.id}
                resource={resource}
                onDelete={async () => {
                  await deleteResource(resource.id)
                }} />))
            : <p>No resources found</p>}
        </CardContent>
      </Card>
    </div>}
  </>
}