import { cn } from '@/lib/utils'
import { Resource } from './../../prisma/generated/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

type EditResourceContentFormProps = {
  resource: Resource
  onUpdateSave?: (content: string) => void
  className?: string
}

const formSchema = z.object({
  content: z.string().min(1, { message: 'You need to provide content for the resource' }),
})

export default function EditResourceContentForm({ resource, onUpdateSave, className }: EditResourceContentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: resource.content || '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { onUpdateSave?.(values.content) })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Content input */}
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='content'
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <Button type='submit' className='w-full'>Update content</Button>
      </form>
    </Form >
  </>)
}