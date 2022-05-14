const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//coonect Your application
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mqhl2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const bookingCollection = client
      .db("doctors_portal")
      .collection("bookings");

    app.get("/booking", async (req, res) => {
      const query = {};
      const cursor = bookingCollection.find(query);

      const bookings = await cursor.toArray();
      res.send(bookings);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Doctors Portal");
});

app.listen(port, () => {
  console.log(`Doctors Portal listening on port ${port}`);
});
