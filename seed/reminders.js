const db = require('../db')
const { User } = require('../models')
const { Reminder } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const user1 = await User.find({ username: 'user1' })
    const user2 = await User.find({ username: 'user2' })
    const reminders = [
        {
            name: "Sample Event",
            description: "This is a description of the sample event.",
            dateS: 739240,
            dateSE: "6/15/2024",
            dateE: 739242,
            dateEE: "6/17/2024", 
            user_id: user1[0]._id,
        },
            {
                name: "Sample Event2",
                description: "2This is a description of the sample event.",
                dateS: 739240,
                dateSE: "6/15/2024",
                dateE: 739242,
                dateEE: "6/17/2024", 
                user_id: user2[0]._id,
            }
    ]
    await Reminder.insertMany(reminders) 
    console.log('remidners....')
}


const run = async () => {

    await main()
    
    db.close()
  }
  
  run()