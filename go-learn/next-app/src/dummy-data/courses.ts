import { TCourse } from "@/lib/types";
import { student1, student2 } from "./students";
import { module1, module2 } from "./modules";

export const course1: TCourse = {
    id: '0000-0000-0000-0007',
    title: 'Computer Science (BSc)',
    description: 'Some Description',
    websiteURL: 'https://golearn.ac.uk/courses/0000-0000-0000-0007',
    // modules: [module1],
    // students: [student1]
}

export const course2: TCourse = {
    id: '0000-0000-0000-0008',
    title: 'English Literature (BA)',
    description: 'Some Description',
    websiteURL: 'https://golearn.ac.uk/courses/0000-0000-0000-0008',
    // modules: [module2],
    // students: [student2]

}

export default [course1, course2] as TCourse[]