import { TTeacher } from "@/lib/types";
import { tjones1, tjones2 } from "./users";
import { student1, student2 } from "./students";
import { class1, class2 } from "./classes";

export const teacher1: TTeacher = {
    id: 3,
    user: tjones1,
    address: {
        addressLine1: '1 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
    classes: [class1],
    // students: [student1]
}

export const teacher2: TTeacher = {
    id: 4,
    user: tjones2,
    address: {
        addressLine1: '1 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
    classes: [class2],
    // students: [student2]
}

export default [teacher1, teacher2] as TTeacher[]