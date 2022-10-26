const server = require('./src/app.js');
const { conn } = require('./src/db.js');

 
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(3001, function () {
    
    console.log('escuchando en puerto 3001'); // eslint-disable-line no-console
  });
});