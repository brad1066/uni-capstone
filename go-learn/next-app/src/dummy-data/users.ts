import { TUser } from "@/lib/types";

export const admin: TUser = {
  username: 'admin',
  password: 'password',
  title: 'Mr',
  forename: 'Herman',
  middleNames: 'the',
  surname: 'Admin Guy',
  letters: 'lol',
  contactDetails: {
    email: 'admin@golearn.ac.uk',
    mobile: '07123456789'
  },
  role: 'admin',
}

export const tjones1: TUser = {
  username: 'tjones1',
  password: 'password',
  title: 'Mr',
  forename: 'Tom',
  surname: 'Jones',
  contactDetails: {
    email: 'tjones1@golearn.ac.uk',
    mobile: '07123456789'
  },
  role: 'teacher',
} 

export const tjones2: TUser = {
  username: 'tjones2',
  password: 'password',
  title: 'Mrs',
  forename: 'Tina',
  surname: 'Jones',
  contactDetails: {
    email: 'tjones2@golearn.ac.uk',
    mobile: '07123456789'
  },
  role: 'teacher',
}

export const tj000001: TUser = {
  username: 'tj000001',
  password: 'password',
  title: 'Mr',
  forename: 'Terry',
  surname: 'Jones',
  contactDetails: {
    email: 'tj000001@golearn.ac.uk',
    mobile: '07123456789'
  },
  role: 'student',
}

export const tj000002: TUser = {
  username: 'tj000002',
  password: 'password',
  title: 'Miss',
  forename: 'Tammy',
  surname: 'Jones',
  contactDetails: {
    email: 'tj000002@golearn.ac.uk',
    mobile: '07123456789'
  },
  role: 'student',
}

export default [admin, tjones1, tjones2, tj000001, tj000002] as TUser[]