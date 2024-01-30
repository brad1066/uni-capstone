'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type NewSubmissionFormProps = {
  className?: string
  submitSubmission?: (title: string, file: File) => void
  disabled?: boolean
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'You need to provide a title for the submission' }),
  file: z.string().min(1, { message: 'You need to provide a file for the submission' }),
})


const NewSubmissionForm = ({ className, submitSubmission, disabled }: NewSubmissionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const [file, setFile] = useState<File | null>(null)

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => {
          if (file) { submitSubmission?.(values.title, file) } })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Submission 'title' input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submission Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submission 'file' input */}
        <FormField
          control={form.control}
          name='file'
          render={() => (
            <FormItem>
              <FormLabel>Submission File</FormLabel>
              <FormControl>
                <Input type='file' disabled={disabled} onChange={(e) => {
                  const file = e.target.files?.[0] ?? null
                  if (!file) { return }
                  form.setValue('file', file.name)
                  setFile(file)
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>{form.getValues()['file'] ?? 'no file'}</p>
        <Button type='submit' className='w-full' disabled={disabled}>Make submission</Button>
      </form>
    </Form >
  </>)
}

export default NewSubmissionForm