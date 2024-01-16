/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Teacher, User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { TeachersSelectCombobox } from '../TeachersSelectCombobox'
import { getTeachers } from '@/actions/teacherActions'

type AssignTeacherModuleFormProps = {
  exclude?: string[],
  onSave?: (teacher: Teacher) => void
}

const formSchema = z.object({
  teacher: z.coerce.string().min(0, 'You need to select a teacher')
})

export function AssignTeacherModuleForm({ exclude: teacherExclusions, onSave }: AssignTeacherModuleFormProps) {
  const [teacher, setTeacher] = useState<Teacher>()
  const [teachers, setTeachers] = useState<(Teacher & {user?: User | null})[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacher: ''
    }
  })

  useEffect(() => {
    (async () => {
      const teachers = await getTeachers()
      setTeachers(teachers)
      form.resetField('teacher')
    })()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.preventDefault(); teacher && onSave?.(teacher) }}>
        <FormField
          control={form.control}
          name='teacher'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <FormControl>
                <TeachersSelectCombobox value={field.value} setValue={(prevState) => {
                  field.onChange(prevState)
                  if (prevState == '') return
                  const filteredTeachers = teachers.filter(_teacher => _teacher.id == prevState)
                  if (filteredTeachers.length == 0) return
                  setTeacher(filteredTeachers[0])
                }} exclusions={teacherExclusions} />
              </FormControl>
            </FormItem>
          )} />
        <Button type='submit' className='w-full' >Set Teacher</Button>
      </form>
    </Form>

  )
}