'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Separator } from '../ui/separator'
import { TUser } from '@/lib/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@/lib/utils'

type NewUserFormProps = {
  className?: string
  submitUser?: (user: TUser) => Promise<unknown>
  disabled?: boolean
}

const formSchema = z.object({
  title: z.string(),
  forename: z.string().min(2, { message: 'Forename is required' }),
  middleNames: z.string().optional(),
  surname: z.string().min(2, { message: 'Surname is required' }),
  letters: z.string().optional(),
  contactMobile: z.string().optional(),
  contactEmail: z.string().min(1, { message: 'This is required' }).email({ message: 'This needs to be a valid email address' }),
  role: z.string().regex(/teacher|student|admin/, 'You must select a role')
})


const NewUserForm = ({ className, submitUser, disabled }: NewUserFormProps) => {
  const [nameEntryOpen, setNameEntryOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      forename: '',
      middleNames: '',
      surname: '',
      letters: ''
    },
  })

  return (<>
    <Form {...form}>
      <form onSubmit={
        form.handleSubmit((values) => {
          const newUser: TUser = {
            forename: values.forename,
            surname: values.surname,
            letters: values.letters,
            middleNames: values.middleNames,
            role: values.role as 'student' | 'teacher' | 'admin',
            title: values.title,
            contactDetails: {mobile: values.contactMobile, email: values.contactEmail},
          }
          
          submitUser?.(newUser as TUser)
        })} className={cn(className, 'max-w-[50rem] flex flex-col gap-[1rem]')}>
        {/* Name Entries */}
        <Collapsible
          open={nameEntryOpen}
          onOpenChange={setNameEntryOpen}
          className="newUserNameEntries space-y-2"
        >
          <div className="alwaysShown">
            {/* Name's 'title' input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Name's 'forename' input */}
            <FormField
              control={form.control}
              name="forename"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="forename" {...field} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Name's 'surname' input */}
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="surname" {...field} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* The trigger to show/hide the extra fields */}
            <CollapsibleTrigger asChild>
              <Button type="button" aria-label="edit toggle for middle names and end of name letters" size="icon" variant="ghost" >
                {nameEntryOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
            </CollapsibleTrigger>
          </div>
          {/* Name's 'middleNames' and 'letters' inputs */}
          <CollapsibleContent className="grid grid-cols-2 gap-x-4">
            {/* Name's 'middleNames' input */}
            <FormField
              control={form.control}
              name="middleNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Names</FormLabel>
                  <FormControl>
                    <Input placeholder="middle names" {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Name's 'letters' input */}
            <FormField
              control={form.control}
              name="letters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Letters</FormLabel>
                  <FormControl>
                    <Input placeholder="letters" {...field} disabled={disabled} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CollapsibleContent>

        </Collapsible>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          {/* Contact's 'email' input */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          {/* Contact's 'mobile' input */}
          <FormField
            control={form.control}
            name="contactMobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input placeholder="mobile" {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </div>
        {/* 'role' input */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role for the user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={disabled}>Create user</Button>
      </form>
    </Form >
  </>)
}

export default NewUserForm