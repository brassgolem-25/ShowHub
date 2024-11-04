import Theater from "../models/theatre.js";

// Create a new Theater entry
export const createTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    return res.status(201).json(theater);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all Theaters
export const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find({},{_id:0,__v:0});
    return res.json(theaters);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
