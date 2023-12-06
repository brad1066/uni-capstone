"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import EditAddressForm from "./EditAddressForm"
import { Address } from "@prisma/client"
import { cn } from "@/lib/utils"

type EditStudentAddressFormProps = {
  homeAddress: Address
  termAddress: Address
  setHomeAddress: Dispatch<SetStateAction<Address>>
  setTermAddress: Dispatch<SetStateAction<Address>>
  className?: string
}

export default function EditStudentAddressForm({ homeAddress, termAddress, setHomeAddress, setTermAddress, className }: EditStudentAddressFormProps) {
  const [studentTermSameAsHome, setStudentTermSameAsHome] = useState<boolean>(false)

  useEffect(() => {
    if (studentTermSameAsHome) {
      setTermAddress(homeAddress)
    }
  }, [homeAddress, studentTermSameAsHome])

  return <div className={cn("flex flex-col gap-4", className)}>
    {/* Is home same as term */}
    <Label className="flex justify-between items-center">Home and Term address are the same?
      <Input className="w-[1.75rem]" type="checkbox" checked={studentTermSameAsHome} onChange={({ target }) => setStudentTermSameAsHome(target.checked)} />
    </Label>

    <div className="flex flex-col md:flex-row gap-4">
      {/* Home address & Both Address*/}
      <EditAddressForm address={homeAddress} setAddress={setHomeAddress} className="flex-1"/>

      {/* Term address */}
      {!studentTermSameAsHome && <EditAddressForm address={termAddress} setAddress={setTermAddress} className="flex-1"/>}
    </div>
  </div>

}