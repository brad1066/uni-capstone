1. Show Light/Dark mode
2. Show [Users](https://localhost/manage/users),
[Teachers](https://localhost/manage/users?filter=teachers), [Students](https://localhost/manage/users?filter=students) pages
   - Demonstrate what can be edited
   - Create a new User, reset their password (explaining that they default to a random 8 character password that is not retrievable as hashed in db)
   - Sign in as that user to show that it works and creates DB items
3. [Select Student](https://localhost/manage/users/jj72717)
   - Change their course to Maths and Back
   - Mess with their modules
4. [Select Course](https://localhost/manage/courses/4)
   - Edit details
   - View enrolled students
   - Remove all modules
   - Create new module
5. [Select Module](https://localhost/manage/modules/7)
   - Edit details
   - Reassign course to Maths and back
   - Remove and Add Units
6. [Select Unit](https://localhost/manage/units/3)
   - Edit Unit details
   - Add and remove sections
   - Add and remove resources
   - Attempt to view resource (not built yet, but shows 404 page)
   - Attempt to view section page (not built yet, but is present)
