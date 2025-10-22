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

app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, alamat } = req.body;

    if (!nama || !nim || !alamat) {
        return res.status(400).json({ error: 'Nama, alamat, agama harus diisi' });
    }

    db.query('INSERT INTO biodata (nama, nim, alamat) VALUES (?, ?, ?)', [nama, nim, alamat], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal menambahkan mahasiswa' });
        }
        res.status(201).json({ message: 'Mahasiswa berhasil ditambahkan', id: results.insertId });
    });
}); 

app.put('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, alamat, agama } = req.body;
    db.query('UPDATE biodata SET nama = ?, alamat = ?, agama = ? WHERE id = ?', [nama, alamat, agama, userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Gagal memperbarui mahasiswa' });
        }
        res.json({ message: 'Mahasiswa berhasil diperbarui' });
    });
});









