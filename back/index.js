const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5000;

const secret = "xd lol jwt, really?"

const usersURL = `https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/users?apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`


const app = express();

app.use(express.static(path.resolve(__dirname, '../front/build')));
app.use(bodyParser.json());
app.use(express.json());
// Answer API requests.

app.post('/api/login', function (req, res) {
    console.log(req.body)

    axios.get(`https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/users?q={"username":"${req.body.username}"}&apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`)
        .then(response => {
            if (response.data.length == 0) {
                res.json({ msg: "Invalid credentials", loggedIn: false })
            } else {
                const { username, fullName } = response.data[0];
                const token = jwt.sign({
                    username, fullName
                }, secret);

                res.json({ token, loggedIn: true, msg: "You successfully logged in"})
            }
        })
        .catch(error => {
            console.log(error);
        })


});

app.post('/api/register', function (req, res) {
    console.log(req.body)

    axios.get(`https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/users?q={"username":"${req.body.username}"}&apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`)
        .then(response => {
            if (response.data.length != 0) {
                res.json({ msg: "User exists", created: false })
            } else {
                axios.post(usersURL,
                    req.body)
                    .then(function (response) {
                        res.json({ msg: "User created", created: true })
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        })
        .catch(error => {
            console.log(error);
        })


});

function authenticate(req, res, next) {
    const header = req.header["authorization"];

    let token;

    if(header) {
        token = header.split(".")[1];
    } else {
        req.json({msg:"You have to log into see this page"})
    }

    if(token) {
        jwt.verify(token, secret, (err, decoded)=> {
            axios.get(`https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/users?apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`)
            .then(() =>{
                if (response.data.length != 0) {
                res.json({ msg: "", users:response.data })
            } else {
                res.json({ msg: "Error!", users: [] })
            }
            })
            
    }

}

app.get("/api/users", authenticate, (req, res) => {

})

app.get('/api', function (req, res) {
    res.json({ message: `Hello from the custom server!` });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../front/build', 'index.html'));
});

app.listen(PORT, function () {
    console.error(`Listening on port ${PORT}`);
});

