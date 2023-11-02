import { TUser } from "@/lib/types";

export const adminUser: TUser = {
  username: 'admin',
  password: '$2b$10$.Km.2in9..BfZVBdPV6...aPFWaS6Jy8dk09EahHVWsMLep63LFmy',
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
  password: '$2b$10$.Km.2in9..BfZVBdPV6...aPFWaS6Jy8dk09EahHVWsMLep63LFmy',
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
  password: '$2b$10$.Km.2in9..BfZVBdPV6...aPFWaS6Jy8dk09EahHVWsMLep63LFmy',
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
  password: '$2b$10$.Km.2in9..BfZVBdPV6...aPFWaS6Jy8dk09EahHVWsMLep63LFmy',
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
  password: '$2b$10$.Km.2in9..BfZVBdPV6...aPFWaS6Jy8dk09EahHVWsMLep63LFmy',
  title: 'Miss',
  forename: 'Tammy',
  surname: 'Jones',
  contactDetails: {
    email: 'tj000002@golearn.ac.uk',
    mobile: '07123456789'
  },
  role: 'student',
}

export default [adminUser, tjones1, tjones2, tj000001, tj000002] as TUser[]