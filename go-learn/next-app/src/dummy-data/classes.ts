import { TClass } from "@/lib/types";
import { teacher1, teacher2 } from "./teachers";
import { module1, module2 } from "./modules";
import { student1, student2 } from "./students";

export const class1: TClass = {
    id: '0000-0000-0000-0005',
    title: 'CE301 - Individual Capstone Project',
    // module: module1,
    // students: [student1],
    // teachers: [teacher1],

}

export const class2: TClass = {
    id: '0000-0000-0000-0006',
    title: 'EL101 - Reading',
    // module: module2,
    // students: [student2],
    // teachers: [teacher2],
}


export default [class1, class2] as TClass[]