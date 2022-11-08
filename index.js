const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('assignment 11 server is running')
})

app.listen(port, () => {
    console.log(`Assignment 11 server running on ${port}`);
})