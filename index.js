const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: '3306',
  password: '12345',
  database: 'mahasiswa'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:'+ err.stack);
        return;
    }
    console.log('Connected to database');
});

app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM biodata', (err, results) => {
        if (err) {
        console.error('Error fetching data: ' + err.stack);
        res.status(500).send('Error fetching mahasiswa');
        return;
    }
    res.json(results);
    });
});







