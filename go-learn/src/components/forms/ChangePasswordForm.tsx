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
  username?: string
  disabled?: boolean
}

const formSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match'
    })
  }
})


const NewPasswordForm = ({ className, submitPassword, disabled }: NewPasswordFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
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
                <Input placeholder='Password' type='password' {...field} disabled={disabled} />
              </FormControl>
              <FormMessage about='password' />
            </FormItem>
          )}
        />
        {/* New 'password' input */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Confirm password' type='password' {...field} disabled={disabled} />
              </FormControl>
              <FormMessage about='confirmPassword' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={disabled}>Set Password</Button>
      </form>
    </Form>
  )
}

export default NewPasswordForm