import {findAllPosts,findPostById,create,update,remove} from '../models/postsModel.js'

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
        const post = req.body
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
        let post = await findPostById(postId)
        console.log(post)
        if(!post){
            res.status(404).send({msg:"Not Found"})
        }else{
            const body = req.body
            post = post[0]
            const postData = {
                title: body.title || post.title,
                location: body.location || post.location,
                googleMapsUrl: body.googleMapsUrl || post.googleMapsUrl,
                startDate: body.startDate || post.startDate,
                endDate: body.endDate || post.endDate,
                description: body.description || post.description,
                imageUrl: body.imageUrl || post.imageUrl
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
            const deletedPost = await remove(postId)
            console.log(deletedPost)
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