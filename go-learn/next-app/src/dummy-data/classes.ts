import { TClass } from "@/lib/types";
import { teacher1, teacher2 } from "./teachers";
import { module1, module2 } from "./modules";
import { student1, student2 } from "./students";

export const class1: TClass = {
    id: '0000-0000-0000-0005',
    title: 'Class 1',
    module: module1,
    students: [student1],
    teachers: [teacher1],

}

export const class2: TClass = {
    id: '0000-0000-0000-0006',
    title: 'Class 2',
    module: module2,
    students: [student2],
    teachers: [teacher2],
}


export default [class1, class2] as TClass[]