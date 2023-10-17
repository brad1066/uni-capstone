'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { Separator } from "../ui/separator"
import { TUser } from "@/lib/types"

type NewUserFormProps = {
  className?: string
  submitUser?: (user: TUser) => any
  disabled?: boolean
}

const formSchema = z.object({
  title: z.string(),
  forename: z.string().min(1, { message: 'This is a required field' }),
  middleNames: z.string().optional(),
  surname: z.string().min(1, { message: 'This is a required field' }),
  letters: z.string().optional(),
  contactLabel: z.string().min(1, { message: 'This is required' }),
  contactMobile: z.string(),
  contactEmail: z.string().email({ message: 'This needs to be a valid email address' }).min(1, { message: 'This is required' }),
  role: z.string()
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
      <form onSubmit={e => {
        e.preventDefault()
        const formVals = form.getValues()
        const user: TUser = {
          title: formVals.title,
          forename: formVals.forename,
          middleNames: formVals.middleNames,
          surname: formVals.surname,
          letters: formVals.letters,
          contactDetails: {
            label: formVals.contactLabel,
            email: formVals.contactEmail,
            mobile: formVals.contactMobile
          }
        }
        submitUser?.(user)
      }} className="max-w-[50rem]">
        <Card className="mx-auto">
          <CardHeader className="text-2xl">General Data</CardHeader>
          <CardContent className="flex flex-col gap-[1rem]">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Name's 'forename' input */}
                <FormField
                  control={form.control}
                  name="forename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input placeholder="forename" {...field} disabled={disabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Name's 'surname' input */}
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input placeholder="surname" {...field} disabled={disabled} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* The trigger to show/hide the extra fields */}
                <CollapsibleTrigger>
                  <Button type="button" size="icon" variant={"ghost"}>
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
              {/* Contact's 'label' input */}
              <FormField
                control={form.control}
                name="contactLabel"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
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

          </CardContent>
          <CardFooter>
            <Button type="submit" style={{ width: '100%' }} disabled={disabled}>Create user</Button>
          </CardFooter>
        </Card>
      </form>
    </Form >
  </>)
}

export default NewUserForm