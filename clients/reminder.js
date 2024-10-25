document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search)
    const username = params.get('username')
    const userData = document.getElementById('userData')

    if (!username) {
        userData.innerHTML = 'No username provided.';
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3001/users/${username}`)
        const user = response.data[0]

        if (user) {
            console.log(response.data)
            userData.innerHTML = `${user.name}, Welcome!`
        } else {
            userData.innerHTML = 'No user found.'
        }
    } catch (error) {
        userData.innerHTML = `Error: ${error.response ? error.response.data : error.message}`;
    }
});

document.getElementById("findRem").addEventListener('click', async () => {
    const params = new URLSearchParams(window.location.search)
    const username = params.get('username')
    const remindersList = document.getElementById('remindersList')
    const userData = document.getElementById('userData')
    if (!username) {
        userData.innerHTML = 'No username provided.'
        return
    }

    try {
        const response = await axios.get(`http://localhost:3001/users/${username}`)
        const user = response.data[0]

        if (user) {
            console.log(response.data)
            console.log(user._id)

            // Fetch reminders for the user
            const remResponse = await axios.get(`http://localhost:3001/reminders/user/${user._id}`)
            const reminders = remResponse.data

            // Clear previous reminders
            remindersList.innerHTML = ''

            if (reminders.length > 0) {
                // Output reminders to the remindersList div
                reminders.forEach(reminder => {
                    const reminderItem = document.createElement('div')
                    remindersList.innerHTML += `
                        <div>
                            <h3>Name: ${reminder.name}</h3>
                            <p>Description: ${reminder.description}</p>
                            <p>Date Start: ${reminder.dateSE}</p>
                            <p>Date End: ${reminder.dateEE}</p>
                        </div>`
                    remindersList.appendChild(reminderItem)
                })
            } else {
                remindersList.innerHTML = 'No reminders found for this user.'
            }
        } else {
            userData.innerHTML = 'No user found.'
        }
    } catch (error) {
        userData.innerHTML = `Error: ${error.response ? error.response.data : error.message}`
    }
});

document.getElementById("reminderForm").addEventListener('submit', async (event) => {
    event.preventDefault()
    const params = new URLSearchParams(window.location.search)
    const username = params.get('username')
    const userData = document.getElementById('userData')
    const userResponse = await axios.get(`http://localhost:3001/users/${username}`)
    const user = userResponse.data[0]


    const reminderName = document.getElementById('reminderName').value.trim()
    const reminderDescription = document.getElementById('reminderDesc').value.trim()
    const reminderDate = document.getElementById('reminderDate').value
    console.log(reminderDate)
    const [year, month, day] = reminderDate.split('-')
    fyear = year * 365
    fday = day * 31
    fmonth = month
    const fullReminderDate = Number(fyear) + Number(fday) + Number(fmonth)
    const reminderEndDate = document.getElementById('reminderEndDate').value
    console.log(reminderDate)
    const [eyear, emonth, eday] = reminderEndDate.split('-');
    fEyear = eyear * 365
    fEday = eday * 31
    fEmonth = emonth
    const fullReminderEndDate = Number(fEyear) + Number(fEday) + Number(fEmonth)
    const reminderUserId = user._id
    const responseMessage = document.getElementById('responseMessage')
    console.log(reminderDate, fullReminderDate, reminderEndDate, fullReminderEndDate, reminderUserId, responseMessage, reminderName)

    // Create a reminder object
    const newReminder = {
        name: reminderName,
        description: reminderDescription, 
        dateS: fullReminderDate,
        dateSE: reminderDate, 
        dateE: fullReminderEndDate, 
        dateEE: reminderEndDate, 
        user_id: reminderUserId
    };
    console.log(newReminder)

     try {
         const response = await axios.post('http://localhost:3001/reminders', newReminder)
         responseMessage.innerHTML = `Reminder created: ${JSON.stringify(response.data)}`
     } catch (error) {
         responseMessage.innerHTML = `Error: ${error.response ? error.response.data : error.message}`
     }
})