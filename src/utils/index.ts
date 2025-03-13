import {User} from "../types";

export function isUser(obj: any): obj is User {
    return typeof obj === "object" && obj !== null
        && 'id' in obj
        && 'name' in obj
        && 'email' in obj
        && 'age' in obj
        && 'isActive' in obj
}