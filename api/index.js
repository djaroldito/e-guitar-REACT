const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {PORT} = require('./src/config.js')
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    server.listen(PORT, function () {
    console.log('escuchando en puerto', PORT); // eslint-disable-line no-console
  });
});