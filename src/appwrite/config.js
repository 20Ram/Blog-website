import conf from "../conf/conf.js";
import { Client,ID, Databases, Storage ,Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage (this.client);
  }

  // create a new blog post
  
  async createPost({title, content, featuredimage, userId, status, slug}){
    // if (!slug) {
    //   console.error("Missing slug in createPost()");
    //   return;
    // }
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // slug is the unique ID of the document
        {
          title,
          content,
          featuredimage,
          userId,
          status,
        }
        
      )
      
    } catch (error) {
      
      console.log("Appwrite serive :: createPost :: error", error);
      
    }
    
  }
  
  // update a blog post
  async updatePost(slug, {title, content, featuredimage,  status}){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,  // slug is the unique ID of the document
        {
          title,
          content,
          featuredimage,
          status,
        }
      )
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
      
    }
  }

  // delete a blog post
  async deletePost(slug){
    try {
       await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // slug is the unique ID of the document
      )
      return true;
    } catch (error) {
        
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
     
  }

  // get single blog post 
  async getPost(slug){
    try {
     console.log("Document ID:", slug)
     return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // slug is the unique ID of the document  
      )
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false
    }
  }
  // get all blog posts

  async getAllPosts(queries =[Query.equal("status", "active")]){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
        // queries =[Query.equal("status", "active")]  this is the default query to get all active posts
      )
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // get posts with pagination and optional search
  async getPaginatedPosts({ page = 1, perPage = 8, searchTerm = "" } = {}) {
    try {
      const queries = [Query.equal("status", "active"), Query.limit(perPage), Query.offset((page - 1) * perPage)];

      // Optional full-text search on title or content if provided
      if (searchTerm && typeof searchTerm === "string" && searchTerm.trim() !== "") {
        // Appwrite supports Query.search per attribute. We'll OR by fetching title first, then content if needed.
        // Prefer a broad search on title; clients can further filter content locally if desired.
        queries.push(Query.search("title", searchTerm.trim()));
      }

      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite service :: getPaginatedPosts :: error", error);
      return false;
    }
  }

  // fill upload featured image
  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(), // unique ID for the file
        file // the file to be uploaded
      )
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  // delete a file
  async deleteFile(fileId){
    try {
       await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId // the ID of the file to be deleted
      )
      return true; // return true if the file is deleted successfully
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  //file preview
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId,   // the ID of the file to be previewed
      // 200, // width of the preview image
      // 200 // height of the preview image 
    )
  }

  // file download
  fileDownload(fileId){
    return this.bucket.getFileDownload(
      conf.appwriteBucketId,
      fileId
    )
  }

  // viwe file
  fileViwe(fileId){
    return this.bucket.getFileView(
      conf.appwriteBucketId,
      fileId
    ).href
  }
}

const service = new Service();
export default service