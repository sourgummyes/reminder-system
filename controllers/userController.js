const { User, Reminder } = require('../models')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// SHOW - app.get
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            return res.json(user);
        }
        return res.status(404).send(`User with id of ${id} not found!`);
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That user doesn't exist`);
        }
        return res.status(500).send(error.message);
    }
}

const getUserByName = async (req, res) => {
    try {
        const { username } = req.params; // Use lowercase 'name' for consistency
        const users = await User.find({ username: { $regex: new RegExp(username, 'i') } });
        if (users.length > 0) {
            return res.json(users);
        }
        return res.status(404).send(`No user found with the name "${username}"!`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// CREATE - app.post
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// UPDATE - app.put
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (user) {
            return res.status(200).json(user);
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// DELETE - app.delete
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    updateUser,
    deleteUser
}
