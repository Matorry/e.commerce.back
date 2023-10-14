import 'dotenv/config';
import http from 'http';
import { app } from './app.js';
import { dbConnect } from './db/db.connect.js';
const PORT = process.env.PORT ?? 8000;
const server = http.createServer(app);
dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    console.log('Connected to Data Base', mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit('error', error);
  });
server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});
server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
