import users from "@/dummy-data/users";
import { TUser } from "@/lib/types";

export const newUser = async (user: TUser) => {
    if (user.role == 'student')
        user.username = `${user.forename?.charAt(0).toLowerCase()}${user.surname?.charAt(0).toLowerCase()}${Math.floor(Math.random() * 100000)}`
    else if (user?.role == 'teacher')
        user.username = `${user.forename?.charAt(0).toLowerCase()}${user.surname?.toLowerCase()}1`

    return user
}

export const getUser = async (username: string): Promise<TUser | undefined> => {
    let user: TUser[] | TUser = users.filter(user => user.username === username)
    if (user.length == 1) {
        user = { ...user[0] }
        delete user.password
        return user
    }
    return
}