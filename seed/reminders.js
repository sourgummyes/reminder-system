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
            dayS: 15,
            monthS: 6, 
            yearS: 2024,
            dayE: 17,
            monthE: 6,
            yearE: 2024,
            user_id: user1[0]._id,
        },
            {
                name: "Sample Event2",
                description: "2This is a description of the sample event.",
                dayS: 15,
                monthS: 6, 
                yearS: 2024,
                dayE: 17,
                monthE: 6,
                yearE: 2024,
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