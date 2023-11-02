import { TStudent } from "@/lib/types";
import { tj000001, tj000002 } from "./users";
import { teacher1, teacher2 } from "./teachers";
import { class1, class2 } from "./classes";
import { course1, course2 } from "./courses";

export const student1: TStudent = {
    id: 1,
    user: tj000001,
    enrolledCourse: course1,
    enrolledClasses: [class1],
    personalTutor: teacher1,
    emergencyContact: {
        label: 'Mum',
        email: 'test@test.com'
    },
    homeAddress: {
        addressLine1: '1 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
    termAddress: {
        addressLine1: '1 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
}

export const student2: TStudent = {
    id: 2,
    user: tj000002,
    enrolledCourse: course2,
    enrolledClasses: [class2],
    emergencyContact: {
        label: 'Mum',
        email: 'test@test.com'
    },
    homeAddress: {
        addressLine1: '1 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
    personalTutor: teacher2,
    termAddress: {
        addressLine1: '2 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
}

export default [student1, student2] as TStudent[]