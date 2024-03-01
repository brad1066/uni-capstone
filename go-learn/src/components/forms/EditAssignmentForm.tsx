import { cn } from '@/lib/utils'

import { Assignment } from '~/prisma/generated/client'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'

type EditAssignmentFormProps = {
  assignment: Assignment
  onUpdateSave?: (assignment: Omit<Assignment, 'id'>) => void
  className?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the assignment' }),
  description: z.ostring(),
  dueDate: z.date(),
})

export default function EditAssignmentForm({ assignment, onUpdateSave, className }: EditAssignmentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: assignment.title,
      description: assignment.description || '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { onUpdateSave?.(values as Omit<Assignment, 'id'>) })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Assignment 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Assignment's 'description' input */}
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

        {/* Assignment's 'dueDate' input */}
        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due date</FormLabel>
              <FormControl className='w-full'>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )} />
        <Button type='submit' className='w-full'>Update assignment</Button>
      </form>
    </Form >
  </>)
}