import {readUsersFromCSV, writeUsersToJson} from "./modules/fileHandler";
import {User} from "./types";
import dotenv from 'dotenv';

dotenv.config();
main(process.env.READ_FILE_1ST as string, process.env.READ_FILE_2ND as string);

async function main(filename: string, secondFilename: string) {
    try {
        const users: User[] = await readUsersFromCSV(filename);
        users.push(...await readUsersFromCSV(secondFilename))
        await writeUsersToJson(process.env.WRITE_FILE as string, users);
    } catch (e) {
        console.error(e)
        throw e;
    }
}
