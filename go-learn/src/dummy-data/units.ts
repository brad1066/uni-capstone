import { TUnit } from "@/lib/types"
import { module1, module2 } from "./modules"
import { section1, section2 } from "./sections"
import { resource1, resource2 } from "./resources";

export const unit1: TUnit = {
    id: 11,
    title: 'Unit 1',
    description: 'Some description',
    module: module1,
    resources: [resource1],
    sections: [section1]
}

export const unit2: TUnit = {
    id: 12,
    title: 'Unit 2',
    description: 'Some description',
    module: module2,
    resources: [resource2],
    sections: [section2]
}

export default [unit1, unit2] as TUnit[]