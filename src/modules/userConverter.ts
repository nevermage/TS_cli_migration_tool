import {AlternativeUser, User} from "../types";

export function convertUser<T extends User>(userData: T): User;
export function convertUser(userData: AlternativeUser): User;
export function convertUser<T extends User>(userData: T | AlternativeUser): User {
    return {
        id: 'id' in userData ? userData.id : userData.userId,
        name: userData.name,
        email: 'email' in userData ? userData.email : userData.emailAddress,
        age: userData.age,
        isActive: 'isActive' in userData ? userData.isActive : !userData.isInactive,
    };
}