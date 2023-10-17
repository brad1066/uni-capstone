import { TUser } from "@/lib/types";

export const newUser = (user: TUser) => {
    user.username = `${user.forename?.charAt(0).toLowerCase()}${user.surname?.charAt(0).toLowerCase()}${Math.floor(Math.random()*100000)}`

    return user
}