const mongoose = require('mongoose');
const express = require('express');
const FormModel = require('./model/FormModel');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// const allowedOrigins = ['http://localhost:3000', ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       return callback(null, true);
//     }

//     const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//     return callback(new Error(msg), false);
//   },
//   credentials: true,
// }));

 app.use(cors({
    origin: true,
    credentials: true,
  }));

const DB = 'mongodb+srv://Chelsea:Kasongi2014!@cluster0.ali2jhg.mongodb.net/';

console.log(DB);

mongoose.set("strictQuery", true);

const connectDB = async () => {
  await mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Mongodb is connected");
};

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;

    console.log('Received form data:', formData);

    const formEntry = new FormModel(formData);
    await formEntry.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Just chilling');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
















