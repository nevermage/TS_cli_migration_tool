import fs from "fs";
import csv from "csv-parser";
import {User} from "../types";
import {FileNotExistsError} from "../errors";
import {convertUser} from "./userConverter";

export async function readUsersFromCSV(filename: string): Promise<User[]> {
    if (!fs.existsSync(filename)) {
        throw new FileNotExistsError(`Cannot read file ${filename}`);
    }

    return new Promise((resolve, reject) => {
        const users: User[] = [];

        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (user) => {
                users.push(convertUser(user));
            })
            .on('end', () => resolve(users))
            .on('error', (err: Error) => reject(err))
    });
}

export async function writeUsersToJson(filename: string, users: User[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(filename);

        writeStream
            .on('error', (err) => reject(err))
            .on('finish', () => {
                console.log('File written successfully');
                resolve();
            });

        writeStream.write('[\n');

        users.forEach((user: User, index: number)=> {
            const isLastElement: boolean = index < users.length - 1;
            const data: string = '    ' + JSON.stringify(user) + (isLastElement ? ',\n' : '\n');
            if (!writeStream.write(data)) {
                writeStream.once('drain', () => {});
            }
        })

        writeStream.write(']');
        writeStream.end();
    });
}
