export type TUser = {
    username?: string
    password?: string
    title?: string
    forename?: string
    middleNames?: string
    surname?: string
    letters?: string
    contactDetails?: TContact
    role?: 'admin' | 'teacher' | 'student' | 'unassigned'
}

export type TStudent = {
    id?: number
    user?: TUser 
    emergencyContact?: TContact
    termAddress?: TAddress
    homeAddress?: TAddress
    personalTutor?: TTeacher 
    enrolledClasses?: TClass[]
    enrolledCourse?: TCourse 
}

export type TTeacher = {
    id?: number
    user?: TUser 
    address?: TAddress
    students?: TStudent[]
    classes?: TClass[]
}

export type TClass = {
    id?: number
    title?: string
    students?: TStudent[]
    teachers?: TTeacher[]
    module?: TModule
}

export type TCourse = {
    id?: number
    title?: string
    description?: string
    websiteURL?: string
    students?: TStudent[]
    modules?: TModule[]
}

export type TModule = {
    id?: number
    title?: string
    description?: string
    websiteURL?: string
    classes?: TClass[]
    units?: TUnit[]
    courses?: TCourse[]
}

export type TUnit = {
    id?: number
    title?: string
    description?: string
    sections?: TSection[]
    resources?: TResource[]
    module?: TModule
}

export type TSection = {
    id?: number
    title?: string
    description?: string
    resources?: TResource[]
    unit?: TUnit
}

export type TResource = {
    id?: number
    title?: string
    description?: string
    content?: string
    units?: TUnit[]
    sections?: TSection[]
}

export type TAddress = {
    addressLine1?: string
    addressLine2?: string
    town?: string
    stateCounty?: string
    zipPostCode?: string
}

export type TContact = {
    label?: string
    email?: string
    mobile?: string
}
