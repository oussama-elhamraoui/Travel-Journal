import {getRows,getRowById,insertRow,updateRow,deleteRow} from './dbModel.js'

export function findAllPosts(){
    return new Promise((resolve,reject)=>{
        getRows().then(rows=>resolve(rows)).catch(err=>reject(errs))
    })
}

export function findPostById(postId){
    return new Promise((resolve,reject)=>{
        getRowById(postId).then(row=>resolve(row)).catch(err=>reject(err))
    })
}

export function create(newPost){
    return new Promise((resolve,reject)=>{
        insertRow(newPost).then(row=>resolve(row)).catch(err=>reject(err))
    })
}

export function update(updPost,postId){
    return new Promise((resolve,reject)=>{
        updateRow(updPost,postId).then(row=>resolve(row)).catch(err=>reject(err))
    })
}

export function remove(postId){
    return new Promise((resolve,reject)=>{
        deleteRow(postId).then(row=>resolve(row)).catch(err=>reject(err))
    })
}