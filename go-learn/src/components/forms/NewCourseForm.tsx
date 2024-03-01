'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import { Course } from '~/prisma/generated/client'

type NewCourseFormProps = {
  className?: string
  submitCourse?: (course: Course) => Promise<unknown>
  disabled?: boolean
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the course' }),
  description: z.ostring(),
  websiteURL: z.ostring(),
})


const NewCourseForm = ({ className, submitCourse, disabled }: NewCourseFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      websiteURL: '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { submitCourse?.(values as Course) })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Course 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} disabled={disabled} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Contact's 'description' input */}
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
        {/* Course 'websiteURL' input */}
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
        <Button type='submit' className='w-full' disabled={disabled}>Create course</Button>
      </form>
    </Form >
  </>)
}

export default NewCourseForm