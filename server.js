
const express = require('express') 
const PORT = process.env.PORT || 3001
const cors = require('cors')
const db = require('./db')

const { Reminder, User } = require('./models')

const userController = require('./controllers/userController')
const reminderController = require('./controllers/reminderController')

const app = express() 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})

app.get('/', (req, res)=> { // request and response arguements
    res.send('Hello there! Welcome to my website!')
})


app.get('/users', userController.getAllUsers)

app.post('/users', userController.createUser)

app.put('/users/:id', userController.updateUser)

app.delete('/users/:id', userController.deleteUser)


app.get('/reminders', reminderController.getAllReminders);

app.post('/reminders', reminderController.createReminder);

app.put('/reminders/:id', reminderController.updateReminder); 

app.delete('/reminders/:id', reminderController.deleteReminder);





app.get('/*', (req, res)=> { 
    res.send('404')
})