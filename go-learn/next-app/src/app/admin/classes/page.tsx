'use client'


import AdminClassItem from "@/components/admin/AdminClassItem";
import classes from "@/dummy-data/classes";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClasssAdminPage() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    })()
    setLoading(false)
  }, [])

  return (
    <>
      {(!loading && user?.role != 'admin') && <>
        Sorry, but you cannot access this resource. <Link href='/'>Go Home</Link>
      </>}
      {!loading && user?.role == 'admin' && <>
        <h1 className="mb-[1rem]">All Classes</h1>
        {classes?.length > 0 && <div className="grid grid-cols-3 w-full gap-5">
          {classes.map(_class => (
            <AdminClassItem class={_class} key={_class.id} onDelete={async () => { }} />
          ))}
        </div>}
      </>}
    </>
  )
}
