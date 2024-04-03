import { getStudent } from '@/actions/studentActions'
import AssignmentItem from '@/components/item-cards/AssignmentItem'
import ModuleItem from '@/components/item-cards/ModuleItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Assignment, Course, Module, Student, User } from '~/prisma/generated/client'

type StudentDashboardProps = {
  user: User;
};

export default function StudentDashboard({ user }: StudentDashboardProps) {

  const router = useRouter()

  const [student, setStudent] = useState<Student & {
    modules?: (Module & {assignments?: Assignment[] | null})[] | null,
    enrolledCourse?: Course | null,
  }>()
  const [dueAssignments, setDueAssignments] = useState<Assignment[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const student = await getStudent(user.username, ['modules', 'assignmentsDue'])
      console.log(student)
      if (student) setStudent(student)
      setLoading(false)
    })()
  }, [user.username])

  useEffect(() => {
    const dueAssignments: Assignment[] = []
    for (const _module of student?.modules || []) {
      for (const assignment of _module.assignments || []) {
        dueAssignments.push(assignment)
      }
    }

    setDueAssignments(dueAssignments)
  }, [student?.modules])

  return <>
    <h1 className="mb-[1rem]">Dashboard</h1>

    {!loading && student && <div className='w-full flex gap-4 flex-col'>
      {/* List of modules the student is enrolled in */}
      <Card>
        <CardHeader><CardTitle>Modules</CardTitle></CardHeader>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {student?.modules?.length ? student.modules?.map(module => (
            <ModuleItem
              key={module.id}
              module={module}
              onClick={() => {
                router.push(`/view/modules/${module.id}`)
              }} />
          ))
            : <p>No modules found</p>}
        </CardContent>
      </Card>
      
      {/* Upcoming Assignments */}
      <Card>
        <CardHeader><CardTitle>Assignments</CardTitle></CardHeader>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {dueAssignments?.length ? dueAssignments?.map(assignment => (
            <AssignmentItem key={assignment.id} assignment={assignment} onClick={() => {
              router.push(`/view/assignments/${assignment.id}`)
            }}/>
          )) : <p>No assignments due</p>}
        </CardContent>
      </Card>
    </div>}
  </>
}