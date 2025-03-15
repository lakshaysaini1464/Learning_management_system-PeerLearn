import jwt from "jsonwebtoken";

 const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
    return res.status(200).cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 }).json({
        success:true,
        message,
        user
    });
    // return res.status(200).cookie("token variable jo uper bnaya", jis name se save hoga ye, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
}

export default generateToken;