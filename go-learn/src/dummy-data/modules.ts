import { TModule } from "@/lib/types";
import { class1, class2 } from "./classes";
import { course1, course2 } from "./courses";
import { unit1, unit2 } from "./units";

export const module1: TModule = {
    id: 9,
    title: 'Module 1',
    description: 'Some description',
    // classes: [class1],
    // courses: [course1],
    // units: [unit1],
    websiteURL: 'https://golearn.ac.uk/modules/0000000000000009',
}

export const module2: TModule = {
    id: 10,
    title: 'Module 2',
    description: 'Some description',
    // classes: [class2],
    // courses: [course2],
    // units: [unit2],
    websiteURL: 'https://golearn.ac.uk/modules/000000000000000a',
}

export default [module1, module2] as TModule[]