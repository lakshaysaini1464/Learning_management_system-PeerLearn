import express from "express";
import { uploadMedia } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";


const router = express.Router();

router.route("/upload-video").post(upload.single("file"),async(req,res)=>{
           try {
            const result = await uploadMedia(req.file.path);
            return res.status(200).json({
                success:true,
                message:"file uploade successfuly",
                data:result
            })
           } catch (error) {
            console.log(error);
            res.status(error).json({
                message:"error while uploading video lecture"
            })
           }
})

export default router;