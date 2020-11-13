const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error connection ${err}`);
  console.log('Connection stablished');
  app.listen(config.port, () => {
    console.log(`ÀPI REST running on http://localhost:${config.port}`);
  });
});

/*
server.use('/', app);
server.listen(config.port, () => {
  console.log(`Api Rest running on port: ${config.port}`);
});

mongoose.connect(config.db, (err, res) => {
  if (err) throw err;
  console.log('## Connection to mongo database stablished...');
});

*/
