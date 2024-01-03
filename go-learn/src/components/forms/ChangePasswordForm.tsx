'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NewPasswordFormProps = {
  className?: string
  submitPassword?: (password: string) => Promise<unknown>
  username: string
  disabled?: boolean
}

const formSchema = z.object({
  password: z.string().min(8, { message: 'The password must have at least 8 characters' }),
})


const NewPasswordForm = ({ className, submitPassword, disabled }: NewPasswordFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ''
    },
  })

  return (
    <Form {...form}>
      <form className={cn(className, 'max-w-[50rem] flex gap-[1rem] flex-col')}
        onSubmit={
          form.handleSubmit((values) => { submitPassword?.(values.password) })} >
        {/* New 'password' input */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='password' type='password' {...field} disabled={disabled} />
              </FormControl>
              <FormMessage about='password' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={disabled}>Update Password</Button>
      </form>
    </Form>
  )
}

export default NewPasswordForm