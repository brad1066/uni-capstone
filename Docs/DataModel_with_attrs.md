# Data Model

## Remarks
For each attribute, I have followed the in-code data type with the database data type and note for the entity it belongs to. Notation of a `?` before the type says that it is nullable. Each model will also have an `id: string` field, but has been left out as is not unique to any particular model

Example for a Student: personalTutor: ? Teacher[ ] `(string[ ] of Teacher ids)`

The example is of a `personalTutor` attribute. It's in-code type is `Teacher[]`, it's database type is `string`, and it is an ID that should exist on a `Teacher` entity in the database.

Where there is an array typing for the database, in a SQL relational database, this will be implemented as an intermediary table, with each side of the relation being part of the Primary Key. In the case of the example above, the table would have `teacherID` and `studentID` as the whole entry

## Models

- [User](#user)
- [Student](#student)
- [Teacher](#teacher)
- [Class](#class)
- [Course](#course)
- [Module](#module)
- [Unit](#unit)
- [Section](#section)
- [Resource](#resource)

### User
- username: string (unique, primary key replacing id field)
- password: string
- title:?  string
- forename:?  string
- middleNames: ? string
- surname: ? string
- letters: ? string
- contactDetails: ? [Contact](#contact)
- role: `admin` | `teacher` | `student` | `unassigned`

### Student
- username: [User](#user) `(string User username)`
- emergencyContact: [Contact](#contact)
- termAddress: [Address](#address)
- homeAddress: [Address](#address)
- personalTutor: [Teacher](#teacher) `(string Teacher id)`
- enrolledClasses: [Class](#class)[ ] `(string[] of Class ids)`
- enrolledCourse: ? [Course](#course) `(string Course id)`

### Teacher
- username: [User](#user) `(string User username)`
- address: [Address](#address)
- students: [Student](#student)[ ] `(string[] of Student ids)`
- classes: [Class](#class)[ ] `(string[ ] of Class ids)`

### Class
- title: string
- students: [Student](#student)[ ] `(string[] of Student ids)`
- teachers: [Teacher](#teacher)[ ] `(string[] of Teacher ids)`
- module: Module `(string id)`

### Course
- title: string
- description: string
- websiteLink: string
- students: [Student](#student)[ ] `(string[] of Student ids)`
- modules: [Module](#module)[ ] `(string[] of Module ids)`

### Module
- title: string
- description: string
- websiteLink: string
- classes: [Class](#class)[ ] `(string[] of Class ids)`
- units: [Unit](#unit)[ ] `(string[] of Unit ids)`
- courses: [Course](#course)[ ] `(string[] of Course ids)`

### Unit
- title: string
- description: string
- resources: [Resource](#resource)[ ] `(string[] of Unit ids)`
- sections: [Section](#section)[ ] `(string[] of Section ids)`
- module: [Module](#module) `(string Module id)`

### Section
- title: string
- description: string
- resources: [Resource](#resource)[ ] `(string[] of Resource ids)`
- unit: [Unit](#unit) `(string Unit id)`

### Resource
- title: string
- description: string
- content: string
- units: [Unit](#unit)[ ] `string[] of Unit ids`
- sections: [Section](#section)[ ] `string[] of Section ids`

## Data Types

### Address
- addressLine1: string
- addressLine2: string
- town: string
- stateCounty: string
- zipPostCode: string

### Contact
- label: string
- personalEmail: string
- mobileNumber: string