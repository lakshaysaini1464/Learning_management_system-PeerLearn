import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user already exist with this email.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            email:email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Account has been created successfully",
        });
    } catch (error) {
        console.log("error while creating account", error);
        return res.status(500).json({
            success: false,
            message: "error while creating account",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "incorrect email or password",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "incorrect password entered",
            });
        }

        generateToken(res, user, `welcome back ${user.name}`);
    } catch (error) {
        console.log("error login", error);
        return res.status(500).json({
            success: false,
            message: "error while login",
        });
    }
};

export const logout = async(req,res) =>{
    try{
       return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logout succesfuly",
        success:true
       })
    }catch(error){
        console.log("error while logout", error);
        return res.status(500).json({
            success: false,
            message: "failed to logout"
    })
   }
}

export  const getUserProfile = async(req,res) => {
    try{
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if(!user){
            return res.status(404).json({
                message:"profile not find",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user:user
        })
    }catch(error){
        console.log("failed to load User", error);
        return res.status(500).json({
            success: false,
            message: "failed to load User"
    })
    }
}



export const updateProfile = async(req,res) =>{
    try{
           const userId = req.id;
           const {name} = req.body;
           const profilePhoto = req.file;


           const user = await User.findById(userId);
           if(!user){
            return res.status(404).json({
                message:"User not find",
                success:false
            })
           }

           //extract the public id of the old image from the url if it exist
//and delete it 
           if(User.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0];//extract  public id 
            deleteMediaFromCloudinary(publicId);
           }
//upload new image

         const cloudResponse = await uploadMedia(profilePhoto.path);//this will send cloudResponse 
         const  photoUrl = cloudResponse.secure_url;//destructure it into photourl



           const updatedData = {name,photoUrl};
           const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password");

           return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"profile updated successfuly."
           })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to update Profile"
        })
    }
}
 
