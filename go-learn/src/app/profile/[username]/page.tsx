
'use client'

import { createContactForUser, updateContact } from '@/actions/contactActions'
import { getUser, updateUser } from '@/actions/userActions'
import NoAccessNotice from '@/components/NoAccessNotice'
import EditUserForm from '@/components/forms/EditUserForm'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { Contact, User } from '@prisma/client'
import { ToastAction } from '@radix-ui/react-toast'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type ProfilePageProps = {
  params: {
    username: string
  }
}

const ProfilePage = ({ params: { username } }: ProfilePageProps) => {

  const { toast } = useToast()

  const { user: signedInUser, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState<User & { contactDetails: Contact | null } | null>()
  const [updated, setUpdated] = useState(false)

  const userUpdateSuccess = () => toast({ title: 'Updated', description: 'Your details have been updated' })
  const userUpdateFailed = () => toast({
    title: 'Not updated',
    description: 'There was an issue updating your account details',
    variant: 'destructive',
    action: <ToastAction altText="Try again" onClick={() => user && updateUser(user)}>Try again</ToastAction>
  })

  useEffect(() => {
    (async () => {
      if (!signedInUser) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      setUser(await getUser(username, ['contactDetails']))
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!updated && !loading && user != signedInUser) setUpdated(true)
  }, [user])

  return <>
    {!loading && !(signedInUser?.role == 'admin' || signedInUser?.username == user?.username) && <NoAccessNotice />}
    <h1 className="mb-[2rem]">Hi {user?.forename} {user?.surname}</h1>
    <div className="flex gap-[2rem] w-full flex-col xl:flex-row">
      <EditUserForm
        user={user as User} setUser={setUser as Dispatch<SetStateAction<User | undefined>>}
        canEdit={user?.username == signedInUser?.username || signedInUser?.role == 'admin'} onUpdateSave={(updatedUser) => {
          // if (!updated) return
          updateUser(updatedUser as User)
            .then(validateLoggedIn)
            .then(userUpdateSuccess)
            .then(() => { setUpdated(false) }).catch(userUpdateFailed)
          if (updatedUser?.contactId) updateContact(updatedUser.contactDetails as Contact)
          else createContactForUser(updatedUser?.contactDetails as Contact, updatedUser?.username as string)
            .then(userUpdateSuccess)
            .catch(userUpdateFailed)
        }} />
    </div>
  </>
}

export default ProfilePage