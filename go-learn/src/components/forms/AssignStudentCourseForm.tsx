'use client'

import { getCourses } from '@/actions/courseActions'
import { Course, Student } from '@prisma/client'
import { useEffect, useState } from 'react'
import { CoursesSelectCombobox } from './CoursesSelectCombobox'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

type AssignStudentCourseFormProps = {
  student: Student,
  onSave: (course: Course) => void
}

const formSchema = z.object({
  course: z.coerce.string().min(0, 'You need to select a course')
})

export function AssignStudentCourseForm({ onSave }: AssignStudentCourseFormProps) {
  const [course, setCourse] = useState<Course>()
  const [courses, setCourses] = useState<Course[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: ''
    }
  })

  useEffect(() => {
    (async () => {
      const courses = await getCourses()
      setCourses(courses)
    })()
  }, [])

  return (
    <Form {...form}>
      <form target='' onSubmit={(e) => { e.preventDefault(); course && onSave?.(course) }}>
        <FormField
          control={form.control}
          name='course'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <CoursesSelectCombobox value={field.value} setValue={(prevState) => {
                  field.onChange(prevState)
                  if (prevState == '') return
                  const filteredCourses = courses.filter(_course => _course.id == prevState)
                  if (filteredCourses.length == 0) return
                  setCourse(filteredCourses[0])
                }} />
              </FormControl>
            </FormItem>
          )} />
        <Button type='submit' className='w-full' >Set Course</Button>
      </form>
    </Form>

  )
}