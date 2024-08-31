import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Services {
    client = new Client();
    db;
    bucket;

    //my name "db" , hitesh sir name "databases", 
    // "Services", "Service"

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.db = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost(slug) {
        try{
            const doc = await this.db.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        }
        catch(error) {
            console.log("Appwrie Services :: getPost() :: error: ", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "true")] ) {
        try {
            return await this.db.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrie Services :: getPosts() :: error: ", error);
            return false
        }
    }   

    async createPost({title, content, slug, featuredImage, status, userId}) {
        try {
            return await this.db.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, 
                slug, 
                {
                   title, content, featuredImage, status, userId 
                }
            )
        } catch (error) {
            console.log("Appwrie Services :: createPost() :: error: ", error);
            return false
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.db.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, 
                {
                    title, content, featuredImage, status
                }
            )
        } 
        catch (error) {
            console.log("Appwrie Services :: updatePost() :: error: ", error);
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.db.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true
        } 
        catch (error) {
            console.log("Appwrie Services :: deletePost() :: error: ", error);
            return false
        }
    }

    //Storage Service
    async updoadFile(file) {
        try {
            await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
            return true
        } 
        catch (error) {
            console.log("Appwrie Services :: updloadFile() :: error: ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true
        } 
        catch (error) {
            console.log("Appwrie Services :: deleteFile() :: error: ", error);
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
            .href
        } 
        catch (error) {
            console.log("Appwrie Services :: getFilePreview() :: error: ", error);
            return false
        }
    }
}

const service = new Services();
export default service;