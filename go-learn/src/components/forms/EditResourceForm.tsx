import { cn } from '@/lib/utils'
import { Resource } from '@prisma/client'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

type EditResourceFormProps = {
  resource: Resource
  onUpdateSave?: (resource: Omit<Resource, 'id'>) => void
  className?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the resource' }),
  description: z.ostring(),
})

export default function EditResourceForm({ resource, onUpdateSave, className }: EditResourceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: resource.title,
      description: resource.description || '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { onUpdateSave?.(values as Omit<Resource, 'id'>) })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Resource 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field}/>
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
        <Button type='submit' className='w-full'>Update resource</Button>
      </form>
    </Form >
  </>)
}