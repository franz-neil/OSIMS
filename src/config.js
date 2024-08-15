const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://OSIMS:admin@atlascluster.qwlco8n.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'OSIMS'; // Replace with your database name

let collection;

async function connectToDatabase() {
    try {

        const client = new MongoClient(url);
        await client.connect();
        console.log('Connected to Database');
        const db = client.db(dbName);
        collection = db.collection('Users'); // Replace 'users' with your collection name
        console.log('Collection initialized: Users');
    } catch (err) {
        console.error('Failed to connect to the Database:', err);
    }
}

connectToDatabase();

module.exports = {
    getCollection: () => collection
};