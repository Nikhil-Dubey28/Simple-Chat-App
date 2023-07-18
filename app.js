const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <button type="submit" id="submit">Login</button>
        </form>
        
    `);
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    res.send(`
        <script>
            localStorage.setItem('username', '${username}');
            window.location.href = '/';
        </script>
    `);
});

app.get('/', (req, res) => {
    fs.readFile("username.txt", (err, data) => {
        if (err) {
            data = `No chat exists`
        }
        res.send(`
        ${data} <form action="/" method="POST" onSubmit ="document.getElementById('username').value = localStorage.getItem('username');">
       
        <input type="text" id="message" name="message">
        <input type="hidden" id="username" name="username">
        <button type="submit" id="submit">Send</button>
    </form>
        
    `);
    })

});



app.post('/', (req, res) => {
    fs.writeFile("username.txt", ` ${req.body.username} : ${req.body.message}`,{flag: 'a'},(err) => {
        err? console.log(err) : res.redirect('/')
    })
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
