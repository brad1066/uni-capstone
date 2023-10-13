import { TStudent } from "@/lib/types";
import { tj000001, tj000002 } from "./users";
import { teacher1, teacher2 } from "./teachers";
import { class1, class2 } from "./classes";

export const student1: TStudent = {
    id: '0000-0000-0000-0001',
    user: tj000001,
    emergencyContact: {
        label: 'Mum',
        email: 'test@test.com'
    },
    enrolledClasses: [class1],
    homeAddress: {
        addressLine1: '1 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
    personalTutor: teacher1,
    termAddress: {
        addressLine1: '1 Homey Home',
        stateCounty: 'county',
        town: 'town',
        zipPostCode: 'AB1 2CD'
    },
}

export const student2: TStudent = {
    id: '0000-0000-0000-0002',
    user: tj000002,
    emergencyContact: {
        label: 'Mum',
        email: 'test@test.com'
    },
    enrolledClasses: [class2],
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