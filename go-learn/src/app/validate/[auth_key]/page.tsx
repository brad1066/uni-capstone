'use client'

import { updatePasswordWithCode } from '@/actions/userActions'
import NewPasswordForm from '@/components/forms/ChangePasswordForm'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type PasswordChangePageProps = {
  params: {
    auth_key: string
  }
}

const PasswordChangePage = ({ params: {auth_key} }: PasswordChangePageProps) => {

  const router = useRouter()
  const [authValue, setAuthValue] = useState<string>('')
  const [passUpdated, setPassUpdated] = useState<boolean>(false)

  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: ''
  })

  const handleSubmit = async (password: string) => {
    const res = await updatePasswordWithCode(auth_key, authValue, password)
    setPassUpdated(res?.success ?? false)
    setAlert({
      open: true,
      title: res?.success ? 'Success' : 'Failed',
      message: res?.message ?? 'There was an issue updating your password. Please try again or seek admin assistance'
    })
  }
  

  return (
    <>
      <div>
        <h1>Set your password</h1>
        <Input placeholder='Auth Code' onChange={e=>{ setAuthValue(e.target.value) }} className='mb-4'/>
        <NewPasswordForm submitPassword={handleSubmit}/>
      </div>
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
            <AlertDialogAction onClick={() => {
              setAlert(alert => ({ ...alert, open: false }))
              if (passUpdated) router.replace('/login')
            }}>Okay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}



export default PasswordChangePage