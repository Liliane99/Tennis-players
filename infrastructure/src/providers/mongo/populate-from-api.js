require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');

async function populatePlayersFromAPI() {
  const mongoUri = process.env.MONGODB_URI;
  console.log('Using MongoDB URI:', mongoUri);
  const client = new MongoClient(mongoUri);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    
    const db = client.db('tennis-players');
    const collection = db.collection('players');
    
    console.log('Fetching players data from API...');
    
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://tenisu.latelier.co/resources/headtohead.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Retrieved ${data.players.length} players from API`);
    
    
    await collection.deleteMany({});
    
    
    
    const playersData = data.players.map(player => ({
      id: uuidv4(), 
      firstname: player.firstname,
      lastname: player.lastname,
      shortname: player.shortname,
      sex: player.sex,
      picture: player.picture,
      country: {
        picture: player.country.picture,
        code: player.country.code
      },
      data: {
        rank: player.data.rank,
        points: player.data.points,
        weight: player.data.weight,
        height: player.data.height,
        age: player.data.age,
        last: player.data.last
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    
    const result = await collection.insertMany(playersData);
    console.log(`Successfully inserted ${result.insertedCount} players`);
    
    
    
  } catch (error) {
    console.error('Error populating database:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}


populatePlayersFromAPI();
