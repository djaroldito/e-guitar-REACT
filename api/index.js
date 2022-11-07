const server = require('./src/app.js');
const { conn } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    server.listen(process.env.PORT, function () {
    console.log('escuchando en puerto', process.env.PORT); // eslint-disable-line no-console
  });
});
