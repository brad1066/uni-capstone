import { TUser } from "@/lib/types";

export const newUser = async (user: TUser) => {
    if (user.role == 'student')
        user.username = `${user.forename?.charAt(0).toLowerCase()}${user.surname?.charAt(0).toLowerCase()}${Math.floor(Math.random() * 100000)}`
    else if (user?.role == 'teacher')
        user.username = `${user.forename?.charAt(0).toLowerCase()}${user.surname?.toLowerCase()}1`

    return user
}