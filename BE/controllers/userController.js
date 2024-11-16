import User from '../models/user.js'

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
