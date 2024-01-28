import { Client, ID,Databases,Storage,Query } from "appwrite";
import conf from '../conf/conf'

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId)// Your project ID
            ;
        this.databases= new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,featuredImage,content,status,userId}){
        try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionID,
                    slug,
                    {
                        title,
                        featuredImage,
                        content,
                        status,
                        userId
                    }
                )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error)
        }
    }

    async updatePost(slug,{title,featuredImage,content,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error)
            return false;
        }
    }
    async getPost(slug){
        try {
           return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error)
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error)
            return false;
        }
    }

    //file upload service(Storage Related ) -->Usually made in diffrent file

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service ::deleteFile :: error",error)
            return false;
        }
    }

    getFilePreview(fileId){
       return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}



const service = new Service()

export default service