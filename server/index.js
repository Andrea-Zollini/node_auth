require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log('db connected')})
.catch((err) => {console.log('db not connected', err)});



const port = process.env.PORT || 8000;


app.use('/', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});