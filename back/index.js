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

                res.json({ token, loggedIn: true, msg: "You successfully logged in" })
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
    const header = req.headers["authorization"];

    let token;

    if (header) {
        token = header.split(" ")[1];
    } else {
        res.json({ msg: "You have to log into see this page" })
    }

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            // console.log(err)
            // console.log(decoded)
            if(err) {
                res.json({msg:"Failed to authenticate"})
            } else {
                next()
            }
        })

    } else {
        res.json({ msg: "You have to log in to see this page" })
    }
}

app.get("/api/users", authenticate, (req, res) => {

    axios.get(`https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/users?apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`)
        .then((response) => {
            if (response.data.length != 0) {
                res.json({ msg: "", users: response.data })
            } else {
                res.json({ msg: "Error!", users: [] })
            }
        })

})

app.get("/api/skills/:username", authenticate, (req,res) => {
    axios.get(`https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/skills_${req.params.username}?apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`)
    .then((response) => {
        let {length} = response.data;
        if (length != 0) {
           
            res.json({ msg: "", skills: response.data,  })
        } else {
            res.json({ msg: "No skills!", skills: [] })
        }
    })
})

app.post("/api/skills", authenticate, (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, secret, (err, decoded) => decoded);
    console.log(req.body)

    axios.post(`https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/skills_${decoded.username}?apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`,
    req.body)
    .then((response) => res.json(response.data))

    
})

app.delete("/api/skills/:id", authenticate, (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, secret, (err, decoded) => decoded);
    console.log(req.body);

    axios.delete(`https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/skills_${decoded.username}/${req.params.id}?apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`,
    req.body)
    .then((response) => res.json(response.data))

    
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

