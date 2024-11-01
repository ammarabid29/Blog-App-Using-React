import conf from "../conf/config.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method
                this.login({ email, password });
            }
            else {
                return userAccount;
            }

        } catch (error) {
            console.log("Appwrite Sevice :: createAccount :: Error", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite Sevice :: login :: Error", error);
        }
    }

    async getCurrentUser() { 
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Sevice :: getCurrentUser :: Error", error);
        }

        return null;
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Sevice :: logout :: Error", error);
        }
    }

}

const authService = new AuthService();
export default authService;
