const jwt= require('jsonwebtoken');
const User = require("../models/User");


const secretKey = process.env.KEY;

let blacklist = [];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
 
    if (!authHeader) return res.status(403).json({ message: 'No token provided.' });

    const token = authHeader.split(' ')[1]; // Split the header and extract the token
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    if (blacklist.includes(token)) {
        return res.status(401).json({ message: 'Token revoked. Please login again.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
    });
};

const isValidToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
 
    if (!authHeader) return res.status(403).json({ message: 'No token provided.' });

    const token = authHeader.split(' ')[1]; // Split the header and extract the token
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    if (blacklist.includes(token)) {
        return res.status(401).json({ message: 'Token revoked. Please login again.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        return res.status(200).json({message:'Valid Token', data:decoded})
    });
};



const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const data = await User.findOne({email,password});
        if(!data) return res.status(401).json({message:'Email & password not found'});

        const token = jwt.sign({  email : data.email , name : data.name , id : data.id  }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({token});

    }catch(err){
        res.status(400).json({message:err.message })
    }

}



const logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    // Add the token to the blacklist
    blacklist.push(token);
    res.status(200).json({ message: 'Logged out successfully.' });
};


const register = async (req,res)=>{
    const {name,email,password} = req.body;
    try{

        const checkemail = await User.findOne({email});
        if(checkemail){
            return  res.status(400).json({message:"Email Already reegisted" })
        }

        const doc = new User();
        doc.name = name;
        doc.email = email;
        doc.password = password;
        await doc.save();

        res.status(200).json({message:"Registered Succussfully"});
    }catch(err){
        res.status(400).json({message:err.message })
    }

}



module.exports = {
    login,verifyToken,register,isValidToken,logout
}
