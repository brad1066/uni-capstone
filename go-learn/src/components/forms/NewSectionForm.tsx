'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Section } from '@prisma/client'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

type NewSectionFormProps = {
  unitId: string
  onSubmit?: (section: Section, unitId?: number, sectionId?: number) => Promise<void>
  className?: string,
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the unit' }),
  description: z.ostring(),
})


export default function NewSectionForm({ unitId, onSubmit, className }: NewSectionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  return (<>
    <Form {...form}>
      <form className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}
        onSubmit={form.handleSubmit((values) => { onSubmit?.({
          title: values.title,
          description: values.description ?? '',
          id: -1,
          unitId } as Section) })}>

        {/* Section 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} />
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
        <Button type='submit' className='w-full'>Create Section</Button>
      </form>
    </Form>
  </>)
}