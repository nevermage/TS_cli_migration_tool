import {AlternativeUser, User} from "../types";
import {isUser} from "../utils";

export function convertUser<T extends User>(userData: T): User;
export function convertUser(userData: AlternativeUser): User;
export function convertUser<T extends User>(userData: T | AlternativeUser): User {
    return isUser(userData)
        ? {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            age: userData.age,
            isActive: userData.isActive,
        }
        : {
            id: userData.userId,
            name: userData.name,
            email: userData.emailAddress,
            age: userData.age,
            isActive: !userData.isInactive,
        };
}