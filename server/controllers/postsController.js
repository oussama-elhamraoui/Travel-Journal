import {findAllPosts,findPostById,create,update,remove} from '../models/postsModel.js'
import fs from 'fs/promises'
import path from 'path'

export async function getPosts(req,res,next){
    try{
        const posts = await findAllPosts()
        if(!posts){
            res.status(404).json({msg:'Not Found'})
        }else{
            res.status(200).json(posts)
        }
    }catch(err){
        res.status(500).json({msg:'Server Error'})
    }
}

export async function getPost(req,res,next){
    try{
        const postId = req.params.id
        const post = await findPostById(postId)
        
        if(!post){
            res.status(404).json({msg:'Not Found'})
        }else{
            res.status(200).json(post)
        }
    }catch(err){
        res.status(500).json({msg:"Server Error"})
    }
}

export async function createPost(req,res,next){
    try{
        const { title, location, googlemapsurl, startdate, enddate, description } = req.body;
        if (!title || !location || !googlemapsurl || !startdate || !enddate || !description) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }
        if (!req.file) {
            console.log(req.file)
            return res.status(400).json({ msg: 'File upload failed' });
        }
        const fileName = req.file.filename;
        console.log('Uploaded file name:', fileName);
        const fileUrl = `http://localhost:5000/uploads/${fileName}`;
        
        const post = {
            title,
            location,
            googlemapsurl,
            startdate,
            enddate,
            description,
            imageurl: fileUrl,
        };
        const newPost = await create(post)
        if(!newPost){
            res.status(400).json({msg:"Error while creating the post"})
        }else{
            res.status(201).json(newPost)
        }
    }catch(err){
        res.status(500).json({msg:'Server Error'})
    }
}

export async function updatePost(req,res,next){
    try{
        const postId = req.params.id
        const post = await findPostById(postId)
        console.log(post.googlemapsurl)
        if(!post){
            res.status(404).send({msg:"Not Found"})
        }else{
            const body = req.body
            console.log(body, 'body')
            console.log("post: 7 ", post.googlemapsurl)
            const postData = {
                title: body.title || post.title,
                location: body.location || post.location,
                googlemapsurl: body.googlemapsurl || post.googlemapsurl,
                startdate: body.startdate || post.startdate,
                enddate: body.enddate || post.enddate,
                description: body.description || post.description,
                imageurl: body.imageurl || post.imageurl
            }
            console.log(postData)
            const updPost = await update(postData,postId)
            if(!updPost){
                res.status(404).send({msg:"Error while updating the post"})
            }else{
                res.status(200).send(updPost)
            }

        }
    }catch(err){
        res.status(500).send({msg:"Server Error"})
    }
}

export async function deletePost(req,res,next){
    try{
        const postId = req.params.id
        const post = await findPostById(postId)
        
        if(!post){
            res.status(404).send({msg:"Not Found"})
        }else{
            const fileName = path.basename(post.imageurl)
            const filePath = path.resolve(process.cwd(), 'uploads', fileName);
            console.log(filePath)
            await fs.unlink(filePath)
            const deletedPost = await remove(postId)
            if(!deletedPost){
                res.status(404).send({msg:"Error while deleting post"})
            }else{
                res.status(200).send(deletedPost)
            }
        }
    }catch(err){
        res.status(500).send({msg:"Server Error"})
    }
}