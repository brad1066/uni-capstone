import teachers from "@/dummy-data/teachers"
import { TTeacher } from "@/lib/types"

export const getTeacher = async (username: string): Promise<TTeacher | undefined> => {
    let teacher: TTeacher[] | TTeacher = teachers.filter(teacher => teacher.user?.username == username)
    if (teacher?.length == 1) {
        teacher = teacher[0]
        delete teacher.user?.password
        return teacher
    }
    return
}