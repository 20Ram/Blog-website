const conf = {
  appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf;


  // console.log(import.meta.env.VITE_APPWRITE_URL);  //THIS IS USE FOR vite APP METHOD


   // console.log(process.env.REACT_APP_APPWRITE_URL);  THIS IS USE FOR CREATE REACT APP METHOD