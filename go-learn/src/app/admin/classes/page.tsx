'use client'


import AdminClassItem from "@/components/admin/AdminClassItem";
import NewClassForm from "@/components/forms/NewClassForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import classes from "@/dummy-data/classes";
import { useAuth } from "@/hooks/useAuth";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClasssAdminPage() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      setLoading(false)
    })()
  }, [])

  return (
    <>
      {(!loading && user?.role != 'admin') && <>
        Sorry, but you cannot access this resource. <Link href='/'>Go Home</Link>
      </>}
      {!loading && user?.role == 'admin' && <>
        <h1 className="mb-[1rem] flex gap-[1rem] items-center">All Classes
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button variant="secondary">New<PlusIcon className="ml-1"/></Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New class</DialogTitle></DialogHeader>
              <NewClassForm submitClass={async _class => {
                setDialogOpen(false)
              }} />
            </DialogContent>
          </Dialog>
        </h1>
        {classes?.length > 0 && <div className="grid grid-cols-3 w-full gap-5">
          {classes.map(_class => (
            <AdminClassItem class={_class} key={_class.id} onDelete={async () => { }} />
          ))}
        </div>}
      </>}
    </>
  )
}
