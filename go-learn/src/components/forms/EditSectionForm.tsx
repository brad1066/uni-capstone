import { cn } from '@/lib/utils'
import { Section } from '@prisma/client'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

type EditSectionFormProps = {
  section: Section
  onUpdateSave?: (section: Omit<Section, 'id'>) => void
  className?: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the section' }),
  description: z.ostring(),
})

export default function EditSectionForm({ section, onUpdateSave, className }: EditSectionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      description: section.description || '',
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => { onUpdateSave?.(values as Omit<Section, 'id'>) })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Section 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        {/* Section's 'description' input */}
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
        <Button type='submit' className='w-full'>Update section</Button>
      </form>
    </Form >
  </>)
}