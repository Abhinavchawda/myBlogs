import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setProject('<PROJECT_ID>'); // Your project ID

// const account = new Account(client);

// const promise = account.createEmailPasswordSession('email@example.com', 'password');


// SEE DOCUMENTATION OF APPWRITE, If you stuck on any code in this file

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            if(user) {
                return this.login({email, password});
            }
            else {
                return user;
            }
        }
        catch(error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            await this.account.createEmailPasswordSession(email, password)
        }
        catch(error) {
            throw error;
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch(error) {
            console.log("Appwrite AuthService :: logout() :: error: ", error);
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch(error) {
            console.log("Appwrite AuthService :: getCurrentUser() :: error: ", error);
        }
        return null;
    }
}

const authService = new AuthService();
export default authService;