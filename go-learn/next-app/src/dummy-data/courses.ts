import { TCourse } from "@/lib/types";
import { student1, student2 } from "./students";
import { module1, module2 } from "./modules";

export const course1: TCourse = {
    id: '0000-0000-0000-0007',
    title: 'Course 1',
    description: 'Some Description',
    websiteURL: 'https://golearn.ac.uk/courses/0000000000000007',
    modules: [module1],
    students: [student1]
}

export const course2: TCourse = {
    id: '0000-0000-0000-0008',
    title: 'Course 2',
    description: 'Some Description',
    websiteURL: 'https://golearn.ac.uk/courses/0000000000000008',
    modules: [module2],
    students: [student2]

}

export default [course1, course2] as TCourse[]