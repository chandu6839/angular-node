//express server

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors);
app.use(bodyParser);

//Mongoos connection MgRgme7kRZJSSLJC

const MongoosURL =
  "mongodb+srv://agirichandra:MgRgme7kRZJSSLJC@cluster0.8iqzi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MongoosURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose DB connected"))
  .catch((err) => console.log(err));

//Define Schema and model

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model("Item", itemSchema);

//Routes

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
});

app.post("/item", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put("/item/:id", async (req, res) => {
  const updateItem = await findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updateItem);
});

app.delete("/item/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json("Item deleted");
});

app.listen(PORT, () =>
  console.log(`Server running at port http://localhost:${PORT}`)
);
