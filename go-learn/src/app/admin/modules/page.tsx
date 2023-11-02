'use client'


import AdminModuleItem from "@/components/admin/AdminModuleItem";
import NewModuleForm from "@/components/forms/NewModuleForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import modules from "@/dummy-data/modules";
import { useAuth } from "@/hooks/useAuth";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModulesAdminPage() {
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
        <h1 className="mb-[1rem] flex gap-[1rem] items-center">All Modules
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button variant="secondary">New<PlusIcon className="ml-1"/></Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Module</DialogTitle></DialogHeader>
              <NewModuleForm submitModule={async module => {
                console.log(module)
                setDialogOpen(false)
              }} />
            </DialogContent>
          </Dialog>
        </h1>
        {modules?.length > 0 && <div className="grid grid-cols-3 w-full gap-5">
          {modules.map(module => (
            <AdminModuleItem module={module} key={module.id} onDelete={async () => { }} />
          ))}
        </div>}
      </>}
    </>
  )
}
