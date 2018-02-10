const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


const usersURL = `https://api.mlab.com/api/1/databases/heroku_ln01q8pk/collections/users?apiKey=vQ6yZUKnByCrkZV3zlCbUQPgFOG8T72B`


const app = express();

app.use(express.static(path.resolve(__dirname, '../front/build')));
app.use( bodyParser.json() );
app.use(express.json());  
// Answer API requests.

app.post('/api/register', function (req, res) {
    console.log(req.body)
    axios.post(usersURL,
        req.body )
        .then(function (response) {
            res.json({msg: "ok"})
        })
        .catch(function (error) {
            console.log(error);
        })
});

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

