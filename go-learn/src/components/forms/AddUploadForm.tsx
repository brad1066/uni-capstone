'use client'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

type AddUploadFormProps = {
  onUploadSave?: (file: File) => void
  className?: string
}

const formSchema = z.object({
  file: z.custom<File | null>((v) => v instanceof File, {
    message: 'Image is required',
  })
})

export default function AddUploadForm({ onUploadSave, className }: AddUploadFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => { values.file && onUploadSave?.(values.file) })}
        className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Resource 'title' input */}
        <FormField
          control={form.control}
          name='file'
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type='file' ref={ref} name={name} onBlur={onBlur} onChange={(e) => onChange(e.target.files?.[0])} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>Upload file</Button>
      </form>
    </Form >
  </>)
}