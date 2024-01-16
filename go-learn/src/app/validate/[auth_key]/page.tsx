'use client'

import { updatePasswordWithCode } from '@/actions/userActions'
import NewPasswordForm from '@/components/forms/ChangePasswordForm'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

type PasswordChangePageProps = {
  params: {
    auth_key: string
  }
    };

const PasswordChangePage = ({ params: {auth_key} }: PasswordChangePageProps) => {

  const [authValue, setAuthValue] = useState<string>('')

  const handleSubmit = async (password: string) => {
    const res = await updatePasswordWithCode(auth_key, authValue, password)
    console.log(res)
  }
  

  return (
    <div>
      <h1>Set your password</h1>
      <Input placeholder='Auth Code' onChange={e=>{ setAuthValue(e.target.value) }} className='mb-4'/>
      <NewPasswordForm submitPassword={handleSubmit}/>
    </div>
  )
}

export default PasswordChangePage