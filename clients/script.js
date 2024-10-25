

document.getElementById("findUser").addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim()
    const userData = document.getElementById('userData')

    if (!username) {
        userData.innerHTML = 'Please enter a username.'
        return;
    }

    try {
        
        const response = await axios.get(`http://localhost:3001/users/${username}`)
        const users = response.data
        if (users.length > 0) {
            window.location.href = `reminders.html?username=${encodeURIComponent(username)}`
        } else {
            userData.innerHTML = 'No user found.'
        }
    } catch (error) {
        userData.innerHTML = `Error: ${error.response ? error.response.data : error.message}`
    }
})