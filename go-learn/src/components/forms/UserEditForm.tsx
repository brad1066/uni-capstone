'use client'

import { changePassword, getUser, updateUser } from "@/actions/userActions"
import NewPasswordForm from "@/components/forms/ChangePasswordForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@prisma/client"
import { ChevronDownIcon, ChevronUpIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"

type UserEditFormProps = {
  loading?: boolean
  user: User
  setUser: Dispatch<SetStateAction<User | undefined>>
  onUpdateSave?: (user: User) => void
}

const UserEditForm = ({ loading, user, setUser, onUpdateSave }: UserEditFormProps) => {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState<boolean>(false)
  const [passwordDialogDisabled, setPasswordDialogDisabled] = useState<boolean>(false)

  const [nameEntryOpen, setNameEntryOpen] = useState(false)

  return <>
    {!loading && user && (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex space-between items-center">
            User data
            <Button variant="default" className="ml-auto" onClick={() => onUpdateSave?.(user)}>Update</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="hover:bg-accent">Username <span>{user?.username}</span></li>
            <li className="hover:bg-accent">Password
              <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogTrigger asChild><Button>Change Password <Pencil2Icon className="ml-1" /></Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>New User</DialogTitle></DialogHeader>
                  <NewPasswordForm disabled={loading || passwordDialogDisabled} username={user?.username} submitPassword={async (password) => {
                    setPasswordDialogDisabled(true)
                    await changePassword(user?.username, password).then(user => {
                      if (user) setUser(user)
                    })
                    setPasswordDialogDisabled(false)
                    setPasswordDialogOpen(false)
                  }} />
                </DialogContent>
              </Dialog></li>
            <li className="flex-col items-start hover:bg-accent">
              Name
              <Collapsible
                open={nameEntryOpen}
                onOpenChange={setNameEntryOpen}
                className="newUserNameEntries space-y-4"
              >
                <div className="alwaysShown">
                  {/* Name's 'title' input */}
                  <Input placeholder="title" value={user?.title} onChange={({ target: { value: title } }) => (setUser(user => user ? { ...user, title } : user
                  ))} />

                  {/* Name's 'forename' input */}
                  <Input placeholder="forename" value={user?.forename} onChange={({ target: { value: forename } }) => (setUser(user => user ? { ...user, forename } : user))} />

                  {/* Name's 'surname' input */}
                  <Input placeholder="surname" value={user?.surname} onChange={({ target: { value: surname } }) => (setUser(user => user ? { ...user, surname } : user))} />

                  {/* The trigger to show/hide the extra fields */}
                  <CollapsibleTrigger asChild>
                    <Button type="button" variant="ghost" aria-label="edit toggle for middle names and end of name letters">
                      {nameEntryOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                {/* Name's 'middleNames' and 'letters' inputs */}
                <CollapsibleContent className="grid grid-cols-2 gap-x-4">
                  {/* Name's 'middleNames' input */}
                  <Label className="flex flex-col gap-4">Middle names
                    <Input placeholder="middle names" value={user?.middleNames || ''} onChange={({ target: { value: middleNames } }) => (setUser(user => user ? { ...user, middleNames } : user))} />
                  </Label>

                  {/* Name's 'letters' input */}
                  <Label className="flex flex-col gap-4">Letters
                    <Input placeholder="letters" value={user?.letters || ''} onChange={({ target: { value: letters } }) => (setUser(user => user ? { ...user, letters } : user))} />
                  </Label>
                </CollapsibleContent>
              </Collapsible>
            </li>
            <li className="hover:bg-accent">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Contact's 'email' input */}
                <Label className="flex-1 flex flex-col gap-4">Email
                  <Input type="email" placeholder="email" />
                </Label>

                {/* Contact's 'mobile' input */}
                <Label className="flex-1 flex flex-col gap-4">Mobile
                  <Input placeholder="mobile" />
                </Label>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    )}
    
    </>
}

export default UserEditForm