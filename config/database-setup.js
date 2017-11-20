const mongoose = require('mongoose');
const dbName = 'angular-auth';

mongoose.connect(`mongodb://localhost/${dbName}`, { useMongoClient: true });
//                                                ------------------------
//                                                           |
//                                                setting to avoid a warning

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);
});
