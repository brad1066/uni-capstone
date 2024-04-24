'use client'

import { requestUserPasswordChange } from '@/actions/authActions'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: ''
  })

  return (<>
    <div className='flex flex-col gap-4 mx-4 md:mx-0'>
      <h1>Forgot Password</h1>

      <p>Enter your username and we&apos;ll send you a link to reset your password.</p>

      <form className='mt-4 flex flex-col gap-2' onSubmit={(e) => {
        e.preventDefault()
        requestUserPasswordChange(username)
          .then((resp) => {
            if (resp && resp.success) router.push('/login')
            else setAlert({
              open: true,
              title: 'error',
              message: 'There was an issue sending the password reset email. Please try again or seek admin assistance.'
            })
          })
      }}>
        <Input placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <Button type="submit">Submit</Button>
      </form>
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
    </div >
  </>)
}