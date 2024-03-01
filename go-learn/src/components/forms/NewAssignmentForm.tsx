'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import { Assignment } from '~/prisma/generated/client'

type NewAssignmentFormProps = {
  className?: string
  submitAssignment?: (assignment: Assignment) => Promise<unknown>
  disabled?: boolean,
  courseId?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the assignment' }),
  description: z.ostring().optional(),
})


const NewAssignmentForm = ({ className, submitAssignment, disabled }: NewAssignmentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit(({ title, description }) => {
          submitAssignment?.({ title, description } as Assignment)
        })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Assignment 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} disabled={disabled} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Assignments's 'description' input */}
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



        <Button type='submit' className='w-full' disabled={disabled}>Create assignment</Button>
      </form>
    </Form>
  </>)
}

export default NewAssignmentForm