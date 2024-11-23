import User from '../models/user.js'
import {postgreClient} from '../config/postgre.js';

// Create a new User entry
export const createOrUpdateUser = async (name,email, oAuthID,provider,req,res) => {
  try {
    const providerFieldMapping = {
      google: 'googleOauthId',
      facebook: 'metaId',
      apple: 'appleId',
    };
    const oAuthField = providerFieldMapping[provider];
    if (!oAuthField) {
      throw new Error('Invalid OAuth provider.');
    }
    const user = new User({
      name,
      email,
      [oAuthField]:oAuthID
    });
    await user.save();
    return {message:"User Created",user};
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({},{_id:0,__v:0});
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get User with Email
export const getUserWithEmail = async (req,res)=>{
  try{
    const email = req.query.email;
    if(!email){
      return res.json({message:"No Email Found"})
    }
    const user = await User.findOne({email},{name:1,email:1,_id:0});
    if(!user) return res.json({message:"No User found!"});
    return res.json(user);
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//
export const getCurrentlyLoggedInUser = async(req,res)=>{
  try{
    const result = await postgreClient.query(`select count(id)  from sessions where is_active='true'`);
    const rowCount = result.rows[0];
    res.json(rowCount)
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}