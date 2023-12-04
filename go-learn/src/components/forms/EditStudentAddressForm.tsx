"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import EditAddressForm from "./EditAddressForm"
import { Address } from "@prisma/client"
import { cn } from "@/lib/utils"

type EditStudentAddressFormProps = {
  address: Address
  setAddress: Dispatch<SetStateAction<Address>>
  className?: string
}

export default function EditStudentAddressForm({ address, setAddress, className }: EditStudentAddressFormProps) {
  const [studentHomeSameAsTerm, setStudentHomeSameAsTerm] = useState<boolean>(false)
  const [editingHome, setEditingHome] = useState<boolean>(false)

  return <div className={cn("flex flex-col gap-4", className)}>
    {/* Is home same as term */}
    <Label className="flex justify-between items-center">Home and Term address are the same?
      <Input className="w-[1.75rem]" type="checkbox" checked={studentHomeSameAsTerm} onChange={({ target }) => setStudentHomeSameAsTerm(target.checked)} />
    </Label>

    {/* home/term switch */}
    <Label className="flex justify-between items-center">{editingHome ? "Home" : "Term"}
      <Switch checked={editingHome} onCheckedChange={setEditingHome} />
    </Label>

    <EditAddressForm address={address} setAddress={setAddress} />
  </div>

}