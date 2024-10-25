const { User, Reminder } = require('../models')

const getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.json(reminders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// SHOW - app.get
const getReminderById = async (req, res) => {
    try {
        const { id } = req.params;
        const reminder = await Reminder.findById(id);
        if (reminder) {
            return res.json(reminder);
        }
        return res.status(404).send(`Reminder with id of ${id} not found!`);
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That reminder doesn't exist`);
        }
        return res.status(500).send(error.message);
    }
}

const getReminderByName = async (req, res) => {
    try {
        const { name } = req.params; // Use lowercase 'name' for consistency
        const reminders = await Reminder.find({ name: { $regex: new RegExp(name, 'i') } });
        if (reminders.length > 0) {
            return res.json(reminders);
        }
        return res.status(404).send(`No reminders found with the name "${name}"!`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getReminderByUser = async (req, res) => {
    try {
        const { userid } = req.params; 
        
        const reminders = await Reminder.find({ user_id: userid }); 
        if (reminders.length > 0) {
            return res.json(reminders);
        }
        return res.status(404).send(`No reminders found for user ID "${userid}"!`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// CREATE - app.post
const createReminder = async (req, res) => {
    try {
        const reminder = new Reminder(req.body);
        await reminder.save();
        return res.status(201).json({ reminder });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// UPDATE - app.put
const updateReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const reminder = await Reminder.findByIdAndUpdate(id, req.body, { new: true });
        if (reminder) {
            return res.status(200).json(reminder);
        }
        throw new Error("Reminder not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// DELETE - app.delete
const deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Reminder.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("Reminder deleted");
        }
        throw new Error("Reminder not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllReminders,
    getReminderById,
    getReminderByName,
    getReminderByUser,
    createReminder,
    updateReminder,
    deleteReminder
}