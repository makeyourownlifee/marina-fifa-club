const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.'));

const uri = 'mongodb+srv://marinauser:Casein99@cluster0.qar8kde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo();

const db = client.db('marina-fifa-club');
const tournamentsCollection = db.collection('tournaments');
const diceGamesCollection = db.collection('diceGames');

app.get('/api/tournaments', async (req, res) => {
  try {
    const tournaments = await tournamentsCollection.find({}).toArray();
    res.json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).send('Error fetching tournaments');
  }
});

app.post('/api/tournaments', async (req, res) => {
  try {
    const tournament = req.body;
    await tournamentsCollection.insertOne(tournament);
    res.status(200).send('Tournament saved');
  } catch (error) {
    console.error('Error saving tournament:', error);
    res.status(500).send('Error saving tournament');
  }
});

app.put('/api/tournaments/:timestamp', async (req, res) => {
  try {
    const { timestamp } = req.params;
    const { matches } = req.body;
    if (!timestamp || !matches) return res.status(400).send('Hiányzó adat');
    const result = await tournamentsCollection.updateOne(
      { timestamp: timestamp },
      { $set: { matches: matches } }
    );
    if (result.matchedCount === 0) return res.status(404).send('Nem található');
    res.sendStatus(200);
  } catch (error) {
    console.error('Hiba a frissítéskor:', error);
    res.status(500).send('Szerver hiba');
  }
});

app.get('/api/diceGames', async (req, res) => {
  try {
    const diceGames = await diceGamesCollection.find({}).toArray();
    res.json(diceGames);
  } catch (error) {
    console.error('Error fetching dice games:', error);
    res.status(500).send('Error fetching dice games');
  }
});

app.post('/api/diceGames', async (req, res) => {
  try {
    const diceGame = req.body;
    await diceGamesCollection.insertOne(diceGame);
    res.status(200).send('Dice game saved');
  } catch (error) {
    console.error('Error saving dice game:', error);
    res.status(500).send('Error saving dice game');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
