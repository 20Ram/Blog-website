import conf from "../conf/conf.js";
import { Client, Account , ID } from "appwrite";
import { validateAppwriteConfig } from "../utils/validateEnv.js";

 export class AuthService {
    client = new Client();
    account;

    constructor(){
      // Validate env at runtime for clearer errors during development
      validateAppwriteConfig(conf);
      this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
      this.account = new Account(this.client)
    }
  // Create a new user account and log them in immediately
    async createAccount({email, password, name}) {
      try {
     const userAccount = await this.account.create(
      ID.unique(), email, password , name);
      if (userAccount) {
        // Automatically login after account creation
        return  this.login({email,password})
      }else{
        return userAccount;
      }
      } catch (error) {
        console.error("Create Account Error:", error.message);
        throw error;
      }
    }
  // Log in user with email and password
    async login({email,password}){
      try {
      return  await this.account.createEmailPasswordSession(email,password)
      } catch (error) {
        // Bubble a meaningful error up to the UI
        if (error?.code === 404) {
          throw new Error("Appwrite Project not found. Check VITE_APPWRITE_PROJECT_ID and VITE_APPWRITE_URL.");
        }
        if (error?.code === 401) {
          throw new Error("Invalid email or password.");
        }
        throw error;
      }
    }
 // Get the currently logged-in user
    async getCurrentUser (){
      try {
        return await this.account.get();
        // if (user) {
        //   return user
        // } else {
        //   return null
        // }
      } catch (error) {

        if (error.code !== 401) { // only log unexpected errors
          console.error("Appwrite getCurrentUser error:", error);
        }
        console.log("Appwrite serive :: getCurrentUser :: error", error);
      }
    return null ;     //this is the another way of if else
    }
  // Log out the current user
    async logout (){
      try {
       await this.account.deleteSessions();

       } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

 const authService = new AuthService();
 export default authService;