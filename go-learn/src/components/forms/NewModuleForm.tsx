'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '../ui/textarea'
import { CoursesSelectCombobox } from './CoursesSelectCombobox'
import { cn } from '@/lib/utils'
import { Module } from './../../prisma/generated/client'

type NewModuleFormProps = {
  className?: string
  submitModule?: (module: Module, course: string) => Promise<unknown>
  disabled?: boolean,
  courseId?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the module' }),
  description: z.ostring().optional(),
  websiteURL: z.ostring().optional(),
  course: z.coerce.string().min(0, 'You need to select a course')
})


const NewModuleForm = ({ className, submitModule, disabled, courseId }: NewModuleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      websiteURL: '',
      course: courseId ?? ''
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit(({ course, title, description, websiteURL }) => {
          submitModule?.({ title, description, websiteURL } as Module, course)
        })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Module 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} disabled={disabled} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Modules's 'description' input */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='description'
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* Module 'websiteURL' input */}
        <FormField
          control={form.control}
          name='websiteURL'
          render={({ field }) => (
            <FormItem>
              <FormLabel>External link</FormLabel>
              <FormControl>
                <Input placeholder='website url' {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {!courseId && <FormField
          control={form.control}
          name='course'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <CoursesSelectCombobox value={field.value} setValue={field.onChange} />
              </FormControl>
            </FormItem>)} />
        }



        <Button type='submit' className='w-full' disabled={disabled}>Create module</Button>
      </form>
    </Form>
  </>)
}

export default NewModuleForm