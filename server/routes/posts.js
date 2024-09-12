import express from 'express'
import {getPosts,createPost,getPost,updatePost,deletePost} from '../controllers/postsController.js'
import multer from 'multer'
import path from 'path'

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
  
  // Init upload
  // const upload = multer({
  //   storage: storage,
  //   limits: { fileSize: 1000000 }, // Limit file size to 1MB
  // }).single('image'); // Handle a single file upload with the field name 'image'
const upload = multer({ storage }).single('file');
const router = express()


router.get('/',getPosts)
router.get('/:id',getPost)
 router.post('/',
// (req,res,next)=>{
//     upload(req, res, (err) => {
//         if (err) {
//           return res.status(400).send({ message: 'Error uploading file', error: err.message });
//         }
//         next(); // Pass control to the next middleware function
//       });
// }
upload,createPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)

export default router