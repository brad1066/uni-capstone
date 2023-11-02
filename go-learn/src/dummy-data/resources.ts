import { TResource } from "@/lib/types"
import { section1, section2 } from "./sections"
import { unit1, unit2 } from "./units"

export const resource1: TResource = {
    id: 16,
    title: 'Resource 1',
    description: 'Some description',
    content: '',
    sections: [],
    units: [unit1],
}

export const resource2: TResource = {
    id: 17,
    title: 'Resource 2',
    description: 'Some description',
    content: '',
    sections: [],
    units: [unit2],
}

export const resource3: TResource = {
    id: 18,
    title: 'Resource 3',
    description: 'Some description',
    content: '',
    sections: [section1],
    units: [],
}

export const resource4: TResource = {
    id: 19,
    title: 'Resource 1',
    description: 'Some description',
    content: '',
    sections: [section2],
    units: [],
}

export default [resource1, resource2, resource3, resource4] as TResource[]