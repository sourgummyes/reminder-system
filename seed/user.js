const db = require('../db')
const { User } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const main = async () => {
    const users = [
        {
            username: 'user1',
            name: 'User Name',
        },{
            username: 'user2',
            name: 'Name User',
        }
    ]

  await User.insertMany(users) 
    console.log('users. users. users.')
}

const run = async () => {

    await main()
    
    db.close()
  }
  
  run()