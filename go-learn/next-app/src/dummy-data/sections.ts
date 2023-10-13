import { TSection } from "@/lib/types"
import { unit1, unit2 } from "./units"
import { resource3, resource4 } from "./resources"

export const section1: TSection = {
    id: '0000-0000-0000-000e',
    title: 'Section 1',
    description: 'Some description',
    resources: [resource3],
    unit: unit1
}

export const section2: TSection = {
    id: '0000-0000-0000-000f',
    title: 'Section 2',
    description: 'Some description',
    resources: [resource4],
    unit: unit2
}

export default [section1, section2] as TSection[]
