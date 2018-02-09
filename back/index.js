const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.json({message:`Hello from the custom server!`});
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../front/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Listening on port ${PORT}`);
  });

