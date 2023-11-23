import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Address } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

type EditAddressFormProps = {
  address: Address
  setAddress: Dispatch<SetStateAction<Address>>
  className?: string
}

export default function EditAddressForm({ address, setAddress, className }: EditAddressFormProps) {
  return (<>
    <div className={cn("grid gap-y-2", className, )}>
      {/* Address's 'addressLine1' input */}
      <Label className="flex flex-col gap-4">Address Line 1
        <Input placeholder="Address Line 1" value={address?.addressLine1 || ''} onChange={({ target: { value: addressLine1 } }) => (setAddress(address => address ? { ...address, addressLine1 } : address))} />
      </Label>

      {/* Address's 'addressLine2' input */}
      <Label className="flex flex-col gap-4">Address Line 2
        <Input placeholder="Address Line 2" value={address?.addressLine2 || ''} onChange={({ target: { value: addressLine2 } }) => (setAddress(address => address ? { ...address, addressLine2 } : address))} />
      </Label>

      {/* Address's 'town' input */}
      <Label className="flex flex-col gap-4">Town
        <Input placeholder="Town" value={address?.town || ''} onChange={({ target: { value: town } }) => (setAddress(address => address ? { ...address, town } : address))} />
      </Label>

      {/* Address's 'stateCounty' input */}
      <Label className="flex flex-col gap-4">State/County
        <Input placeholder="State / County" value={address?.stateCounty || ''} onChange={({ target: { value: stateCounty } }) => (setAddress(address => address ? { ...address, stateCounty } : address))} />
      </Label>

      {/* Address's 'zipPostCode' input */}
      <Label className="flex flex-col gap-4">Zip/Post code
        <Input placeholder="Zip/Post code" value={address?.zipPostCode || ''} onChange={({ target: { value: zipPostCode } }) => (setAddress(address => address ? { ...address, zipPostCode } : address))} />
      </Label>
    </div>
  </>)
}