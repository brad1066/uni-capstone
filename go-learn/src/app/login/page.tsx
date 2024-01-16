'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useAuth } from '@/hooks/useAuth'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters'
  }),
  rememberMe: z.boolean()
})

const LoginPage = () => {
  const { login } = useAuth()
  const router = useRouter()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login?.(values.username, values.password, values.rememberMe)
      .then(res => {
        if (res?.user) {
          router.push('/')
          return
        }
        setAlert({
          open: true,
          title: 'Login failed',
          message: res?.message ?? 'There was an issue logging in. Please try again or seek admin assistance'
        })
      })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false
    },
  })

  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: ''
  })

  return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <Card className="space-y-8 max-w-[30rem] mx-auto">
          <CardHeader>Login</CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormLabel>Remember me</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={() => {
              router.push('/login/forgot-password')
            }}>Forgot my password</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
    <AlertDialog open={alert.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {alert?.title && <AlertDialogTitle>{alert.title}</AlertDialogTitle>}
          {alert?.message && <AlertDialogDescription>
            {alert.message}
          </AlertDialogDescription>
          }
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => { setAlert(alert => ({ ...alert, open: false })) }}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>)
}

export default LoginPage